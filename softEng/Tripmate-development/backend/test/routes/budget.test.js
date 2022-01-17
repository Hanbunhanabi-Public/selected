process.env.NODE_ENV = 'test';
const {expect} = require('chai');
const {describe, it, beforeEach, afterEach} = require('mocha');
const mongoose = require('mongoose');

const chai = require('chai');
const chaiHttp = require('chai-http');
const {testURI} = require('../testURI');
const server = require('../../server');

// eslint-disable-next-line no-unused-vars
const should = chai.should();

const {Budget} = require('../../models/budget.model');
const {Expenses} = require('../../models/budget.model');

chai.use(chaiHttp);

describe('budget routes', () => {
  beforeEach(async done => {
    mongoose.connect(testURI, {
      useNewUrlParser: true,
      useCreateIndex: true,
    });
    Budget.remove({});
    done();
  });

  afterEach(async () => {
    await Budget.deleteMany({});
    await Expenses.deleteMany({});
    await mongoose.disconnect();
  });

  it('/ should get all budgets', done => {
    chai
      .request(server)
      .get('/budget/trip/5e6aeefdb3256d55d6091d82')
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });

  it('/ add should add a new budget', done => {
    chai
      .request(server)
      .post('/budget/add/5e6aeefdb3256d55d6091d82')
      .send({budget: 123})
      .end((err, res) => {
        res.should.have.status(201);
        res.body.should.be.eql({data: 'Budget added.'});
        done();
      });
  });

  it('it should GET a budget by the given id', done => {
    const budget = new Budget({
      budget: 123,
    });
    budget.save((err, budg) => {
      chai
        .request(server)
        // eslint-disable-next-line no-underscore-dangle
        .get(`/budget/${budg._id}`)
        .end((error, res) => {
          res.should.have.status(200);
          res.body.should.have.property('budget');
          done();
        });
    });
  });

  it('it should DELETE a budget by the given id', done => {
    const budget = new Budget({
      budget: 123,
    });
    budget.save((err, budg) => {
      chai
        .request(server)
        // eslint-disable-next-line no-underscore-dangle
        .delete(`/budget/${budg._id}`)
        .end((error, res) => {
          res.should.have.status(200);
          res.body.should.be.eql({data: 'Budget deleted.'});
          done();
        });
    });
  });

  it('it should UPDATE an existing budget', done => {
    const budget = new Budget({
      budget: 123,
      expenses: [],
    });
    budget.save((err, budg) => {
      chai
        .request(server)
        // eslint-disable-next-line no-underscore-dangle
        .post(`/budget/${budg._id}/update`)
        .send({budget: 789})
        .end((error, res) => {
          res.should.have.status(200);
          res.body.should.be.eql('Budget updated!');
          done();
        });
    });
  });
});

describe('budget expense routes', () => {
  beforeEach(async done => {
    mongoose.connect(testURI, {
      useNewUrlParser: true,
      useCreateIndex: true,
    });
    Budget.remove({});
    Expenses.remove({});
    done();
  });

  afterEach(async () => {
    await Budget.deleteMany({});
    await Expenses.deleteMany({});
    await mongoose.disconnect();
  });

  it('it should get all expenses', done => {
    const expense = new Expenses({
      name: 'Test expense',
      amount: 123,
      isDone: false,
    });
    const budget = new Budget({
      budget: 123,
      expenses: [expense],
    });
    budget.save((err, budg) => {
      chai
        .request(server)
        // eslint-disable-next-line no-underscore-dangle
        .get(`/budget/${budg._id}/expenses`)
        .end((error, res) => {
          res.should.have.status(200);
          res.body.length.should.be.eql(1);
          done();
        });
    });
  });

  it('it should get an expense given an expense id', done => {
    const expense = new Expenses({
      name: 'Test expense',
      amount: 123,
      isDone: false,
    });
    const budget = new Budget({
      budget: 123,
      expenses: [expense],
    });
    budget.save((err, budg) => {
      chai
        .request(server)
        // eslint-disable-next-line no-underscore-dangle
        .get(`/budget/${budg._id}/expenses/${budg.expenses[0]._id}`)
        .end((error, res) => {
          res.should.have.status(200);
          res.body.should.have.property('name');
          res.body.should.have.property('amount');
          res.body.should.have.property('isDone');
          done();
        });
    });
  });

  it('it should get an expense summary', done => {
    const expense = new Expenses({
      name: 'Test expense',
      amount: 123,
      isDone: false,
    });
    const budget = new Budget({
      budget: 123,
      expenses: [expense],
    });
    budget.save((err, budg) => {
      chai
        .request(server)
        // eslint-disable-next-line no-underscore-dangle
        .get(`/budget/${budg._id}/expenses/summary`)
        .end((error, res) => {
          res.should.have.status(200);
          res.body.should.have.property('available');
          res.body.should.have.property('planned');
          res.body.should.have.property('used');
          res.body.should.have.property('pending');
          res.body.should.have.property('budget');
          done();
        });
    });
  });

  it('it should get an expenses list ordered by date followed by is done', done => {
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
    budget.save((err, budg) => {
      chai
        .request(server)
        // eslint-disable-next-line no-underscore-dangle
        .get(`/budget/${budg._id}/expenses/sorted`)
        .end((error, res) => {
          res.should.have.status(200);
          res.body.should.have.length(3);
          expect(res.body[0].isDone).equal(true);
          expect(res.body[2].createdAt.toString()).equal(
            '2020-01-02T00:00:00.000Z',
          );
          done();
        });
    });
  });

  it('it should CREATE an expense', done => {
    const budget = new Budget({
      budget: 123,
    });
    budget.save((err, budg) => {
      chai
        .request(server)
        // eslint-disable-next-line no-underscore-dangle
        .post(`/budget/${budg._id}/expenses/add`)
        .send({
          expenses: {
            name: 'Test expense',
            amount: 123,
            isDone: false,
          },
        })
        .end((error, res) => {
          res.should.have.status(201);
          res.body.should.be.eql('New expense added to budget!');
          done();
        });
    });
  });

  it('it should DELETE a budget by the given id', done => {
    const expense = new Expenses({
      name: 'Test expense',
      amount: 123,
      isDone: false,
    });
    const budget = new Budget({
      budget: 123,
      expenses: [expense],
    });
    budget.save((err, budg) => {
      chai
        .request(server)
        // eslint-disable-next-line no-underscore-dangle
        .delete(`/budget/${budg._id}/expenses/${budg.expenses[0]._id}`)
        .end((error, res) => {
          res.should.have.status(200);
          res.body.should.be.eql('Expense deleted.');
          done();
        });
    });
  });

  it('it should UPDATE an existing expense', done => {
    const expense = new Expenses({
      name: 'Test expense',
      amount: 123,
      isDone: false,
    });
    const budget = new Budget({
      budget: 123,
      expenses: [expense],
    });
    budget.save((err, budg) => {
      chai
        .request(server)
        // eslint-disable-next-line no-underscore-dangle
        .post(`/budget/${budg._id}/expenses/update/${budg.expenses[0]._id}`)
        .send({
          name: 'New expense',
          amount: 789,
          isDone: true,
        })
        .end((error, res) => {
          res.should.have.status(200);
          res.body.should.be.eql('Expense updated!');
          done();
        });
    });
  });
});
