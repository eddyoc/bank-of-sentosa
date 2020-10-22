import * as actionTypes from 'actions/actionTypes';

const initialState = {
  data: [],
  status: true
};

const transactions = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_TRANSACTIONS:
      return {
        ...state,
        data: [...action.data],
        status: true
      };

    default:
      return state;
  }
};

export default transactions;
