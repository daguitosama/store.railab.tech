module.exports = {
    apps: [
        {
            name: "store.railab.tech",
            script: "NODE_ENV=production pnpm remix-serve build",
        },
    ],
};
