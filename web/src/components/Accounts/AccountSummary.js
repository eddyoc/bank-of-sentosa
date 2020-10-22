import React from 'react';
import { chunker } from 'utils';

import './AccountSummary.scss';

const AccountSummary = ({ sortcode, number, currency }) => {
  return (
    <p className="account-summary">
      <b>Sortcode:</b>  {chunker(sortcode, 2, '-')}<b>Account No:</b>  {number}<b>Currency:</b>  {currency}
    </p>
  )
};

export { AccountSummary };