import {createReducer} from '@reduxjs/toolkit';
import {DetailsState, OfferDetails, OperationStatus} from '../../types/types';
import {
  resetOfferDetails,
  setComments,
  setNearPlaces,
  setOfferDetails,
  setReview,
  setReviewSavingStatus
} from '../action';

export const EMPTY_OFFER_DETAILS: OfferDetails = {
  offer: undefined,
  comments:[],
  nearPlaces: [],
};

const initialState: DetailsState = {
  offerDetails: EMPTY_OFFER_DETAILS,
  review: {comment: '', rating: 0, reviewSavingStatus: OperationStatus.Done},
};

export const DETAILS_INITIAL_STATE = initialState;

const detailsProcess = createReducer(initialState, (builder) => {
  builder
    .addCase(resetOfferDetails, (state) => {
      state.offerDetails = initialState.offerDetails;
    })
    .addCase(setOfferDetails, (state, action) => {
      state.offerDetails.offer = action.payload;
    })
    .addCase(setComments, (state, action) => {
      state.offerDetails.comments = action.payload;
    })
    .addCase(setNearPlaces, (state, action) => {
      state.offerDetails.nearPlaces = action.payload;
    })
    .addCase(setReviewSavingStatus, (state, action) => {
      if (action.payload === OperationStatus.InProcess) {
        state.review.reviewSavingStatus = action.payload;
      } else {
        state.review = {comment: '', rating: 0, reviewSavingStatus: action.payload};
      }
    })
    .addCase(setReview, (state, action) => {
      state.review = {
        comment: action.payload.comment,
        rating: action.payload.rating,
        reviewSavingStatus: state.review.reviewSavingStatus,
      };
    });
});

export {detailsProcess};
