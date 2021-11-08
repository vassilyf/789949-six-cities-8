import {PARIS} from '../mocks/cities';
import {CityWithLocation, Offer, OfferDetails, OperationStatus, SortingSelection, State} from '../types/types';
import {Actions, ActionType} from '../types/action';
import {guest} from '../const';

const EMPTY_OFFER_DETAILS: OfferDetails = {
  offer: undefined,
  comments:[],
  nearPlaces: [],
};

const initialState: State = {
  allCitiesNames: ['Paris', 'Cologne', 'Brussels', 'Amsterdam', 'Hamburg', 'Dusseldorf'],
  allCitiesData: [],
  allOffers: [],
  city: PARIS,
  cityOffers: [],
  offerDetails: EMPTY_OFFER_DETAILS,
  sortingSelection: SortingSelection.Popular,
  selectedPoint: undefined,
  favorites: [],
  isDataLoaded: false,
  review: {comment: '', rating: 0, reviewSavingStatus: OperationStatus.Done},
  isAuthorized: false,
  currentUser: guest,
};

const getCityWithLocation = (cities: CityWithLocation[], cityName: string): CityWithLocation =>
  cities.find( (c) => c.name === cityName) ?? PARIS;


const getOffersForCity = (offers: Offer[], cityName: string): Offer[] =>
  offers.filter( (o) => o.city.name === cityName);


const citiesDataFromOffers = (offers: Offer[]): CityWithLocation[] =>
  Object.values(Object.fromEntries(offers.map( (o) => [o.city.name, o.city] ) ) );


const reducer = (state: State = initialState, action: Actions): State => {
  switch (action.type) {
    case ActionType.SelectCity:
      return {
        ...state,
        city: getCityWithLocation(state.allCitiesData, action.payload),
        cityOffers: getOffersForCity(state.allOffers, action.payload),
        sortingSelection: SortingSelection.Popular,
        selectedPoint: undefined,
      };
    case ActionType.SetOffers:
      return {
        ...state,
        allOffers: action.payload,
        cityOffers: getOffersForCity(state.allOffers, PARIS.name),
        allCitiesData: citiesDataFromOffers(action.payload),
        isDataLoaded: true,
      };
    case ActionType.SetSortingSelection:
      return {...state, sortingSelection: action.payload};
    case ActionType.SetSelectedPoint:
      return {...state, selectedPoint: action.payload};
    case ActionType.ResetOfferDetails:
      return {...state, offerDetails: EMPTY_OFFER_DETAILS};
    case ActionType.SetOfferDetails:
      return {...state, offerDetails: {...state.offerDetails, offer: action.payload} };
    case ActionType.SetComments:
      return {...state, offerDetails: {...state.offerDetails, comments: action.payload} };
    case ActionType.SetNearPlaces:
      return {...state, offerDetails: {...state.offerDetails, nearPlaces: action.payload} };
    case ActionType.SetReviewSavingStatus:
      if (action.payload === OperationStatus.InProcess) {
        return {...state, review: {...state.review, reviewSavingStatus: action.payload}};
      } else {
        return {...state, review: {comment: '', rating: 0, reviewSavingStatus: action.payload}};
      }
    case ActionType.SetReview:
      return {
        ...state,
        review: {
          comment: action.payload.comment,
          rating: action.payload.rating,
          reviewSavingStatus: state.review.reviewSavingStatus,
        },
      };
    case ActionType.SetFavorites:
      return {...state, favorites: action.payload};
    case ActionType.SetAuthInfo:
      return {...state, currentUser: action.payload, isAuthorized: true};
    case ActionType.ConfirmAuthorization:
      return {...state, currentUser: action.payload, isAuthorized: true};
    case ActionType.Logout:
      return {...state, currentUser: guest, isAuthorized: false};
    default:
      return state;
  }
};

export {reducer};
