import {render, screen} from '@testing-library/react';
import {FavoritesList} from './favorites-list';
import {TEST_AMSTERDAM_OFFERS} from '../../../mocks/offers';
import {Provider} from 'react-redux';
import {Router} from 'react-router-dom';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {TEST_AUTH_STATE_INITIAL} from '../../../mocks/state';
import {createMemoryHistory} from 'history';

describe('Component: FavoritesList', () => {
  it('should render correctly', () => {
    const favorites = TEST_AMSTERDAM_OFFERS;
    const mockStore = configureMockStore();
    const store = mockStore({
      auth: TEST_AUTH_STATE_INITIAL,
      favorites: {favorites: TEST_AMSTERDAM_OFFERS},
    });
    const history = createMemoryHistory();

    render(
      <Provider store={store}>
        <Router history={history}>
          <FavoritesList favorites={favorites}/>
        </Router>
      </Provider>,
    );
    expect(screen.getByText('Saved listing')).toBeInTheDocument();

  });
});
