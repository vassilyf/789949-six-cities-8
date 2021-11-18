import {State} from '../../types/types';
import {FavoritesCard} from '../favorites-card/favorites-card';
import PageHeader from '../page-header/page-header';
import {connect, ConnectedProps} from 'react-redux';
import {ThunkAppDispatch} from '../../types/action';
import {fetchFavorites} from '../../store/api-actions';
import {useEffect} from 'react';
import {selectFavoritesByCity} from '../../store/reducers/favorites-selectors';

const mapStateToProps = ({favorites}: State) => ({
  favorites: favorites.favorites,
});

const mapDispatchToProps = (dispatch: ThunkAppDispatch) => ({
  doFetchFavorites() {
    dispatch(fetchFavorites());
  },
});

const connector = connect(mapStateToProps, mapDispatchToProps);
type ConnectedPageHeaderProps = ConnectedProps<typeof connector>;

function Favorites({favorites, doFetchFavorites}: ConnectedPageHeaderProps): JSX.Element {
  useEffect( () => {
    doFetchFavorites();
  }, [doFetchFavorites]);

  const favoritesByCity = selectFavoritesByCity(favorites);
  return (
    <div className="page">
      <header className="header">
        <PageHeader/>
      </header>

      <main className="page__main page__main--favorites">
        <div className="page__favorites-container container">
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
        </div>
      </main>
    </div>
  );
}

export default connector(Favorites);
