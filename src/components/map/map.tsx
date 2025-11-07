import {useEffect, useRef} from 'react';
import leaflet from 'leaflet';
import {Icon} from 'leaflet';
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
};

export default function Map({selectedOfferId, city, offers}: MapProps) {
  const mapRef = useRef<HTMLElement | null>(null);
  const map = useMap(mapRef, city);

  useEffect(() => {
    if (map) {
      offers.forEach((offer) => {
        leaflet.marker({
          lat: offer.location.latitude,
          lng: offer.location.longitude,
        }, {
          icon: (offer.id === selectedOfferId)
            ? currentCustomIcon
            : defaultCustomIcon
        }).addTo(map);
      });
    }
  }, [map, offers, selectedOfferId]);

  return <section className="cities__map map" ref={mapRef}/>;
}
