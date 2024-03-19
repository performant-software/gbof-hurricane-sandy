import { I18nContext, Peripleo as PeripleoUtils } from '@performant-software/core-data';
import { Peripleo, RuntimeConfig } from '@peripleo/peripleo';
import PlaceDetailSidebar from './PlaceDetailSidebar';
import PlaceDetailMapView from './PlaceDetailMapView';

export interface PlaceDetailSearchProps {
    placeId: string;
}

const PlaceDetailSearch = (props: PlaceDetailSearchProps) => {
  const { placeId } = props;

  const onClose = () => {
    window.location.href = '/map';
  }

  // this is not elegant but seems to be necessary for now
  const translations = {
    t_selectMapLayers: () => 'Select Map Layers',
    t_baseLayers: () => 'Base Layers',
    t_overlays: () => 'Overlays'
  };
  
  return (
    <RuntimeConfig
      //@ts-ignore
      path='/config.json'
      preprocess={PeripleoUtils.normalize}
    >
      <I18nContext.Provider
        value={{ translations: translations }}
      >
        <Peripleo>
            <PlaceDetailSidebar
                placeId={placeId}
                onClose={onClose}
            />
            <PlaceDetailMapView 
                placeId={placeId}
            />
        </Peripleo>
      </I18nContext.Provider>
    </RuntimeConfig>
  );
};

export default PlaceDetailSearch;
