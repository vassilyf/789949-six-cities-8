import {City, Offer} from './types';

export enum ActionType {
  SelectCity = 'wheretogo/selectCity',
  SetOffers = 'wheretogo/setOffers',
}

export type SelectCityAction = {
  type: ActionType.SelectCity;
  payload: City;
};

export type SetOffersAction = {
  type: ActionType.SetOffers;
  payload: Offer[];
};

export type Actions = SelectCityAction | SetOffersAction;
