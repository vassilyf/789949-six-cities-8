import React from 'react';
import {connect, ConnectedProps} from 'react-redux';
import {State} from '../../types/types';
import {AppRoute, AuthorizationStatus} from '../../const';
import UserStatus from './user-status';
import { LoginLink } from './login-link';
import { Link } from 'react-router-dom';

type PageHeaderProps = {
};

const mapStateToProps = ({currentUser, authorizationStatus}: State) => ({
  currentUser: currentUser,
  authorizationStatus: authorizationStatus,
});

const connector = connect(mapStateToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;
type ConnectedPageHeaderProps = PropsFromRedux & PageHeaderProps;


function PageHeader({currentUser, authorizationStatus} : ConnectedPageHeaderProps): JSX.Element {
  return (
    <div className="container">
      <div className="header__wrapper">
        <div className="header__left">
          <Link className="header__logo-link header__logo-link--active" to={AppRoute.Main}>
            <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41"/>
          </Link>
        </div>
        <nav className="header__nav">
          {authorizationStatus === AuthorizationStatus.Auth ?  <UserStatus currentUser={currentUser}/> : <LoginLink/> }
        </nav>
      </div>
    </div>
  );
}

export default connector(PageHeader);
