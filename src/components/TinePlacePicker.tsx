import { Listbox, Transition } from "@headlessui/react";
import { Fragment, useEffect, useState } from "react"
import { wrapFieldsWithMeta } from "tinacms";


interface CustomTinaFieldProps {
  field: any,
  input: any,
  meta: any
};

const TinaPlacePicker = wrapFieldsWithMeta((props: CustomTinaFieldProps) => {

  const [places, setPlaces] = useState<any>();

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetch('https://core-data-cloud-staging-2c51db0617a5.herokuapp.com/core_data/public/places?project_ids=24').then(response => response.json())
        .then(response => JSON.stringify(response));
      setPlaces(JSON.parse(data));
    }
    fetchData();
  }, []);

  return (
    <Listbox value={props.input.value} onChange={props.input.onChange}>
      <div className="relative mt-1 z-[9999]">
        <Listbox.Button className="relative w-full cursor-pointer rounded-lg bg-white hover:bg-indigo-500/20 py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
          <span className="block truncate">{places && places.features.find((place) => place.properties.uuid == props.input.value.uuid)?.properties.title || 'Select a place'}</span>
        </Listbox.Button>
        <Transition
          as={Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
            {places && places.features.map((place) => (
              <Listbox.Option
                key={place.properties.uuid}
                className={({ active }) =>
                  `relative cursor-pointer select-none py-2 pl-10 pr-4 ${active ? 'bg-amber-100 text-amber-900' : 'text-gray-900'
                  }`
                }
                value={{ uuid: place.properties.uuid, title: place.properties.title }}
              >
                {({ selected }) => (
                  <>
                    <span
                      className={`block truncate ${selected ? 'font-medium' : 'font-normal'
                        }`}
                    >
                      {place.properties.title}
                    </span>
                  </>
                )}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Transition>
      </div>
    </Listbox>
  )
});

export default TinaPlacePicker;
