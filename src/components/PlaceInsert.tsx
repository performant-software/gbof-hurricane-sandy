import { isModalOpen, currentPlace } from "../modalStore";



const PlaceInsert = (props: any) => {
    return (
        <div className="flex flex-col gap-y-2 place-content-center mx-auto my-8">
            <div className="bg-indigo-400 h-32 w-32 flex place-content-center mx-auto cursor-pointer place-tile" data-uuid={props.place.uuid}>
                { props.place.title }
            </div>
            <div className="text-center text-lg">{props.title}</div>
            <p className="text-center italic text-sm">{props.caption}</p>
        </div>
    )
}

export default PlaceInsert;