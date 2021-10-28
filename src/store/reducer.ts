import {PARIS, AMSTERDAM} from '../mocks/cities';
import {City, CityWithLocation, Offer, State} from '../types/types';
import {Actions, ActionType} from '../types/action';
import {parisOffers, amsterdamOffers} from '../mocks/offers';

const initialState: State = {
  city: PARIS,
  offers: parisOffers,
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
      return {...state, city: getCityWithLocation(action.payload), offers: getOffersForCity(action.payload) };
    case ActionType.SetOffers:
      return {...state, offers: action.payload};
    default:
      return state;
  }
};

export {reducer};
