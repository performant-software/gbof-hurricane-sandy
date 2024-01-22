import { defineConfig } from "tinacms";

// Your hosting provider likely exposes this as an environment variable
const branch =
  process.env.GITHUB_BRANCH ||
  process.env.VERCEL_GIT_COMMIT_REF ||
  process.env.HEAD ||
  "main";

export default defineConfig({
  branch,

  // Get this from tina.io
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID,
  // Get this from tina.io
  token: process.env.TINA_TOKEN,

  build: {
    outputFolder: "admin",
    publicFolder: "public",
  },
  media: {
    tina: {
      mediaRoot: "",
      publicFolder: "public",
    },
  },
  // See docs on content modeling for more info on how to setup new content models: https://tina.io/docs/schema/
  schema: {
    collections: [
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
            type: "rich-text",
            name: "body",
            label: "Body",
            isBody: true,
            templates: [
              {
                name: "place",
                label: "Place",
                fields: [
                  {
                    name: "name",
                    label: "Label",
                    type: "string",
                    required: true,
                    isTitle: true,
                  },
                  {
                    name: "place",
                    label: "Place Data",
                    type: "reference",
                    collections: [ 'place' ],
                  },
                ]
              },
              {
                name: "person",
                label: "Person",
                fields: [
                  {
                    name: "firstName",
                    label: "First Name",
                    type: "string",
                  },
                  {
                    name: "lastName",
                    label: "Last Name",
                    type: "string",
                    required: true,
                    isTitle: true,
                  }
                ]
              }
            ]
          },
        ],
      },
      {
        name: "place",
        label: "Places",
        path: "content/places",
        fields: [
          {
            name: "name",
            label: "Place Name",
            type: "string",
            required: true,
            isTitle: true,
          },
          {
            name: "core_data_id",
            label: "Core Data Place ID",
            type: "string",
            required: true,
          },
          {
            name: "description",
            label: "Description",
            type: "rich-text",
            isBody: true,
          }
        ]
      },
    ],
  },
});
