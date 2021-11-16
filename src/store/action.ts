import {
  ActionType, FavoriteMark,
  RedirectAction
} from '../types/action';
import {Comment, AuthInfo, Offer, Point, SortingSelection, OperationStatus, CommentPost} from '../types/types';
import {AppRoute} from '../const';
import {createAction} from '@reduxjs/toolkit';

export const selectCity = createAction(
  ActionType.SelectCity, (cityName: string) => ({ payload: cityName}),
);

export const setOffers = createAction(
  ActionType.SetOffers, (offers: Offer[]) => ({ payload: offers}),
);

export const setSortingSelection = createAction(
  ActionType.SetSortingSelection, (selection: SortingSelection) => ({ payload: selection}),
);

export const setSelectedPoint = createAction(
  ActionType.SetSelectedPoint, (selection: Point | undefined) => ({ payload: selection}),
);

export const setAuthInfo = createAction(
  ActionType.SetAuthInfo, (authInfo: AuthInfo) => ({ payload: authInfo}),
);

export const logout = createAction(
  ActionType.Logout, () => ({ payload: undefined}),
);

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

export const markFavorite = createAction(
  ActionType.MarkFavorite, (favoriteMark: FavoriteMark) => ({ payload: favoriteMark}),
);


