export const LOADING = 'LOADING';
export const ERROR = 'ERROR';
export const FETCH_TRUCKS = 'FETCH_TRUCKS';
export const FETCH_USER = 'FETCH_USER';

export const loading = () => {
  return dispatch => {
    dispatch({ type: LOADING });
  };
};

export const error = errorMessage => {
  return dispatch => {
    dispatch({ type: ERROR, payload: errorMessage });
  };
};
