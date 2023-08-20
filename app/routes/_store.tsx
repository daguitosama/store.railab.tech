import { json, type LoaderArgs, type V2_MetaFunction } from "@remix-run/node";
import { Outlet, useLoaderData } from "@remix-run/react";
import { NavigationLink, Navigation } from "~/components/Navigation";

type LoaderData = {
    links: NavigationLink[];
};

export async function loader({ request }: LoaderArgs) {
    const links: NavigationLink[] = [
        {
            id: "0",
            label: "Home",
            slug: "/",
        },
        {
            id: "1",
            label: "Motherboards",
            slug: "motherboards",
        },
        {
            id: "2",
            label: "Batteries",
            slug: "batteries",
        },
        {
            id: "3",
            label: "Displays",
            slug: "displays",
        },
    ];

    // console.log(`Node Env: `, process.env.NODE_ENV);
    return json<LoaderData>({
        links,
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
