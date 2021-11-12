import { Link } from 'react-router-dom';
import {locationToPoint, Offer, Point} from '../../types/types';
import {ThunkAppDispatch} from '../../types/action';
import {setSelectedPoint} from '../../store/action';
import {connect, ConnectedProps} from 'react-redux';
import Bookmark, {BookmarkProps} from './bookmark';

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
});

const connector = connect(null, mapDispatchToProps);
type ConnectedUniversalPlaceCardProps = ConnectedProps<typeof connector> & UniversalPlaceCardProps;

function PlaceCardContent(props: PlaceCardProps ): JSX.Element {
  return (
    <div className="place-card__info">
      <Bookmark {...props}/>
      <div className="place-card__rating rating">
        <div className="place-card__stars rating__stars">
          <span style={{width: '80%'}}></span>
          <span className="visually-hidden">Rating</span>
        </div>
      </div>
      <h2 className="place-card__name">
        <a href="/#">{props.offer.title}</a>
      </h2>
      <p className="place-card__type">{props.offer.type}</p>
    </div>
  );
}

function UniversalPlaceCard({offer, cardType, onSelectPoint}: ConnectedUniversalPlaceCardProps): JSX.Element {
  return (
    <article className={`${cardType === WrapperType.Cities ? 'cities__place-card' : 'near-places__card' } place-card`}>
      <div className={`${cardType === WrapperType.Cities ? 'cities__image-wrapper' : 'near-places__image-wrapper'} place-card__image-wrapper`}
        onMouseEnter={ (e) => {onSelectPoint( locationToPoint(offer.location, offer.title) );} }
        onMouseLeave={ (e) => {onSelectPoint(undefined);} }
      >
        <Link to={`/offer/${offer.id}`}>
          <img className="place-card__image" src={offer.preview_image} width="260" height="200" alt="Place"/>
        </Link>
      </div>
      <PlaceCardContent offer={offer}/>
    </article>
  );
}

export default connector(UniversalPlaceCard);
