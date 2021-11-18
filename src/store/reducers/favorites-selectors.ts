import {Offer} from '../../types/types';
import {createSelector} from 'reselect';

type FavoritesMap = {
  [key: string]: Offer[],
}

const getFavoritesByCity = (favorites: Offer[]) =>
  favorites.reduce( (favoritesMap: FavoritesMap, offer) => {
    const name: string = offer.city.name;
    if (! (name in favoritesMap) ) {
      favoritesMap[offer.city.name] = [];
    }
    favoritesMap[offer.city.name].push(offer);
    return favoritesMap;
  }, {});

export const selectFavoritesByCity = createSelector((favorites: Offer[]) => favorites,
  (favorites) => getFavoritesByCity(favorites));
