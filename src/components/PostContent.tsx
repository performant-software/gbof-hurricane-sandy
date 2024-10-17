import { Peripleo as PeripleoUtils } from "@performant-software/core-data";
import { RuntimeConfig } from "@peripleo/peripleo";
import { TinaMarkdown, TinaMarkdownContent } from "tinacms/dist/rich-text";
import IframeEmbed from "./IframeEmbed";
import PlaceInsert from "./PlaceInsert";

interface PostContentProps {
  content: TinaMarkdownContent;
  title: string;
}

const PostContent = (props: PostContentProps) => {
  return (
    <RuntimeConfig
      //@ts-ignore
      path="/config.json"
      preprocess={PeripleoUtils.normalize}
    >
      <div className="w-full">
        <h1 className="text-3xl py-6">{props.title}</h1>
        <article className="prose prose-lg max-w-none w-full">
          <TinaMarkdown
            content={props.content}
            components={{ place: PlaceInsert, iframe: IframeEmbed }}
          />
        </article>
      </div>
    </RuntimeConfig>
  );
};

export default PostContent;
