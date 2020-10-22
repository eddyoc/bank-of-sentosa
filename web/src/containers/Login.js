import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from 'actions';
import withAuth from 'hoc/withAuth';
import { LoginBox } from 'components';

import './Login.scss';

class Login extends Component {
  state = {
    loading: false,
    error: null
  };

  render() {
    const { history } = this.props;
    const { loading, error } = this.state;

    return (
      <div className="login-container">
        <div className="logo">
          <p>Bank of Sentosa</p>
        </div>
        <div className="col login-box-container">
          <LoginBox
            history={ history }
            onLoginSubmit={ this.onLoginSubmit }
            loading={ loading }
            error={ error }
          />
        </div>
      </div>
    );
  }

  onLoginSubmit = (email, password) => {
    const { login } = this.props;
    console.log(`onLoginSubmit email=${email} pass=${password}`);
    this.setState({ loading: true, error: null });

    // Dispatch auth action
    // There will be automatic redirect to panel, in HOC
    login({ email, password })
      .catch(error => {
        this.setState({ loading: false, error: 'Invalid email address or password' });
      });
  };
}

const mapDispatchToProps = dispatch => {
  return {
    login: data => dispatch(actions.login(data))
  };
};

const _Login = connect(null, mapDispatchToProps)(withAuth(Login));
export { _Login as Login };
