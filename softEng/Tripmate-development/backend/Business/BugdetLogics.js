async function getBudgetSummary(targetBudget) {
  let availableFund = 0;
  let plannedFund = 0;
  let usedFund = 0;
  let pendingFund = 0;
  const targetExpenses = targetBudget.expenses;

  for (let i = 0; i < targetExpenses.length; i += 1) {
    plannedFund += targetExpenses[i].amount;
    if (targetExpenses[i].isDone) usedFund += targetExpenses[i].amount;
  }
  if (Number.isNaN(plannedFund)) plannedFund = 0;
  availableFund = targetBudget.budget - usedFund;
  if (Number.isNaN(availableFund)) availableFund = 0;
  let thisBudget = targetBudget.budget;
  if (Number.isNaN(thisBudget) || thisBudget === undefined) thisBudget = 0;
  pendingFund = plannedFund - usedFund;

  return {
    available: availableFund,
    planned: plannedFund,
    budget: thisBudget,
    pending: pendingFund,
    used: usedFund,
  };
}

function compareByDate(expense1, expense2) {
  if (expense1.createdAt.getTime() < expense2.createdAt.getTime()) return -1;
  if (expense1.createdAt.getTime() > expense2.createdAt.getTime()) return 1;

  if (!expense1.isDone && expense2.isDone) {
    return 1;
  }
  if (expense1.isDone && !expense2.isDone) {
    return -1;
  }
  return 0;
}

async function getExpensesListByDateOrder(targetExpenses) {
  targetExpenses.sort(compareByDate);
  return targetExpenses;
}

module.exports = {
  getBudgetSummary,
  getExpensesListBYDateOrder: getExpensesListByDateOrder,
  compareByDate,
};
