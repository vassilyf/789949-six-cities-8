import {authProcess} from './auth-process';
import {guest} from '../../const';
import {AuthState} from '../../types/types';
import {TEST_AUTH_INFO} from '../../mocks/auth';
import {ActionType} from '../../types/action';

describe('Reducer: auth', () => {
  it('without additional parameters should return initial state', () => {
    expect(authProcess(undefined, {type: 'UNKNOWN_ACTION'}))
      .toEqual({isAuthorized: false, currentUser: guest});
  });

  it('successful authorization', () => {
    const state: AuthState = {isAuthorized: false, currentUser: guest};
    const loginAction = {
      type: ActionType.SetAuthInfo,
      payload: TEST_AUTH_INFO,
    };
    expect(authProcess(state, loginAction))
      .toEqual({isAuthorized: true, currentUser: TEST_AUTH_INFO});
  });

  it('successful logout', () => {
    const state: AuthState = {isAuthorized: true, currentUser: TEST_AUTH_INFO};
    const logoutAction = {
      type: ActionType.Logout,
    };
    expect(authProcess(state, logoutAction))
      .toEqual({isAuthorized: false, currentUser: guest});
  });
});
