process.env.NODE_ENV = 'test';

const {describe, it, before, after} = require('mocha');
const mongoose = require('mongoose');

const chai = require('chai');
const chaiHttp = require('chai-http');
const {testURI} = require('../testURI');
const server = require('../../server');

// eslint-disable-next-line no-unused-vars
const should = chai.should();

const {ToDoList} = require('../../models/todolist.model');
const {ToDoItem} = require('../../models/todolist.model');

chai.use(chaiHttp);

describe('todolist routes', () => {
  before(async done => {
    mongoose.connect(testURI, {
      useNewUrlParser: true,
      useCreateIndex: true,
    });
    ToDoList.remove({});
    done();
  });

  after(async () => {
    await ToDoList.deleteMany({});
    await ToDoItem.deleteMany({});
    await mongoose.disconnect();
  });

  it('/ should get all todolists', done => {
    chai
      .request(server)
      .get('/todolist/trip/5e6aeefdb3256d55d6091d82')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.length.should.be.eql(0);
        done();
      });
  });

  it('/ add should add a new todolist', done => {
    chai
      .request(server)
      .post('/todolist/add/5e6aeefdb3256d55d6091d82')
      .send({name: 'Test List'})
      .end((err, res) => {
        res.should.have.status(201);
        res.body.should.be.eql('New ToDo List Added!');
        done();
      });
  });

  it('it should GET a todolist by the given id', done => {
    const todolist = new ToDoList({
      name: 'Test List',
    });
    todolist.save((err, list) => {
      chai
        .request(server)
        .get(`/todolist/${list._id}`)
        .end((error, res) => {
          res.should.have.status(200);
          res.body.should.have.property('name');
          done();
        });
    });
  });

  it('it should DELETE a todolist by the given id', done => {
    const todolist = new ToDoList({
      name: 'Test List',
    });
    todolist.save((err, list) => {
      chai
        .request(server)
        .delete(`/todolist/${list._id}`)
        .end((error, res) => {
          res.should.have.status(200);
          res.body.should.be.eql('ToDo List Deleted.');
          done();
        });
    });
  });

  it('it should UPDATE a todolist by the given id', done => {
    const todolist = new ToDoList({
      name: 'Test List',
    });
    todolist.save((err, list) => {
      chai
        .request(server)
        .post(`/todolist/update/${list._id}`)
        .send({name: 'Test List Update'})
        .end((error, res) => {
          res.should.have.status(200);
          res.body.should.be.eql('ToDo List Updated!');
          done();
        });
    });
  });
});

describe('todoitem routes', () => {
  before(async done => {
    mongoose.connect(testURI, {
      useNewUrlParser: true,
      useCreateIndex: true,
    });
    ToDoList.remove({});
    ToDoItem.remove({});
    done();
  });

  after(async () => {
    await ToDoList.deleteMany({});
    await ToDoItem.deleteMany({});
    await mongoose.disconnect();
  });

  it('it should get all todoitems', done => {
    const todoitem = new ToDoItem({
      content: 'Test Item',
      done: false,
    });
    const todolist = new ToDoList({
      name: 'Test List',
      items: [todoitem],
    });
    todolist.save((err, list) => {
      chai
        .request(server)
        .get(`/todolist/${list._id}/todoitem`)
        .end((error, res) => {
          res.should.have.status(200);
          res.body.length.should.be.eql(1);
          done();
        });
    });
  });

  it('it should get a todoitem given a todoitem id', done => {
    const todoitem = new ToDoItem({
      content: 'Test Item',
      done: false,
    });
    const todolist = new ToDoList({
      name: 'Test List',
      items: [todoitem],
    });
    todolist.save((err, list) => {
      chai
        .request(server)
        .get(`/todolist/${list._id}/todoitem/${list.items[0]._id}`)
        .end((error, res) => {
          res.should.have.status(200);
          res.body.should.have.property('content');
          res.body.should.have.property('done');
          done();
        });
    });
  });

  it('it should CREATE a todoitem', done => {
    const todolist = new ToDoList({
      name: 'Test List',
    });
    todolist.save((err, list) => {
      chai
        .request(server)
        .post(`/todolist/${list._id}/todoitem/add`)
        .send({content: 'Test Item'})
        .end((error, res) => {
          res.should.have.status(201);
          res.body.should.be.eql('New ToDo Item Added!');
          done();
        });
    });
  });

  it('it should DELETE a todoitem by the given id', done => {
    const todoitem = new ToDoItem({
      content: 'Test Item',
      done: false,
    });
    const todolist = new ToDoList({
      name: 'Test List',
      items: [todoitem],
    });
    todolist.save((err, list) => {
      chai
        .request(server)
        .delete(`/todolist/${list._id}/todoitem/${list.items[0]._id}`)
        .end((error, res) => {
          res.should.have.status(200);
          res.body.should.be.eql('ToDo Item Deleted.');
          done();
        });
    });
  });

  it('it should UPDATE an existing todoitem', done => {
    const todoitem = new ToDoItem({
      content: 'Test Item',
      done: false,
    });
    const todolist = new ToDoList({
      name: 'Test List',
      items: [todoitem],
    });
    todolist.save((err, list) => {
      chai
        .request(server)
        .post(`/todolist/${list._id}/todoitem/update/${list.items[0]._id}`)
        .send({content: 'Test Item', done: true})
        .end((error, res) => {
          res.should.have.status(200);
          res.body.should.be.eql('ToDo Item Updated!');
          done();
        });
    });
  });
});
