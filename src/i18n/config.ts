import userDefinedFields from "./userDefinedFields";

const config = {
    i18n: {
        defaultLocale: "en",
        locales: ["en"],
        routing: {
            prefixDefaultLocale: false
        }
    },
    ui: {
        map: {
            tinaLabel: "Map"
        },
        home: {
            tinaLabel: "Home"
        },
        about: {
            tinaLabel: "About"
        },
        posts: {
            tinaLabel: "Posts"
        },
        // add in non-user-defined core data fields here
        title: {
            tinaLabel: "Name"
        },
        root: {
            tinaLabel: "Root"
        },
        ...userDefinedFields
    },
    featuredModel: {
        uuid: '83f862f6-f231-45f7-9bc1-66ef8c2eeaf3',
        labelField: '83f862f6-f231-45f7-9bc1-66ef8c2eeaf3.name.value'
    }
};

export default config;