import type { LoaderArgs, V2_MetaFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { CategoryGrid } from "~/components/CategoryGrid";
import { env } from "~/enviroment.server";
import { Category, SEO } from "~/lib/lib.going.out.server";

type LoaderData = {
    intro: {
        title: string;
        paragraph: string;
    };
    category_sections: {
        id: string;
        title: string;
        categories: Category[];
    }[];
    seo: SEO;
};

export async function loader({ request }: LoaderArgs) {
    const category_sections: LoaderData["category_sections"] = [
        {
            id: "1",
            title: "Componentes en stock",
            categories: [
                {
                    id: "1",
                    title: "Motherboards",
                    slug: "motherboards",
                    image: "/img/proto/alexandre-debieve-FO7JIlwjOtU-unsplash.webp",
                },
                {
                    id: "2",
                    title: "Batteries",
                    slug: "batteries",
                    image: "/img/proto/mika-baumeister-USW-dIQpcAk-unsplash.webp",
                },
                {
                    id: "3",
                    title: "Displays",
                    slug: "displays",
                    image: "/img/proto/daniel-korpai-HyTwtsk8XqA-unsplash.webp",
                },
            ],
        },
    ];

    const seo: SEO = {
        title: "Railab Store",
        description:
            "Resuelve tu pieza socio! Partes y accesorios para la Mac en la Habana. Seriedad y Calidad garantizadas.",
        og_image: "",
    };

    console.log("DOMAIN: ", env().DOMAIN);
    return json<LoaderData>({
        category_sections,
        seo,
        intro: {
            title: "Piezas y componentes para la Mac en la Habana",
            paragraph: "Seriedad y calidad garantizadas!",
        },
    });
}

export const meta: V2_MetaFunction = ({ data }: { data: LoaderData }) => {
    return [{ title: data.seo.title }, { name: "description", content: data.seo.description }];
};

export default function Index() {
    const { category_sections, intro } = useLoaderData<LoaderData>();
    return (
        <div className='w-full min-h-screen'>
            {/* bg-gradient-to-tr from-slate-500 to-slate-900 */}
            <div className='bg-azulito text-white py-[90px]'>
                <div className='frame grid grid-cols-1 gap-[20px] font-bold'>
                    <span>Railab Store</span>
                    <h1 className='text-2xl'>{intro.title}</h1>
                    <p className='text-lg'>{intro.paragraph}</p>
                </div>
            </div>
            <div className='frame'>
                {category_sections.map((section) => {
                    return (
                        <div key={section.id}>
                            <CategoryGrid
                                title={section.title}
                                categories={section.categories}
                            />
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
