import React from 'react';
import classNames from 'classnames';
import NavigationItem from './NavigationItem';

import './MainNavigation.scss';

const navigationItems = [{
  path: '/panel/accounts',
  className: 'accounts',
  icon: 'ion-clipboard',
  title: 'Accounts',
}, {
  path: '/panel/transfers',
  className: 'transfers',
  icon: 'ion-arrow-swap',
  title: 'Transfers',
}];

const MainNavigation = props => {
  let navClasses = classNames({
    'main-nav': true,
    'navigation-visible': props.isMobileNavVisible
  });

  return (
    <nav className={ navClasses }>
      <ul>
        { navigationItems.map(item => (
          <NavigationItem { ...item } />
        )) }
      </ul>
    </nav>
  );
};

export { MainNavigation };
