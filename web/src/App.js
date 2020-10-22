import React, { Component } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from 'actions';
import { updateAPIConfig } from 'api';
import { isValidToken } from 'tools';
import Layout from 'hoc/Layout';
import { Panel, Login } from 'containers';
import { Logout, PageNotFound } from 'components';

import 'App.scss';

class App extends Component {
  componentDidMount() {
    const { setAuthStatus } = this.props;
    isValidToken()
      .then(token => {
        updateAPIConfig({ authToken: token });
        setAuthStatus(true);
      })
      .catch(() => {
        setAuthStatus(false);
      });
  }

  render() {
    console.log('App render');
    return (
      <Layout>
        <Switch>
          <Route exact path="/" component={ Login } />
          <Route path="/logout" component={ Logout } />
          <Route path="/panel" component={ Panel } />
          <Route component={ PageNotFound } />
        </Switch>
      </Layout>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setAuthStatus: status => dispatch(actions.setAuthStatus(status))
  };
};

export default withRouter(connect(null, mapDispatchToProps)(App));
