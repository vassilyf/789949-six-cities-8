import {Offer, SortingSelection, Point, State} from './types';
import {ThunkAction, ThunkDispatch } from 'redux-thunk';
import {AxiosInstance} from 'axios';

export enum ActionType {
  SelectCity = 'wheretogo/selectCity',
  SetOffers = 'wheretogo/setOffers',
  SetSortingSelection = 'wheretogo/setSelectionMode',
  SetSelectedPoint = 'wheretogo/setSelectedPoint',
}

export type SelectCityAction = {
  type: ActionType.SelectCity;
  payload: string; // cityName
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

export type ThunkActionResult<R = Promise<void>> = ThunkAction<R, State, AxiosInstance, Actions>;

export type ThunkAppDispatch = ThunkDispatch<State, AxiosInstance, Actions>;
