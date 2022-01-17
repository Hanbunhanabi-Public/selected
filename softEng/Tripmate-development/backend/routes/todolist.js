const router = require('express').Router();
const {ToDoList} = require('../models/todolist.model');
const {ToDoItem} = require('../models/todolist.model'); // only for creating a new todo item

// Get a whole lists of todo lists
router.route('/trip/:tripId').get((req, res) => {
  ToDoList.find({tripId: req.params.tripId})
    .then(todolists => res.json(todolists))
    .catch(err => res.status(400).json(`Error: ${err}`));
});

// Add a new todo list
router.route('/add/:tripId').post((req, res) => {
  const {name} = req.body;
  const {tripId} = req.params;

  const newToDoList = new ToDoList({name, tripId});

  newToDoList
    .save()
    .then(() => res.status(201).json('New ToDo List Added!'))
    .catch(err => res.status(400).json(`Error: ${err}`));
});

// Get a todo list by id
router.route('/:list_id').get((req, res) => {
  ToDoList.findById(req.params.list_id)
    .then(todolist => res.json(todolist))
    .catch(err => res.status(400).json(`Error: ${err}`));
});

// Delete a to do list by id
router.route('/:list_id').delete((req, res) => {
  ToDoList.findByIdAndDelete(req.params.list_id)
    .then(() => res.json('ToDo List Deleted.'))
    .catch(err => res.status(400).json(`Error: ${err}`));
});

// Update the name of a to do list by id
router.route('/update/:list_id').post((req, res) => {
  ToDoList.findById(req.params.list_id)
    .then(todolist => {
      todolist.name = req.body.name;

      todolist
        .save()
        .then(() => res.json('ToDo List Updated!'))
        .catch(err => res.status(400).json(`Error: ${err}`));
    })
    .catch(err => res.status(400).json(`Error: ${err}`));
});

// Get a whole lists of todo items of a todo list
router.route('/:list_id/todoitem').get((req, res) => {
  ToDoList.findById(req.params.list_id)
    .then(todolist => res.json(todolist.items))
    .catch(err => res.status(400).json(`Error: ${err}`));
});

// Add a new todo item to a todo list
router.route('/:list_id/todoitem/add').post((req, res) => {
  const {content} = req.body;

  const newToDoItem = new ToDoItem({content});

  ToDoList.findById(req.params.list_id)
    .then(todolist => {
      todolist.items.push(newToDoItem);

      todolist
        .save()
        .then(() => res.status(201).json('New ToDo Item Added!'))
        .catch(err => res.status(400).json(`Error: ${err}`));
    })
    .catch(err => res.status(400).json(`Error: ${err}`));
});

// Get a todo item by id from a todo list
router.route('/:list_id/todoitem/:item_id').get((req, res) => {
  ToDoList.findById(req.params.list_id)
    .then(todolist => {
      const todoitem = todolist.items.id(req.params.item_id);
      res.json(todoitem);
    })
    .catch(err => res.status(400).json(`Error: ${err}`));
});

// Delete a to do item by id from a todo list
router.route('/:list_id/todoitem/:item_id').delete((req, res) => {
  ToDoList.findById(req.params.list_id)
    .then(todolist => {
      const todoitem = todolist.items.id(req.params.item_id);

      todolist.items.pull(todoitem);

      todolist
        .save()
        .then(() => res.json('ToDo Item Deleted.'))
        .catch(err => res.status(400).json(`Error: ${err}`));
    })
    .catch(err => res.status(400).json(`Error: ${err}`));
});

// Update the content of a to do item by id from a todo list
router.route('/:list_id/todoitem/update/:item_id').post((req, res) => {
  ToDoList.findById(req.params.list_id)
    .then(todolist => {
      const todoitem = todolist.items.id(req.params.item_id);
      todoitem.content = req.body.content;
      todoitem.done = req.body.done;

      todolist
        .save()
        .then(() => res.json('ToDo Item Updated!'))
        .catch(err => res.status(400).json(`Error: ${err}`));
    })
    .catch(err => res.status(400).json(`Error: ${err}`));
});

module.exports = router;
