import React from 'react';
import accounting from "accounting";
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { formatDate } from 'utils';

const TransfersListItem = ({
  matchUrl,
  _id,
  description,
  date,
  amount: rawAmount,
  currency,
  status,
  reference,
}) => {
  date = formatDate(date);
  const amount = `${accounting.formatMoney(rawAmount, '')} ${currency}`;

  return (
    <Link to={ `${ matchUrl }/${ _id }` } className="list-group-item list-group-item-action">
      <div className="d-flex w-100 justify-content-between">
        <h5 className="mb-1">Transfer</h5>
        <small className="text-muted">status: { status }</small>
      </div>
      <p className="mb-1">{ description }</p>
      <p className="mb-1 transfer-details">
        <b>Date:</b> { date } / <b>Amount:</b> { amount }
      </p>
      <small className="text-muted">Reference: { reference }</small>
    </Link>
  );
};

TransfersListItem.propTypes = {
  matchUrl: PropTypes.string,
  _id: PropTypes.string,
  type: PropTypes.string,
  date: PropTypes.instanceOf(Date),
  amount: PropTypes.number,
  status: PropTypes.string
};

export default TransfersListItem;
