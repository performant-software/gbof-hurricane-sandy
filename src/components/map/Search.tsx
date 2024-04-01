import { I18nContext, Peripleo as PeripleoUtils } from '@performant-software/core-data';
import { Peripleo, Router, RuntimeConfig } from '@peripleo/peripleo';
import TypesenseSearch from './TypesenseSearch';
import MapView from './MapView';
import { translations } from '../../helpers/i18n';
import SearchRoutes from './SearchRoutes';

const Search = () => {
  return (
    <RuntimeConfig
      //@ts-ignore
      path='/config.json'
      preprocess={PeripleoUtils.normalize}
    >
      <Router>
        <Peripleo>
        <I18nContext.Provider
          value={{ translations: translations }}
        >
            <TypesenseSearch>
              <SearchRoutes />
              <MapView />
            </TypesenseSearch>
          </I18nContext.Provider>
        </Peripleo>
      </Router>
    </RuntimeConfig>
  );
};

export default Search;
