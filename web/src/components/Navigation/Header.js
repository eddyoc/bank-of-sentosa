import React from 'react';
import { Link } from 'react-router-dom';

import './Header.scss';

const Header = ({
  toggleMobileNav,
  user,
}) => {
  return (
    <header className="navigation-header">
      <div className="user-profile-box">
        <Link to="/panel/profile">
          <img src="https://www.shareicon.net/data/2016/07/05/791224_man_512x512.png" width="60" height="60" alt="User profile"/>
          <span>
            { user.firstName } { user.lastName }
          </span>
        </Link>
      </div>

      <ul className="navigation-header-links">
        <li>
          <Link to="/logout">Logout</Link>
        </li>
        <li className="toggle-menu">
          <button onClick={ toggleMobileNav }>
            <i className="ion-navicon-round" />
          </button>
        </li>
      </ul>
    </header>
  );
};

export { Header };
