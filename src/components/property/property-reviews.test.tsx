import {configureMockStore} from '@jedmao/redux-mock-store';
import {TEST_AUTH_INFO} from '../../mocks/auth';
import {createMemoryHistory} from 'history';
import {render, screen} from '@testing-library/react';
import {Provider} from 'react-redux';
import {Router} from 'react-router-dom';
import PropertyReviews from './property-reviews';
import {DETAILS_CHOSEN_STATE, FILLED_REVIEW} from '../../mocks/state';

const mockStore = configureMockStore();

describe('Component: PropertyReviews', () => {
  it('should render correctly, authorized state', () => {
    const history = createMemoryHistory();
    const store = mockStore({
      auth: {currentUser: TEST_AUTH_INFO, isAuthorized: true},
      details: {
        offerDetails: DETAILS_CHOSEN_STATE.offerDetails,
        review: FILLED_REVIEW,
      },
    });
    render(
      <Provider store={store}>
        <Router history={history}>
          <PropertyReviews />
        </Router>
      </Provider>,
    );
    for (const comment of DETAILS_CHOSEN_STATE.offerDetails.comments) {
      expect(screen.getByText(comment.comment)).toBeInTheDocument();
    }
    expect(screen.getByPlaceholderText('Tell how was your stay, what you like and what can be improved')).toBeInTheDocument();
  });

  it('should render correctly, unauthorized state', () => {
    const history = createMemoryHistory();
    const store = mockStore({
      auth: {currentUser: TEST_AUTH_INFO, isAuthorized: false},
      details: {
        offerDetails: DETAILS_CHOSEN_STATE.offerDetails,
        review: FILLED_REVIEW,
      },
    });
    render(
      <Provider store={store}>
        <Router history={history}>
          <PropertyReviews />
        </Router>
      </Provider>,
    );
    expect(screen.queryByPlaceholderText('Tell how was your stay, what you like and what can be improved')).not.toBeInTheDocument();
  });

});
