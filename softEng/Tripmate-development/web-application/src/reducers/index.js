import {combineReducers} from 'redux';
import user from './user/getUser';
import getToDoList from './todo/getToDoList';
import createToDoList from './todo/createToDoList';
import deleteToDoList from './todo/deleteToDoList';
import updateToDoList from './todo/updateToDoList';
import createToDoItem from './todo/createToDoItem';
import deleteToDoItem from './todo/deleteToDoItem';
import updateToDoItem from './todo/updateToDoItem';
import getHotels from './hotel/getHotels';
import createHotel from './hotel/createHotel';
import deleteHotel from './hotel/deleteHotel';
import updateHotel from './hotel/updateHotel';
import getHotelsAPI from './hotel/getHotelsAPI';
import createBudget from './budget/createBudget';
import getFlight from './flight/getFlight';
import createFlight from './flight/createFlight';
import updateFlight from './flight/updateFlight';
import deleteFlight from './flight/deleteFlight';
import getTicket from './ticket/getTicket';
import createTicket from './ticket/createTicket';
import updateTicket from './ticket/updateTicket';
import deleteTicket from './ticket/deleteTicket';
import createEvent from './event/createEvent';
import updateEvent from './event/updateEvent';
import getEvent from './event/getEvent';
import deleteEvent from './event/deleteEvent';
import alert from './alert';
import auth from './auth';
import getBudgetList from './budget/getBudgetList';
import summary from './event/getExpenseSummary';
import updateExpenses from './expense/updateExpenses';
import deleteExpenses from './expense/deleteExpenses';
import updateBudget from './budget/updateBudget';
import addExpenses from './expense/addExpenses';
import getExpensesList from './event/getExpensesList';
import getExpenses from './expense/getExpenses';
import deleteBudget from './budget/deleteBudget';
import createTrip from './trip/createTrip';
import deleteTrip from './trip/deleteTrip';
import getTrips from './trip/getTrips';
import updateTrip from './trip/updateTrip';

export default combineReducers({
  user,
  alert,
  auth,
  todolist: combineReducers({
    getToDoList,
    createToDoList,
    deleteToDoList,
    updateToDoList,
    createToDoItem,
    deleteToDoItem,
    updateToDoItem,
  }),
  hotel: combineReducers({
    getHotels,
    createHotel,
    updateHotel,
    deleteHotel,
    getHotelsAPI,
  }),
  flight: combineReducers({
    getFlight,
    createFlight,
    updateFlight,
    deleteFlight,
  }),
  ticket: combineReducers({
    getTicket,
    createTicket,
    updateTicket,
    deleteTicket,
  }),
  event: combineReducers({getEvent, createEvent, updateEvent, deleteEvent}),
  budget: combineReducers({
    createBudget,
    getBudgetList,
    deleteBudget,
    getExpensesList,
    deleteExpenses,
    updateBudget,
    summary,
    getExpenses,
    updateExpenses,
    addExpenses,
  }),
  trip: combineReducers({
    getTrips,
    createTrip,
    deleteTrip,
    updateTrip,
  }),
});
