import React from 'react';
import { Link } from 'react-router-dom';
import {AuthInfo} from '../../types/types';
import {ThunkAppDispatch} from '../../types/action';
import {connect, ConnectedProps} from 'react-redux';
import {AppRoute} from '../../const';
import {doLogout} from '../../store/api-actions';

type UserStatusProps = {
  currentUser: AuthInfo
}

const mapDispatchToProps = (dispatch: ThunkAppDispatch) => ({
  onLogout() {
    dispatch(doLogout());
  },
});

const connector = connect(null, mapDispatchToProps);
type ConnectedUserStatusProps = ConnectedProps<typeof connector> & UserStatusProps;

function UserStatus({currentUser, onLogout}: ConnectedUserStatusProps): JSX.Element {
  return (
    <ul className="header__nav-list">
      <li className="header__nav-item user">
        <Link className="header__nav-link header__nav-link--profile" to={AppRoute.Favorites}>
          <div className="header__avatar-wrapper user__avatar-wrapper">
          </div>
          <span className="header__user-name user__name">{currentUser.email}</span>
        </Link>
      </li>
      <li className="header__nav-item">
        <a className="header__nav-link" href="/#" onClick={() => onLogout()}>
          <span className="header__signout">Sign out</span>
        </a>
      </li>
    </ul>
  );
}

export default connector(UserStatus);
