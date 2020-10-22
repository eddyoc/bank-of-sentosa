import * as actionTypes from './actionTypes';
import { fetchProfile } from './profile';
import { fetchAccounts } from './accounts';
import { fetchTransfers } from './transfers';
import { fetchTransactions } from './transactions';

export const setAuthStatus = (status, email = null) => ({
  type: actionTypes.SET_AUTH_STATUS,
  status,
  email
});

export const fetchInitialData = () => async dispatch => {
  try {
    Promise.all([
      // async dispatch chaining
      dispatch(fetchProfile()),
      dispatch(fetchAccounts()),
      dispatch(fetchTransfers()),
      dispatch(fetchTransactions()),
    ])
      .then(response => {
        dispatch(initialDataStatus(true));
      }) // Promise.all cannot be resolved, as one of the promises passed got rejected.
      .catch(error => console.log(`Error in executing ${error}`));
  } catch (err) {
    dispatch(initialDataStatus(false));
  }
};

export const refreshData = history => async dispatch => {
  // async dispatch chaining
  Promise.all([
    dispatch(fetchAccounts()),
    dispatch(fetchTransfers()),
    dispatch(fetchTransactions()),
  ])
    .then(() => {
      history.push('/panel/accounts');
    }) // Promise.all cannot be resolved, as one of the promises passed got rejected.
    .catch(error => console.log(`Error in executing ${error}`));
};


export const initialDataStatus = status => ({
  type: actionTypes.FETCH_INITIAL_DATA_STATUS,
  status
});
