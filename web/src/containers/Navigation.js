import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Header, MainNavigation } from 'components/Navigation';

import './Navigation.scss';

class Navigation extends Component {
  state = { isMobileNavVisible: false };

  render() {
    const { isMobileNavVisible } = this.state;
    const { user } = this.props;

    return (
      <section className="module navigation">
        <Header toggleMobileNav={ this.toggleMobileNav } user={ user }/>
        <MainNavigation isMobileNavVisible={ isMobileNavVisible }/>
      </section>
    );
  }

  toggleMobileNav = () => {
    this.setState(prevState => ({
      isMobileNavVisible: !prevState.isMobileNavVisible
    }));
  };
}

const mapStateToProps = state => {
  return {
    user: state.profile.data
  };
};

const _Navigation = connect(mapStateToProps)(Navigation);
export { _Navigation as Navigation };
