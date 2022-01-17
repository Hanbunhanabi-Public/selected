import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {makeStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import {IconButton, Box} from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import SaveIcon from '@material-ui/icons/Save';
import AddIcon from '@material-ui/icons/Add';
import TextField from '@material-ui/core/TextField';
import {TodoItem} from './TodoItem';

const useStyles = makeStyles({
  root: {
    minWidth: 200,
    marginRight: 20,
    marginBottom: 20,
  },
});

export const TodoCard = props => {
  const classes = useStyles();

  const [isEditingListName, setIsEditingListName] = useState(false);
  const [todoListName, setTodoListName] = useState('');
  const [newTodoItem, setNewTodoItem] = useState('');

  const updateTodoListName = () => {
    props.updateTodoList(props.todolist._id, todoListName);
    setIsEditingListName(false);
  };

  return (
    <Card className={classes.root}>
      <CardContent>
        {isEditingListName ? (
          <div>
            <TextField
              margin="dense"
              id="listName"
              type="string"
              defaultValue={props.todolist.name}
              onChange={e => setTodoListName(e.target.value)}
            />
            <IconButton color="primary" onClick={() => updateTodoListName()}>
              <SaveIcon fontSize="small" />
            </IconButton>
            <IconButton
              color="primary"
              onClick={() => props.deleteTodoList(props.todolist._id)}>
              <DeleteIcon fontSize="small" />
            </IconButton>
          </div>
        ) : (
          <Typography variant="h6" component="h2" align="center" gutterBottom>
            {props.todolist.name}
            <IconButton
              color="primary"
              onClick={() => setIsEditingListName(true)}>
              <EditIcon fontSize="small" />
            </IconButton>
            <IconButton
              color="primary"
              onClick={() => props.deleteTodoList(props.todolist._id)}>
              <DeleteIcon fontSize="small" />
            </IconButton>
          </Typography>
        )}
        <Divider />
        {props.todolist.items.map(todoitem => (
          <TodoItem
            key={todoitem._id}
            todoListId={props.todolist._id}
            todoItem={todoitem}
            updateTodoItemStatus={props.updateTodoItemStatus}
            updateTodoItemName={props.updateTodoItemName}
            deleteTodoItem={props.deleteTodoItem}
          />
        ))}
        <Box display="flex" alignItems="flex-end">
          <TextField
            margin="dense"
            id="newTodoItem"
            type="string"
            label="Add a new item"
            onChange={e => setNewTodoItem(e.target.value)}
          />
          <IconButton
            color="primary"
            onClick={() => {
              props.createTodoItem(props.todolist._id, newTodoItem);
            }}>
            <AddIcon fontSize="small" />
          </IconButton>
        </Box>
      </CardContent>
    </Card>
  );
};

TodoCard.propTypes = {
  todolist: PropTypes.shape({
    _id: PropTypes.string,
    name: PropTypes.string.isRequired,
    items: PropTypes.array,
  }),
  updateTodoItemStatus: PropTypes.func.isRequired,
  updateTodoItemName: PropTypes.func.isRequired,
  createTodoItem: PropTypes.func.isRequired,
  deleteTodoItem: PropTypes.func.isRequired,
  deleteTodoList: PropTypes.func.isRequired,
  updateTodoList: PropTypes.func.isRequired,
};

export default TodoCard;
