import { Link } from 'react-router-dom';
import React from 'react';
import {AppRoute} from '../../const';

export function LoginLink(): JSX.Element {
  return (
    <ul className="header__nav-list">
      <li className="header__nav-item">
        <Link className="header__nav-link" to={AppRoute.SignIn}>
          <span className="header__signout">Sign in</span>
        </Link>
      </li>
    </ul>
  );
}
