import { useEffect, useState } from "react";
import { PlaceDetailsPanel } from "@performant-software/core-data";

export interface PlaceDetailProps {
    placeId: string;
    onClose: () => void;
};

const PlaceDetail = (props: PlaceDetailProps) => {
    const [place, setPlace] = useState<any>();
    const [relatedPlaces, setRelatedPlaces] = useState<any>();
    const [orgs, setOrgs] = useState<any>();
    const [relatedPeople, setRelatedPeople] = useState<any>();

    useEffect(() => {
        const placeUrl = `${import.meta.env.PUBLIC_CORE_DATA_API_URL}/${props.placeId}?project_ids=${import.meta.env.PUBLIC_CORE_DATA_PROJECT_ID}`;
        const relatedPlacesUrl = `${import.meta.env.PUBLIC_CORE_DATA_API_URL}/${props.placeId}/places?project_ids=${import.meta.env.PUBLIC_CORE_DATA_PROJECT_ID}`;
        const orgsUrl = `${import.meta.env.PUBLIC_CORE_DATA_API_URL}/${props.placeId}/organizations/?project_ids=${import.meta.env.PUBLIC_CORE_DATA_PROJECT_ID}`;
        const relatedPeopleUrl = `${import.meta.env.PUBLIC_CORE_DATA_API_URL}/${props.placeId}/people?project_ids=${import.meta.env.PUBLIC_CORE_DATA_PROJECT_ID}`;
        const loadPlace = async (placeId: string) => {
            const placeData = await fetch(placeUrl).then((res) => res.json());
            const relatedPlaceData = await fetch(relatedPlacesUrl).then((res) => res.json());
            const orgsData = await fetch(orgsUrl).then((res) => res.json());
            const relatedPeopleData = await fetch(relatedPeopleUrl).then((res) => res.json());

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
            });;
        }

        loadPlace(props.placeId);
    }, [props]);

    return (
        <>
            { place ? <PlaceDetailsPanel
                place={place}
                related={[ relatedPeople, orgs, relatedPlaces ]}
                onClose={props.onClose}
            /> : <p>Loading place info...</p> }
        </>
    )
};

export default PlaceDetail;