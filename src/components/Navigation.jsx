import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import userData from '../user-data.json';

function Navigation() {
  const [isToggled, updateIsToggled] = useState(false);

  return (
    <div className={isToggled ? 'nav-container toggled' : 'nav-container'}>
      <span
        className="button button-toggle"
        onClick={() => {
          updateIsToggled(!isToggled);
        }}
      ></span>

      <nav className="nav">
        <div className="hamburger">
          <Link
            to="/dashboard"
            className="hamburger__line"
            onClick={() => {
              updateIsToggled(!isToggled);
            }}
          >
            dashboard
          </Link>
          <Link
            to={`/${userData.userHandle}`}
            className="hamburger__line"
            onClick={() => {
              updateIsToggled(!isToggled);
            }}
          >
            Profile
          </Link>
          <a className="hamburger__line"></a>
        </div>
      </nav>
    </div>
  );
}

export default Navigation;
