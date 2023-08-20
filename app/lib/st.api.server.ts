export function create_storyblock_api ({ access_token }: { access_token: string }) {
    var api_url = `https://gapi-us.storyblok.com/v1/api`;
    const headers = new Headers();
    headers.set("Content-Type", "application/json");
    headers.set("Token", access_token);

    return {
        async get_home_page(): Promise<>
    }
}