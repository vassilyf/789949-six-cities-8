import {useParams} from 'react-router-dom';
import {Comment, Offer, Point} from '../../types/types';
import {PropertyHostDescription} from './property-host-description';
import {PropertyReviews} from './property-reviews';
import {NearPlaceCardList} from '../place-card-list/place-card-list';
import md5 from 'md5';
import {Map} from '../map/map';
import React from 'react';

interface ParamTypes {
  id?: string
}

type PropertyType = {
  offer: Offer,
  comments: Comment[],
  nearPlaces: Offer[]
}

function Property({offer, comments, nearPlaces}: PropertyType): JSX.Element {
  const { id } = useParams<ParamTypes>();
  const nearPoints: Point[] = nearPlaces.map( (place) => Object.assign({},place.location, {title: place.title}) );
  // eslint-disable-next-line no-console
  console.log(`Property.render, id=${id}`);
  return (
    <div className="page">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <a className="header__logo-link" href="main.html">
                <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41"/>
              </a>
            </div>
            <nav className="header__nav">
              <ul className="header__nav-list">
                <li className="header__nav-item user">
                  <a className="header__nav-link header__nav-link--profile" href="/#">
                    <div className="header__avatar-wrapper user__avatar-wrapper">
                    </div>
                    <span className="header__user-name user__name">Oliver.conner@gmail.com</span>
                  </a>
                </li>
                <li className="header__nav-item">
                  <a className="header__nav-link" href="/#">
                    <span className="header__signout">Sign out</span>
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header>

      <main className="page__main page__main--property">
        <section className="property">
          <div className="property__gallery-container container">
            <div className="property__gallery">
              {offer.images.map( (imageStr) => (
                <div key={md5(imageStr)} className="property__image-wrapper">
                  <img className="property__image" src={imageStr} alt="studio"/>
                </div>
              ) ) }
            </div>
          </div>
          <div className="property__container container">
            <div className="property__wrapper">
              <div className="property__mark">
                <span>Premium</span>
              </div>
              <div className="property__name-wrapper">
                <h1 className="property__name">
                  {offer.title}
                </h1>
                <button className="property__bookmark-button button" type="button">
                  <svg className="property__bookmark-icon" width="31" height="33">
                    <use xlinkHref="/#icon-bookmark"></use>
                  </svg>
                  <span className="visually-hidden">To bookmarks</span>
                </button>
              </div>
              <div className="property__rating rating">
                <div className="property__stars rating__stars">
                  <span style={{width: '80%'}}></span>
                  <span className="visually-hidden">Rating</span>
                </div>
                <span className="property__rating-value rating__value">{offer.rating}</span>
              </div>
              <ul className="property__features">
                <li className="property__feature property__feature--entire">
                  {offer.type}
                </li>
                <li className="property__feature property__feature--bedrooms">
                  {offer.bedrooms} Bedrooms
                </li>
                <li className="property__feature property__feature--adults">
                  Max {offer.max_adults} adults
                </li>
              </ul>
              <div className="property__price">
                <b className="property__price-value">&euro;120</b>
                <span className="property__price-text">&nbsp;night</span>
              </div>
              <div className="property__inside">
                <h2 className="property__inside-title">What&apos;s inside</h2>
                <ul className="property__inside-list">
                  {offer.goods.map( (item) =>
                    (
                      <li key={item} className="property__inside-item">
                        {item}
                      </li>
                    ),
                  ) }
                </ul>
              </div>
              <PropertyHostDescription descriptions={[]} host={offer.host} />
              <PropertyReviews comments={comments}/>
            </div>
          </div>
          <section className="property__map map">
            <Map city={offer.city.location} points={nearPoints} selectedPoint={undefined} />
          </section>
          <div className="container">
            <NearPlaceCardList offers={nearPlaces}/>
          </div>
        </section>
      </main>
    </div>
  );
}

export default Property;
