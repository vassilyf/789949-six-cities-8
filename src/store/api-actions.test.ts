import {Action} from 'redux';
import {
  doLogin,
  doLogout,
  fetchCommentsAction, fetchFavorites,
  fetchNearPlacesAction,
  fetchOfferDetailsAction,
  fetchOffersAction, saveFavorite, saveReview
} from './api-actions';
import {APIRoute, AppRoute} from '../const';
import {createAPI} from '../services/api';
import MockAdapter from 'axios-mock-adapter';
import thunk, {ThunkDispatch} from 'redux-thunk';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {AuthUser, OperationStatus, State} from '../types/types';
import {TEST_AMSTERDAM_OFFERS, TEST_PARIS_OFFERS} from '../mocks/offers';
import {
  logout, markFavorite,
  redirectTo,
  selectCity,
  setAuthInfo,
  setComments, setFavorites,
  setNearPlaces,
  setOfferDetails,
  setOffers, setReviewSavingStatus
} from './action';
import {PARIS} from '../mocks/cities';
import {TEST_AUTH_INFO} from '../mocks/auth';
import {TEST_COMMENT_GET_RESULT, TEST_COMMENT_GET_RESULT2} from '../mocks/comments';


describe('Async actions', () => {
  const onFakeHotels = jest.fn();
  const api = createAPI(onFakeHotels());
  const mockAPI = new MockAdapter(api);
  const middlewares = [thunk.withExtraArgument(api)];

  const mockStore = configureMockStore<
    State,
    Action,
    ThunkDispatch<State, typeof api, Action>
    >(middlewares);

  it('retrieve all hotels list', async () => {
    const store = mockStore();
    mockAPI
      .onGet(APIRoute.Hotels)
      .reply(200, TEST_AMSTERDAM_OFFERS);

    expect(store.getActions()).toEqual([]);

    await store.dispatch(fetchOffersAction());

    expect(store.getActions()).toEqual([
      setOffers(TEST_AMSTERDAM_OFFERS),
      selectCity(PARIS.name),
    ]);
  });

  it('do login', async () => {
    const store = mockStore();
    mockAPI
      .onPost(APIRoute.Login)
      .reply(200, TEST_AUTH_INFO);

    expect(store.getActions()).toEqual([]);
    const authUser: AuthUser = {email: '', password: 'pwd'};
    await store.dispatch(doLogin(authUser) );

    expect(store.getActions()).toEqual([
      setAuthInfo(TEST_AUTH_INFO),
      redirectTo(AppRoute.Main),
    ]);
  });

  it('do logout', async () => {
    const store = mockStore();
    mockAPI
      .onDelete(APIRoute.Logout)
      .reply(200, []);

    expect(store.getActions()).toEqual([]);
    await store.dispatch(doLogout() );

    expect(store.getActions()).toEqual([
      logout(),
    ]);
  });

  it('retrieve offer details, success', async () => {
    const store = mockStore();
    const offer = TEST_PARIS_OFFERS[0];
    mockAPI
      .onGet(`${APIRoute.Hotels}/${offer.id}`)
      .reply(200, offer);

    expect(store.getActions()).toEqual([]);
    await store.dispatch(fetchOfferDetailsAction(String(offer.id)));

    expect(store.getActions()).toEqual([
      setOfferDetails(offer),
    ]);
  });

  it('retrieve offer details, not found', async () => {
    const store = mockStore();
    const offer = TEST_PARIS_OFFERS[0];
    mockAPI
      .onGet(`${APIRoute.Hotels}/${offer.id}`)
      .reply(200, offer);

    expect(store.getActions()).toEqual([]);
    await store.dispatch(fetchOfferDetailsAction(String(offer.id + 1)));

    expect(store.getActions()).toEqual([
      redirectTo(AppRoute.NotFoundError),
    ]);
  });

  it('retrieve near places', async () => {
    const store = mockStore();
    const hotelId = 123;
    const nearPlaces = TEST_AMSTERDAM_OFFERS;
    mockAPI
      .onGet(`${APIRoute.Hotels}/${hotelId}/nearby`)
      .reply(200, nearPlaces);

    expect(store.getActions()).toEqual([]);
    await store.dispatch(fetchNearPlacesAction(String(hotelId)));

    expect(store.getActions()).toEqual([
      setNearPlaces(nearPlaces),
    ]);
  });

  it('retrieve comments', async () => {
    const store = mockStore();
    const hotelId = 123;
    const comments = [...TEST_COMMENT_GET_RESULT, ...TEST_COMMENT_GET_RESULT2];
    mockAPI
      .onGet(`${APIRoute.Comments}/${hotelId}`)
      .reply(200, comments);

    expect(store.getActions()).toEqual([]);
    await store.dispatch(fetchCommentsAction(String(hotelId)));

    expect(store.getActions()).toEqual([
      setComments(comments),
    ]);
  });

  it('save review', async () => {
    const store = mockStore();
    const hotelId = 123;
    const comments = [...TEST_COMMENT_GET_RESULT, ...TEST_COMMENT_GET_RESULT2];
    mockAPI
      .onPost(`${APIRoute.Comments}/${hotelId}`)
      .reply(200, comments);

    expect(store.getActions()).toEqual([]);
    await store.dispatch(saveReview(String(hotelId), 1, 'comment text'));

    expect(store.getActions()).toEqual([
      setReviewSavingStatus(OperationStatus.InProcess),
      setComments(comments),
      setReviewSavingStatus(OperationStatus.Done),
    ]);
  });

  it('retrieve favorites list', async () => {
    const store = mockStore();
    const favorites = TEST_AMSTERDAM_OFFERS;

    mockAPI
      .onGet(APIRoute.Favorite)
      .reply(200, favorites);

    expect(store.getActions()).toEqual([]);
    await store.dispatch(fetchFavorites());

    expect(store.getActions()).toEqual([
      setFavorites(favorites),
    ]);
  });

  it('save favorite place', async () => {
    const store = mockStore();
    const hotelId = 123;
    const favorites = TEST_AMSTERDAM_OFFERS;

    mockAPI
      .onPost(`${APIRoute.Favorite}/${hotelId}/1`)
      .reply(200, []);
    mockAPI
      .onGet(APIRoute.Favorite)
      .reply(200, favorites);

    expect(store.getActions()).toEqual([]);
    await store.dispatch(saveFavorite(hotelId, true));

    expect(store.getActions()).toEqual([
      markFavorite({hotelId: hotelId, isFavorite: true}),
    ]);
  });

});
