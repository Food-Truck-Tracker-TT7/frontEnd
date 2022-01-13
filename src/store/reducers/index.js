import {
  LOADING,
  ERROR,
  SET_TRUCKS,
  SET_TRUCK,
  ADD_TRUCK,
  SET_USER,
  SET_MENU,
  ADD_MENU_ITEM,
  LOGOUT_USER,
  SET_USER_TYPE,
  FETCH_TRUCKS_OWNED,
  SET_FAVORITE_TRUCKS,
  CLEAR_FILTERED_TRUCKS,
  EDIT_TRUCK,
  TRUCK_UPDATED,
  SET_MENU_ITEM_TO_EDIT,
  UPDATE,
  SET_FIND_TRUCK,
  SET_DARK_MODE,
  SET_FILTERED_TRUCKS_CUISINE,
  SET_FILTERED_TRUCKS_RATING,
} from '../actions';

const userType = localStorage.getItem('userType');
const user = JSON.parse(localStorage.getItem('user'));
const darkMode = localStorage.getItem('darkmode');

const initialState = {
  darkMode: darkMode ? true : false,
  isLoading: false,
  isLoggedIn: user ? true : false,
  error: '',
  user: user ? user : {},
  userType: userType ? userType : '',
  trucks: [],
  currentTruck: {},
  trucksOwned: [],
  favoriteTrucks: [],
  truckToEdit: null,
  findTruck: null,
  filteredTrucks: null,
  menu: [],
  menuItemToEdit: null,
  update: false,
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case LOADING:
      return { ...state, isLoading: true };
    case ERROR:
      return { ...state, error: action.payload, isLoading: false };
    case LOGOUT_USER:
      return {
        ...initialState,
        isLoggedIn: false,
        user: {},
        userType: '',
        darkMode: state.darkMode,
      };
    case SET_DARK_MODE:
      return {
        ...state,
        darkMode: !state.darkMode,
      };
    case SET_USER:
      return {
        ...state,
        user: action.payload,
        isLoading: false,
        isLoggedIn: true,
        error: '',
      };
    case SET_USER_TYPE:
      return { ...state, userType: action.payload };
    case SET_TRUCKS:
      return {
        ...state,
        trucks: action.payload,
        isLoading: false,
        error: '',
        findTruck: null,
      };
    case SET_TRUCK:
      return {
        ...state,
        currentTruck: action.payload,
        isLoading: false,
        error: '',
        truckToEdit: null,
        menuItemToEdit: null,
      };
    case ADD_TRUCK:
      return {
        ...state,
        trucks: [...state.trucks, action.payload],
        isLoading: false,
        error: '',
      };
    case FETCH_TRUCKS_OWNED:
      return {
        ...state,
        trucksOwned: action.payload,
        isLoading: false,
        error: '',
      };
    case SET_FAVORITE_TRUCKS:
      return {
        ...state,
        favoriteTrucks: action.payload,
        isLoading: false,
        error: '',
      };
    case TRUCK_UPDATED:
      return {
        ...state,
        truckToEdit: null,
      };
    case SET_FIND_TRUCK:
      return {
        ...state,
        findTruck: action.payload,
      };
    case EDIT_TRUCK:
      return {
        ...state,
        truckToEdit: action.payload,
        isLoading: false,
        error: '',
      };
    case SET_FILTERED_TRUCKS_CUISINE:
      return {
        ...state,
        filteredTrucks: state.trucks.filter(
          truck =>
            truck.cuisineType.toLowerCase() === action.payload.toLowerCase()
        ),
      };
    case SET_FILTERED_TRUCKS_RATING:
      return {
        ...state,
        filteredTrucks: state.trucks.filter(
          truck => truck.customerRatingsAvg >= action.payload
        ),
      };
    case CLEAR_FILTERED_TRUCKS:
      return {
        ...state,
        filteredTrucks: null,
      };
    case SET_MENU:
      return { ...state, menu: action.payload, isLoading: false, error: '' };
    case ADD_MENU_ITEM:
      return {
        ...state,
        menu: [state.menu, action.payload],
        isLoading: false,
        error: '',
      };
    case SET_MENU_ITEM_TO_EDIT:
      return {
        ...state,
        menuItemToEdit: action.payload,
      };
    case UPDATE:
      return {
        ...state,
        update: !state.update,
      };
    default:
      return state;
  }
};
