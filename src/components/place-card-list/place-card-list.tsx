import UniversalPlaceCard, {WrapperType} from '../place-card/place-card';
import {Offer, State} from '../../types/types';
import React, {useMemo} from 'react';
import SortingMenu, {getOffersSortingFunction} from './sorting-menu/sorting-menu';
import {connect, ConnectedProps} from 'react-redux';

type PlaceCardListProps = {
  offers: Offer[]
}

const mapStateToProps = ({offers}: State) => ({
  sortingSelection: offers.sortingSelection,
});

const connector = connect(mapStateToProps);
type ConnectedPlaceCardListProps = ConnectedProps<typeof connector> & PlaceCardListProps;

export function PlaceCardList({offers}: PlaceCardListProps): JSX.Element {
  return (
    <div className="cities__places-list places__list tabs__content">
      {offers.map( (offer) => <UniversalPlaceCard key={offer.id} offer={offer} cardType={WrapperType.Cities}/>)}
    </div>
  );
}

export function SortedPlaceCardList({offers, sortingSelection}: ConnectedPlaceCardListProps): JSX.Element {
  const sortedOffers = useMemo( () => [...offers].sort(getOffersSortingFunction(sortingSelection)), [offers, sortingSelection]);
  return (
    <React.Fragment>
      <SortingMenu sortingSelection={sortingSelection}/>
      <PlaceCardList offers={sortedOffers}/>
    </React.Fragment>
  );
}

export function NearPlaceCardList({offers}: PlaceCardListProps): JSX.Element {
  return (
    <section className="near-places places">
      <h2 className="near-places__title">Other places in the neighbourhood</h2>
      <div className="near-places__list places__list">
        {offers.map( (place) => <UniversalPlaceCard key={place.id} offer={place} cardType={WrapperType.Near}/> )}
      </div>
    </section>

  );
}

export default connector(SortedPlaceCardList);
