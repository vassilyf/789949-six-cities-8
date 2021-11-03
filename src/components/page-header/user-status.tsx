import React from 'react';
import {AuthInfo} from '../../types/types';
import {Dispatch} from 'redux';
import {Actions} from '../../types/action';
import {logout} from '../../store/action';
import {connect, ConnectedProps} from 'react-redux';

type UserStatusProps = {
  currentUser: AuthInfo
}

const mapDispatchToProps = (dispatch: Dispatch<Actions>) => ({
  onLogout() {
    dispatch(logout());
  },
});

const connector = connect(null, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;
type ConnectedUserStatusProps = PropsFromRedux & UserStatusProps;

function UserStatus({currentUser, onLogout}: ConnectedUserStatusProps): JSX.Element {
  return (
    <ul className="header__nav-list">
      <li className="header__nav-item user">
        <a className="header__nav-link header__nav-link--profile" href="/#">
          <div className="header__avatar-wrapper user__avatar-wrapper">
          </div>
          <span className="header__user-name user__name">{currentUser.email}</span>
        </a>
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
