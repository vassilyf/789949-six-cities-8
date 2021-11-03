import {PARIS} from '../mocks/cities';
import {CityWithLocation, Offer, SortingSelection, State} from '../types/types';
import {Actions, ActionType} from '../types/action';
import {AuthorizationStatus, guest} from '../const';

const initialState: State = {
  allCitiesNames: ['Paris', 'Cologne', 'Brussels', 'Amsterdam', 'Hamburg', 'Dusseldorf'],
  allCitiesData: [],
  allOffers: [],
  city: PARIS,
  offers: [],
  sortingSelection: SortingSelection.Popular,
  selectedPoint: undefined,
  isDataLoaded: false,
  authorizationStatus: AuthorizationStatus.Unknown,
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
        offers: getOffersForCity(state.allOffers, action.payload),
        sortingSelection: SortingSelection.Popular,
        selectedPoint: undefined,
      };
    case ActionType.SetOffers:
      return {
        ...state,
        allOffers: action.payload,
        offers: getOffersForCity(state.allOffers, PARIS.name),
        allCitiesData: citiesDataFromOffers(action.payload),
        isDataLoaded: true,
      };
    case ActionType.SetSortingSelection:
      return {...state, sortingSelection: action.payload};
    case ActionType.SetSelectedPoint:
      return {...state, selectedPoint: action.payload};
    case ActionType.SetAuthInfo:
      return {...state, currentUser: action.payload, authorizationStatus: AuthorizationStatus.Auth};
    case ActionType.ConfirmAuthorization:
      return {...state, currentUser: action.payload, authorizationStatus: AuthorizationStatus.Auth};
    case ActionType.Logout:
      return {...state, currentUser: guest, authorizationStatus: AuthorizationStatus.NoAuth};
    default:
      return state;
  }
};

export {reducer};
