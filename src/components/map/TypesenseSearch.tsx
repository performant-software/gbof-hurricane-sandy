import { Peripleo as PeripleoUtils, Typesense as TypesenseUtils } from '@performant-software/core-data';
import { useRuntimeConfig as _useRuntimeConfig } from '@peripleo/peripleo';
import { type ReactNode, useMemo } from 'react';
import { InstantSearch } from 'react-instantsearch';

const TypesenseSearch = (props: { children: ReactNode }) => {
  const rawConfig = _useRuntimeConfig();
  const config = PeripleoUtils.filterLayers(rawConfig);

  const adapter = useMemo(() => TypesenseUtils.createTypesenseAdapter(config), []);
  const routing = useMemo(() => TypesenseUtils.createRouting(config), []);

  return (
    <InstantSearch
      indexName={config.typesense.index_name}
      routing={routing}
      searchClient={adapter.searchClient}
      future={{
        preserveSharedStateOnUnmount: true
      }}
    >
      { props.children }
    </InstantSearch>
  )
};

export default TypesenseSearch;
