// Initialize the portfolio from localStorage or as an empty array
let portfolio = JSON.parse(localStorage.getItem('portfolio')) || [];

// DOM elements
const addInvestmentForm = document.getElementById('addInvestmentForm');
const investmentList = document.getElementById('investmentList').getElementsByTagName('tbody')[0];
const totalValueSpan = document.getElementById('totalValue');
const portfolioChart = document.getElementById('portfolioChart');

// Chart instance
let chart;

// Function to update the total portfolio value
function updateTotalValue() {
    const total = portfolio.reduce((sum, investment) => sum + investment.currentValue, 0);
    totalValueSpan.textContent = total.toFixed(2);
}

// Function to calculate percentage change
function calculatePercentageChange(invested, current) {
    return ((current - invested) / invested * 100).toFixed(2);
}

// Function to render the investment list
function renderInvestments() {
    investmentList.innerHTML = '';
    portfolio.forEach((investment, index) => {
        const row = investmentList.insertRow();
        row.innerHTML = `
            <td>${investment.assetName}</td>
            <td>$${investment.investedAmount.toFixed(2)}</td>
            <td>$${investment.currentValue.toFixed(2)}</td>
            <td>${calculatePercentageChange(investment.investedAmount, investment.currentValue)}%</td>
            <td>
                <button onclick="updateInvestment(${index})">Update</button>
                <button onclick="removeInvestment(${index})">Remove</button>
            </td>
        `;
    });
    updateTotalValue();
    updateChart();
}

// Function to add a new investment
function addInvestment(event) {
    event.preventDefault();
    const assetName = document.getElementById('assetName').value;
    const investedAmount = parseFloat(document.getElementById('investedAmount').value);
    const currentValue = parseFloat(document.getElementById('currentValue').value);

    portfolio.push({ assetName, investedAmount, currentValue });
    localStorage.setItem('portfolio', JSON.stringify(portfolio));
    renderInvestments();
    addInvestmentForm.reset();
}

// Function to update an investment
function updateInvestment(index) {
    const newValue = prompt('Enter new current value:');
    if (newValue !== null && !isNaN(newValue)) {
        portfolio[index].currentValue = parseFloat(newValue);
        localStorage.setItem('portfolio', JSON.stringify(portfolio));
        renderInvestments();
    }
}

// Function to remove an investment
function removeInvestment(index) {
    if (confirm('Are you sure you want to remove this investment?')) {
        portfolio.splice(index, 1);
        localStorage.setItem('portfolio', JSON.stringify(portfolio));
        renderInvestments();
    }
}

// Function to update the chart
function updateChart() {
    const labels = portfolio.map(investment => investment.assetName);
    const data = portfolio.map(investment => investment.currentValue);

    if (chart) {
        chart.destroy();
    }

    chart = new Chart(portfolioChart, {
        type: 'pie',
        data: {
            labels: labels,
            datasets: [{
                data: data,
                backgroundColor: [
                    '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40'
                ]
            }]
        },
        options: {
            responsive: true,
            title: {
                display: true,
                text: 'Portfolio Distribution'
            }
        }
    });
}

// Event listeners
addInvestmentForm.addEventListener('submit', addInvestment);

// Initial render
renderInvestments();