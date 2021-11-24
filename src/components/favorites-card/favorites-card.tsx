import {Offer} from '../../types/types';
import Bookmark from '../bookmark/bookmark';
import { Link } from 'react-router-dom';
import {AppRoute} from '../../const';
import {ThunkAppDispatch} from '../../types/action';
import {connect, ConnectedProps} from 'react-redux';
import {removeFavorite} from '../../store/api-actions';

type FavoritesCardProps = {
  offer: Offer
}

const mapDispatchToProps = (dispatch: ThunkAppDispatch) => ({
  saveFavorite(hotelId: number, isFavorite: boolean) {
    dispatch(removeFavorite(hotelId));
  },
});

const connector = connect(null, mapDispatchToProps);
type ConnectedFavoritesCardProps = ConnectedProps<typeof connector> & FavoritesCardProps;


function FavoritesCard({offer, saveFavorite}: ConnectedFavoritesCardProps): JSX.Element {
  return (
    <article className="favorites__card place-card">
      <div className="favorites__image-wrapper place-card__image-wrapper">
        <Link to={`${AppRoute.Room}/${offer.id}`}>
          <img className="place-card__image" src={offer.images[0]} width="150" height="110"  alt="Place"/>
        </Link>
      </div>
      <div className="favorites__card-info place-card__info">
        <Bookmark offer={offer} onSaveFavorite={saveFavorite}/>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{width: `${offer.rating/5*100}%`}}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to={`${AppRoute.Room}/${offer.id}`} >{offer.title}</Link>
        </h2>
        <p className="place-card__type" style={{textTransform: 'capitalize'}}>{offer.type}</p>
      </div>
    </article>
  );
}

export default connector(FavoritesCard);
