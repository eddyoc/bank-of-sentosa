import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from 'actions';
import NewTransferForm from './NewTransferForm';

class NewTransfer extends Component {
  render() {
    const { accounts, userId, addTransfer, refreshData, history } = this.props;

    return (
      <div className="row">
        <div className="col-sm-8 offset-sm-2 col-md-6 offset-md-3">
          <section className="module new-transfer">
            <h2>New transfer between accounts</h2>
            <NewTransferForm
              userId={ userId }
              accounts={ accounts }
              addTransfer={ addTransfer }
              refreshData={ refreshData }
              history={ history }
            />
          </section>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const {
    profile: { data: { _id: userId }},
    accounts: { data: accounts },
  } = state;
  return { accounts, userId };
};

const mapDispatchToProps = dispatch => {
  return {
    addTransfer: data => dispatch(actions.addTransfer(data)),
    refreshData: data => dispatch(actions.refreshData(data)),
  };
};

const _NewTransfer = connect(mapStateToProps, mapDispatchToProps)(NewTransfer);
export { _NewTransfer as NewTransfer };
