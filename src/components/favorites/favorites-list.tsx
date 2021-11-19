import {FavoritesCard} from '../favorites-card/favorites-card';
import {selectFavoritesByCity} from '../../store/reducers/favorites-selectors';
import {Offer} from '../../types/types';

type FavoritesListProps = {
  favorites: Offer[]
}

export function FavoritesList({favorites}: FavoritesListProps): JSX.Element {
  const favoritesByCity = selectFavoritesByCity(favorites);

  return (
    <section className="favorites">
      <h1 className="favorites__title">Saved listing</h1>
      <ul className="favorites__list">
        { Object.keys(favoritesByCity).map( (name) =>
          (
            <li key={name} className="favorites__locations-items">
              <div className="favorites__locations locations locations--current">
                <div className="locations__item">
                  <a className="locations__item-link" href="/#">
                    <span>{name}</span>
                  </a>
                </div>
              </div>
              <div className="favorites__places">
                {favoritesByCity[name].map(
                  (favoriteOffer) =>
                    <FavoritesCard key={favoriteOffer.id} offer={favoriteOffer}/>,
                )}
              </div>
            </li>
          ),
        )}
      </ul>
    </section>
  );
}
