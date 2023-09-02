module.exports = {
    apps: [
        {
            name: "store.railab.tech",
            script: "NODE_ENV=production  && pnpm remix-serve build",
            env_production: {
                ST_ACCESS_TOKEN: "",
                ST_PREVIEW_ACCESS_TOKEN: "",
                DOMAIN: "",
            },
        },
    ],
};
