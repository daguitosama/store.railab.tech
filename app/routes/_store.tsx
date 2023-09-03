import { json, type LoaderArgs, type V2_MetaFunction } from "@remix-run/node";
import { Outlet, useLoaderData } from "@remix-run/react";
import { Navigation } from "~/components/Navigation";
import { env } from "~/environment.server";
import { MenuLink } from "~/lib/parsers/links";
import { create_storyblock_api } from "~/lib/st.api.server";

type LoaderData = {
    links: MenuLink[];
};

export async function loader({ request }: LoaderArgs) {
    // const _links: NavigationLink[] = [
    //     {
    //         id: "0",
    //         label: "Home",
    //         slug: "/",
    //     },
    //     {
    //         id: "1",
    //         label: "Motherboards",
    //         slug: "motherboards",
    //     },
    //     {
    //         id: "2",
    //         label: "Batteries",
    //         slug: "batteries",
    //     },
    //     {
    //         id: "3",
    //         label: "Displays",
    //         slug: "displays",
    //     },
    // ];
    const content = create_storyblock_api({ access_token: env().ST_ACCESS_TOKEN });
    const menu_links_result = await content.get_menu_links();
    if (menu_links_result.err) {
        throw menu_links_result.err;
    }
    return json<LoaderData>({
        links: [{ id: "home_menu_link", label: "Home", route: "/" }].concat(menu_links_result.ok),
    });
}

export const meta: V2_MetaFunction = () => {
    return [{ title: "Railab Store" }, { name: "description", content: "Mac parts en la Habana" }];
};

export default function Index() {
    const { links } = useLoaderData<LoaderData>();
    return (
        <div className='bg-grissito min-h-screen font-mono pb-[140px] antialiased '>
            <div className=''>
                <Navigation links={links} />
                <Outlet />
            </div>
        </div>
    );
}
