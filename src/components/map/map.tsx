import {useEffect, useRef} from 'react';
import leaflet, {Icon, layerGroup, LayerGroup} from 'leaflet';
import 'leaflet/dist/leaflet.css';
import {City} from '../../types/city.ts';
import {OfferPreview} from '../../types/offers-preview.ts';
import useMap from '../../hooks/use-map.ts';
import {URL_MARKER_CURRENT, URL_MARKER_DEFAULT} from '../../const.ts';

const defaultCustomIcon = new Icon({
  iconUrl: URL_MARKER_DEFAULT,
  iconSize: [27, 39],
  iconAnchor: [13, 39]
});

const currentCustomIcon = new Icon({
  iconUrl: URL_MARKER_CURRENT,
  iconSize: [27, 39],
  iconAnchor: [13, 39]
});

export type MapProps = {
  city: City;
  offers: OfferPreview[];
  selectedOfferId: string | null;
  className: string;
};

export default function Map({selectedOfferId, city, offers, className}: MapProps) {
  const mapRef = useRef<HTMLElement | null>(null);
  const markersLayerRef = useRef<LayerGroup | null>(null);
  const map = useMap(mapRef, city);

  useEffect(() => {
    if (map) {
      const {latitude, longitude, zoom} = city.location;
      map.setView({lat: latitude, lng: longitude}, zoom);
    }
  }, [map, city]);

  useEffect(() => {
    if (!map) {
      return;
    }

    if (!markersLayerRef.current) {
      markersLayerRef.current = layerGroup().addTo(map);
    }

    const markersLayer = markersLayerRef.current;

    if (!markersLayer) {
      return;
    }

    markersLayer.clearLayers();

    offers.forEach((offer) => {
      leaflet.marker({
        lat: offer.location.latitude,
        lng: offer.location.longitude,
      }, {
        icon: (offer.id === selectedOfferId)
          ? currentCustomIcon
          : defaultCustomIcon
      }).addTo(markersLayer);
    });

    return () => {
      markersLayer.clearLayers();
    };
  }, [map, offers, selectedOfferId]);

  return <section className={className} ref={mapRef}/>;
}
