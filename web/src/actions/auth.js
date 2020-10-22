import { loginUser, updateAPIConfig } from 'api';
import * as actionTypes from './actionTypes';
import { setAuthToken } from 'tools';

export const setAuthStatus = (status, email = null) => ({
  type: actionTypes.SET_AUTH_STATUS,
  status,
  email
});

// Login
export const login = data => async dispatch => {
  try {
    const token = await loginUser(data);
    if (!token) {
      dispatch(setAuthStatus(false));
      return;
    }
    setAuthToken(token);
    updateAPIConfig({ authToken: token });
    dispatch(setAuthStatus(true));
  } catch (err) {
    dispatch(setAuthStatus(false));
    throw err;
  }
};