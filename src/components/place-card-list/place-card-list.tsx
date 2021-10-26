//import {useState} from 'react';
import {UniversalPlaceCard, WrapperType} from '../place-card/place-card';
import {Offer} from '../../types/types';
import React from 'react';

type PlaceCardListProps = {
  offers: Offer[]
}

export function PlaceCardList({offers}: PlaceCardListProps): JSX.Element {
  return (
    <div className="cities__places-list places__list tabs__content">
      {offers.map( (offer) => <UniversalPlaceCard key={offer.id} offer={offer} cardType={WrapperType.Cities}/>)}
    </div>
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

