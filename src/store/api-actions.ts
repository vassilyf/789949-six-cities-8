import {ThunkActionResult} from '../types/action';
import {
  APIRoute,
  AppRoute,
  AUTH_FAIL_MESSAGE, GET_SERVER_DATA_ERROR_MESSAGE,
  SAVE_FAVORITE_ERROR_MESSAGE,
  SAVE_REVIEW_ERROR_MESSAGE
} from '../const';
import {
  selectCity,
  setAuthInfo,
  setOffers,
  logout,
  redirectTo,
  setOfferDetails,
  setNearPlaces,
  setComments,
  setReviewSavingStatus,
  setFavorites, markFavorite
} from './action';
import {Offer, AuthInfo, AuthUser, RawComment, CommentPost, OperationStatus} from '../types/types';
import {PARIS} from '../mocks/cities';
import {toast} from 'react-toastify';
import {adaptComment} from './adapters/adapt-comment';
import {dropToken, saveToken} from '../services/token';

export const fetchOffersAction = (): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    try {
      const {data} = await api.get<Offer[]>(APIRoute.Hotels);
      dispatch(setOffers(data));
      dispatch(selectCity(PARIS.name));
    } catch {
      toast.error(GET_SERVER_DATA_ERROR_MESSAGE);
      dispatch(setOffers([]));
    }
  };

export const fetchOfferDetailsAction = (id: string): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    try {
      const {data} = await api.get<Offer>(`${APIRoute.Hotels}/${  id}`);
      dispatch(setOfferDetails(data));
    } catch(e) {
      dispatch(redirectTo(AppRoute.NotFoundError) );
    }
  };

export const fetchNearPlacesAction = (id: string): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    const {data} = await api.get<Offer[]>(`${APIRoute.Hotels}/${ id}/nearby`);
    dispatch(setNearPlaces(data));
  };

export const fetchCommentsAction = (id: string): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    const {data} = await api.get<RawComment[]>(`${APIRoute.Comments}/${ id}`);
    const comments = data.map( (d) => adaptComment(d));
    dispatch(setComments(comments));
  };

export const saveReview = (hotelId: string, rating: number, comment: string): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    dispatch(setReviewSavingStatus(OperationStatus.InProcess));
    const postData: CommentPost = {
      comment: comment,
      rating: rating,
    };
    try {
      const {data} = await api.post<RawComment[]>(`${APIRoute.Comments}/${hotelId}`, postData);
      const comments = data.map( (d) => adaptComment(d));
      dispatch(setComments(comments));
      dispatch(setReviewSavingStatus(OperationStatus.Done));
    } catch {
      toast.error(SAVE_REVIEW_ERROR_MESSAGE);
      dispatch(setReviewSavingStatus(OperationStatus.Done));
    }
  };

export const fetchFavorites = (): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    const {data} = await api.get<Offer[]>(APIRoute.Favorite);
    dispatch(setFavorites(data));
  };

export const saveFavorite = (hotelId: number, isFavorite: boolean): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    try {
      await api.post<AuthInfo>(`${APIRoute.Favorite}/${hotelId}/${isFavorite ? 1 : 0}`);
      dispatch(markFavorite({hotelId: hotelId, isFavorite: isFavorite} ));
    } catch {
      toast.error(SAVE_FAVORITE_ERROR_MESSAGE);
    }
  };

export const removeFavorite = (hotelId: number): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    try {
      await api.post<AuthInfo>(`${APIRoute.Favorite}/${hotelId}/0}`);
      dispatch(fetchFavorites());
    } catch {
      toast.error(SAVE_FAVORITE_ERROR_MESSAGE);
    }
  };

export const checkAuthAction = (): ThunkActionResult =>
  async (dispatch, _getState, api) => {
    try {
      const {data} = await api.get(APIRoute.Login);
      dispatch(setAuthInfo(data));
    } catch {
      dispatch(logout());
    }
  };

export const doLogin = (authUser: AuthUser): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    try {
      const {data} = await api.post<AuthInfo>(APIRoute.Login, authUser);
      saveToken(data.token);
      dispatch(setAuthInfo(data));
      dispatch(redirectTo(AppRoute.Main));
    } catch {
      toast.error(AUTH_FAIL_MESSAGE);
    }
  };

export const doLogout = (): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    await api.delete(APIRoute.Logout);
    dropToken();
    dispatch(logout());
  };
