import {useEffect, useRef, useState} from 'react';
import {Icon, Marker, layerGroup} from 'leaflet';
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
};

export default function Map({city, offers}: MapProps) {
  const mapRef = useRef<HTMLElement | null>(null);
  const map = useMap(mapRef, city);
  const [activeOfferId, setActiveOfferId] = useState<string | null>(null);

  useEffect(() => {
    setActiveOfferId(null);
  }, [city]);

  useEffect(() => {
    if (!map) {
      return undefined;
    }

    const markersLayer = layerGroup();

    offers.forEach((offer) => {
      const {latitude, longitude} = offer.location;
      const marker = new Marker({lat: latitude, lng: longitude});

      marker
        .setIcon(activeOfferId === offer.id ? currentCustomIcon : defaultCustomIcon)
        .addTo(markersLayer)
        .on('click', () => {
          setActiveOfferId((prev) => (prev === offer.id ? null : offer.id));
        });
    });

    markersLayer.addTo(map);
    map.setView(
      {
        lat: city.location.latitude,
        lng: city.location.longitude
      },
      city.location.zoom
    );

    return () => {
      map.removeLayer(markersLayer);
    };
  }, [city, offers, map, activeOfferId]);

  return <section className="cities__map map" ref={mapRef}/>;
}
