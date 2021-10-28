import {ActionType, SelectCityAction, SetOffersAction} from '../types/action';
import {City, Offer} from '../types/types';

export const selectCity = (city: City): SelectCityAction => ({
  type: ActionType.SelectCity,
  payload: city,
});

export const setOffers = (offers: Offer[]): SetOffersAction => ({
  type: ActionType.SetOffers,
  payload: offers,
});
