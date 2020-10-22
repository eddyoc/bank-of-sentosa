import React from 'react';
import LoginBoxInset from './LoginBoxInset';
import LoginForm from './LoginForm';
import { Loader } from 'components';

const LoginBox = props => {
  const { error, loading, history, onLoginSubmit } = props;
  return (
    <LoginBoxInset>
      { error ? <p className="error">{ error }</p> : null }
      { loading ? (
        <Loader/>
      ) : (
        <LoginForm history={ history } onLoginSubmit={ onLoginSubmit }/>
      ) }
    </LoginBoxInset>
  )
};

export { LoginBox };
