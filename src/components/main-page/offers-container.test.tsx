import {render, screen} from '@testing-library/react';
import {OffersContainer} from './offers-container';
import {OFFERS_FILLED_STATE} from '../../mocks/state';
import {locationsFromOffers} from '../../store/reducers/offers-selectors';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {Provider} from 'react-redux';
import {Router} from 'react-router-dom';
import {createMemoryHistory} from 'history';
import {TEST_AUTH_INFO} from '../../mocks/auth';

const mockStore = configureMockStore();
const store = mockStore({
  offers:  OFFERS_FILLED_STATE,
  auth: TEST_AUTH_INFO,
});
const offers = OFFERS_FILLED_STATE;

describe('Component: OffersContainer', () => {
  it('should render correctly', () => {
    const history = createMemoryHistory();
    render(
      <Provider store={store}>
        <Router history={history}>
          <OffersContainer
            offers={offers.cityOffers}
            selectedCity={offers.city}
            selectedCityLocation={offers.city.location}
            selectedPoint={offers.selectedPoint}
            points={locationsFromOffers(offers.cityOffers)}
          />
        </Router>
      </Provider>);

    for (const offer of offers.cityOffers) {
      expect(screen.getByText(offer.title)).toBeInTheDocument();
    }
  });
});
