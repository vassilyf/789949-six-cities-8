import {createReducer} from '@reduxjs/toolkit';
import {AuthState} from '../../types/types';
import {guest} from '../../const';
import {logout, setAuthInfo} from '../action';

const initialState: AuthState = {
  isAuthorized: false,
  currentUser: guest,
};

const authProcess = createReducer(initialState, (builder) => {
  builder
    .addCase(setAuthInfo, (state, action) => {
      state.isAuthorized = true;
      state.currentUser = action.payload;
    })
    // .addCase(confirmAuthorization, (state, action) => {
    //   state.isAuthorized = true;
    //   state.currentUser = action.payload;
    // })
    .addCase(logout, (state) => {
      state.isAuthorized = initialState.isAuthorized;
      state.currentUser = initialState.currentUser;
    });
});

export {authProcess};
