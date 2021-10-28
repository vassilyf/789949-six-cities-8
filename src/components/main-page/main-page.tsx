import SortedPlaceCardList from '../place-card-list/place-card-list';
import {Location, locationToPoint, Point, State} from '../../types/types';
import {List} from '../list/list';
import {Map} from '../map/map';
import React, {useMemo} from 'react';
import CitiesMenu from '../cities-list/cities-list';
import {cities} from '../../mocks/cities';
import {connect, ConnectedProps} from 'react-redux';
import {Dispatch} from 'redux';
import {Actions} from '../../types/action';
import {setSelectedPoint} from '../../store/action';

type MainPageProps = {
};

const mapStateToProps = (state: State) => ({
  selectedCity: state.city,
  offers: state.offers,
  sortingSelection: state.sortingSelection,
  selectedPoint: state.selectedPoint,
});

const mapDispatchToProps = (dispatch: Dispatch<Actions>) => ({
  onSelectPoint(selectedPoint: Point | undefined) {
    dispatch(setSelectedPoint(selectedPoint));
  },
});

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;
type ConnectedMainPageProps = PropsFromRedux & MainPageProps;


function MainPage(props : ConnectedMainPageProps): JSX.Element {
  const {selectedCity, offers, selectedPoint, onSelectPoint} = props;
  const points: Point[] = useMemo(() => offers.map( (o) => locationToPoint(o.location, o.title) ), [offers]);
  const city: Location = selectedCity.location;
  //  const [selectedPoint, setSelectedPoint] = useState<Point | undefined>(undefined);

  const onListItemHover = (listItemName: string) => {
    const currentPoint = points.find((point) => point.title === listItemName);
    onSelectPoint(currentPoint);
  };

  return (
    <div className="page page--gray page--main">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <a className="header__logo-link header__logo-link--active" href="/#">
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
                <List points={points} onListItemHover={onListItemHover} />
                <Map city={city} points={points} selectedPoint={selectedPoint} />
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
