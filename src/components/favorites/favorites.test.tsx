import {Action} from 'redux';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {TEST_AUTH_STATE_INITIAL} from '../../mocks/state';
import {TEST_AMSTERDAM_OFFERS} from '../../mocks/offers';
import {createMemoryHistory} from 'history';
import {render, screen} from '@testing-library/react';
import {Provider} from 'react-redux';
import {Router} from 'react-router-dom';
import Favorites from './favorites';
import {State} from '../../types/types';
import thunk, {ThunkDispatch} from 'redux-thunk';
import MockAdapter from 'axios-mock-adapter';
import {createAPI} from '../../services/api';
import {APIRoute} from '../../const';


describe('Component: FavoritesCard', () => {
  it('should render correctly', () => {
    const api = createAPI(jest.fn());
    const mockAPI = new MockAdapter(api);
    const middlewares = [thunk.withExtraArgument(api)];

    const favorites = TEST_AMSTERDAM_OFFERS;
    mockAPI
      .onGet(APIRoute.Favorite)
      .reply(200, favorites);

    const mockStore = configureMockStore<
      State,
      Action,
      ThunkDispatch<State, typeof api, Action>
      >(middlewares);

    const store = mockStore({
      auth: TEST_AUTH_STATE_INITIAL,
      favorites: {favorites: TEST_AMSTERDAM_OFFERS},
    });
    const history = createMemoryHistory();
    render(
      <Provider store={store}>
        <Router history={history}>
          <Favorites/>
        </Router>
      </Provider>,
    );
    expect(screen.getByText('Saved listing')).toBeInTheDocument();

  });
});
