import { Peripleo, Controls } from '@peripleo/peripleo';
import { Map, Zoom } from '@peripleo/maplibre';
import { PlaceMarkers } from '@performant-software/core-data';

interface CoreDataPlaceProps {
  mapStyle: string | object;
  placeURIs: string[];
  animate?: boolean;
  buffer?: number;
  layer?: number[];
};

const CoreDataPlace = (props: CoreDataPlaceProps) => {

  return (
    <Peripleo>
      <Map style={props.mapStyle}>
        <Controls position="topright">
          <Zoom />
        </Controls>
        <PlaceMarkers
          urls={props.placeURIs}
          buffer={props.buffer}
          animate={props.animate}
        />
      </Map>
    </Peripleo>
  )

};

export default CoreDataPlace;

