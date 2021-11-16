import {createAPI} from '../services/api';
import {logout} from './action';
import {configureStore} from '@reduxjs/toolkit';
import {reducer} from './reducer';
import {redirect} from './middleware/redirect';
import {ThunkAppDispatch} from '../types/action';
import {checkAuthAction, fetchOffersAction} from './api-actions';


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

