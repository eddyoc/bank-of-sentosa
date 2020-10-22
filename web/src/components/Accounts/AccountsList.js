import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import AccountsListItem from './AccountsListItem';

const AccountsList = ({ accounts, match }) => {
   const accountsList = accounts.map(account => (
      <AccountsListItem
        key={account._id}
        account={account}
        matchUrl={match.url}
      />
   ));

   return (
      <Fragment>
         <h1>Account Summary</h1>
         <div className="list-group">{accountsList}</div>
      </Fragment>
   );
};

const mapStateToProps = state => {
   return {
      accounts: state.accounts.data
   };
};

const _AccountsList = connect(mapStateToProps)(AccountsList);
export { _AccountsList as AccountsList };
