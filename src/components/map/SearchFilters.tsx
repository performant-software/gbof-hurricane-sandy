import { FacetListsGrouped, FacetStateContext, useGeoSearch } from '@performant-software/core-data';
// import * as Dialog from '@radix-ui/react-dialog';
import * as Switch from '@radix-ui/react-switch';
import { Settings2, X } from 'lucide-react';
import React, { useContext, useState, Fragment } from 'react';
import { RefinementList } from 'react-instantsearch';
import '../../styles/SearchFilters.css';
import { Dialog, Transition } from '@headlessui/react'

interface FacetStateContextType {
  attributes: string[];
}

const SearchFilters = () => {
  const { attributes } = useContext<FacetStateContextType>(FacetStateContext);
  const { isRefinedWithMap } = useGeoSearch();

  const [filterByMapBounds, setFilterByMapBounds] = useState(isRefinedWithMap());
  const [open, setOpen] = useState<boolean>(false);

  return (
    <>
      <div
        className='relative p-2 rounded-full bg-gray-1000 text-gray-500 h-full aspect-square flex justify-center items-center hover:bg-gray-200 hover:scale-105 cursor-pointer'
        onClick={() => setOpen((prevOpen) => !prevOpen)}
      >
        <Settings2 />
      </div>
      <Transition appear show={open} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={() => setOpen(false)}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="w-full items-center font-medium text-black"
                  >
                    <Settings2
                        className='inline mb-0.5 pe-2'
                    />
                        Filters
                  </Dialog.Title>
                  <div
                    className='flex items-center text-sm mt-5'
                >
                    <Switch.Root
                    checked={filterByMapBounds}
                    className='switch-root'
                    id='toggle-bounds-filter'
                    onCheckedChange={(checked) => setFilterByMapBounds(checked)}
                    >
                    <Switch.Thumb
                        className='switch-thumb'
                    />
                    </Switch.Root>
                    <label
                    className='ml-2'
                    htmlFor='toggle-bounds-filter'
                    >
                    Filter by map bounds
                    </label>
                </div>
                <FacetListsGrouped
                    attributes={attributes}
                    renderList={(attribute: string) => (
                    <RefinementList
                        attribute={attribute}
                    />
                    )}
                    resolveLabel={(uuid: string) => (uuid)}
                />

                  <div className="mt-4">
                  <button
                    className='dialog-close rounded-full'
                    onClick={() => setOpen(false)}
                  >
                    <X
                        className='h-7 w-7 p-1.5'
                    />
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default SearchFilters;