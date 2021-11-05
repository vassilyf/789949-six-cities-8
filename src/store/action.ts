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
import {Comment, AuthInfo, Offer, Point, SortingSelection, OperationStatus, CommentPost} from '../types/types';
import {AppRoute} from '../const';
import {createAction} from '@reduxjs/toolkit';


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

export const redirectTo = (url: AppRoute): RedirectAction => ({
  type: ActionType.Redirect,
  payload: url,
});

export const resetOfferDetails = createAction(
  ActionType.ResetOfferDetails, () => ({ payload: undefined}),
);

export const setOfferDetails = createAction(
  ActionType.SetOfferDetails, (offer: Offer) => ({ payload: offer}),
);

export const setNearPlaces = createAction(
  ActionType.SetNearPlaces, (offers: Offer[]) => ({ payload: offers}),
);

export const setComments = createAction(
  ActionType.SetComments, (comments: Comment[]) => ({ payload: comments}),
);

export const setReviewSavingStatus = createAction(
  ActionType.SetReviewSavingStatus, (status: OperationStatus) => ({ payload: status}),
);

export const setReview = createAction(
  ActionType.SetReview, (review: CommentPost) => ({ payload: review}),
);

export const setFavorites = createAction(
  ActionType.SetFavorites, (favorites: Offer[]) => ({ payload: favorites}),
);

// export const setReviewSavingStatus = (status: OperationStatus): SetReviewSavingStatusAction => ({
//   type: ActionType.SetReviewSavingStatus,
//   payload: status,
// });
