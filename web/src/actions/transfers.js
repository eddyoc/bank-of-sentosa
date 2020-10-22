import { getMyTransfers, createTransfer } from 'api';
import * as actionTypes from './actionTypes';

const transformRawData = data => {
  return data.map(x => ({
    ...x,
    createdAt: new Date(x.createdAt),
    updatedAt: new Date(x.updatedAt),
    date: new Date(x.date),
  }));
};

export const fetchTransfers = () => async dispatch => {
  try {
    // Set status to false on every start, so it can be reusable
    dispatch(fetchTransfersStatus(false));
    const data = await getMyTransfers();

    if (!data) {
      dispatch(fetchTransfersStatus(false));
      return;
    }

    const transfers = transformRawData(data);
    dispatch({ type: actionTypes.FETCH_TRANSFERS, data: transfers });
  } catch (err) {
    dispatch(fetchTransfersStatus(false));
  }
};

export const fetchTransfersStatus = status => ({
  type: actionTypes.FETCH_TRANSFERS_STATUS,
  status
});

export const addTransfer = data => async dispatch => {
  try {
    const amount = parseFloat(parseFloat(data.amount).toFixed(2));
    const date = new Date();
    const transData = { ...data, amount, date, status: 'done' };
    const transfer = await createTransfer(transData);

    if (!transfer) {
      dispatch(fetchTransfersStatus(false));
      return;
    }

    dispatch({
      type: actionTypes.ADD_TRANSFER,
      data: transData
    });
  } catch (err) {
    dispatch(fetchTransfersStatus(false));
  }
};
