import {configureMockStore} from '@jedmao/redux-mock-store';
import {createMemoryHistory} from 'history';
import {TEST_AMSTERDAM_OFFERS} from '../../mocks/offers';
import {TEST_AUTH_INFO} from '../../mocks/auth';
import {DETAILS_CHOSEN_STATE, FILLED_REVIEW} from '../../mocks/state';
import {render, screen} from '@testing-library/react';
import {Provider} from 'react-redux';
import {Router} from 'react-router-dom';
import Property from './property';


const mockStore = configureMockStore();

describe('Component: Property', () => {
  it('should render correctly, authorized state', () => {
    const history = createMemoryHistory();
    const store = mockStore({
      auth: {currentUser: TEST_AUTH_INFO, isAuthorized: true},
      details: {
        offerDetails: DETAILS_CHOSEN_STATE.offerDetails,
        review: FILLED_REVIEW,
      },
    });
    const offer = TEST_AMSTERDAM_OFFERS[0];
    render(
      <Provider store={store}>
        <Router history={history}>
          <Property />
        </Router>
      </Provider>,
    );
    expect(screen.getByText(offer.type)).toBeInTheDocument();
  });
});
