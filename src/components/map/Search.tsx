import { Peripleo as PeripleoUtils } from '@performant-software/core-data';
import { RuntimeConfig } from '@peripleo/peripleo';
import SearchPanel from './SearchPanel';
import TypesenseSearch from './TypesenseSearch';

const Search = () => {
  return (
    <RuntimeConfig
      //@ts-ignore
      path='/public/config.json'
      preprocess={PeripleoUtils.normalize}
    >
      <TypesenseSearch>
        <SearchPanel />
      </TypesenseSearch>
    </RuntimeConfig>
  );
};

export default Search;
