import {Offer, State} from '../../types/types';
import {ThunkAppDispatch} from '../../types/action';
import {saveFavorite} from '../../store/api-actions';
import {connect, ConnectedProps} from 'react-redux';
import {AppRoute} from '../../const';
import {redirectTo} from '../../store/action';

export type BookmarkProps = {
  offer: Offer
}

const mapStateToProps = ({auth}: State) => ({
  isAuthorized: auth.isAuthorized,
});


const mapDispatchToProps = (dispatch: ThunkAppDispatch) => ({
  onSetFavorite(hotelId: number, isFavorite: boolean) {
    dispatch(saveFavorite(hotelId, isFavorite));
  },
  toLogin() {
    dispatch(redirectTo(AppRoute.SignIn));
  },
});

const connector = connect(mapStateToProps, mapDispatchToProps);
type ConnecteBookmarkProps = ConnectedProps<typeof connector> & BookmarkProps;

function Bookmark({offer, onSetFavorite, toLogin, isAuthorized}: ConnecteBookmarkProps ): JSX.Element {
  return (
    <div className="place-card__price-wrapper">
      <div className="place-card__price">
        <b className="place-card__price-value">&euro;{offer.price}</b>
        <span className="place-card__price-text">&#47;&nbsp;night</span>
      </div>
      <button className={`place-card__bookmark-button ${offer.is_favorite ? 'place-card__bookmark-button--active' : ''} button`} type="button"
        onClick={ () => isAuthorized ? onSetFavorite(offer.id, !offer.is_favorite) : toLogin() }
      >
        <svg className="place-card__bookmark-icon" width="18" height="19">
          <use xlinkHref="/#icon-bookmark"></use>
        </svg>
        <span className="visually-hidden">{offer.is_favorite ? 'In bookmarks' : 'To bookmarks'}</span>
      </button>
    </div>
  );
}

export default connector(Bookmark);
