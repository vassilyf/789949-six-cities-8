import {Point, State} from '../../types/types';
import {PropertyHostDescription} from './property-host-description/property-host-description';
import PropertyReviews from './property-reviews/property-reviews';
import {NearPlaceCardList} from '../place-card-list/place-card-list';
import {Map} from '../map/map';
import React, {useEffect} from 'react';
import PageHeader from '../page-header/page-header';
import {connect, ConnectedProps} from 'react-redux';
import LoadingScreen from '../loading-screen/loading-screen';
import {useParams} from 'react-router-dom';
import {
  fetchCommentsAction,
  fetchNearPlacesAction,
  fetchOfferDetailsAction,
  saveFavorite
} from '../../store/api-actions';
import {redirectTo, resetOfferDetails} from '../../store/action';
import {ThunkAppDispatch} from '../../types/action';
import {AppRoute, BOOKMARK_IN_BOOKMARKS, BOOKMARK_TO_BOOKMARKS} from '../../const';
import {getNearPoints, getOfferPoint} from '../../store/reducers/details-selectors';

const mapStateToProps = ({details, auth}: State) => ({
  offer: details.offerDetails.offer,
  nearPlaces: details.offerDetails.nearPlaces,
  isAuthorized: auth.isAuthorized,
});

const mapDispatchToProps = (dispatch: ThunkAppDispatch) => ({
  onChangeOfferDetails(id?: string) {
    dispatch(resetOfferDetails());
    if (id) {
      dispatch(fetchOfferDetailsAction(id));
      dispatch(fetchNearPlacesAction(id));
      dispatch(fetchCommentsAction(id));
    }
  },
  onSaveFavorite(hotelId: number, favorite: boolean) {
    dispatch(saveFavorite(hotelId, favorite));
  },
  onToLogin() {
    dispatch(redirectTo(AppRoute.SignIn));
  },
});

const connector = connect(mapStateToProps, mapDispatchToProps);
type ConnectedPropertyProps = ConnectedProps<typeof connector>;

type PropertyParams = {
  id?: string,
};

function Property(props: ConnectedPropertyProps): JSX.Element {
  const {offer, nearPlaces, onChangeOfferDetails, onSaveFavorite, isAuthorized, onToLogin} = props;
  const {id} = useParams<PropertyParams>();

  useEffect(() => {
    onChangeOfferDetails(id);
  }, [id, onChangeOfferDetails]);

  if (!offer || !offer.id) {
    return <LoadingScreen/>;
  } else {
    const selectedPoint: Point = getOfferPoint(offer);
    const nearPoints: Point[] = getNearPoints(nearPlaces).concat([selectedPoint]);
    return (
      <div className="page">
        <header className="header">
          <PageHeader/>
        </header>

        <main data-testid="propertyPage"  className="page__main page__main--property">
          <section className="property">
            <div className="property__gallery-container container">
              <div className="property__gallery">
                {offer.images.slice(0, 6).map((imageStr) => (
                  <div key={imageStr} className="property__image-wrapper">
                    <img className="property__image" src={imageStr} alt="studio"/>
                  </div>
                ))}
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
                  <button className={`property__bookmark-button button ${offer.is_favorite && 'property__bookmark-button--active'}`}
                    type="button"
                    onClick={ () => isAuthorized ? onSaveFavorite(offer.id, !offer.is_favorite) : onToLogin() }
                  >
                    <svg className="property__bookmark-icon" width="31" height="33">
                      <use xlinkHref="#icon-bookmark"></use>
                    </svg>
                    <span className="visually-hidden">{offer.is_favorite ? BOOKMARK_IN_BOOKMARKS : BOOKMARK_TO_BOOKMARKS}</span>
                  </button>
                </div>
                <div className="property__rating rating">
                  <div className="property__stars rating__stars">
                    <span style={{width: `${offer.rating/5*100}%`}}></span>
                    <span className="visually-hidden">Rating</span>
                  </div>
                  <span className="property__rating-value rating__value">{offer.rating}</span>
                </div>
                <ul className="property__features">
                  <li className="property__feature property__feature--entire"  style={{textTransform: 'capitalize'}}>
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
                    {offer.goods.map((item) =>
                      (
                        <li key={item} className="property__inside-item">
                          {item}
                        </li>
                      ),
                    )}
                  </ul>
                </div>
                <PropertyHostDescription descriptions={[offer.description]} host={offer.host}/>
                <PropertyReviews/>
              </div>
            </div>
            <section className="property__map" style={{backgroundImage: 'none'}}>
              <Map city={offer.city.location} points={nearPoints} selectedPoint={selectedPoint}/>
            </section>
            <div className="container">
              <NearPlaceCardList offers={nearPlaces}/>
            </div>
          </section>
        </main>
      </div>
    );
  }
}

export default connector(Property);
