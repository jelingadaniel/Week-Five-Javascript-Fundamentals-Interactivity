
// 1. Store expense records using an array
let expenses = [];

// Select HTML elements
const expenseForm = document.getElementById("expenseForm");
const expenseName = document.getElementById("expenseName");
const expenseAmount = document.getElementById("expenseAmount");
const budgetInput = document.getElementById("budget");

const totalBudgetDisplay = document.getElementById("totalBudget");
const totalExpensesDisplay = document.getElementById("totalExpenses");
const balanceDisplay = document.getElementById("balance");
const budgetMessage = document.getElementById("budgetMessage");
const expenseList = document.getElementById("expenseList");

// 2. Add an event listener to the form
expenseForm.addEventListener("submit", function(event) {

    event.preventDefault();

    const name = expenseName.value.trim();
    const amount = Number(expenseAmount.value);

    // 3. Decision making using if statements
    if (name === "" || !Number.isFinite(amount) || amount <= 0) {
        alert("Please enter a valid expense name and amount.");
        return;
    }

    // Store the expense as an object in the array
    expenses.push({
        name: name,
        amount: amount
    });

    // Update the dashboard
    updateDashboard();

    // Clear the form
    expenseForm.reset();
});

// 4. Calculate totals and update the dashboard
function updateDashboard() {

    const budget = Number(budgetInput.value);

    // Use a loop to calculate total expenses
    let totalExpenses = 0;

    for (let i = 0; i < expenses.length; i++) {
        totalExpenses += expenses[i].amount;
    }

    const balance = budget - totalExpenses;

    // Display totals on the webpage
    totalBudgetDisplay.textContent =
        "KSh " + budget.toLocaleString();

    totalExpensesDisplay.textContent =
        "KSh " + totalExpenses.toLocaleString();

    balanceDisplay.textContent =
        "KSh " + balance.toLocaleString();

    // 5. Make decisions based on the budget
    if (totalExpenses > budget) {
        budgetMessage.textContent = "Warning! You have exceeded your budget.";
    } else if (totalExpenses === budget) {
        budgetMessage.textContent = "You have used your entire budget.";
    } else {
        budgetMessage.textContent = "Good job! You are within your budget.";
    }

    // 6. Display expense records using a loop
    expenseList.innerHTML = "";

    for (let i = 0; i < expenses.length; i++) {

        const listItem = document.createElement("li");

        listItem.textContent =
            expenses[i].name + " - KSh " +
            expenses[i].amount.toLocaleString();

        expenseList.appendChild(listItem);
    }
}

// Update dashboard when the budget changes
budgetInput.addEventListener("input", updateDashboard);

// Display initial dashboard
updateDashboard();
