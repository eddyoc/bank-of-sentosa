import { getMyself } from 'api';
import * as actionTypes from './actionTypes';
import { removeAuthToken } from "../tools";
import { setAuthStatus } from "./auth";

export const fetchProfile = () => async dispatch => {
  try {
    const data = await getMyself();
    if (!data) {
      dispatch(fetchProfileStatus(false));
      return;
    }

    dispatch({ type: actionTypes.FETCH_PROFILE, data });
  } catch (err) {
    if (err.status === 422) {
      removeAuthToken();
      dispatch(setAuthStatus(false));
    }
    throw new Error('Accounts fetch failed');
  }
};

// Status
export const fetchProfileStatus = status => ({
  type: actionTypes.FETCH_PROFILE_STATUS,
  status
});
