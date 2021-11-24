import { Link } from 'react-router-dom';
import React from 'react';
import {AppRoute} from '../../../const';

export function LoginLink(): JSX.Element {
  return (
    <ul className="header__nav-list">
      <li className="header__nav-item user">
        <Link className="header__nav-link header__nav-link--profile" to={AppRoute.SignIn}>
          <div className="header__avatar-wrapper user__avatar-wrapper">
          </div>
          <span className="header__signout">Sign in</span>
        </Link>
      </li>
    </ul>
  );
}
