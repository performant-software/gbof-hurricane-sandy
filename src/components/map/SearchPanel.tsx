import { PersistentSearchStateContextProvider } from '@performant-software/core-data';
import React from 'react';
import { useGeoSearch, useInfiniteHits, useSearchBox } from 'react-instantsearch';
import SearchBox from './SearchBox';
import SearchCount from './SearchCount';
import SearchResultsList from './SearchResultsList';
import SearchResultsMap from './SearchResultsMap';

const SearchPanel = () => {
  const geoSearch = useGeoSearch();
  const infiniteHits = useInfiniteHits();
  const searchBox = useSearchBox();

  return (
    <PersistentSearchStateContextProvider
      infiniteHits={infiniteHits}
      geoSearch={geoSearch}
      searchBox={searchBox}
    >
      <aside
        className='flex flex-col absolute z-10 h-full w-[350px] backdrop-blur shadow overflow-hidden'
      >
        <div
          className='flex flex-col gap-2 border-b p-5'
        >
          <SearchBox />
          <SearchCount
            className='pt-1'
          />
        </div>
        <div
          className='overflow-y-auto flex-grow'
        >
          <SearchResultsList />
        </div>
      </aside>
      <div
        className="w-full h-screen"
      >
        <SearchResultsMap />
      </div>
    </PersistentSearchStateContextProvider>
  );
};

export default SearchPanel;
