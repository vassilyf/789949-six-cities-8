import {createSelector} from 'reselect';
import {Offer} from '../../types/types';


export const getOfferPoint = createSelector( (offer: Offer) => offer, (offer) =>
  Object.assign({}, offer.location, {title: offer.title}),
);

export const getNearPoints = createSelector( (nearPlaces: Offer[]) => nearPlaces, (nearPlaces) =>
  nearPlaces.map((place) => Object.assign({}, place.location, {title: place.title})),
);
