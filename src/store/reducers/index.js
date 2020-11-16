import { LOADING } from '../actions';

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
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case LOADING:
      return { ...state, isLoading: true };
    default:
      return state;
  }
};
