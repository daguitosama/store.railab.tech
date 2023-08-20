import { json, type LoaderArgs, type V2_MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { ProductGrid } from "~/components/ProductGrid";
import { Subheading } from "~/components/Subheading";
import type { Category, Product, SEO } from "~/lib/lib.going.out.server";

type LoaderData = {
    seo: SEO;
    category: Category;
    products: Product[];
};

export async function loader({ request }: LoaderArgs) {
    return json<LoaderData>({
        seo: {
            title: "",
            description: "",
            og_image: "",
        },
        category: {
            id: "1",
            image: "",
            slug: "/motherboards",
            title: "Motherboards",
        },
        products: [
            {
                id: "1",
                slug: "a1707",
                title: "A1707",
                image: "/img/proto/alexandre-debieve-FO7JIlwjOtU-unsplash.webp",
                price: "250",
                short_description: `MacBook Pro 15" 2016/2017 i7 16gb Ram 500ssd`,
                full_description: `MacBook Pro 15" 2016/2017 i7 16gb Ram 500ssd`,
            },
            {
                id: "2",
                slug: "a1707",
                title: "A1707",
                image: "/img/proto/alexandre-debieve-FO7JIlwjOtU-unsplash.webp",
                price: "250",
                short_description: `MacBook Pro 15" 2016/2017 i7 16gb Ram 500ssd`,
                full_description: `MacBook Pro 15" 2016/2017 i7 16gb Ram 500ssd`,
            },
            {
                id: "3",
                slug: "a1707",
                title: "A1707",
                image: "/img/proto/alexandre-debieve-FO7JIlwjOtU-unsplash.webp",
                price: "250",
                short_description: `MacBook Pro 15" 2016/2017 i7 16gb Ram 500ssd`,
                full_description: `MacBook Pro 15" 2016/2017 i7 16gb Ram 500ssd`,
            },
        ],
    });
}

export const meta: V2_MetaFunction = ({ data }: { data: LoaderData }) => {
    return [{ title: data.seo.title }, { name: "description", content: data.seo.description }];
};

export default function Index() {
    const { category, products } = useLoaderData<LoaderData>();
    return (
        <div className='frame'>
            <Subheading>
                <span>{category.title}</span>
            </Subheading>
            <ProductGrid products={products} />
        </div>
    );
}
