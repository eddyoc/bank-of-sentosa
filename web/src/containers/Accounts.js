import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { AccountsList, TransactionsList } from 'components/Accounts';

const Accounts = ({ match }) => (
  <div className="panel-content">
    <Switch>
      <Route exact path={ match.url } component={ AccountsList } />
      <Route path={ `${ match.url }/:accountId` } component={ TransactionsList } />
    </Switch>
  </div>
);

export { Accounts };
