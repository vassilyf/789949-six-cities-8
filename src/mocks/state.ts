import {OFFERS_INITIAL_STATE} from '../store/reducers/offers-process';
import {TEST_AMSTERDAM_OFFERS, TEST_PARIS_OFFERS} from './offers';
import {AMSTERDAM, PARIS} from './cities';
import {DetailsState, OperationStatus, Review} from '../types/types';
import {TEST_COMMENT_GET_RESULT, TEST_COMMENT_GET_RESULT2} from './comments';
import {guest} from '../const';
import {TEST_AUTH_INFO} from './auth';

export const OFFERS_FILLED_STATE = {
  ...OFFERS_INITIAL_STATE,
  allOffers: [...TEST_PARIS_OFFERS, ...TEST_AMSTERDAM_OFFERS],
  allCitiesData: [PARIS, AMSTERDAM],
  cityOffers: TEST_PARIS_OFFERS,
  isDataLoaded: true,
};

export const DETAILS_CHOSEN_STATE: DetailsState = {
  offerDetails: {
    offer: TEST_AMSTERDAM_OFFERS[0],
    comments: [...TEST_COMMENT_GET_RESULT, ...TEST_COMMENT_GET_RESULT2],
    nearPlaces: [TEST_AMSTERDAM_OFFERS[1], TEST_AMSTERDAM_OFFERS[2]],
  },
  review: {comment: '', rating: 0, reviewSavingStatus: OperationStatus.Done},
};

export const FILLED_REVIEW: Review = {
  comment: 'Some comment text',
  rating: 4,
  reviewSavingStatus: OperationStatus.Done,
};

export const TEST_AUTH_STATE_INITIAL = {
  isAuthorized: false,
  currentUser: guest,
};

export const TEST_AUTH_STATE_AUTHORIZED = {
  isAuthorized: true,
  currentUser: TEST_AUTH_INFO,
};
