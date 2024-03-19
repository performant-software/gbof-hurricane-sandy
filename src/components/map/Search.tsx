import { I18nContext, Peripleo as PeripleoUtils } from '@performant-software/core-data';
import { Peripleo, RuntimeConfig } from '@peripleo/peripleo';
import SearchPanel from './SearchPanel';
import TypesenseSearch from './TypesenseSearch';
import MapView from './MapView';
import { translations } from '../../helpers/i18n';

const Search = () => {
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
          <TypesenseSearch>
            <SearchPanel />
            <MapView />
          </TypesenseSearch>
        </Peripleo>
      </I18nContext.Provider>
    </RuntimeConfig>
  );
};

export default Search;
