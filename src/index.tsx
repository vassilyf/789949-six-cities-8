import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import App from './components/app/app';
import {createAPI} from './services/api';
import {reducer} from './store/reducer';
import {checkAuthAction, fetchOffersAction} from './store/api-actions';
import {ThunkAppDispatch} from './types/action';
import {redirect} from './store/middleware/redirect';
import {ToastContainer} from 'react-toastify';
import {logout} from './store/action';
import {configureStore} from '@reduxjs/toolkit';

const api = createAPI( () => store.dispatch(logout() ) );

export const store = configureStore({
  reducer: reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: api,
      },
    }).concat(redirect),
});

(store.dispatch as ThunkAppDispatch)(fetchOffersAction());
(store.dispatch as ThunkAppDispatch)(checkAuthAction());

ReactDOM.render(
  <React.StrictMode>
    <Provider store = {store}>
      <ToastContainer/>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'));
