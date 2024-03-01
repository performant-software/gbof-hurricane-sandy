import { useEffect, useState } from "react";
import client from "../../tina/__generated__/client";
import { CoreDataPlace } from "./CoreDataPlace";
import { TinaMarkdown } from "tinacms/dist/rich-text";

export interface PathViewerProps {
    slug: string;
}

const PathViewer = (props: PathViewerProps) => {

    const [path, setPath] = useState<any | undefined>(undefined);
    const [current, setCurrent] = useState(-1);

    useEffect(() => {
        client.queries.path({ relativePath: `${props.slug}.mdx` }).then((path) => {
            setPath(path.data.path);
        });
    }, []);

    return (
        <div className="w-full h-screen flex flex-row">
            <div className="h-full w-1/2">
                {path && current >= 0 ? <CoreDataPlace
                    mapStyle={`https://api.maptiler.com/maps/dataviz/style.json?key=${import.meta.env.PUBLIC_REACT_APP_MAP_TILER_KEY}`}
                    placeURI={`${import.meta.env.PUBLIC_CORE_DATA_API_URL}/${path.path[current].place.uuid}?project_ids=${import.meta.env.PUBLIC_CORE_DATA_PROJECT_ID}`}
                    fly
                    defaultZoom={16}
                /> : path && <img src={path.image} className="w-full" />}
            </div>
            <div className="h-full w-1/2 overflow-y-scroll">
                {path && (
                    <div className="flex flex-col py-16 px-12 gap-16">
                        {current >= 0 ? (
                            <>
                                <div onClick={() => setCurrent(-1)} className="cursor-pointer">Go Back</div>
                                <h2 className="text-3xl">{path.path[current].place.title}</h2>
                                <article className="prose"><TinaMarkdown content={path.path[current].blurb} /></article>
                                <div className="flex flex-row pt-16 w-full justify-between py-16">
                                    <div onClick={() => current > 0 && setCurrent((i) => i - 1)} className={current == 0 ? 'text-gray-500 cursor-default' : 'cursor-pointer'}>Previous</div>
                                    <div onClick={() => current < path.path.length - 1 && setCurrent((i) => i + 1)} className={current == path.path.length - 1 ? 'text-gray-500 cursor-default' : 'cursor-pointer'}>Next</div>
                                </div>
                            </>
                        ) : (
                            <>
                                <h2 className="text-3xl">{path.title}</h2>
                                <article className="prose prose-xl"><TinaMarkdown content={path.description} /></article>
                                <div className="cursor-pointer" onClick={() => setCurrent(0)}>Begin Path</div>
                            </>
                        )}
                    </div>
                )}
            </div>
        </div>
    )
};

export default PathViewer;
