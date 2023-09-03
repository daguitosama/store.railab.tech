import { json, type LoaderArgs, type V2_MetaFunction } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { Heading } from "~/components/Heading";
import { env } from "~/environment.server";
import { CategoryPage, Product } from "~/lib/blocks/category.page";
import { seo_meta_tags } from "~/lib/lib.server";
import { create_storyblock_api } from "~/lib/st.api.server";

type LoaderData = {
    category_page: CategoryPage;
    meta: ReturnType<V2_MetaFunction>;
};

export async function loader({ request, params }: LoaderArgs) {
    const { category_slug } = params;
    if (!category_slug || typeof category_slug != "string") {
        throw new Error("Non valid category");
    }
    const content = create_storyblock_api({ access_token: env().ST_ACCESS_TOKEN });
    const category_page_result = await content.get_category_page(category_slug);
    if (category_page_result.err) {
        throw category_page_result.err;
    }
    return json<LoaderData>({
        category_page: category_page_result.ok,
        meta: seo_meta_tags(category_page_result.ok.seo, `/categories/${category_slug}`),
    });
}

export const meta: V2_MetaFunction = ({ data }: { data: LoaderData }) => {
    return data.meta;
};

export default function Index() {
    const loaderData = useLoaderData<LoaderData>();
    return (
        <div>
            <div className='frame'>
                <Heading>
                    <span>{loaderData.category_page.name}</span>
                </Heading>
                <ProductGrid products={loaderData.category_page.products} />
            </div>
        </div>
    );
}

interface ProductGridProps {
    /**
     * Products
     */
    products: Product[];
}

/**
 * ProductGrid
 */
export const ProductGrid = ({ products, ...props }: ProductGridProps) => {
    return (
        <div>
            <ul className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[54px] lg:gap-[20px] xl:gap-[54px]'>
                {products.map((product) => {
                    return (
                        <li
                            key={product.id}
                            className=''
                        >
                            <ProductCard product={product} />
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

function ProductCard({ product, ...props }: { product: Product }) {
    return (
        <article className='mx-auto w-full  relative group '>
            <div className='relative z-20 grid grid-cols-1 gap-[20px] '>
                <div className='h-[200px] relative rounded-[12px] overflow-hidden hover:scale-105 transform-gpu duration-300 group'>
                    <img
                        src={product.content.image}
                        aria-hidden='true'
                        className='blur-0 absolute inset-0 h-full w-full object-cover group-hover:scale-125 duration-500 transform-gpu'
                    />
                </div>

                <div className='flex items-center justify-between text-2xl font-bold font-mono'>
                    <h3 className=''>{product.name}</h3>
                    <span>${product.content.price}</span>
                </div>

                <div
                    className='prose'
                    dangerouslySetInnerHTML={{ __html: product.content.description }}
                ></div>
            </div>

            <Link
                to={`/products/${product.slug}`}
                className='absolute inset-0 w-full h-full z-30'
            >
                <span className='sr-only'>{product.name}</span>{" "}
            </Link>
            <div className='group-hover:opacity-100 opacity-0 bg-white group-hover:scale-110 rounded-[12px] duration-300 absolute inset-0 w-full h-full z-10'></div>
        </article>
    );
}
