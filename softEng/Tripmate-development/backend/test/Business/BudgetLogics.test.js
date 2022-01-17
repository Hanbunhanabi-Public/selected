const {describe, it} = require('mocha');
const {expect} = require('chai');
const {Budget, Expenses} = require('../../models/budget.model');

const {
  getBudgetSummary,
  compareByDate,
  getExpensesListBYDateOrder,
} = require('../../Business/BugdetLogics');

describe('Budget logics ', () => {
  it('should be 0 if budget is empty', () => {
    const budget = new Budget();
    getBudgetSummary(budget).then(result => {
      expect(result.available).equal(0);
      expect(result.planned).equal(0);
      expect(result.used).equal(0);
      expect(result.pending).equal(0);
      expect(result.budget).equal(0);
    });
  });

  it('should be pass if budget is not empty', () => {
    const expense = new Expenses({
      name: 'Test expense',
      amount: 123,
      isDone: false,
      createdAt: '2020-01-01',
    });
    const budget = new Budget({
      budget: 123,
      expenses: [expense],
    });
    getBudgetSummary(budget).then(result => {
      expect(result.available).equal(123);
      expect(result.planned).equal(123);
      expect(result.used).equal(0);
      expect(result.pending).equal(123);
      expect(result.budget).equal(123);
    });
  });

  it('should be pass three expenses order are correct', () => {
    const expense1 = new Expenses({
      name: 'Test expense',
      amount: 123,
      isDone: false,
      createdAt: '2020-01-01',
    });
    const expense2 = new Expenses({
      name: 'Test expense',
      amount: 123,
      isDone: true,
      createdAt: '2020-01-01',
    });
    const expense3 = new Expenses({
      name: 'Test expense',
      amount: 123,
      isDone: false,
      createdAt: '2020-01-02',
    });
    const budget = new Budget({
      budget: 123,
      expenses: [expense1, expense2, expense3],
    });
    getExpensesListBYDateOrder(budget.expenses).then(result => {
      expect(result[0].isDone).equal(true);
      expect(result[1].isDone).equal(false);
      expect(result[2].date.toUTCString()).equal(
        new Date(expense3.date).toUTCString(),
      );
    });
  });

  it('should be pass expenses date earlier, followed by later are correct', () => {
    const expense1 = new Expenses({
      name: 'Test expense',
      amount: 123,
      isDone: false,
      createdAt: '2020-01-01',
    });
    const expense2 = new Expenses({
      name: 'Test expense',
      amount: 123,
      isDone: false,
      createdAt: '2020-01-03',
    });
    const result = compareByDate(expense1, expense2);
    expect(result).equal(-1);
  });

  it('should be pass expenses if expenses date, late followed by early order are correct', () => {
    const expense1 = new Expenses({
      name: 'Test expense',
      amount: 123,
      isDone: false,
      createdAt: '2020-01-03',
    });
    const expense2 = new Expenses({
      name: 'Test expense',
      amount: 123,
      isDone: false,
      createdAt: '2020-01-01',
    });
    const result = compareByDate(expense1, expense2);
    expect(result).equal(1);
  });

  it('should be pass expenses if expenses have same date, isDone false followed by true order are correct', () => {
    const expense1 = new Expenses({
      name: 'Test expense',
      amount: 123,
      isDone: false,
      createdAt: '2020-01-01',
    });
    const expense2 = new Expenses({
      name: 'Test expense',
      amount: 123,
      isDone: true,
      createdAt: '2020-01-01',
    });
    const result = compareByDate(expense1, expense2);
    expect(result).equal(1);
  });

  it('should be pass expenses if expenses have same date, is Done true followed by false are correct', () => {
    const expense1 = new Expenses({
      name: 'Test expense',
      amount: 123,
      isDone: true,
      createdAt: '2020-01-01',
    });
    const expense2 = new Expenses({
      name: 'Test expense',
      amount: 123,
      isDone: false,
      createdAt: '2020-01-01',
    });
    const result = compareByDate(expense1, expense2);
    expect(result).equal(-1);
  });

  it('should be pass expenses if expenses have same date, same isDone are correct', () => {
    const expense1 = new Expenses({
      name: 'Test expense',
      amount: 123,
      isDone: true,
      createdAt: '2020-01-01',
    });
    const expense2 = new Expenses({
      name: 'Test expense',
      amount: 123,
      isDone: true,
      createdAt: '2020-01-01',
    });
    const result = compareByDate(expense1, expense2);
    expect(result).equal(0);
  });
});
