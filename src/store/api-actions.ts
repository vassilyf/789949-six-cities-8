import {ThunkActionResult} from '../types/action';
import {APIRoute, AppRoute, AUTH_FAIL_MESSAGE} from '../const';
import {selectCity, setAuthInfo, setOffers, confirmAuthorization, logout, redirectToRoute} from './action';
import {Offer, AuthInfo, AuthUser} from '../types/types';
import {PARIS} from '../mocks/cities';
import {toast} from 'react-toastify';

export const fetchOffersAction = (): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    const {data} = await api.get<Offer[]>(APIRoute.Offers);
    dispatch(setOffers(data));
    dispatch(selectCity(PARIS.name));
  };

export const checkAuthAction = (): ThunkActionResult =>
  async (dispatch, _getState, api) => {
    try {
      const {data} = await api.get(APIRoute.Login);
      dispatch(confirmAuthorization(data));
    } catch {
      dispatch(logout());
      toast.info(AUTH_FAIL_MESSAGE);
    }
  };

export const doLogin = (authUser: AuthUser): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    const {data} = await api.post<AuthInfo>(APIRoute.Login, authUser);
    dispatch(setAuthInfo(data));
    dispatch(redirectToRoute(AppRoute.Main));
  };

export const doLogout = (): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    await api.delete(APIRoute.Logout);
    dispatch(logout());
  };
