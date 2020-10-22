import * as actionTypes from "./actionTypes";
import { getMyTransactions } from 'api';
import { fetchTransfersStatus } from "./transfers";

const transformRawData = data => {
  return data.map(x => ({
    ...x,
    createdAt: new Date(x.createdAt),
    updatedAt: new Date(x.updatedAt),
    date: new Date(x.date),
  }));
};

export const fetchTransactions = () => async dispatch => {
  try {
    const data = await getMyTransactions();
    const transfers = transformRawData(data);
    dispatch({ type: actionTypes.FETCH_TRANSACTIONS, data: transfers });
  } catch (err) {
    dispatch(fetchTransfersStatus(false));
  }
};