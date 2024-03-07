import { useEffect, useState } from 'react';
import type { FeatureCollection } from '@peripleo/peripleo';
import { Peripleo, Controls } from '@peripleo/peripleo';
import { Map, MixedGeoJSONLayer, PulsingMarkerLayer, Zoom, useMap } from '@peripleo/maplibre';
import { PlaceMarker } from '@performant-software/core-data';

interface CoreDataPlaceProps {
  mapStyle: string | object;
  placeURI: string;
  fillStyle?: object;
  pointStyle?: object;
  strokeStyle?: object;
  defaultZoom?: number;
  fly?: boolean;
};

export const DEFAULT_POINT_STYLE = {
  'type': 'circle',
  'paint': {
    'circle-radius': [
      'interpolate', 
      ['linear'],
      ['number', ['get','point_count'], 1 ],
      0, 4, 
      10, 14
    ],
    'circle-stroke-width': 1,
    'circle-color': [
      'case',
      ['boolean', ['feature-state', 'hover'], false],
      '#3b62ff',
      '#ff623b'
    ],
    'circle-stroke-color': '#8d260c'
  }
};

export const DEFAULT_FILL_STYLE = {
  'type': 'fill',
  'paint': {
    'fill-color': '#ff623b',
    'fill-opacity': 0.2
  }
}

export const DEFAULT_STROKE_STYLE = {
  'type': 'line',
  'paint': {
    'line-color': '#ff623b',
    'line-opacity': 0.6
  }
}

export const CoreDataPlace = (props: CoreDataPlaceProps) => {

  return (
    <Peripleo>
      <Map style={props.mapStyle}>
        <Controls position="topright">
          <Zoom />
        </Controls>

        <CoreDataPlaceLayer 
          uri={props.placeURI} 
          fillStyle={props.fillStyle}
          pointStyle={props.pointStyle}
          strokeStyle={props.strokeStyle}
          defaultZoom={props.defaultZoom} 
          fly={props.fly} />
        {/* <PlaceMarker
          url={props.placeURI}
        /> */}
      </Map>
    </Peripleo>
  )

};

interface CoreDataPlaceLayerProps {
  uri: string;
  fillStyle?: object;
  pointStyle?: object;
  strokeStyle?: object;
  defaultZoom?: number;
  fly?: boolean;
};

export const CoreDataPlaceLayer = (props: CoreDataPlaceLayerProps) => {

  const [place, setPlace] = useState<FeatureCollection | undefined>(undefined);

  const map = useMap();

  useEffect(() => {
    fetch(props.uri)
      .then(res => res.json())
      .then(data => {
        const place = {
          ...data,
          properties: {
            ...data.properties,
            record_id: data.record_id
          }
        };

        setPlace({
          type: 'FeatureCollection',
          features: [place]
        });

        place?.geometry?.coordinates && props?.fly ? map.flyTo({ center: place.geometry.coordinates, zoom: props.defaultZoom || 12 }) : map.jumpTo({ center: place.geometry.coordinates, zoom: props.defaultZoom || 12 });
      });
  }, [props.uri])

  return place && (
    <>
      <PulsingMarkerLayer 
        id="current" 
        data={place} />

      <MixedGeoJSONLayer
        id={props.uri} 
        data={place} 
        fillStyle={props.fillStyle || DEFAULT_FILL_STYLE} 
        strokeStyle={props.strokeStyle || DEFAULT_STROKE_STYLE} 
        pointStyle={props.pointStyle || DEFAULT_POINT_STYLE} />
    </>
  )

};