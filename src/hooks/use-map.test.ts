import {renderHook, waitFor} from '@testing-library/react';
import {vi} from 'vitest';
import useMap from './use-map';
import {mockCity} from '../utils/mocks';

type MapInstance = {addLayer: ReturnType<typeof vi.fn>};

const {mapConstructor, tileLayerConstructor, mapInstance, tileLayerInstance} = vi.hoisted(() => {
  const instance: MapInstance = {addLayer: vi.fn()};
  const tileLayer = {};

  return {
    mapConstructor: vi.fn(() => instance),
    tileLayerConstructor: vi.fn(() => tileLayer),
    mapInstance: instance,
    tileLayerInstance: tileLayer,
  };
});

vi.mock('leaflet', () => ({
  Map: mapConstructor,
  TileLayer: tileLayerConstructor,
}));

describe('Hook: useMap', () => {
  it('should create map instance and return it', async () => {
    const mapRef = {current: document.createElement('div')};

    const {result} = renderHook(() => useMap(mapRef, mockCity));

    await waitFor(() => {
      expect(result.current).not.toBeNull();
    });

    expect(mapConstructor).toHaveBeenCalledWith(mapRef.current, {
      center: {
        lat: mockCity.location.latitude,
        lng: mockCity.location.longitude,
      },
      zoom: mockCity.location.zoom,
    });
    expect(tileLayerConstructor).toHaveBeenCalled();
    expect(mapInstance.addLayer).toHaveBeenCalledWith(tileLayerInstance);
    expect(result.current).toBe(mapInstance);
  });
});
