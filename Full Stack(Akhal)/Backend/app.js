// Get references to HTML elements
const balance = document.getElementById('balance');
const income = document.getElementById('income');
const expense = document.getElementById('expense');
const historyList = document.getElementById('list');
const textInput = document.getElementById('text');
const amountInput = document.getElementById('amount');
const addButton = document.querySelector('button');

// Initialize global variables
let transactions = [];

// Function to update balance, income, and expense
function updateUI() {
  let totalIncome = 0;
  let totalExpense = 0;

  transactions.forEach(transaction => {
    if (transaction.amount > 0) {
      totalIncome += transaction.amount;
    } else {
      totalExpense += Math.abs(transaction.amount);
    }
  });

  const currentBalance = totalIncome - totalExpense;
  balance.innerText = `$${currentBalance.toFixed(2)}`;
  income.innerText = `$${totalIncome.toFixed(2)} \u2191`;
  expense.innerText = `$${totalExpense.toFixed(2)} \u2193`;

  renderHistory();
}

// Function to render transaction history
function renderHistory() {
  historyList.innerHTML = '';

  transactions.forEach(transaction => {
    const li = document.createElement('li');
    li.classList.add(transaction.amount > 0 ? 'plus' : 'minus');
    
    const transactionText = document.createElement('h4');
    transactionText.innerText = transaction.text;
    
    const transactionAmount = document.createElement('span');
    transactionAmount.innerText = `${transaction.amount > 0 ? '+' : ''}$${Math.abs(transaction.amount).toFixed(2)}`;
    
    const deleteIcon = document.createElement('i');
    deleteIcon.classList.add('fas', 'fa-trash-alt');
    deleteIcon.addEventListener('click', () => deleteTransaction(transaction.id));
    
    transactionAmount.appendChild(deleteIcon);
    li.appendChild(transactionText);
    li.appendChild(transactionAmount);
    historyList.appendChild(li);
  });
}

// Function to delete a transaction
function deleteTransaction(id) {
  transactions = transactions.filter(transaction => transaction.id !== id);
  updateUI();
}

// Function to add a new transaction
function addTransaction() {
  const text = textInput.value.trim();
  const amount = parseFloat(amountInput.value.trim());

  if (text === '' || isNaN(amount)) {
    alert('Please provide valid text and amount.');
    return;
  }

  const newTransaction = {
    id: Date.now(), // Unique ID based on current timestamp
    text: text,
    amount: amount
  };

  transactions.push(newTransaction);
  textInput.value = '';
  amountInput.value = '';
  
  updateUI();
}

// Event listener for the Add Transaction button
addButton.addEventListener('click', addTransaction);

// Initialize the app with default values
updateUI();
