import {renderHook} from '@testing-library/react-hooks';
import useMap from './useMap';
import {Location} from '../types/types';
import {PARIS} from '../mocks/cities';
import {Map, TileLayer} from 'leaflet';
jest.mock('leaflet');

describe('Hook: useMap', () => {

  it('should construct Map object', () => {

    const fakeElement = document.createElement('div');
    const fakeRef = {
      current: fakeElement,
    };
    const fakeCityLocation: Location = PARIS.location;

    expect(Map).not.toHaveBeenCalled();
    expect(TileLayer).not.toHaveBeenCalled();
    const {result} = renderHook(() =>
      useMap(fakeRef, fakeCityLocation),
    );

    const map = result.current;

    expect(map).not.toBeNull();
    expect(Map).toHaveBeenCalled();
    expect(TileLayer).toHaveBeenCalled();

    if (map) {
      // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
      const MockedTileLayer = <jest.Mock<TileLayer>><unknown>TileLayer;
      // eslint-disable-next-line jest/no-conditional-expect
      expect(map.addLayer).toHaveBeenCalledWith(MockedTileLayer.mock.instances[0]);
    }
  });
});
