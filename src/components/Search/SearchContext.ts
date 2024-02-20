import { createContext } from "react";
import type { HitField } from "../../helpers/types";

interface SearchContextValue {
  fields: { [key: string]: HitField };
}

const SearchContext = createContext<SearchContextValue>({
  fields: {},
});

export default SearchContext;
