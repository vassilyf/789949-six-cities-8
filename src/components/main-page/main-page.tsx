import SortedPlaceCardList from '../place-card-list/place-card-list';
import {Location, locationToPoint, Point, State} from '../../types/types';
import {Map} from '../map/map';
import React, {useMemo} from 'react';
import CitiesMenu from '../cities-list/cities-list';
import PageHeader from '../page-header/page-header';
import {cities} from '../../mocks/cities';
import {connect, ConnectedProps} from 'react-redux';
import {Dispatch} from 'redux';
import {Actions} from '../../types/action';
import {setSelectedPoint} from '../../store/action';

const mapStateToProps = ({OFFERS}: State) => ({
  selectedCity: OFFERS.city,
  offers: OFFERS.cityOffers,
  sortingSelection: OFFERS.sortingSelection,
  selectedPoint: OFFERS.selectedPoint,
});

const mapDispatchToProps = (dispatch: Dispatch<Actions>) => ({
  onSelectPoint(selectedPoint: Point | undefined) {
    dispatch(setSelectedPoint(selectedPoint));
  },
});

const connector = connect(mapStateToProps, mapDispatchToProps);
type ConnectedMainPageProps = ConnectedProps<typeof connector>;

function MainPage(props : ConnectedMainPageProps): JSX.Element {
  const {selectedCity, offers, selectedPoint} = props;
  const points: Point[] = useMemo(() => offers.map( (o) => locationToPoint(o.location, o.title) ), [offers]);
  const selectedCityLocation: Location = selectedCity.location;

  return (
    <div className="page page--gray page--main">
      <header className="header">
        <PageHeader/>
      </header>

      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <CitiesMenu cities={cities}  />
        </div>
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
      </main>
    </div>
  );
}

export {MainPage};
export default connector(MainPage);
