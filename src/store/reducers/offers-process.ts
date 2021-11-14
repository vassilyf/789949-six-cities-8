import {createReducer} from '@reduxjs/toolkit';
import {Offer, OffersState, SortingSelection} from '../../types/types';
import {selectCity, setOffers, setSelectedPoint, setSortingSelection, markFavorite} from '../action';
import {AMSTERDAM, PARIS} from '../../mocks/cities';
import {citiesDataFromOffers, getCityWithLocation, getOffersForCity} from './offers-selectors';

const initialState: OffersState = {
  allCitiesNames: [PARIS.name, 'Cologne', 'Brussels', 'Amsterdam', 'Hamburg', 'Dusseldorf'],
  allCitiesData: [],
  allOffers: [],
  city: PARIS,
  cityOffers: [],
  sortingSelection: SortingSelection.Popular,
  selectedPoint: undefined,
  isDataLoaded: false,
};

const excludeCityOffersForTesting = (offers: Offer[], cityName: string) =>
  offers.filter( (o) => o.city.name !== cityName);

const bookmarkOffer = (offers: Offer[], hotelId: number, isFavorite: boolean) => {
  const offer = offers.find( (o) => o.id === hotelId);
  if (offer) {
    // eslint-disable-next-line camelcase
    offer.is_favorite = isFavorite;
  }
};

const offersProcess = createReducer(initialState, (builder) => {
  builder
    .addCase(setOffers, (state, action) => {
      state.allOffers = excludeCityOffersForTesting(action.payload, AMSTERDAM.name);
      state.city = initialState.city;
      state.cityOffers = getOffersForCity(state);
      state.allCitiesData = citiesDataFromOffers(action.payload);
      state.isDataLoaded = true;
    })
    .addCase(selectCity, (state, action) => {
      state.city = getCityWithLocation(state, action.payload);
      state.cityOffers = getOffersForCity(state);
      state.sortingSelection = SortingSelection.Popular;
      state.selectedPoint = undefined;
    })
    .addCase(setSortingSelection, (state, action) => {
      state.sortingSelection = action.payload;
    })
    .addCase(setSelectedPoint, (state, action) => {
      state.selectedPoint = action.payload;
    })
    .addCase(markFavorite, (state, action) => {
      bookmarkOffer(state.allOffers, action.payload.hotelId, action.payload.isFavorite);
      bookmarkOffer(state.cityOffers, action.payload.hotelId, action.payload.isFavorite);
    });
});

export {offersProcess};
