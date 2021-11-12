import {createReducer} from '@reduxjs/toolkit';
import {FavoritesState} from '../../types/types';
import {setFavorites} from '../action';

const initialState: FavoritesState = {
  favorites: [],
};

const favoritesProcess = createReducer(initialState, (builder) => {
  builder
    .addCase(setFavorites, (state, action) => {
      state.favorites = action.payload;
    });
});

export {favoritesProcess};
