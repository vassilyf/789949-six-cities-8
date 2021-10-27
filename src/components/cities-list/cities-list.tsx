import React from 'react';
import {City, State} from '../../types/types';
import {Dispatch} from 'redux';
import {Actions} from '../../types/action';
import {selectCity} from '../../store/action';
import {connect, ConnectedProps} from 'react-redux';

type CityItemProps = {
  city: City,
  active: boolean,
  onSelectCity: (city: City) => void,
}

function CityItem({city, active, onSelectCity}: CityItemProps): JSX.Element {
  return (
    <li className="locations__item">
      <a className={`locations__item-link tabs__item ${active ? 'tabs__item--active' : ''}`} href="/#" onClick={ () => onSelectCity(city) }>
        <span>{city.name}</span>
      </a>
    </li>
  );
}

const mapStateToProps = ({city}: State) => ({
  selectedId: city.id,
});

const mapDispatchToProps = (dispatch: Dispatch<Actions>) => ({
  onSelectCity(city: City) {
    dispatch(selectCity(city));
  },
});

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;
type ConnectedCitiesListProps = PropsFromRedux & CitiesListProps;

export type CitiesListProps = {
  cities: City[]
}

export function CitiesMenu(props: ConnectedCitiesListProps): JSX.Element {
  const {cities, selectedId, onSelectCity} = props;
  return (
    <section className="locations container">
      <ul className="locations__list tabs__list">
        {cities.map( (city) => <CityItem key={city.id} city={city} active={city.id === selectedId} onSelectCity={onSelectCity}/> )}
      </ul>
    </section>
  );
}

export default connector(CitiesMenu);