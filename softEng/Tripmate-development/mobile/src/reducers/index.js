import {combineReducers} from 'redux';
import addBudget from './Budget/addBudget';
import addExpenses from './Budget/addExpenses';
import deleteBudget from './Budget/deleteBudget';
import deleteExpenses from './Budget/deleteExpenses';
import getBudgetList from './Budget/getBudgetList';
import getExpenses from './Budget/getExpenses';
import getExpensesList from './Budget/getExpensesList';
import summary from './Budget/getExpenseSummary';
import updateBudget from './Budget/updateBudget';
import updateExpenses from './Budget/updateExpenses';
import createToDoItem from './Todo/createToDoItem';
import createToDoList from './Todo/createToDoList';
import deleteToDoItem from './Todo/deleteToDoItem';
import deleteToDoList from './Todo/deleteToDoList';
import getToDoList from './Todo/getToDoList';
import updateToDoItem from './Todo/updateToDoItem';
import updateToDoList from './Todo/updateToDoList';
import createTicket from './Ticket/createTicket';
import deleteTicket from './Ticket/deleteTicket';
import getTicket from './Ticket/getTicket';
import updateTicket from './Ticket/updateTicket';
import createFlight from './Flight/createFlight';
import deleteFlight from './Flight/deleteFlight';
import getFlight from './Flight/getFlight';
import updateFlight from './Flight/updateFlight';
import createEvent from './Event/createEvent';
import deleteEvent from './Event/deleteEvent';
import getEvent from './Event/getEvent';
import updateEvent from './Event/updateEvent';
import createHotel from './Hotel/createHotel';
import deleteHotel from './Hotel/deleteHotel';
import getHotels from './Hotel/getHotels';
import updateHotel from './Hotel/updateHotel';
import createTrip from './Trip/createTrip';
import deleteTrip from './Trip/deleteTrip';
import getTrips from './Trip/getTrips';
import updateTrip from './Trip/updateTrip';
import createUser from './createUser';
import loginUser from './loginUser';
import getUser from './getUser';

export default combineReducers({
  user: combineReducers({
    createUser,
    loginUser,
    getUser,
  }),

  budget: combineReducers({
    getBudgetList,
    addBudget,
    deleteBudget,
    getExpensesList,
    deleteExpenses,
    updateBudget,
    summary,
    getExpenses,
    updateExpenses,
    addExpenses,
  }),

  todolist: combineReducers({
    getToDoList,
    createToDoList,
    deleteToDoList,
    updateToDoList,
  }),

  todoitem: combineReducers({
    createToDoItem,
    deleteToDoItem,
    updateToDoItem,
  }),

  ticket: combineReducers({
    getTicket,
    createTicket,
    updateTicket,
    deleteTicket,
  }),

  flight: combineReducers({
    getFlight,
    createFlight,
    updateFlight,
    deleteFlight,
  }),

  event: combineReducers({
    getEvent,
    createEvent,
    updateEvent,
    deleteEvent,
  }),

  hotel: combineReducers({
    getHotels,
    createHotel,
    updateHotel,
    deleteHotel,
  }),

  trip: combineReducers({
    getTrips,
    createTrip,
    updateTrip,
    deleteTrip,
  }),
});
