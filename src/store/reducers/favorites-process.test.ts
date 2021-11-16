import {FavoritesState, Offer} from '../../types/types';
import {ActionType} from '../../types/action';
import {TEST_AMSTERDAM_OFFERS, TEST_PARIS_OFFERS} from '../../mocks/offers';
import {favoritesProcess} from './favorites-process';


describe('Reducer: favorites', () => {
  it('set favorites', () => {
    const state: FavoritesState =  {favorites: []};
    const favorites: Offer[] = [TEST_PARIS_OFFERS[0], TEST_AMSTERDAM_OFFERS[1]];
    const setFavoritesAction = {
      type: ActionType.SetFavorites,
      payload: favorites,
    };
    expect(favoritesProcess(state, setFavoritesAction))
      .toEqual({favorites});
  });
});
