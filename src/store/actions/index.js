import axios from 'axios';
import axiosWithAuth from '../../utils/axiosWithAuth';

//Constants
const BASE_URL = 'https://food-truck-trackr-api.herokuapp.com/api';

// Action Types
export const LOADING = 'LOADING';
export const ERROR = 'ERROR';
export const SET_TRUCKS = 'SET_TRUCKS';
export const SET_TRUCK = 'SET_TRUCK';
export const ADD_TRUCK = 'ADD_TRUCK';
export const SET_USER = 'SET_USER';
export const SET_USER_TYPE = 'SET_USER_TYPE';
export const SET_MENU = 'SET_MENU';
export const ADD_MENU_ITEM = 'ADD_MENU_ITEM';
export const LOGOUT_USER = 'LOGOUT_USER';
export const FETCH_TRUCKS_OWNED = 'FETCH_TRUCKS_OWNED';
export const EDIT_TRUCK = 'EDIT_TRUCK';
export const TRUCK_UPDATED = 'TRUCK_UPDATED';
export const SET_MENU_ITEM_TO_EDIT = 'SET_MENU_ITEM_TO_EDIT';

// Action creators

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
      .post(`${BASE_URL}/auth/register/operator`, operator)
      .then(res => {
        redirectTo('/login');
      })
      .catch(err => {
        dispatch({ type: ERROR, payload: err.message });
      });
  };
};

//Logs the user in, sets the JWT to local store and updates the user in state
export const loginUser = (loginInfo, redirectTo) => {
  return dispatch => {
    dispatch({ type: LOADING });
    axios
      .post(`${BASE_URL}/auth/login`, loginInfo)
      .then(res => {
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('userType', res.data.type);
        dispatch({ type: SET_USER_TYPE, payload: res.data.type });
        if (res.data.type === 'diner') {
          localStorage.setItem('user', JSON.stringify(res.data.diner));
          dispatch({ type: SET_USER, payload: res.data.diner });
        } else {
          localStorage.setItem('user', JSON.stringify(res.data.operator));
          dispatch({ type: SET_USER, payload: res.data.operator });
        }
        redirectTo('/map');
      })
      .catch(err => {
        console.log('Error:', err);
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
export const addTruck = (truckInfo, redirectTo) => {
  return dispatch => {
    dispatch({ type: LOADING });
    axiosWithAuth()
      .post('/trucks', truckInfo)
      .then(res => {
        dispatch({ type: ADD_TRUCK, payload: res.data });
        redirectTo('/dashboard');
      })
      .catch(err => {
        dispatch({ type: ERROR, payload: err.message });
      });
  };
};

//Updates a truck with a given turck ID
export const updateTruck = (truckId, truckInfo, redirectTo) => {
  return dispatch => {
    axiosWithAuth()
      .put(`/trucks/${truckId}`, truckInfo)
      .then(res => {
        dispatch({ type: TRUCK_UPDATED });
        redirectTo(`/truck/${truckId}`);
      })
      .catch(err => {
        dispatch({ type: ERROR, payload: err.message });
      });
  };
};

//Delete a truck with a given truck ID
export const deleteTruck = (truckId, redirectTo) => {
  return dispatch => {
    axiosWithAuth()
      .delete(`/trucks/${truckId}`)
      .then(res => {
        redirectTo('/map');
      })
      .catch(err => {
        dispatch({ type: ERROR, payload: err.message });
      });
  };
};

//Fetches the menu for a given truck ID
export const fetchMenu = truckId => {
  return dispatch => {
    dispatch({ type: LOADING });

    axiosWithAuth()
      .get(`/trucks/${truckId}/menu`)
      .then(res => {
        dispatch({ type: SET_MENU, payload: res.data });
      })
      .catch(err => {
        dispatch({ type: ERROR, payload: err.message });
      });
  };
};

//Adds a item to the truck's menu
export const addMenuItem = (truckId, menuItem, redirectTo) => {
  return dispatch => {
    axiosWithAuth()
      .post(`/trucks/${truckId}/menu`, menuItem)
      .then(res => {
        redirectTo(`/truck/${truckId}`);
      })
      .catch(err => {
        dispatch({ type: ERROR, payload: err.message });
      });
  };
};

//Updates an item with the given menu item id for the given truck id
export const updateMenuItem = (truckId, menuItemId, menuItem, redirectTo) => {
  return dispatch => {
    axiosWithAuth()
      .put(`/trucks/${truckId}/menu/${menuItemId}`, menuItem)
      .then(res => {
        redirectTo(`/truck/${truckId}`);
      })
      .catch(err => {
        dispatch({ type: ERROR, payload: err.message });
      });
  };
};

//Deletes an item with the given menu item id for the given truck id
export const deleteMenuItem = (truckId, menuItemId) => {
  return dispatch => {
    axiosWithAuth()
      .delete(`/trucks/${truckId}/menu/${menuItemId}`)
      .then(res => {})
      .catch(err => {
        dispatch({ type: ERROR, payload: err.message });
      });
  };
};

// Adds (or replaces) a customer rating from a customer with a given diner id to a truck with a given truck id
export const addCustomerRating = (truckId, dinerId, rating, redirectTo) => {
  return dispatch => {
    axiosWithAuth()
      .post(`/trucks/${truckId}/customerRatings/${dinerId}`, rating)
      .then(res => {
        redirectTo(`/trucks/${truckId}`);
      })
      .catch(err => {
        dispatch({ type: ERROR, payload: err.message });
      });
  };
};

// Adds a photo for a given menu item id for a given truck id
export const addItemPhoto = (truckId, menuItemId, photoURL, redirectTo) => {
  return dispatch => {
    axiosWithAuth()
      .post(`/trucks/${truckId}/menu/${menuItemId}/itemPhotos`, photoURL)
      .then(res => {
        redirectTo(`/trucks/${truckId}`);
      })
      .catch(err => {
        dispatch({ type: ERROR, payload: err.message });
      });
  };
};

// Deletes a photo for a given menu item id for a given truck id
export const deleteItemPhoto = (truckId, menuItemId, redirectTo) => {
  return dispatch => {
    axiosWithAuth()
      .delete(`/trucks/${truckId}/menu/${menuItemId}/itemPhotos`)
      .then(res => {
        redirectTo(`/trucks/${truckId}`);
      })
      .catch(err => {
        dispatch({ type: ERROR, payload: err.message });
      });
  };
};

// Fetches the diner information for a diner with the given diner id
export const fetchDiner = dinerId => {
  return dispatch => {
    dispatch({ type: LOADING });
    axiosWithAuth()
      .get(`/diners/${dinerId}`)
      .then(res => {
        dispatch({ type: SET_USER, payload: res.data });
      })
      .catch(err => {
        dispatch({ type: ERROR, payload: err.message });
      });
  };
};

// Updates a diner information for a diner with the given diner id
export const updateDinerLocation = (dinerId, currentLocation) => {
  return dispatch => {
    axiosWithAuth()
      .put(`/diners/${dinerId}`, currentLocation)
      .then(res => {
        dispatch({ type: SET_USER, payload: res.data });
      })
      .catch(err => {
        dispatch({ type: ERROR, payload: err.message });
      });
  };
};

// Add a truck to a diner's list of favorite trucks
export const addFavoriteTruck = (dinerId, truck) => {
  return dispatch => {
    axiosWithAuth()
      .post(`/diners/${dinerId}/favoriteTrucks`, truck)
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        dispatch({ type: ERROR, payload: err.message });
      });
  };
};

// Removes a favorite truck with a given truck id from a diner with a given diner id
export const deleteFavoriteTruck = (dinerId, truckId, redirectTo) => {
  return dispatch => {
    axiosWithAuth()
      .delete(`/diners/${dinerId}/favoriteTrucks`, truckId)
      .then(res => {
        redirectTo(`trucks/${truckId}`);
      })
      .catch(err => {
        dispatch({ type: ERROR, payload: err.message });
      });
  };
};

//Fetch operator with a given operator id
export const fetchOperator = operatorId => {
  return dispatch => {
    dispatch({ type: LOADING });

    axiosWithAuth()
      .get(`/operators/${operatorId}`)
      .then(res => {
        dispatch({ type: SET_USER, payload: res.data });
      })
      .catch(err => {
        dispatch({ type: ERROR, payload: err.message });
      });
  };
};

//Fetch trucks owned for operator with a given operator id
export const fetchOperatorTruck = operatorId => {
  return dispatch => {
    axiosWithAuth()
      .get(`/operators/${operatorId}/trucksOwned`)
      .then(res => {
        dispatch({ type: FETCH_TRUCKS_OWNED, payload: res.data });
      })
      .catch(err => {
        dispatch({ type: ERROR, payload: err.message });
      });
  };
};

// Set the truck in state that we want to edit.
export const editTruck = (truck, redirectTo) => {
  return dispatch => {
    dispatch({ type: EDIT_TRUCK, payload: truck });
    redirectTo('/edittruck');
  };
};

// Set the menu item in state that we want to edit.
export const editMenuItem = menuItem => {
  return dispatch => {
    dispatch({ type: SET_MENU_ITEM_TO_EDIT, payload: menuItem });
  };
};

// logs the user out
export const logoutUser = () => {
  return dispatch => {
    dispatch({ type: LOGOUT_USER });
  };
};
