import {AMSTERDAM, PARIS} from '../mocks/cities';
import {City, CityWithLocation, Offer, SortingSelection, State} from '../types/types';
import {Actions, ActionType} from '../types/action';
import {amsterdamOffers, parisOffers} from '../mocks/offers';

const initialState: State = {
  city: PARIS,
  offers: parisOffers,
  sortingSelection: SortingSelection.Popular,
  selectedPoint: undefined,
};

const getCityWithLocation = (city: City): CityWithLocation => {
  switch (city.id) {
    case PARIS.id: return PARIS;
    case AMSTERDAM.id: return AMSTERDAM;
    default: return Object.assign({}, city, {location: {latitude: 0, longitude: 0, zoom: 0} } );
  }
};

const getOffersForCity = (city: City): Offer[] => {
  switch (city.id) {
    case PARIS.id: return parisOffers;
    case AMSTERDAM.id: return amsterdamOffers;
    default: return [];
  }
};

const reducer = (state: State = initialState, action: Actions): State => {
  switch (action.type) {
    case ActionType.SelectCity:
      return {
        ...state,
        city: getCityWithLocation(action.payload),
        offers: getOffersForCity(action.payload),
        sortingSelection: SortingSelection.Popular,
        selectedPoint: undefined,
      };
    case ActionType.SetOffers:
      return {...state, offers: action.payload};
    case ActionType.SetSortingSelection:
      return {...state, sortingSelection: action.payload};
    case ActionType.SetSelectedPoint:
      return {...state, selectedPoint: action.payload};
    default:
      return state;
  }
};

export {reducer};
