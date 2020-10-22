import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { NewTransfer, TransfersList } from 'components/Transfers';

const Transfers = () => (
  <div className="panel-content">
    <Switch>
      <Route exact path="/panel/transfers" component={ TransfersList } />
      <Route path="/panel/transfers/new" component={ NewTransfer } />
    </Switch>
  </div>
);

export { Transfers };
