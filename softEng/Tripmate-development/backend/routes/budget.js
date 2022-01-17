const router = require('express').Router();
const {Budget} = require('../models/budget.model');
const {Expenses} = require('../models/budget.model');
const {
  getBudgetSummary,
  getExpensesListBYDateOrder,
} = require('../Business/BugdetLogics');

router.route('/trip/:tripId').get((req, res) => {
  Budget.findOne({tripId: req.params.tripId})
    .then(budget => res.json(budget))
    .catch(err => res.status(400).json(`Error: ${err}`));
});

router.route('/add/:tripId').post((req, res) => {
  const {budget} = req.body;
  const {tripId} = req.params;

  const newBudget = new Budget({budget, tripId});

  newBudget
    .save()
    .then(() => res.status(201).json({data: 'Budget added.'}))
    .catch(err => res.status(400).json(`Error: ${err}`));
});

router.route('/:id').get((req, res) => {
  Budget.findById(req.params.id)
    .then(budget => res.json(budget))
    .catch(err => res.status(400).json(`Error: ${err}`));
});

router.route('/:id/update').post((req, res) => {
  Budget.findById(req.params.id)
    .then(budget => {
      budget.budget = req.body.budget;
      budget
        .save()
        .then(() => res.json('Budget updated!'))
        .catch(err => res.status(400).json(`Error: ${err}`));
    })
    .catch(err => res.status(400).json(`Error: ${err}`));
});

router.route('/:id/expenses/summary').get((req, res) => {
  Budget.findById(req.params.id)
    .then(budget => getBudgetSummary(budget))
    .then(summary => res.json(summary))
    .catch(err => res.status(400).json(`Error: ${err}`));
});

router.route('/:id/expenses/sorted').get((req, res) => {
  Budget.findById(req.params.id)
    .then(budget => getExpensesListBYDateOrder(budget.expenses))
    .then(summary => res.json(summary))
    .catch(err => res.status(400).json(`Error: ${err}`));
});

router.route('/:id').delete((req, res) => {
  Budget.findByIdAndDelete(req.params.id)
    .then(() => res.json({data: 'Budget deleted.'}))
    .catch(err => res.status(400).json(`Error: ${err}`));
});

router.route('/:id/expenses').get((req, res) => {
  Budget.findById(req.params.id)
    .then(budget => res.json(budget.expenses))
    .catch(err => res.status(400).json(`Error: ${err}`));
});

router.route('/:id/expenses/:expense_id').get((req, res) => {
  Budget.findById(req.params.id)
    .then(budget => {
      const expense = budget.expenses.id(req.params.expense_id);
      res.json(expense);
    })
    .catch(err => res.status(400).json(`Error: ${err}`));
});

router.route('/:id/expenses/add').post((req, res) => {
  const {expenses} = req.body;
  const newExpense = new Expenses(expenses);

  Budget.findById(req.params.id).then(budget => {
    budget.expenses.push(newExpense);

    budget
      .save()
      .then(() => res.status(201).json('New expense added to budget!'))
      .catch(err => res.status(400).json(`Error: ${err}`));
  });
});

router.route('/:id/expenses/:expense_id').delete((req, res) => {
  Budget.findById(req.params.id)
    .then(budget => {
      const expense = budget.expenses.id(req.params.expense_id);

      budget.expenses.pull(expense);

      budget
        .save()
        .then(() => res.json('Expense deleted.'))
        .catch(err => res.status(400).json(`Error: ${err}`));
    })
    .catch(err => res.status(400).json(`Error: ${err}`));
});

router.route('/:id/expenses/update/:expense_id').post((req, res) => {
  Budget.findById(req.params.id)
    .then(budget => {
      const expense = budget.expenses.id(req.params.expense_id);
      if (req.body.name) expense.name = req.body.name;
      if (req.body.amount) expense.amount = req.body.amount;
      if (req.body.isDone !== undefined) expense.isDone = req.body.isDone;
      if (req.body.date) expense.date = req.body.date;
      budget
        .save()
        .then(() => res.json('Expense updated!'))
        .catch(err => res.status(400).json(`Error: ${err}`));
    })
    .catch(err => res.status(400).json(`Error: ${err}`));
});

module.exports = router;
