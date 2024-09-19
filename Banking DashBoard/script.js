// Initial balance
let balance = 1000;

// Get elements
const balanceDisplay = document.getElementById('balance');
const depositAmount = document.getElementById('deposit-amount');
const withdrawAmount = document.getElementById('withdraw-amount');
const depositBtn = document.getElementById('deposit-btn');
const withdrawBtn = document.getElementById('withdraw-btn');

// Function to update the displayed balance
function updateBalance() {
  balanceDisplay.textContent = balance.toFixed(2);
}

// Deposit functionality
depositBtn.addEventListener('click', () => {
  const depositValue = parseFloat(depositAmount.value);
  if (!isNaN(depositValue) && depositValue > 0) {
    balance += depositValue;
    updateBalance();
  }
  depositAmount.value = ''; // Clear the input field
});

// Withdraw functionality
withdrawBtn.addEventListener('click', () => {
  const withdrawValue = parseFloat(withdrawAmount.value);
  if (!isNaN(withdrawValue) && withdrawValue > 0) {
    if (withdrawValue <= balance) {
      balance -= withdrawValue;
      updateBalance();
    } else {
      alert('Insufficient funds for this withdrawal!');
    }
  }
  withdrawAmount.value = ''; 
});
