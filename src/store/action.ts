import {
  ActionType,
  SelectCityAction,
  SetOffersAction,
  SetSelectedPointAction,
  SetSortingSelectionAction,
  SetAuthInfoAction,
  LogoutAction,
  ConfirmAuthorizationAction,
  RedirectAction
} from '../types/action';
import {AuthInfo, Offer, Point, SortingSelection} from '../types/types';
import {AppRoute} from '../const';

export const selectCity = (cityName: string): SelectCityAction => ({
  type: ActionType.SelectCity,
  payload: cityName,
});

export const setOffers = (offers: Offer[]): SetOffersAction => ({
  type: ActionType.SetOffers,
  payload: offers,
});

export const setSortingSelection = (selection: SortingSelection): SetSortingSelectionAction => ({
  type: ActionType.SetSortingSelection,
  payload: selection,
});

export const setSelectedPoint = (selection: Point | undefined): SetSelectedPointAction => ({
  type: ActionType.SetSelectedPoint,
  payload: selection,
});

export const setAuthInfo = (authInfo: AuthInfo): SetAuthInfoAction => ({
  type: ActionType.SetAuthInfo,
  payload: authInfo,
});

export const logout = (): LogoutAction => ({
  type: ActionType.Logout,
});

export const confirmAuthorization = (authInfo: AuthInfo): ConfirmAuthorizationAction => ({
  type: ActionType.ConfirmAuthorization,
  payload: authInfo,
});

// export const redirectToRoute = createAction(
//   ActionType.Redirect,
//   (url: AppRoute) => ({
//     payload: url,
//   }),
// );

export const redirectToRoute = (url: AppRoute): RedirectAction => ({
  type: ActionType.Redirect,
  payload: url,
});
