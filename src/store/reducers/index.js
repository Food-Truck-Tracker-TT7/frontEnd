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
  EDIT_TRUCK,
  TRUCK_UPDATED,
  SET_MENU_ITEM_TO_EDIT,
  UPDATE,
  SET_FIND_TRUCK,
} from '../actions';

const userType = localStorage.getItem('userType');
const user = JSON.parse(localStorage.getItem('user'));

const initialState = {
  isLoading: false,
  isLoggedIn: user ? true : false,
  error: '',
  user: user ? user : {},
  userType: userType ? userType : '',
  trucks: [],
  currentTruck: {},
  trucksOwned: [],
  favoriteTrucks: [],
  truckToEdit: false,
  findTruck: false,
  menu: [],
  menuItemToEdit: false,
  update: false,
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case LOADING:
      return { ...state, isLoading: true };
    case ERROR:
      return { ...state, error: action.payload, isLoading: false };
    case LOGOUT_USER:
      return { ...initialState, isLoggedIn: false, user: {}, userType: '' };
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
        findTruck: false,
      };
    case SET_TRUCK:
      return {
        ...state,
        currentTruck: action.payload,
        isLoading: false,
        error: '',
        truckToEdit: false,
        menuItemToEdit: false,
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
        truckToEdit: false,
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
