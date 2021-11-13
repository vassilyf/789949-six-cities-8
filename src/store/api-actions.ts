import {ThunkActionResult} from '../types/action';
import {APIRoute, AppRoute, AUTH_FAIL_MESSAGE, SAVE_REVIEW_ERROR_MESSAGE} from '../const';
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
import {commentAdapter} from './adapters/comment-adapter';
import {dropToken, saveToken} from '../services/token';

export const fetchOffersAction = (): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    const {data} = await api.get<Offer[]>(APIRoute.Hotels);
    dispatch(setOffers(data));
    dispatch(selectCity(PARIS.name));
  };

export const fetchOfferDetailsAction = (id: string): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    try {
      const {data} = await api.get<Offer>(`${APIRoute.Hotels}/${  id}`);
      dispatch(setOfferDetails(data));
    } catch(e) {
      // eslint-disable-next-line no-console
      console.log(e);
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
    const comments = data.map( (d) => commentAdapter(d));
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
      await api.post(`${APIRoute.Comments}/${hotelId}`, postData);
      dispatch(fetchCommentsAction(hotelId));
      dispatch(setReviewSavingStatus(OperationStatus.Done));
    } catch {
      toast.info(SAVE_REVIEW_ERROR_MESSAGE);
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
      dispatch(fetchFavorites());
      dispatch(markFavorite({hotelId: hotelId, isFavorite: isFavorite} ));
    } catch {
      toast.info(AUTH_FAIL_MESSAGE);
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
      toast.info(AUTH_FAIL_MESSAGE);
    }
  };

export const doLogout = (): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    await api.delete(APIRoute.Logout);
    dropToken();
    dispatch(logout());
  };
