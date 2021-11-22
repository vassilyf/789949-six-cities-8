import {useEffect, useState, MutableRefObject} from 'react';
import L, {Map, TileLayer} from 'leaflet';
import {Location} from '../types/types';

function useMap(
  mapRef: MutableRefObject<HTMLElement | null>,
  cityLocation: Location,
): Map | null {
  const [map, setMap] = useState<Map | null>(null);

  useEffect(() => {
    if (mapRef.current !== null && map === null) {
      const instance = new Map(mapRef.current, {
        center: {
          lat: cityLocation.latitude,
          lng: cityLocation.longitude,
        },
        zoom: 12,
      });

      const layer = new TileLayer(
        'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
        {
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
        },
      );

      instance.addLayer(layer);

      setMap(instance);
    } else if (map !== null) {
      map.setView(new L.LatLng(cityLocation.latitude, cityLocation.longitude), 12);
    }
  }, [mapRef, map, cityLocation.latitude, cityLocation.longitude]);

  return map;
}

export default useMap;
