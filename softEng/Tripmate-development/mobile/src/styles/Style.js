import {StyleSheet} from 'react-native';
import {Dimensions} from 'react-native';

export default StyleSheet.create({
  deleteModal: {
    backgroundColor: 'white',
    maxHeight: Dimensions.get('window').height / 3,
    marginVertical: Dimensions.get('window').height / 4,
  },
  extraSmallModal: {
    backgroundColor: 'white',
    maxHeight: Dimensions.get('window').height,
    marginVertical: Dimensions.get('window').height / 4,
  },
  smallModal: {
    backgroundColor: 'white',
    maxHeight: Dimensions.get('window').height,
    marginVertical: Dimensions.get('window').height / 5,
  },
  mediumModal: {
    backgroundColor: 'white',
    maxHeight: Dimensions.get('window').height,
    marginVertical: Dimensions.get('window').height / 6,
  },
  extraMediumModal: {
    backgroundColor: 'white',
    maxHeight: Dimensions.get('window').height,
    marginVertical: Dimensions.get('window').height / 8,
  },
  largeModal: {
    backgroundColor: 'white',
    maxHeight: Dimensions.get('window').height,
    marginVertical: Dimensions.get('window').height / 10,
  },
  extraLargeModal: {
    backgroundColor: 'white',
    maxHeight: Dimensions.get('window').height,
    marginVertical: Dimensions.get('window').height / 30,
  },
  modalView: {
    padding: 15,
  },
  modalHeader: {
    fontSize: 23,
    fontWeight: 'bold',
    paddingBottom: 10,
  },
  modalDescription: {
    color: 'grey',
  },
  modalButtonView: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: 10,
  },
  parallelInputs: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingRight: 30,
  },
  transportationTypePicker: {
    paddingLeft: 12,
  },
  picker: {
    width: 100,
  },
  pickerItem: {
    fontSize: 15,
    height: 75,
    color: 'black',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  deleteModalCancelButton: {
    color: 'blue',
  },
  buttonWithWhiteText: {
    color: 'white',
  },
  deleteButton: {
    color: 'red',
  },
  tripCardHeader: {
    fontSize: 22,
    paddingBottom: 3,
  },
  tripCardButton: {
    color: 'blue',
  },
  tripDetailBackToHomeButton: {
    padding: 10,
    flex: 0,
    alignSelf: 'flex-start',
  },
  tripDetailHeader: {
    padding: 10,
  },
  parallelPlaceHolderWithSpaceBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  displayAsPicker: {
    flex: 0,
    flexDirection: 'row',
    alignSelf: 'flex-end',
    paddingLeft: 240,
  },
  parallelPlaceHolder: {
    flexDirection: 'row',
  },
  tripDetailTitle: {
    fontSize: 22,
  },
  editTripButton: {
    color: 'grey',
    paddingLeft: 220,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 20,
    paddingTop: 10,
  },
  boldText: {
    fontWeight: 'bold',
  },
  categoryBanner: {
    backgroundColor: 'white',
    height: 40,
  },
  categoryIcon: {
    color: '#3f51b5',
  },
  categoryTitle: {
    fontWeight: 'bold',
    color: '#3f51b5',
    fontSize: 17,
  },
  listBanner: {
    height: 40,
    justifyContent: 'space-between',
    paddingRight: 18,
    backgroundColor: '#3f51b5',
  },
  listIcon: {
    color: 'white',
  },
  multipleAddButton: {
    color: '#3f51b5',
  },
  listButton: {
    paddingRight: 23,
  },
  listButtons: {
    flexDirection: 'row',
    marginRight: -15,
  },
  listItemHolder: {
    height: 45,
    justifyContent: 'space-between',
  },
  listItemListHolder: {
    paddingLeft: 18,
    paddingTop: 5,
  },
  listItemListItemHolder: {
    height: 45,
    justifyContent: 'space-between',
  },
  listTitle: {
    fontWeight: 'bold',
    color: 'white',
  },
  inputListBanner: {
    height: 40,
    marginLeft: -5,
    backgroundColor: '#3f51b5',
  },
  todoListBanner: {
    height: 40,
    marginRight: -23,
    backgroundColor: '#3f51b5',
  },
  todoItem: {
    height: 40,
    marginRight: -15,
  },
  addTodoItem: {
    height: 40,
    marginRight: -15,
  },
  addTodoItemButton: {
    paddingRight: 18,
  },
  separator: {
    height: 10,
  },
  pageHeader: {
    fontSize: 23,
    fontWeight: 'bold',
  },
  BodyText: {
    fontSize: 23,
  },
  homeHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
  },
  expensesDone: {
    textDecorationLine: 'line-through',
    textDecorationStyle: 'solid',
    textDecorationColor: '#000',
    height: 40,
  },
  expensesUnDone: {
    textDecorationLine: 'none',
    textDecorationStyle: 'solid',
    textDecorationColor: '#000',
    height: 40,
  },
  budgetSummaryHolder: {
    justifyContent: 'space-between',
    height: 60,
  },
  expenseHolder: {
    height: 45,
    justifyContent: 'space-between',
    paddingRight: 18,
  },
  expenseContentHolder: {
    height: 45,
    paddingLeft: 15,
    justifyContent: 'space-between',
  },
  MainContainer: {
    flexDirection: 'row',
  },
  DrawerImage: {
    width: 25,
    height: 25,
    marginLeft: 5,
  },
  placeholder: {
    marginHorizontal: 100,
    flex: 1,
    marginTop: 500,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  text_style: {
    textAlign: 'center',
    color: 'black',
    fontWeight: 'bold',
    fontSize: 40,
  },
  titleFontColor: {color: 'black'},
});
