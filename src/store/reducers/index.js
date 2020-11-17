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
} from '../actions';

const initialState = {
  isLoading: false,
  error: '',
  user: {
    dinerId: 0,
    username: 'Test User',
    password: 'TestPassword',
    email: 'test@test.com',
    currentLocation: '37.46735,-82.75587',
    favoriteTrucks: [],
  },
  userType: '',
  trucks: [
    {
      id: 0,
      name: 'Test Truck 1',
      cuisineType: 'Mexican',
      currentLocation: '37.472304,-82.753422',
      customerRatingsAvg: 4.5,
    },
    {
      id: 2,
      name: 'Test Truck 2',
      cuisineType: 'Italian',
      currentLocation: '37.458270,-82.749088',
      customerRatingsAvg: 4.2,
    },
  ],
  currentTruck: {},
  menu: [],
  isLoggedIn: false,
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case LOADING:
      return { ...state, isLoading: true };
    case ERROR:
      return { ...state, error: action.payload, isLoading: false };
    case SET_USER:
      return {
        ...state,
        user: action.payload,
        isLoading: false,
        isLoggedIn: true,
        error: '',
      };
    case LOGOUT_USER:
      return {
        ...state,
        user: {},
        isLoggedIn: false,
      };
    case SET_TRUCKS:
      return { ...state, trucks: action.payload, isLoading: false, error: '' };
    case ADD_TRUCK:
      return {
        ...state,
        trucks: [...state.trucks, action.payload],
        isLoading: false,
        error: '',
      };
    case SET_TRUCK:
      return {
        ...state,
        currentTruck: action.payload,
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
    default:
      return state;
  }
};
