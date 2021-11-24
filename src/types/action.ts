import {Offer, SortingSelection, Point, State, AuthInfo, Comment, OperationStatus, CommentPost} from './types';
import {ThunkAction, ThunkDispatch } from 'redux-thunk';
import {AxiosInstance} from 'axios';
import {AppRoute} from '../const';

export enum ActionType {
  SelectCity = 'offers/selectCity',
  SetOffers = 'offers/setOffers',
  SetSortingSelection = 'offers/setSelectionMode',
  SetSelectedPoint = 'offers/setSelectedPoint',
  SetAuthInfo = 'user/setAuthInfo',
  Logout = 'user/logout',
  Redirect = 'common/redirect',
  ResetOfferDetails = 'details/resetofferdetails',
  SetOfferDetails = 'details/setofferdetails',
  SetNearPlaces = 'details/setnearplaces',
  SetComments = 'details/setcomments',
  SetReview = 'details/setreview',
  SetReviewSavingStatus = 'details/setreviewsendingstatus',
  SetFavorites = 'favorites/setfavorites',
  MarkFavorite = 'favorites/markfavorite',
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

export type RedirectAction = {
  type: ActionType.Redirect;
  payload: AppRoute;
};

// clear one offer details selection before fetching data
export type ResetOfferDetailsAction = {
  type: ActionType.ResetOfferDetails;
};

export type SetOfferDetailsAction = {
  type: ActionType.SetOfferDetails;
  payload: Offer;
};

export type SetNearPlacesAction = {
  type: ActionType.SetNearPlaces;
  payload: Offer[];
};

export type SetCommentsAction = {
  type: ActionType.SetComments;
  payload: Comment[];
};

export type SetReviewSavingStatusAction = {
  type: ActionType.SetReviewSavingStatus;
  payload: OperationStatus;
};

export type SetReviewAction = {
  type: ActionType.SetReview;
  payload: CommentPost;
};

export type SetFavoritesAction = {
  type: ActionType.SetFavorites;
  payload: Offer[];
};

export type FavoriteMark = {
  hotelId: number,
  isFavorite: boolean
}

export type MarkFavoriteAction = {
  type: ActionType.MarkFavorite;
  payload: FavoriteMark;
};


export type Actions =
  SelectCityAction
  | SetOffersAction
  | SetSortingSelectionAction
  | SetSelectedPointAction
  | SetAuthInfoAction
  | LogoutAction
  | RedirectAction
  | SetOfferDetailsAction
  | SetNearPlacesAction
  | SetCommentsAction
  | ResetOfferDetailsAction
  | SetReviewSavingStatusAction
  | SetReviewAction
  | SetFavoritesAction
  | MarkFavoriteAction;

export type ThunkActionResult<R = Promise<void>> = ThunkAction<R, State, AxiosInstance, Actions>;

export type ThunkAppDispatch = ThunkDispatch<State, AxiosInstance, Actions>;
