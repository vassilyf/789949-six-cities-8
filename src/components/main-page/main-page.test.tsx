import {configureMockStore} from '@jedmao/redux-mock-store';
import {State} from '../../types/types';
import {Action} from 'redux';
import thunk, {ThunkDispatch} from 'redux-thunk';
import {DETAILS_CHOSEN_STATE, OFFERS_FILLED_STATE, TEST_AUTH_STATE_INITIAL} from '../../mocks/state';
import {TEST_AMSTERDAM_OFFERS} from '../../mocks/offers';
import {createMemoryHistory} from 'history';
import {Provider} from 'react-redux';
import {Router} from 'react-router-dom';
import MainPage from './main-page';
import {render, screen} from '@testing-library/react';
import {createAPI} from '../../services/api';
import {PARIS} from '../../mocks/cities';


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

const fakeMainPage = (
  <Provider store={store}>
    <Router history={history}>
      <MainPage />
    </Router>
  </Provider>
);

describe('Component: App', () => {
  it('should render main page', () => {
    render(fakeMainPage);
    expect(screen.getByTestId('mainPage')).toBeInTheDocument();
    for (const city of OFFERS_FILLED_STATE.allCitiesNames) {
      expect(screen.getByText(city)).toBeInTheDocument();
    }
    expect(screen.getByText(PARIS.name).parentElement).toHaveClass('tabs__item--active');
    expect(screen.getByText(`1 place to stay in ${PARIS.name}`)).toBeInTheDocument();

  });
});
