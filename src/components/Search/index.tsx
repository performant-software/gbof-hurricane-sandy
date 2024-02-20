import { useEffect, useState } from "react";
import { InstantSearch, SearchBox } from "react-instantsearch";
import Facets from "./Facets";
import Hits from './Hits'
import SearchContext from "./SearchContext.js";
import { getFacets } from "../../helpers/search";
import type { Field, HitField } from "../../helpers/types";
import fieldConfig from './fields';
import searchClient from './searchClient'

interface Props {
  locale: 'en' | 'fr'
}

const SearchContent: React.FC<Props> = ({ locale }) => {
  const [fields, setFields] = useState<{ [key: string]: HitField }>({});

  // Fetch the schema on first render so we can parse all facets at once.
  useEffect(() => {
    const setup = async () => {
      const results: Field[] = await getFacets()

      const merged: { [key: string]: HitField } = {}

      Object.keys(fieldConfig).forEach(att => {
        // The first check is for whether the attribute names match - as related
        // fields don't have UUIDs, we need to make sure we use the correct
        // attribute name as a key in `fields.ts`.
        // The second check is, more straightforwardly, seeing if there's a field
        // with a matching UUID.
        const matching = results.find(r =>
          (r.uuid && r.uuid === fieldConfig[att].uuid)
          || r.value === att)

        if (matching) {
          merged[att] = { ...fieldConfig[att], ...matching }
        }
      })

      setFields(merged)
    }

    setup()
  }, [])

  return (
    <SearchContext.Provider value={{ fields }}>
      <InstantSearch
        indexName={import.meta.env.PUBLIC_TYPESENSE_INDEX_NAME}
        searchClient={searchClient}
      >
        <div className="grid grid-cols-2 gap-4 bg-slate-50 p-4">
          <div>
            <SearchBox />
            <Facets />
          </div>
          <Hits locale={locale} />
        </div>
      </InstantSearch>
    </SearchContext.Provider>
  );
};

export default SearchContent;
