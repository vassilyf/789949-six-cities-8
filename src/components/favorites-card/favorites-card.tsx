import {Offer} from '../../types/types';
import Bookmark from '../place-card/bookmark';

type FavoritesCardProps = {
  offer: Offer
}

function FavoritesCard({offer}: FavoritesCardProps): JSX.Element {
  return (
    <article className="favorites__card place-card">
      <div className="favorites__image-wrapper place-card__image-wrapper">
        <a href="/#">
          <img className="place-card__image" src={offer.images[0]} width="150" height="110"  alt="Place"/>
        </a>
      </div>
      <div className="favorites__card-info place-card__info">
        <Bookmark offer={offer}/>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{width: '100%'}}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <a href="/#">{offer.title}</a>
        </h2>
        <p className="place-card__type">{offer.type}</p>
      </div>
    </article>
  );
}

export {FavoritesCard};
