import {
    CoreData as CoreDataUtils,
    PlaceDetails,
    PlacesService,
    RelatedItem,
    RelatedItemsList,
    RelatedMedia,
    RelatedOrganizations,
    RelatedPeople,
    RelatedPlaces,
    RelatedTaxonomies
  } from '@performant-software/core-data';
  import { LocationMarkers } from '@performant-software/geospatial';
  import { useCurrentRoute, useNavigate } from '@peripleo/peripleo';
  import { X } from 'lucide-react';
  import React, { useMemo, useState } from 'react';
  
  const Place = () => {
    const [place, setPlace] = useState();
  
    const route = useCurrentRoute();
    const navigate = useNavigate();
  
    /**
     * Parses the UUID from the route.
     */
    const [, uuid] = useMemo(() => route.split('/').filter(Boolean), [route]);
  
    /**
     * Sets the place feature based on the current place.
     */
    const placeData = useMemo(() => place && CoreDataUtils.toFeature(place), [place]);
  
    return (
      <>
        <aside
          className='flex flex-col relative z-10 h-full w-[350px] min-w-[260px] bg-white/80 backdrop-blur shadow overflow-y-auto'
        >
          <button
            aria-label='Close'
            className='absolute top-2 right-2 p-1.5 rounded-full z-10 bg-slate-200/60 hover:bg-slate-200 focus:outline-2 focus:outline-offset-2 focus:outline-teal-700'
            onClick={() => navigate('/')}
            type='button'
          >
            <X
              className='h-4 w-4'
            />
          </button>
          <PlaceDetails
            id={uuid}
            onLoad={setPlace}
          />
          <RelatedItemsList>
            <RelatedItem
              id='media_contents'
              label="Related Media"
            >
              <RelatedMedia
                onLoad={(baseUrl: string, projectIds: Array<number>) => (
                  PlacesService.fetchRelatedMedia(baseUrl, uuid, projectIds)
                )}
              />
            </RelatedItem>
            <RelatedItem
              id='organizations'
              label="Related Organizations"
            >
              <RelatedOrganizations
                onLoad={(baseUrl: string, projectIds: Array<number>) => (
                  PlacesService.fetchRelatedOrganizations(baseUrl, uuid, projectIds)
                )}
              />
            </RelatedItem>
            <RelatedItem
              id='people'
              label="Related People"
            >
              <RelatedPeople
                onLoad={(baseUrl: string, projectIds: Array<number>) => (
                  PlacesService.fetchRelatedPeople(baseUrl, uuid, projectIds)
                )}
              />
            </RelatedItem>
            <RelatedItem
              id='places'
              label="Related Places"
            >
              <RelatedPlaces
                onLoad={(baseUrl: string, projectIds: Array<number>) => (
                  PlacesService.fetchRelatedPlaces(baseUrl, uuid, projectIds)
                )}
              />
            </RelatedItem>
            <RelatedItem
              id='taxomonies'
              label="Related Taxonomies"
            >
              <RelatedTaxonomies
                onLoad={(baseUrl: string, projectIds: Array<number>) => (
                  PlacesService.fetchRelatedTaxonomies(baseUrl, uuid, projectIds)
                )}
              />
            </RelatedItem>
          </RelatedItemsList>
        </aside>
        { placeData && (
          <LocationMarkers
            animate
            data={placeData}
            layerId='current'
          />
        )}
      </>
    );
  };
  
  export default Place;
  