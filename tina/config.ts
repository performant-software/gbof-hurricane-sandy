import { defineConfig, LocalAuthProvider, type TinaField } from "tinacms";
import {
  TinaUserCollection,
  UsernamePasswordAuthJSProvider,
} from "tinacms-authjs/dist/tinacms";
import config from "../src/i18n/config";
import { t } from "../src/i18n/utils";
import TinaPlacePicker from "../src/components/TinaPlacePicker";

const uiFields: TinaField<false>[] = Object.keys(config.ui).map((key: string) => ({
  name: t(key),
  label: config.ui[key as keyof typeof config.ui].tinaLabel,
  type: "string",
  ui: {
    //@ts-ignore
    component: config.ui[key as keyof typeof config.ui]?.textArea ? 'textarea' : 'text'
  }
}));

const isLocal = process.env.TINA_PUBLIC_IS_LOCAL === "true";

export default defineConfig({
  authProvider: isLocal
    ? new LocalAuthProvider()
    : new UsernamePasswordAuthJSProvider(),
  build: {
    outputFolder: "admin",
    publicFolder: "public",
  },
  contentApiUrlOverride: '/api/tina/gql',
  media: {
    loadCustomStore: async () => {
      const pack = await import("next-tinacms-cloudinary");
      return pack.TinaCloudCloudinaryMediaStore;
    }
  },
  // See docs on content modeling for more info on how to setup new content models: https://tina.io/docs/schema/
  schema: {
    collections: [
      TinaUserCollection,
      {
        name: "about",
        label: "About the Project",
        path: "content/about",
        format: "mdx",
        fields: [
          {
            type: "string",
            name: "title",
            label: "Project Title",
          },
          {
            type: "string",
            name: "subheader",
            label: "Subheader",
            ui: {
              component: "textarea"
            }
          },
          {
            type: "rich-text",
            name: "description",
            label: "Project Description",
            isBody: true
          },
          {
            type: "image",
            name: "heroImage",
            label: "Hero Image"
          },
          {
            type: "image",
            name: "featureImage",
            label: "Feature Image"
          }
        ],
        ui: {
          allowedActions: {
            create: false,
            delete: false
          }
        }
      },
      {
        name: "post",
        label: "Posts",
        path: "content/posts",
        format: "mdx",
        fields: [
          {
            type: "string",
            name: "title",
            label: "Title",
            isTitle: true,
            required: true,
          },
          {
            name: "cardImage",
            label: "Card Image",
            type: "image"
          },
          {
            type: "rich-text",
            name: "body",
            label: "Body",
            isBody: true,
            templates: [
              {
                name: "iframe",
                label: "AV Embed",
                fields: [
                  {
                    name: "src",
                    label: "Embed Link",
                    type: "string",
                    required: true
                  },
                  {
                    name: "width",
                    label: "Width (pixels)",
                    type: "number",
                    ui: {
                      parse: (val?: number)=>val || 0,
                      format: (val?: number)=> val === 0 ? null : val
                    }
                  },
                  {
                    name: "height",
                    label: "Height (pixels)",
                    type: "number",
                    ui: {
                      parse: (val?: number)=>val || 0,
                      format: (val?: number)=> val === 0 ? null : val
                    }
                  }
                ]
              },
              {
                name: "place",
                label: "Place",
                fields: [
                  {
                    name: "title",
                    label: "Title",
                    type: "string",
                    required: true,
                    isTitle: true,
                  },
                  {
                    name: "place",
                    label: "Place Data",
                    type: "object",
                    fields: [
                      {
                        name: "title",
                        label: "Title",
                        type: "string",
                        required: true,
                        isTitle: true
                      },
                      {
                        name: "uuid",
                        label: "UUID",
                        type: "string",
                      },
                      {
                        name: "animate",
                        label: "Animate pulsing place marker?",
                        type: "boolean"
                      },
                      {
                        name: "buffer",
                        label: "Map zoom buffer (in miles)",
                        type: "number"
                      },
                      {
                        name: "layer",
                        label: "Custom Map Layer",
                        type: "number",
                        list: true
                      }
                    ],
                    ui: {
                      component: TinaPlacePicker,
                    },
                    required: true,
                  },
                  {
                    name: "caption",
                    label: "Caption",
                    type: "string",
                    ui: {
                      component: "textarea"
                    }
                  }
                ],
              },
            ]
          },
        ],
      },
      {
        name: "ui",
        format: "json",
        label: "UI Labels",
        path: "content/ui",
        fields: uiFields
      }
    ],
  },
});
