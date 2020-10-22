import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';

// Handle redirects for /login, /register and /panel
const withAuth = WrappedComponent => {
  return class extends Component {
    componentDidMount() {
      this.shouldRedirect(this.props);
    }

    shouldComponentUpdate(nextProps) {
      this.shouldRedirect(nextProps);
      return true;
    }

    shouldRedirect(props) {
      console.log('shouldRedirect');
      const { history, authStatus, location: { pathname: path } } = props;

      // If we are on login/register and auth is complete, redirect to /panel
      // Otherwise redirect to /login
      if ((path === '/') && authStatus) {
        console.log('shouldRedirect - to panel authStatus=' + authStatus);
        history.push('/panel/accounts');
      } else if (path.startsWith('/panel') && !authStatus) {
        // history.push('/login');
        history.push('/');
      }
    }

    render() {
      return <WrappedComponent {...this.props} />;
    }
  };
};

const mapStateToProps = state => {
  const { auth: { status: authStatus } } = state;
  return { authStatus };
};

export default compose(
  connect(mapStateToProps),
  withAuth
);
