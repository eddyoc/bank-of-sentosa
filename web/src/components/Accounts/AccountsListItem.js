import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import accounting from 'accounting';
import { AccountSummary } from 'components/Accounts';

const AccountsListItem = ({ matchUrl, account }) => {
  const { _id, currency, balance: rawBalance } = account;
  const balance = `${accounting.formatMoney(rawBalance, '')} ${currency}`;
  const accountName = `${currency} Account`;

  return (
    <Link to={ `${ matchUrl }/${ _id }` } className="list-group-item list-group-item-action">
      <div className="d-flex w-100 justify-content-between">
        <h5 className="mb-1">{ accountName }</h5>
        <p id={ _id } className="account-balance money-amount">{ balance }</p>
      </div>
      <AccountSummary {...account} />
    </Link>
  );
};

AccountsListItem.propTypes = {
  _id: PropTypes.string,
  sortcode: PropTypes.string,
  currency: PropTypes.string,
  balance: PropTypes.number
};

export default AccountsListItem;
