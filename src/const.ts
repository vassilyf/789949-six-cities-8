import {AuthInfo} from './types/types';

export enum AppRoute {
  Main = '/',
  SignIn = '/login',
  Favorites = '/favorites',
  Room = '/offer/:id'
}

export enum AuthorizationStatus {
  Unknown = 0,
  Auth,
  NoAuth
}

export const URL_MARKER_DEFAULT =
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/demo/interactive-map/pin.svg';

export const URL_MARKER_CURRENT =
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/demo/interactive-map/main-pin.svg';

export enum APIRoute {
  Offers = '/hotels',
  Login = '/login',
  Logout = '/logout',
}

export const guest: AuthInfo = {
  'avatar_url': '',
  'email': 'Guest',
  'id': 0,
  'is_pro': false,
  'name': 'Guest',
  'token': '',
};

export const AUTH_FAIL_MESSAGE = 'Ошибка аутентификации';
