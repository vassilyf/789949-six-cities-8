import {DetailsState, Comment, OperationStatus, Offer} from '../../types/types';
import {ActionType} from '../../types/action';
import {DETAILS_INITIAL_STATE, detailsProcess} from './details-process';
import {TEST_COMMENT_GET_RESULT, TEST_COMMENT_GET_RESULT2} from '../../mocks/comments';
import {TEST_AMSTERDAM_OFFERS} from '../../mocks/offers';
import {DETAILS_CHOSEN_STATE, FILLED_REVIEW} from '../../mocks/state';

describe('Reducer: details', () => {
  it('set hotel details', () => {
    const state: DetailsState = DETAILS_INITIAL_STATE;
    const setOfferDetailsAction = {
      type: ActionType.SetOfferDetails,
      payload: TEST_AMSTERDAM_OFFERS[0],
    };
    expect(detailsProcess(state, setOfferDetailsAction))
      .toEqual({ offerDetails: {...DETAILS_INITIAL_STATE.offerDetails,  offer: TEST_AMSTERDAM_OFFERS[0]}, review: DETAILS_INITIAL_STATE.review});
  });

  it('set comments', () => {
    const state: DetailsState = DETAILS_INITIAL_STATE;
    const comments: Comment[] = [...TEST_COMMENT_GET_RESULT, ...TEST_COMMENT_GET_RESULT2];
    const setOfferDetailsAction = {
      type: ActionType.SetComments,
      payload: comments,
    };
    expect(detailsProcess(state, setOfferDetailsAction))
      .toEqual({ offerDetails: {...DETAILS_INITIAL_STATE.offerDetails,  comments: comments}, review: DETAILS_INITIAL_STATE.review});
  });

  it('set near places', () => {
    const state: DetailsState = DETAILS_INITIAL_STATE;
    const nearPlaces: Offer[] = [TEST_AMSTERDAM_OFFERS[1], TEST_AMSTERDAM_OFFERS[2]];
    const setOfferDetailsAction = {
      type: ActionType.SetNearPlaces,
      payload: nearPlaces,
    };
    expect(detailsProcess(state, setOfferDetailsAction))
      .toEqual({ offerDetails: {...DETAILS_INITIAL_STATE.offerDetails,  nearPlaces: nearPlaces}, review: DETAILS_INITIAL_STATE.review});
  });

  it('set review saving status, in process', () => {
    const state: DetailsState = DETAILS_CHOSEN_STATE;
    const setReviewSavingStatus = {
      type: ActionType.SetReviewSavingStatus,
      payload: OperationStatus.InProcess,
    };
    expect(detailsProcess(state, setReviewSavingStatus))
      .toEqual({
        offerDetails: DETAILS_CHOSEN_STATE.offerDetails,
        review:
          {
            comment: DETAILS_CHOSEN_STATE.review.comment,
            rating: DETAILS_CHOSEN_STATE.review.rating,
            reviewSavingStatus: OperationStatus.InProcess,
          },
      });
  });

  it('set review saving status, finished', () => {
    const state: DetailsState = DETAILS_CHOSEN_STATE;
    const setReviewSavingStatus = {
      type: ActionType.SetReviewSavingStatus,
      payload: OperationStatus.Done,
    };
    expect(detailsProcess(state, setReviewSavingStatus))
      .toEqual({
        offerDetails: DETAILS_CHOSEN_STATE.offerDetails,
        review: {...DETAILS_INITIAL_STATE.review, reviewSavingStatus: OperationStatus.Done},
      });
  });

  it('set review', () => {
    const state: DetailsState = DETAILS_CHOSEN_STATE;
    const setReview = {
      type: ActionType.SetReview,
      payload: FILLED_REVIEW,
    };
    expect(detailsProcess(state, setReview))
      .toEqual({
        offerDetails: DETAILS_CHOSEN_STATE.offerDetails,
        review: {...FILLED_REVIEW},
      });
  });

  it('reset details', () => {
    const state: DetailsState = DETAILS_CHOSEN_STATE;
    const resetOfferDetailsAction = {
      type: ActionType.ResetOfferDetails,
    };
    expect(detailsProcess(state, resetOfferDetailsAction))
      .toEqual(DETAILS_INITIAL_STATE);
  });

});
