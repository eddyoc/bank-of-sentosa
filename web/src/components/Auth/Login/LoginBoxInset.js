import React from 'react';
import './LoginBox.scss';

const LoginBoxInset = props => (
  <section className="module login-box">
    <section className="login-icon">
      <div className="icon-container">
        <img src={ process.env.PUBLIC_URL + '/logo.png' } width="220" height="220" className="img-responsive"
             alt="Login icon"/>
      </div>
    </section>
    { props.children }
  </section>
);

export default LoginBoxInset;
