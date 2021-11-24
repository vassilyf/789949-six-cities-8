import {useRef, useEffect} from 'react';
import {Icon, Marker} from 'leaflet';
import useMap from '../../hooks/useMap';
import {Location, Point, Points} from '../../types/types';
import 'leaflet/dist/leaflet.css';

type MapProps = {
  city: Location;
  points: Points;
  selectedPoint: Point | undefined;
};

const defaultCustomIcon = new Icon({
  iconUrl: 'img/pin.svg',
});

const currentCustomIcon = new Icon({
  iconUrl: 'img/pin-active.svg',
});

export function Map(props: MapProps): JSX.Element {
  const {city, points, selectedPoint} = props;

  const mapRef = useRef(null);
  const map = useMap(mapRef, city);

  useEffect(() => {
    if (map) {
      points.forEach((point) => {
        const marker = new Marker({
          lat: point.latitude,
          lng: point.longitude,
        });

        marker
          .setIcon(
            selectedPoint !== undefined
              && point.latitude === selectedPoint.latitude
              && point.longitude === selectedPoint.longitude
              ? currentCustomIcon
              : defaultCustomIcon,
          ).addTo(map);
      });
    }
  }, [map, points, selectedPoint]);

  return <div style={{height: '100%', width: '100%'}} ref={mapRef}></div>;
}
