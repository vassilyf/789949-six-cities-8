import React from 'react';
import {connect, ConnectedProps} from 'react-redux';
import {State} from '../../types/types';
import {AppRoute} from '../../const';
import UserStatus from './user-status';
import { LoginLink } from './login-link';
import { Link } from 'react-router-dom';

const mapStateToProps = ({auth}: State) => ({
  currentUser: auth.currentUser,
  isAuthorized: auth.isAuthorized,
});

const connector = connect(mapStateToProps);
type ConnectedPageHeaderProps = ConnectedProps<typeof connector>;

function PageHeader({currentUser, isAuthorized} : ConnectedPageHeaderProps): JSX.Element {
  return (
    <div className="container">
      <div className="header__wrapper">
        <div className="header__left">
          <Link className="header__logo-link header__logo-link--active" to={AppRoute.Main}>
            <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41"/>
          </Link>
        </div>
        <nav className="header__nav">
          {isAuthorized ? <UserStatus currentUser={currentUser}/> : <LoginLink/> }
        </nav>
      </div>
    </div>
  );
}

export default connector(PageHeader);
