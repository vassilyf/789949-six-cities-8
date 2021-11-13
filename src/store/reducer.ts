import {combineReducers} from '@reduxjs/toolkit';
import {authProcess} from './reducers/auth-process';
import {offersProcess} from './reducers/offers-process';
import {detailsProcess} from './reducers/details-process';
import {favoritesProcess} from './reducers/favorites-process';

export const reducer = combineReducers({
  auth: authProcess,
  offers: offersProcess,
  details: detailsProcess,
  favorites: favoritesProcess,
});

export type RootState = ReturnType<typeof reducer>;
