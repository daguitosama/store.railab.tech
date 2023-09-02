import type { LoaderArgs, V2_MetaFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { Subheading } from "~/components/Subheading";
import { env } from "~/environment.server";
import { HomeCategory, HomePage } from "~/lib/blocks/home";
import { seo_meta_tags } from "~/lib/lib.server";
import { create_storyblock_api } from "~/lib/st.api.server";

type LoaderData = {
    home_page: HomePage;
    meta: ReturnType<V2_MetaFunction>;
};

export async function loader({ request }: LoaderArgs) {
    const content = create_storyblock_api({ access_token: env().ST_ACCESS_TOKEN });
    const home_op = await content.get_home_page();
    if (home_op.err) {
        throw home_op.err;
    }
    return json<LoaderData>({
        home_page: home_op.ok,
        meta: seo_meta_tags(home_op.ok.seo, "/"),
    });
}

export const meta: V2_MetaFunction = ({ data }: { data: LoaderData }) => {
    return data.meta;
};

export default function Index() {
    const { home_page } = useLoaderData<LoaderData>();
    return (
        <div className='w-full min-h-screen'>
            <Intro block={home_page.intro} />
            <Categories block={home_page.category_sections} />
        </div>
    );
}

function Intro({ block }: { block: HomePage["intro"] }) {
    return (
        <div className='bg-azulito text-white  '>
            <div className='frame py-[50px]  grid grid-cols-1 gap-[30px] place-items-center text-center'>
                <span className='font-bold md:text-xl'>Railab Store</span>
                <h1 className='text-2xl md:text-4xl'>{block.heading}</h1>
                <p className='font-bold md:text-xl'>{block.sub_heading}</p>
            </div>
        </div>
    );
}

function Categories({ block }: { block: HomePage["category_sections"] }) {
    return (
        <div className=' max-w-screen-lg mx-auto px-[25px]'>
            {block.map((cts) => {
                return (
                    <div key={cts.id}>
                        <Subheading>
                            <span>{cts.title}</span>
                        </Subheading>
                        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[54px] lg:gap-[20px] xl:gap-[54px]'>
                            {cts.categories.map((ct) => {
                                return (
                                    <div key={ct.id}>
                                        <CategoryCard block={ct} />
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                );
            })}
        </div>
    );
}

function CategoryCard({ block }: { block: HomeCategory }) {
    return (
        <article className='mx-auto w-full h-[200px] relative rounded-[12px] overflow-hidden hover:scale-105 transform-gpu duration-300 group'>
            <img
                src={block.image.url}
                alt={block.image.alt_text}
                aria-hidden='true'
                className='blur-0 absolute inset-0 h-full w-full object-cover group-hover:scale-125 duration-500 transform-gpu'
            />
            <Link
                to={block.slug}
                className='bg-black/60 absolute inset-0 w-full h-full grid place-items-center'
            >
                <h3 className='relative z-20 text-2xl font-bold text-white'>{block.title}</h3>
            </Link>
        </article>
    );
}
