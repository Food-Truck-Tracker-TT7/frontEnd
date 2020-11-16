import axios from 'axios';
import axiosWithAuth from '../../utils/axiosWithAuth';

//Constants
const BASE_URL = 'https://food-truck-trackr-api.herokuapp.com/api';

// Action Types
export const LOADING = 'LOADING';
export const ERROR = 'ERROR';
export const ADD_DINER = 'ADD_DINER';
export const SET_TRUCKS = 'SET_TRUCKS';
export const SET_TRUCK = 'SET_TRUCK';
export const SET_USER = 'SET_USER';
export const ADD_TRUCK = 'ADD_TRUCK';

// Action creators

//Sets the loading state
export const loading = () => {
  return dispatch => {
    dispatch({ type: LOADING });
  };
};

//Sets any network error messages
export const error = errorMessage => {
  return dispatch => {
    dispatch({ type: ERROR, payload: errorMessage });
  };
};

//Adds a new diner to the backend
export const addDiner = (diner, redirectTo) => {
  return dispatch => {
    axios
      .post(`${BASE_URL}/auth/register/diner`, diner)
      .then(res => {
        redirectTo('/login');
      })
      .catch(err => {
        dispatch({ type: ERROR, payload: err.message });
      });
  };
};

//Adds an operator to the backend
export const addOperator = (operator, redirectTo) => {
  return dispatch => {
    axios
      .post(`${BASE_URL}/auth/register/operator`)
      .then(res => {
        redirectTo('/login');
      })
      .catch(err => {
        dispatch({ type: ERROR, payload: err.message });
      });
  };
};

//Logs the user in, sets the JWT to local store and updates the user in state
export const login = loginInfo => {
  return dispatch => {
    dispatch({ type: LOADING });
    axios
      .get(`${BASE_URL}/auth/login`, loginInfo)
      .then(res => {
        localStorage.setItem('token', res.data.token);
        res.data.type === 'diner'
          ? dispatch({ type: SET_USER, payload: res.data.diner })
          : dispatch({ type: SET_USER, payload: res.data.operator });
      })
      .catch(err => {
        dispatch({ type: ERROR, payload: err.message });
      });
  };
};

//Fetches array of trucks
export const fetchTrucks = () => {
  return dispatch => {
    dispatch({ type: LOADING });
    axiosWithAuth()
      .get('/trucks')
      .then(res => {
        dispatch({ type: SET_TRUCKS, payload: res.data });
      })
      .catch(err => {
        dispatch({ type: ERROR, payload: err.message });
      });
  };
};

//Fetches a single truck's information based on truck ID
export const fetchTruck = truckId => {
  return dispatch => {
    dispatch({ type: LOADING });
    axiosWithAuth()
      .get(`/trucks/${truckId}`)
      .then(res => {
        dispatch({ type: SET_TRUCK, payload: res.data });
      })
      .catch(err => {
        dispatch({ type: ERROR, payload: err.message });
      });
  };
};

//Adds a new truck
export const addTruck = truckInfo => {
  return dispatch => {
    dispatch({ type: LOADING });

    axiosWithAuth()
      .post('/trucks', truckInfo)
      .then(res => {
        dispatch({ type: ADD_TRUCK, payload: res.data });
      })
      .catch(err => {
        dispatch({ type: ERROR, payload: err.message });
      });
  };
};

//Updates a truck with a given turck ID
export const updateTruck = (truckId, truckInfo) => {
  return dispatch => {
    dispatch({ type: LOADING });

    axiosWithAuth()
      .put(`/truck/${truckId}`, truckInfo)
      .then(res => {
        console.log(res); // not sure what this returns yet
      })
      .catch(err => {
        dispatch({ type: ERROR, payload: err.message });
      });
  };
};

export const deleteTruck = truckId => {
  return dispatch => {
    dispatch({ type: LOADING });

    axiosWithAuth()
      .delete(`/trucks/${truckId}`)
      .then(res => {
        console.log(res); // not sure what this return yet
      })
      .catch(err => {
        dispatch({ type: ERROR, payload: err.message });
      });
  };
};
