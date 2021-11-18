import {createAPI} from '../../services/api';
import thunk, {ThunkDispatch} from 'redux-thunk';
import {TEST_AMSTERDAM_OFFERS} from '../../mocks/offers';
import {AppRoute} from '../../const';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {State} from '../../types/types';
import {Action} from 'redux';
import {
  DETAILS_CHOSEN_STATE,
  OFFERS_FILLED_STATE,
  TEST_AUTH_STATE_AUTHORIZED,
  TEST_AUTH_STATE_INITIAL
} from '../../mocks/state';
import {createMemoryHistory} from 'history';
import {render, screen} from '@testing-library/react';
import {Provider} from 'react-redux';
import {Router} from 'react-router-dom';
import App from './app';

const api = createAPI(jest.fn());
const middlewares = [thunk.withExtraArgument(api)];

const mockStore = configureMockStore<
  State,
  Action,
  ThunkDispatch<State, typeof api, Action>
  >(middlewares);

const store = mockStore({
  auth: TEST_AUTH_STATE_INITIAL,
  offers: OFFERS_FILLED_STATE,
  details: DETAILS_CHOSEN_STATE,
  favorites: {favorites: TEST_AMSTERDAM_OFFERS},
});
const history = createMemoryHistory();

const fakeApp = (
  <Provider store={store}>
    <Router history={history}>
      <App />
    </Router>
  </Provider>
);

describe('Component: App', () => {
  it('should render main page on "/" path', () => {
    store.getState().auth = TEST_AUTH_STATE_INITIAL;
    history.push(AppRoute.Main);
    render(fakeApp);
    expect(screen.getByTestId('mainPage')).toBeInTheDocument();
  });

  it('should render login page on /login path', () => {
    store.getState().auth = TEST_AUTH_STATE_INITIAL;
    history.push(AppRoute.SignIn);
    render(fakeApp);
    expect(screen.getByTestId('loginPage')).toBeInTheDocument();
  });

  it('should render login page on /favorites path if unauthorized', () => {
    store.getState().auth = TEST_AUTH_STATE_INITIAL;
    history.push(AppRoute.Favorites);
    render(fakeApp);
    expect(screen.getByTestId('loginPage')).toBeInTheDocument();
  });

  it('should render favorites page on /favorites path if authorized', () => {
    store.getState().auth = TEST_AUTH_STATE_AUTHORIZED;
    history.push(AppRoute.Favorites);
    render(fakeApp);
    expect(screen.getByText('Saved listing')).toBeInTheDocument();
  });

  it('should render room details page on /room path', () => {
    store.getState().auth = TEST_AUTH_STATE_INITIAL;
    history.push(AppRoute.Room);
    render(fakeApp);
    expect(screen.getByTestId('propertyPage')).toBeInTheDocument();
  });

});
