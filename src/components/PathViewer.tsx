
export interface PathViewerProps {
    path: any;
}

const PathViewer = (props: PathViewerProps) => {
    return ( 
        <div className="mx-auto width-3/4 mt-12">
            <p className="text-xl py-6">This path contains:</p>
            <ul>
                { props.path.path.map((place) => (
                    <li key={place.place.uuid}>{place.place.title}</li>
                ))}
            </ul>
        </div>
    )
};

export default PathViewer;