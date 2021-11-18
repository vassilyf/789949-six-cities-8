import {TEST_AMSTERDAM_OFFERS} from '../../mocks/offers';
import {render, screen} from '@testing-library/react';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {TEST_AUTH_INFO} from '../../mocks/auth';
import FeedbackForm, {FeedbackForm as RawFeedbackForm} from './feedback-form';
import {DETAILS_CHOSEN_STATE, FILLED_REVIEW} from '../../mocks/state';
import {OperationStatus, Review} from '../../types/types';
import {lorem} from 'faker';
import userEvent from '@testing-library/user-event';
import {Provider} from 'react-redux';
import {Router} from 'react-router-dom';
import {createMemoryHistory} from 'history';


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

  it('prevent sending feedback if message too short', () => {
    const offer = TEST_AMSTERDAM_OFFERS[0];
    const review: Review  = {comment: 'too short comment',  rating: 3, reviewSavingStatus: OperationStatus.Done};
    const onChangeReview = jest.fn();
    const onSaveReview = jest.fn();
    expect(offer.is_favorite).toEqual(true);
    render(
      <RawFeedbackForm offerId={offer.id} review={review} onChangeReview={onChangeReview} onSaveReview={onSaveReview} />,
    );
    expect(screen.getByRole('button')).toHaveAttribute('disabled');
  });

  it('send feedback if message long enough', () => {
    const offer = TEST_AMSTERDAM_OFFERS[0];
    const review: Review  = {comment: lorem.sentence(20 ),  rating: 3, reviewSavingStatus: OperationStatus.Done};
    const onChangeReview = jest.fn();
    const onSaveReview = jest.fn();
    expect(offer.is_favorite).toEqual(true);
    render(
      <RawFeedbackForm offerId={offer.id} review={review} onChangeReview={onChangeReview} onSaveReview={onSaveReview} />,
    );
    expect(screen.getByRole('button')).not.toHaveAttribute('disabled');
    userEvent.click(screen.getByRole('button'));
    expect(onSaveReview).toBeCalled();
  });

});
