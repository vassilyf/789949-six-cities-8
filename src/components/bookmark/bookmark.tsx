import {Offer, State} from '../../types/types';
import {ThunkAppDispatch} from '../../types/action';
import {connect, ConnectedProps} from 'react-redux';
import {AppRoute, BOOKMARK_IN_BOOKMARKS, BOOKMARK_TO_BOOKMARKS} from '../../const';
import {redirectTo} from '../../store/action';

export type BookmarkProps = {
  offer: Offer,
  onSaveFavorite: (hotelId: number, isFavorite: boolean) => void
}

const mapStateToProps = ({auth}: State) => ({
  isAuthorized: auth.isAuthorized,
});

const mapDispatchToProps = (dispatch: ThunkAppDispatch) => ({
  onToLogin() {
    dispatch(redirectTo(AppRoute.SignIn));
  },
});

const connector = connect(mapStateToProps, mapDispatchToProps);
type ConnecteBookmarkProps = ConnectedProps<typeof connector> & BookmarkProps;

export function Bookmark({offer, onSaveFavorite, onToLogin, isAuthorized}: ConnecteBookmarkProps ): JSX.Element {
  return (
    <div className="place-card__price-wrapper">
      <div className="place-card__price">
        <b className="place-card__price-value">&euro;{offer.price}</b>
        <span className="place-card__price-text">&#47;&nbsp;night</span>
      </div>
      <button className={`place-card__bookmark-button ${offer.is_favorite && 'place-card__bookmark-button--active'} button`} type="button"
        onClick={ () => isAuthorized ? onSaveFavorite(offer.id, !offer.is_favorite) : onToLogin() }
      >
        <svg className="place-card__bookmark-icon" width="18" height="19">
          <use xlinkHref="#icon-bookmark"></use>
        </svg>
        <span className="visually-hidden">{offer.is_favorite ? BOOKMARK_IN_BOOKMARKS : BOOKMARK_TO_BOOKMARKS}</span>
      </button>
    </div>
  );
}

export default connector(Bookmark);

