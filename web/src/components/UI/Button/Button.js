import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import './Button.scss';

const Button = props => {
  const { id } = props;
  const btnType = props.type ? props.type : 'button';

  return (
    <div className="single-module-btn">
      { props.href ? (
        <Link id={ id } to={ props.href } className="btn btn-primary">
          { props.text }
        </Link>
      ) : (
        <button id={ id } className="btn btn-primary" type={ btnType }>
          { props.text }
        </button>
      ) }
    </div>
  );
};

Button.propTypes = {
  type: PropTypes.string,
  href: PropTypes.string,
  text: PropTypes.string.isRequired,
  id: PropTypes.string,
};

export { Button };
