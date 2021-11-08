import { Link } from 'react-router-dom';
import {locationToPoint, Offer, Point} from '../../types/types';
import {Dispatch} from 'redux';
import {Actions} from '../../types/action';
import {setSelectedPoint} from '../../store/action';
import {connect, ConnectedProps} from 'react-redux';

type PlaceCardProps = {
  offer: Offer
}

export enum WrapperType {
  Cities = 'cities',
  Near = 'near'
}

type UniversalPlaceCardProps =  PlaceCardProps & {
  cardType: WrapperType
}

const mapDispatchToProps = (dispatch: Dispatch<Actions>) => ({
  onSelectPoint(selectedPoint: Point | undefined) {
    dispatch(setSelectedPoint(selectedPoint));
  },
});

const connector = connect(null, mapDispatchToProps);
type ConnectedUniversalPlaceCardProps = ConnectedProps<typeof connector> & UniversalPlaceCardProps;

function PlaceCardContent({offer}: PlaceCardProps): JSX.Element {
  return (
    <div className="place-card__info">
      <div className="place-card__price-wrapper">
        <div className="place-card__price">
          <b className="place-card__price-value">&euro;{offer.price}</b>
          <span className="place-card__price-text">&#47;&nbsp;night</span>
        </div>
        <button className="place-card__bookmark-button place-card__bookmark-button--active button" type="button">
          <svg className="place-card__bookmark-icon" width="18" height="19">
            <use xlinkHref="/#icon-bookmark"></use>
          </svg>
          <span className="visually-hidden">In bookmarks</span>
        </button>
      </div>
      <div className="place-card__rating rating">
        <div className="place-card__stars rating__stars">
          <span style={{width: '80%'}}></span>
          <span className="visually-hidden">Rating</span>
        </div>
      </div>
      <h2 className="place-card__name">
        <a href="/#">{offer.title}</a>
      </h2>
      <p className="place-card__type">{offer.type}</p>
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
