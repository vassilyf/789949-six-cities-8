import {Location, locationToPoint, Point, State} from '../../types/types';
import React, {useMemo} from 'react';
import CitiesMenu from '../cities-list/cities-list';
import PageHeader from '../page-header/page-header';
import {cities} from '../../mocks/cities';
import {connect, ConnectedProps} from 'react-redux';
import {Dispatch} from 'redux';
import {Actions} from '../../types/action';
import {setSelectedPoint} from '../../store/action';
import {NoOffers} from './no-offers';
import {OffersContainer} from './offers-container';

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
        {
          offers.length > 0 ?
            <OffersContainer
              offers={offers}
              selectedCity={selectedCity}
              selectedPoint={selectedPoint}
              points={points}
              selectedCityLocation={selectedCityLocation}
            />
            :
            <NoOffers selectedCity={selectedCity}/>
        }
      </main>
    </div>
  );
}

export {MainPage};
export default connector(MainPage);
