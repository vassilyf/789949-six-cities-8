import {render, screen} from '@testing-library/react';
import FavoritesCard from './favorites-card';
import {TEST_PARIS_OFFERS} from '../../mocks/offers';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {TEST_AUTH_STATE_INITIAL} from '../../mocks/state';
import {createMemoryHistory} from 'history';
import {Router} from 'react-router-dom';
import {Provider} from 'react-redux';

const mockStore = configureMockStore();
const store = mockStore({
  auth: TEST_AUTH_STATE_INITIAL,
});

describe('Component: FavoritesCard', () => {
  it('should render correctly', () => {
    const offer = TEST_PARIS_OFFERS[0];
    const history = createMemoryHistory();
    render(
      <Provider store={store}>
        <Router history={history}>
          <FavoritesCard offer={offer}/>
        </Router>
      </Provider>,
    );
    expect(screen.getByText(offer.title)).toBeInTheDocument();
    expect(screen.getByText(offer.type)).toBeInTheDocument();
  });
});
