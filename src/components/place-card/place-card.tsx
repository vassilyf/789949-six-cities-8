import { Link } from 'react-router-dom';
import {Offer, Point} from '../../types/types';
import {ThunkAppDispatch} from '../../types/action';
import {setSelectedPoint} from '../../store/action';
import {connect, ConnectedProps} from 'react-redux';
import Bookmark, {BookmarkProps} from '../bookmark/bookmark';
import {getPointFromLocation} from '../../store/reducers/offers-selectors';
import {saveFavorite} from '../../store/api-actions';

type PlaceCardProps = BookmarkProps;

export enum WrapperType {
  Cities = 'cities',
  Near = 'near'
}

type UniversalPlaceCardProps = {
  offer: Offer,
  cardType: WrapperType
}

const mapDispatchToProps = (dispatch: ThunkAppDispatch) => ({
  onSelectPoint(selectedPoint: Point | undefined) {
    dispatch(setSelectedPoint(selectedPoint));
  },
  saveFavoritePlace(hotelId: number, isFavorite: boolean) {
    dispatch(saveFavorite(hotelId, isFavorite));
  },
});

const connector = connect(null, mapDispatchToProps);
type ConnectedUniversalPlaceCardProps = ConnectedProps<typeof connector> & UniversalPlaceCardProps;

function PlaceCardContent(props: PlaceCardProps ): JSX.Element {
  return (
    <div className="place-card__info">
      <Bookmark {...props}/>
      <div className="place-card__rating rating">
        <div className="place-card__stars rating__stars">
          <span style={{width: `${props.offer.rating/5*100}%`}}></span>
          <span className="visually-hidden">Rating</span>
        </div>
      </div>
      <h2 className="place-card__name">
        <Link to={`/offer/${props.offer.id}`}>{props.offer.title}</Link>
      </h2>
      <p className="place-card__type" style={{textTransform: 'capitalize'}}>{props.offer.type}</p>
    </div>
  );
}

function UniversalPlaceCard({offer, cardType, onSelectPoint, saveFavoritePlace}: ConnectedUniversalPlaceCardProps): JSX.Element {
  return (
    <article className={`${cardType === WrapperType.Cities ? 'cities__place-card' : 'near-places__card' } place-card`}>
      <div className={`${cardType === WrapperType.Cities ? 'cities__image-wrapper' : 'near-places__image-wrapper'} place-card__image-wrapper`}
        onMouseEnter={ (e) => {onSelectPoint( getPointFromLocation(offer.location, offer.title) );} }
        onMouseLeave={ (e) => {onSelectPoint(undefined);} }
      >
        <Link to={`/offer/${offer.id}`}>
          <img className="place-card__image" src={offer.preview_image} width="260" height="200" alt="Place"/>
        </Link>
      </div>
      <PlaceCardContent offer={offer} onSaveFavorite={saveFavoritePlace}/>
    </article>
  );
}

export default connector(UniversalPlaceCard);
