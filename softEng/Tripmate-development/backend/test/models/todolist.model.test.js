const {expect} = require('chai');
const {describe, it} = require('mocha');
const {ToDoList} = require('../../models/todolist.model');
const {ToDoItem} = require('../../models/todolist.model');

describe('ToDoList Model', () => {
  it('should be invalid if list name is empty', done => {
    const todolist = new ToDoList();

    todolist.validate(err => {
      expect(err.errors.name).to.exist;
      done();
    });
  });

  it('should be valid if name is not empty', done => {
    const todolist = new ToDoList({name: 'Test List'});

    todolist.validate(err => {
      expect(err).to.be.null;
      done();
    });
  });
});

describe('ToDoItem Model', () => {
  it('should be invalid if item content is empty', done => {
    const todoitem = new ToDoItem();

    todoitem.validate(err => {
      expect(err.errors.content).to.exist;
      done();
    });
  });

  it('should be valid if content is not empty', done => {
    const todoitem = new ToDoItem({content: 'Test Item'});

    todoitem.validate(err => {
      expect(err).to.be.null;
      done();
    });
  });
});
