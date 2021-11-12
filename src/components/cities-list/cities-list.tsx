import React from 'react';
import {City, State} from '../../types/types';
import {Dispatch} from 'redux';
import {Actions} from '../../types/action';
import {selectCity} from '../../store/action';
import {connect, ConnectedProps} from 'react-redux';

type CityItemProps = {
  city: City,
  active: boolean,
  onSelectCity: (cityName: string) => void,
}

type CitiesListProps = {
  cities: City[]
}

const mapStateToProps = ({OFFERS: {city}}: State) => ({
  selectedName: city.name,
});

const mapDispatchToProps = (dispatch: Dispatch<Actions>) => ({
  onSelectCity(cityName: string) {
    dispatch(selectCity(cityName));
  },
});

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;
type ConnectedCitiesListProps = PropsFromRedux & CitiesListProps;

function CityItem({city, active, onSelectCity}: CityItemProps): JSX.Element {
  return (
    <li className="locations__item">
      <a className={`locations__item-link tabs__item ${active ? 'tabs__item--active' : ''}`} href="/#" onClick={ () => onSelectCity(city?.name) }>
        <span>{city?.name}</span>
      </a>
    </li>
  );
}

export function CitiesMenu(props: ConnectedCitiesListProps): JSX.Element {
  const {cities, selectedName, onSelectCity} = props;
  return (
    <section className="locations container">
      <ul className="locations__list tabs__list">
        {cities.map( (city) => <CityItem key={city.name} city={city} active={city.name === selectedName} onSelectCity={onSelectCity}/> )}
      </ul>
    </section>
  );
}

export default connector(CitiesMenu);
