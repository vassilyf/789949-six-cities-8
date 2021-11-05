import {AuthInfo} from './types/types';

export enum AppRoute {
  Main = '/',
  SignIn = '/login',
  Favorites = '/favorites',
  Room = '/offer/:id',
  ApplicationError = '/error',
  NotFoundError = '/not-found',
}

export const URL_MARKER_DEFAULT =
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/demo/interactive-map/pin.svg';

export const URL_MARKER_CURRENT =
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/demo/interactive-map/main-pin.svg';

export enum APIRoute {
  Hotels = '/hotels',
  Login = '/login',
  Logout = '/logout',
  Comments = '/comments',
  Comment = '/comment',
  Favorite = '/favorite'
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
export const SAVE_REVIEW_ERROR_MESSAGE = 'Ошибка сохранения комментария';

export const MAX_COMMENTS_ON_PAGE = 10;
export const MIN_COMMENT_SIZE = 50;
export const MAX_COMMENT_SIZE = 200;
