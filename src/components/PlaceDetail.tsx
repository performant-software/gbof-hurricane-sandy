import { useEffect, useState } from "react";
import { PlaceDetails } from "@performant-software/core-data";

export interface PlaceDetailProps {
    placeId: string;
    onClose: () => void;
};

const PlaceDetail = (props: PlaceDetailProps) => {
    const [place, setPlace] = useState<any>();
    const [relatedPlaces, setRelatedPlaces] = useState<any>();
    const [orgs, setOrgs] = useState<any>();
    const [relatedPeople, setRelatedPeople] = useState<any>();
    const [relatedMedia, setRelatedMedia] = useState<any>();

    useEffect(() => {
        const placeUrl = `${import.meta.env.PUBLIC_CORE_DATA_API_URL}/${props.placeId}?project_ids=${import.meta.env.PUBLIC_CORE_DATA_PROJECT_ID}`;
        const relatedPlacesUrl = `${import.meta.env.PUBLIC_CORE_DATA_API_URL}/${props.placeId}/places?project_ids=${import.meta.env.PUBLIC_CORE_DATA_PROJECT_ID}`;
        const orgsUrl = `${import.meta.env.PUBLIC_CORE_DATA_API_URL}/${props.placeId}/organizations/?project_ids=${import.meta.env.PUBLIC_CORE_DATA_PROJECT_ID}`;
        const relatedPeopleUrl = `${import.meta.env.PUBLIC_CORE_DATA_API_URL}/${props.placeId}/people?project_ids=${import.meta.env.PUBLIC_CORE_DATA_PROJECT_ID}`;
        const relatedMediaUrl = `${import.meta.env.PUBLIC_CORE_DATA_API_URL}/${props.placeId}/media_contents?project_ids=${import.meta.env.PUBLIC_CORE_DATA_PROJECT_ID}`;
        const loadPlace = async () => {
            const placeData = await fetch(placeUrl).then((res) => res.json());
            const relatedPlaceData = await fetch(relatedPlacesUrl).then((res) => res.json());
            const orgsData = await fetch(orgsUrl).then((res) => res.json());
            const relatedPeopleData = await fetch(relatedPeopleUrl).then((res) => res.json());
            const relatedMediaData = await fetch(relatedMediaUrl).then((res) => res.json());

            setPlace(placeData);
            setRelatedPeople({
                endpoint: 'people',
                ui_label: 'Related People',
                data: relatedPeopleData
            });
            setOrgs({
                endpoint: 'organizations',
                ui_label: 'Organizations',
                data: orgsData
            });
            setRelatedPlaces({
                endpoint: 'places',
                ui_label: 'Related Places',
                data: relatedPlaceData
            });
            setRelatedMedia({
                endpoint: 'media_contents',
                ui_label: 'Related Media',
                data: relatedMediaData
            });
        }

        loadPlace();
    }, [props]);

    return (
        <>
            { place ? <PlaceDetails
                place={place}
                related={[ relatedPeople, orgs, relatedPlaces, relatedMedia ].filter((cat) => cat.data.items.length > 0)}
                onClose={props.onClose}
            /> : <p className="p-6">Loading place info...</p> }
        </>
    )
};

export default PlaceDetail;