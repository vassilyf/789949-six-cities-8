import {City, Offer, SortingSelection, Point} from './types';

export enum ActionType {
  SelectCity = 'wheretogo/selectCity',
  SetOffers = 'wheretogo/setOffers',
  SetSortingSelection = 'wheretogo/setSelectionMode',
  SetSelectedPoint = 'wheretogo/setSelectedPoint',
}

export type SelectCityAction = {
  type: ActionType.SelectCity;
  payload: City;
};

export type SetOffersAction = {
  type: ActionType.SetOffers;
  payload: Offer[];
};

export type SetSortingSelectionAction = {
  type: ActionType.SetSortingSelection;
  payload: SortingSelection;
};

export type SetSelectedPointAction = {
  type: ActionType.SetSelectedPoint;
  payload: Point | undefined;
};

export type Actions =
  SelectCityAction
  | SetOffersAction
  | SetSortingSelectionAction
  | SetSelectedPointAction;
