import {render} from '@testing-library/react';
import {vi} from 'vitest';
import Map from './map';
import {makeFakeOfferPreview, mockCity} from '../../utils/mocks';
import {MARKER_ICON_ANCHOR, MARKER_ICON_SIZE, URL_MARKERS} from '../../const';

type IconOptions = {
  iconUrl: string;
  iconSize: [number, number];
  iconAnchor: [number, number];
};

const {mapInstance, markerMock, layerGroupInstance, layerGroupMock, IconMock} = vi.hoisted((): {
  mapInstance: { setView: ReturnType<typeof vi.fn> };
  markerMock: ReturnType<typeof vi.fn>;
  layerGroupInstance: { addTo: ReturnType<typeof vi.fn>; clearLayers: ReturnType<typeof vi.fn> };
  layerGroupMock: ReturnType<typeof vi.fn>;
  IconMock: ReturnType<typeof vi.fn>;
} => {
  const localMapInstance = {setView: vi.fn()};
  const localMarkerMock = vi.fn(() => ({addTo: vi.fn()}));
  const localLayerGroupInstance = {
    addTo: vi.fn().mockReturnThis(),
    clearLayers: vi.fn(),
  };
  const localLayerGroupMock = vi.fn(() => localLayerGroupInstance);
  const localIconMock = vi.fn((options: IconOptions) => ({options}));

  return {
    mapInstance: localMapInstance,
    markerMock: localMarkerMock,
    layerGroupInstance: localLayerGroupInstance,
    layerGroupMock: localLayerGroupMock,
    IconMock: localIconMock,
  };
});

vi.mock('../../hooks/use-map', () => ({
  default: vi.fn(() => mapInstance),
}));

vi.mock('leaflet', () => ({
  default: {marker: markerMock},
  Icon: IconMock,
  marker: markerMock,
  layerGroup: layerGroupMock,
}));

vi.mock('leaflet/dist/leaflet.css', () => ({}));

describe('Component: Map', () => {
  it('should render map markers and update view', () => {
    const offers = [
      makeFakeOfferPreview('1'),
      makeFakeOfferPreview('2'),
    ];

    render(
      <Map
        city={mockCity}
        offers={offers}
        selectedOfferId={offers[1].id}
        className="map"
      />,
    );

    expect(mapInstance.setView).toHaveBeenCalledWith(
      {lat: mockCity.location.latitude, lng: mockCity.location.longitude},
      mockCity.location.zoom,
    );

    expect(IconMock).toHaveBeenCalledWith({
      iconUrl: URL_MARKERS.default,
      iconSize: MARKER_ICON_SIZE,
      iconAnchor: MARKER_ICON_ANCHOR,
    });
    expect(IconMock).toHaveBeenCalledWith({
      iconUrl: URL_MARKERS.current,
      iconSize: MARKER_ICON_SIZE,
      iconAnchor: MARKER_ICON_ANCHOR,
    });

    const calls = markerMock.mock.calls;

    expect(calls[0]?.[0]).toEqual({
      lat: offers[0].location.latitude,
      lng: offers[0].location.longitude,
    });
    expect(calls[0]?.[1]).toMatchObject({
      icon: {
        options: {
          iconUrl: URL_MARKERS.default,
          iconSize: MARKER_ICON_SIZE,
          iconAnchor: MARKER_ICON_ANCHOR,
        },
      },
    });

    expect(calls[1]?.[0]).toEqual({
      lat: offers[1].location.latitude,
      lng: offers[1].location.longitude,
    });
    expect(calls[1]?.[1]).toMatchObject({
      icon: {
        options: {
          iconUrl: URL_MARKERS.current,
          iconSize: MARKER_ICON_SIZE,
          iconAnchor: MARKER_ICON_ANCHOR,
        },
      },
    });

    expect(layerGroupInstance.clearLayers).toHaveBeenCalled();
  });
});
