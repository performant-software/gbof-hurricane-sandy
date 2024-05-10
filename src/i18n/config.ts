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
        paths: {
            tinaLabel: "Paths"
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
    }
};

export default config;