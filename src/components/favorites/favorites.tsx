import {State} from '../../types/types';
import PageHeader from '../page-header/page-header';
import {connect, ConnectedProps} from 'react-redux';
import {ThunkAppDispatch} from '../../types/action';
import {fetchFavorites} from '../../store/api-actions';
import {useEffect} from 'react';
import {FavoritesEmpty} from './favorites-empty';
import {FavoritesList} from './favorites-list';

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

  return (
    <div className="page">
      <header className="header">
        <PageHeader/>
      </header>

      <main className="page__main page__main--favorites">
        <div className="page__favorites-container container">
          {favorites.length ? <FavoritesList favorites={favorites}/> : <FavoritesEmpty/>}
        </div>
      </main>
      <footer className="footer container">
        <a className="footer__logo-link" href="main.html">
          <img className="footer__logo" src="img/logo.svg" alt="6 cities logo" width="64" height="33"/>
        </a>
      </footer>
    </div>
  );
}

export default connector(Favorites);
