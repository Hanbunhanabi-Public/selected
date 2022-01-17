import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Checkbox,
  FormControlLabel,
  IconButton,
  TextField,
} from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import SaveIcon from '@material-ui/icons/Save';

export const TodoItem = props => {
  const [isEditingItemName, setIsEditingItemName] = useState(false);
  const [itemName, setItemName] = useState('');

  const updateTodoItemName = () => {
    props.updateTodoItemName(
      props.todoListId,
      props.todoItem._id,
      itemName,
      props.todoItem.done,
    );
    setIsEditingItemName(false);
  };

  return (
    <div>
      {isEditingItemName ? (
        <Box display="flex" justifyContent="space-between">
          <TextField
            margin="dense"
            id="todoName"
            type="string"
            defaultValue={props.todoItem.content}
            onChange={e => setItemName(e.target.value)}
          />
          <div>
            <IconButton onClick={() => updateTodoItemName()}>
              <SaveIcon fontSize="small" />
            </IconButton>
            <IconButton
              onClick={() =>
                props.deleteTodoItem(props.todoListId, props.todoItem._id)
              }>
              <DeleteIcon fontSize="small" />
            </IconButton>
          </div>
        </Box>
      ) : (
        <Box display="flex" justifyContent="space-between">
          <FormControlLabel
            control={
              <Checkbox
                checked={props.todoItem.done}
                value={props.todoItem._id}
                onChange={props.updateTodoItemStatus(
                  props.todoListId,
                  props.todoItem._id,
                  props.todoItem.content,
                )}
                color="primary"
              />
            }
            label={props.todoItem.content}
          />
          <div>
            <IconButton onClick={() => setIsEditingItemName(true)}>
              <EditIcon fontSize="small" />
            </IconButton>
            <IconButton
              onClick={() =>
                props.deleteTodoItem(props.todoListId, props.todoItem._id)
              }>
              <DeleteIcon fontSize="small" />
            </IconButton>
          </div>
        </Box>
      )}
    </div>
  );
};

TodoItem.propTypes = {
  todoListId: PropTypes.string.isRequired,
  todoItem: PropTypes.shape({
    _id: PropTypes.string,
    content: PropTypes.string,
    done: PropTypes.bool,
  }),
  updateTodoItemStatus: PropTypes.func.isRequired,
  updateTodoItemName: PropTypes.func.isRequired,
  deleteTodoItem: PropTypes.func.isRequired,
};

export default TodoItem;
