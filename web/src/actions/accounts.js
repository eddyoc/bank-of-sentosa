import { getMyAccounts } from 'api';
import * as actionTypes from './actionTypes';

const transformRawData = data => {
  return data.map(x => ({
    ...x,
    createdAt: new Date(x.createdAt),
    updatedAt: new Date(x.updatedAt),
  }));
};

export const fetchAccounts = () => async dispatch => {
  try {
    const data = await getMyAccounts();

    if (!data) {
      dispatch(fetchAccountsStatus(false));
      return;
    }

    const accounts = transformRawData(data);
    dispatch({ type: actionTypes.FETCH_ACCOUNTS, data: accounts });
  } catch (err) {
    dispatch(fetchAccountsStatus(false));
  }
};

export const fetchAccountsStatus = status => ({
  type: actionTypes.FETCH_ACCOUNTS_STATUS,
  status
});
