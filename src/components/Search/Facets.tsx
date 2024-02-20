import { useContext } from "react";
import { RefinementList } from "react-instantsearch";
import SearchContext from "./SearchContext";

const Search = () => {
  const { fields } = useContext(SearchContext);

  return (
    <div>
      {Object.values(fields).map((f) => (
        <div className="p-2 bg-slate-100" key={f.value}>
          <h2>{f.displayLabel}</h2>
          <RefinementList attribute={f.value as string} key={f.uuid} />
        </div>
      ))}
    </div>
  );
};

export default Search;
