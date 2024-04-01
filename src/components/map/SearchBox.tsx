import { useSearchBox } from '@performant-software/core-data';
import { Search, X } from 'lucide-react';
import { type FormEvent, useCallback, useRef } from 'react';
// import resolveConfig from 'tailwindcss/resolveConfig';
// import tailwindConfig from '../../../tailwind.config.mjs';

const SearchBox = () => {
  const { query, refine } = useSearchBox();

  // const { theme } = resolveConfig(tailwindConfig);
  // const color = theme.colors.gray['900'];

  const inputRef = useRef<HTMLInputElement>(null);

  /**
   * Prevents the page from being refreshed if the user presses enter.
   */
  const onSubmit = useCallback((evt: FormEvent) => evt.preventDefault(), []);

  /**
   * Clears the current query and focuses on the input element.
   */
  const onClear = useCallback(() => {
    refine('');

    const instance = inputRef.current;
    if (instance) {
      instance.focus();
    }
  }, []);

  return (
    <form
      className='flex-grow'
      onSubmit={onSubmit}
    >
      <div
        className='relative rounded-full bg-gray-100 flex justify-between items-center p-3'
      >
        <Search
          className='w-4'
          color='white'
        />
        <input
          className='text-sm bg-transparent flex-grow mx-2 text-gray-1000 outline-none'
          onChange={(e) => refine(e.target.value)}
          placeholder='Search'
          ref={inputRef}
          spellCheck={false}
          value={query}
        />
        <X
          className='w-4 cursor-pointer'
          color='white'
          onClick={onClear}
        />
      </div>
    </form>
  );
};

export default SearchBox;
