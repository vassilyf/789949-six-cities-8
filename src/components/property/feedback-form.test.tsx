import {createMemoryHistory} from 'history';
import {TEST_AMSTERDAM_OFFERS} from '../../mocks/offers';
import {render, screen} from '@testing-library/react';
import {Provider} from 'react-redux';
import {Router} from 'react-router-dom';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {TEST_AUTH_INFO} from '../../mocks/auth';
import FeedbackForm from './feedback-form';
import {DETAILS_CHOSEN_STATE, FILLED_REVIEW} from '../../mocks/state';

const mockStore = configureMockStore();
const store = mockStore({
  auth: TEST_AUTH_INFO,
  details: {
    offerDetails: DETAILS_CHOSEN_STATE.offerDetails,
    review: FILLED_REVIEW,
  },
});

describe('Component: FeedbackForm', () => {
  it('should render correctly', () => {
    const history = createMemoryHistory();
    const offer = TEST_AMSTERDAM_OFFERS[0];
    expect(offer.is_favorite).toEqual(true);
    render(
      <Provider store={store}>
        <Router history={history}>
          <FeedbackForm offerId={offer.id}  />
        </Router>
      </Provider>,
    );
    expect(screen.getByText(FILLED_REVIEW.comment)).toBeInTheDocument();
    expect(screen.getByText('Your review')).toBeInTheDocument();
  });
});
