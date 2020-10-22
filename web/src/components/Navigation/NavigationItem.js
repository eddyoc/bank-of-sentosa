import React from "react";
import { NavLink } from "react-router-dom";

const NavigationItem = ({
  path,
  className,
  icon,
  title,
}) => {
  className = `main-nav-box ${className}`;
  return (
    <li>
      <NavLink to={ path }>
        <div className="main-nav-widget">
          <div className={ className }>
            <i className={ icon } />
          </div>
          <span>{ title }</span>
        </div>
      </NavLink>
    </li>
  )
};

export default NavigationItem;