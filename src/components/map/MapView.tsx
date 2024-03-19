import {
    LayerMenu,
    OverlayLayers,
    Peripleo as PeripleoUtils,
    SearchResultsLayer
  } from '@performant-software/core-data';
  import { Map, Tooltip, Zoom } from '@peripleo/maplibre';
  import { Controls, useRuntimeConfig } from '@peripleo/peripleo';
  import React, { useEffect, useState } from 'react';
  import _ from 'underscore';
  import SearchResultTooltip from './SearchResultTooltip';
import { useStats } from 'react-instantsearch';
  
  const SEARCH_LAYER = 'search-results';
  
  const TOOLTIP_LAYERS = [
    'source-search-results',
    'layer-search-results-fill',
    'layer-search-results-line',
    'layer-search-results-point'
  ];
  
  const MapView = () => {
    const { baseLayers, dataLayers } = PeripleoUtils.filterLayers(useRuntimeConfig());
  
    const [baseLayer, setBaseLayer] = useState(_.first(baseLayers));
    const [overlays, setOverlays] = useState([]);

    const { nbHits: count } = useStats();

    useEffect(() => {
      console.log(overlays)
    }, [overlays]);
  
    return (
      <Map
        className='flex-grow sm:min-h-screen'
        style={PeripleoUtils.toLayerStyle(baseLayer, baseLayer.name)}
      >
        <Controls
          position='topright'
        >
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
        { count > 0 && <SearchResultsLayer
          layerId={SEARCH_LAYER}
        /> }
        <Tooltip
          content={(target, event) => (
            <SearchResultTooltip
              event={event}
              renderMoreLabel={(count) => `+ ${count} more`}
              target={target}
            />
          )}
          layerId={TOOLTIP_LAYERS}
        />
      </Map>
    );
  };
  
  export default MapView;
  