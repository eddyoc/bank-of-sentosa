import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import TransfersListItem from './TransfersListItem';
import { sortByDate } from 'utils';

import './TransferList.scss';

class TransfersList extends Component {
  getTransfersList() {
    const { transfers, match } = this.props;

    return transfers
      .sort(sortByDate)
      .map(tx => (
        <TransfersListItem
          key={ tx._id }
          { ...tx }
          matchUrl={ match.url }
        />
      ));
  }

  render() {
    const { match, transfers } = this.props;
    const transfersList = this.getTransfersList();

    return (
      <Fragment>
        <h1>Transfers</h1>
        <div className="list-header">
          <p>You have made { transfers.length } transfers</p>
          <p>
            <Link id="new-transfer-btn" to={ `${ match.url }/new` } className="btn btn-primary">
              New transfer
            </Link>
          </p>
        </div>
        <div className="list-group">{ transfersList }</div>
      </Fragment>
    );
  }
}

const mapStateToProps = state => {
  const { transfers: { data : transfers }} = state;
  return { transfers };
};

const _TransfersList = connect(mapStateToProps)(TransfersList);
export { _TransfersList as TransfersList };
