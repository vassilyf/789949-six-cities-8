import {createMemoryHistory} from 'history';
import {render, screen} from '@testing-library/react';
import Bookmark from './bookmark';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {Router} from 'react-router-dom';
import {Provider} from 'react-redux';
import {TEST_AMSTERDAM_OFFERS} from '../../mocks/offers';
import {TEST_AUTH_STATE_AUTHORIZED} from '../../mocks/state';

const mockStore = configureMockStore();
const store = mockStore({
  auth: TEST_AUTH_STATE_AUTHORIZED,
});

describe('Component: Bookmark', () => {
  it('should render correctly', () => {
    const history = createMemoryHistory();
    const offer = TEST_AMSTERDAM_OFFERS[0];
    expect(offer.is_favorite).toEqual(true);
    render(
      <Provider store={store}>
        <Router history={history}>
          <Bookmark offer={offer} />
        </Router>
      </Provider>,
    );
    expect(screen.getByText('In bookmarks')).toBeInTheDocument();
  });
});
