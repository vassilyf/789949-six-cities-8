import {redirect} from './redirect';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {AnyAction} from '@reduxjs/toolkit';
import {State} from '../../types/types';
import {AppRoute} from '../../const';
import {redirectTo} from '../action';


const fakeHistory = {
  location: {pathname: ''},
  push(path: string) {
    this.location.pathname = path;
  },
};

jest.mock('../../browser-history', () => fakeHistory);

const middlewares = [redirect];
const mockStore = configureMockStore<State, AnyAction>(middlewares);
const store = mockStore();

describe('Middleware: redirect', () => {
  beforeEach(() => {
    fakeHistory.push('');
  });

  it('should be redirect to /login', () => {
    store.dispatch(redirectTo(AppRoute.SignIn));
    expect(fakeHistory.location.pathname).toBe(AppRoute.SignIn);
    expect(store.getActions()).toEqual([
      redirectTo(AppRoute.SignIn),
    ]);
  });

  it('redirect without valid action should not work', () => {
    store.dispatch({type: 'UNKNOWN_ACTION', payload: AppRoute.Favorites});
    expect(fakeHistory.location.pathname).not.toBe(AppRoute.Favorites);
  });
});
