import { Peripleo, Controls, RuntimeConfig, useRuntimeConfig } from '@peripleo/peripleo';
import { Map, Zoom } from '@peripleo/maplibre';
import { PlaceMarkers, Peripleo as PeripleoUtils, I18nContext, LayerMenu, OverlayLayers } from '@performant-software/core-data';
import { translations } from '../helpers/i18n';
import { useState } from 'react';
import _ from 'underscore';

interface CoreDataPlaceProps {
  placeURIs: string[];
  animate?: boolean;
  buffer?: number;
  layer?: number[];
  mapId?: string;
};

const CoreDataPlace = (props: CoreDataPlaceProps) => {
  const { baseLayers, dataLayers } = PeripleoUtils.filterLayers(useRuntimeConfig());
  
  const [baseLayer, setBaseLayer] = useState(_.first(baseLayers));
  const [overlays, setOverlays] = useState([]);

  return (
      <I18nContext.Provider
        value={{ translations: translations }}
      >
        <Peripleo>
          <Map style={PeripleoUtils.toLayerStyle(baseLayer, baseLayer.name)}>
            <Controls position="topright">
              <Zoom />
              { baseLayers.length > 1 && (
              <LayerMenu
                baseLayer={baseLayer?.name}
                baseLayers={baseLayers}
                dataLayers={dataLayers}
                onChangeBaseLayer={setBaseLayer}
                onChangeOverlays={setOverlays}
              />
            )}
            </Controls>
            <OverlayLayers
              overlays={overlays}
            />
            <PlaceMarkers
              urls={props.placeURIs}
              buffer={props.buffer}
              animate={props.animate}
              key={props.mapId}
            />
          </Map>
        </Peripleo>
      </I18nContext.Provider>
  )

};

export default CoreDataPlace;

