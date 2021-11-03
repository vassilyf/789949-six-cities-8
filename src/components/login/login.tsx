import React, {useState} from 'react';
import {ThunkAppDispatch} from '../../types/action';
import {doLogin} from '../../store/api-actions';
import {store} from '../../index';
import PageHeader from '../page-header/page-header';

function Login(): JSX.Element {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');

  const onSubmitLogin = (e: React.MouseEvent<HTMLButtonElement>): void => {
    e.preventDefault();
    (store.dispatch as ThunkAppDispatch)(doLogin({email: login, password: password}));
  };

  return (
    <div className="page page--gray page--login">
      <header className="header">
        <PageHeader/>
      </header>

      <main className="page__main page__main--login">
        <div className="page__login-container container">
          <section className="login">
            <h1 className="login__title">Sign in</h1>
            <form className="login__form form" action="#" method="post">
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">E-mail</label>
                <input className="login__input form__input" type="email" name="email" placeholder="Email" required={false}
                  value={login} onChange={
                    (e) => setLogin(e.target.value)
                  }
                />
              </div>
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">Password</label>
                <input className="login__input form__input" type="password" name="password" placeholder="Password" required={false}
                  value={password} onChange={
                    (e) => setPassword(e.target.value)
                  }
                />
              </div>
              <button className="login__submit form__submit button" onClick={ (e) => onSubmitLogin(e)}>Sign in</button>
            </form>
          </section>
          <section className="locations locations--login locations--current">
            <div className="locations__item">
              <a className="locations__item-link" href="/#">
                <span>Amsterdam</span>
              </a>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default Login;
