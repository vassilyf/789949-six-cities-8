import {TEST_AMSTERDAM_OFFERS} from '../../mocks/offers';
import {render, screen} from '@testing-library/react';
import {PlaceCardList} from './place-card-list';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {createMemoryHistory} from 'history';
import {Router} from 'react-router-dom';
import {Provider} from 'react-redux';
import {TEST_AUTH_STATE_INITIAL} from '../../mocks/state';

const mockStore = configureMockStore();
const store = mockStore({
  auth: TEST_AUTH_STATE_INITIAL,
});

describe('Component: PlaceCardList', () => {
  it('should render correctly', () => {
    const history = createMemoryHistory();
    const offers = TEST_AMSTERDAM_OFFERS;
    render(
      <Provider store={store}>
        <Router history={history}>
          <PlaceCardList offers={offers}/>
        </Router>
      </Provider>,
    );
    for (const offer of offers) {
      expect(screen.getByText(offer.title)).toBeInTheDocument();
    }
  });
});
