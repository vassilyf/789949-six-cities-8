import {Offer, SortingSelection, Point, State, AuthInfo} from './types';
import {ThunkAction, ThunkDispatch } from 'redux-thunk';
import {AxiosInstance} from 'axios';
import {AppRoute} from '../const';

export enum ActionType {
  SelectCity = 'wheretogo/selectCity',
  SetOffers = 'wheretogo/setOffers',
  SetSortingSelection = 'wheretogo/setSelectionMode',
  SetSelectedPoint = 'wheretogo/setSelectedPoint',
  SetAuthInfo = 'wheretogo/setAuthInfo',
  Logout = 'wheretogo/logout',
  ConfirmAuthorization = 'wheretogo/confirmAuthorization',
  Redirect = 'wheretogo/redirect',
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

export type SetAuthInfoAction = {
  type: ActionType.SetAuthInfo;
  payload: AuthInfo;
};

export type LogoutAction = {
  type: ActionType.Logout;
};

export type ConfirmAuthorizationAction = {
  type: ActionType.ConfirmAuthorization;
  payload: AuthInfo;
};

export type RedirectAction = {
  type: ActionType.Redirect;
  payload: AppRoute;
};

export type Actions =
  SelectCityAction
  | SetOffersAction
  | SetSortingSelectionAction
  | SetSelectedPointAction
  | SetAuthInfoAction
  | LogoutAction
  | ConfirmAuthorizationAction
  | RedirectAction;

export type ThunkActionResult<R = Promise<void>> = ThunkAction<R, State, AxiosInstance, Actions>;

export type ThunkAppDispatch = ThunkDispatch<State, AxiosInstance, Actions>;
