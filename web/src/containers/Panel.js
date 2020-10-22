import React, { Component, Fragment } from 'react';
import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from 'actions';
import withAuth from 'hoc/withAuth';
import { isValidToken } from 'tools';
import { Loader, PageNotFound } from 'components';
import { Accounts, Transfers, Navigation } from 'containers';

// Fetch all user's initial data or redirect back to /login if not logged in (withAuth HOC)
class Panel extends Component {
  componentDidMount() {
    console.log('Panel.componentDidMount()');
    const { setAuthStatus, fetchInitialData } = this.props;
    isValidToken()
      .then(() => {
        setAuthStatus(true);
        fetchInitialData();
      })
      .catch(() => {
        setAuthStatus(false);
      });
  }

  render() {
    const { initialDataStatus } = this.props;
    console.log('Panel.render()');
    if (!initialDataStatus) {
      return <Loader/>;
    } else {
      return (
        <Fragment>
          <Route path="/panel" component={ Navigation } />

          <Switch>
            <Route path="/panel/accounts" component={ Accounts } />
            <Route path="/panel/transfers" component={ Transfers } />
            <Route component={ PageNotFound }/>
          </Switch>
        </Fragment>
      );
    }
  }
}

const mapStateToProps = state => {
  return {
    initialDataStatus: state.panel.initialDataStatus
  };
};

const mapDispatchToProps = dispatch => {
  console.log('Panel.mapDispatchToProps()');
  return {
    setAuthStatus: status => dispatch(actions.setAuthStatus(status)),
    fetchInitialData: () => dispatch(actions.fetchInitialData())
  };
};

const _Panel = connect(mapStateToProps, mapDispatchToProps)(withAuth(Panel));
export { _Panel as Panel };
