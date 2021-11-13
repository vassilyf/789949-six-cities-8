import {createSelector} from 'reselect';
import {Offer, OffersState} from '../../types/types';
import {PARIS} from '../../mocks/cities';

export const getCityWithLocation = createSelector( (state: OffersState, cityName: string) => state.allCitiesData, (state: OffersState, cityName: string) => cityName,
  (cities, cityName) => cities.find( (c) => c.name === cityName) ?? PARIS,
);

export const getOffersForCity = createSelector( (state: OffersState) => state.allOffers, (state: OffersState) => state.city.name,
  (offers, cityName) => offers.filter( (o) => o.city.name === cityName),
);

export const citiesDataFromOffers = createSelector( (offers: Offer[]) => offers, (offers) =>
  Object.values(Object.fromEntries(offers.map( (o) => [o.city.name, o.city] ) ) ),
);
