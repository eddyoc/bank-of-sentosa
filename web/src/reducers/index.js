import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import auth from './auth';
import accounts from './accounts';
import panel from './panel';
import profile from './profile';
import transfers from './transfers';
import transactions from './transactions';

export default history =>
  combineReducers({
    router: connectRouter(history),
    auth,
    accounts,
    panel,
    profile,
    transfers,
    transactions,
  });
