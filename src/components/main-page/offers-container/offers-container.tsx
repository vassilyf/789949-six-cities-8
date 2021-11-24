import React from 'react';
import SortedPlaceCardList from '../../place-card-list/place-card-list';
import {Map} from '../../map/map';
import {City, Offer, Point, Location} from '../../../types/types';

type OffersContainerProps = {
  offers: Offer[],
  selectedCityLocation: Location,
  selectedCity: City,
  selectedPoint: Point | undefined,
  points: Point[]
}


export function OffersContainer({offers, selectedCityLocation, selectedCity, selectedPoint, points} : OffersContainerProps): JSX.Element {
  return (
    <div className="cities">
      <div className="cities__places-container container">
        <section className="cities__places places">
          <h2 className="visually-hidden">Places</h2>
          <b className="places__found">{offers.length} {offers.length === 1 ? 'place' : 'places'} to stay in {selectedCity.name}</b>
          <SortedPlaceCardList offers={offers}/>
        </section>
        <div className="cities__right-section">
          <section className="cities__map" style={{backgroundImage: 'none'}}>
            <Map city={selectedCityLocation} points={points} selectedPoint={selectedPoint} />
          </section>
        </div>
      </div>
    </div>

  );
}

