import { json, type LoaderArgs, type V2_MetaFunction } from "@remix-run/node";
import { useLoaderData, useLocation } from "@remix-run/react";
import { env } from "~/environment.server";
import { seo_meta_tags } from "~/lib/lib.server";
import { Product } from "~/lib/parsers/product";
import { create_storyblock_api } from "~/lib/st.api.server";

type LoaderData = {
    product: Product;
    meta: ReturnType<V2_MetaFunction>;
};

export async function loader({ request, params }: LoaderArgs) {
    const { product_slug } = params;
    if (!product_slug || typeof product_slug != "string") {
        throw new Error("Non valid product");
    }

    const content = create_storyblock_api({ access_token: env().ST_ACCESS_TOKEN });
    const product_result = await content.get_product(product_slug);
    if (product_result.err) {
        throw product_result.err;
    }

    return json<LoaderData>({
        product: product_result.ok,
        meta: seo_meta_tags(product_result.ok.content.seo, `/products/${product_slug}`),
    });
}

export const meta: V2_MetaFunction = ({ data }: { data: LoaderData }) => {
    return data.meta;
};

export default function Index() {
    const loaderData = useLoaderData<LoaderData>();
    const location = useLocation();
    const message = encodeURI(
        `Hola me interesa el producto: *${loaderData.product.name}* 
Que vi en https://store.railab.tech${location.pathname}
        `
    );

    return (
        <div className='grid grid-cols-1 lg:grid-cols-7 lg:gap-[30px] lg:pt-[90px] max-w-[1128px] mx-auto'>
            <div className=' lg:col-span-4'>
                <img
                    src={loaderData.product.content.image}
                    aria-hidden='true'
                    className='w-full h-auto lg:rounded-[12px]'
                />
            </div>
            <div className='px-[30px] lg:col-span-3 '>
                <div className='grid grid-cols-1 gap-[20px] pt-[20px] '>
                    {/* name & price */}
                    <div className='flex items-baseline justify-between '>
                        <h1 className='text-3xl lg:text-5xl font-bold'>
                            {loaderData.product.name}
                        </h1>
                        <span className='text-2xl lg:text-3xl'>
                            ${loaderData.product.content.price}
                        </span>
                    </div>
                    {/* description */}
                    <div>
                        <div
                            dangerouslySetInnerHTML={{
                                __html: loaderData.product.content.description,
                            }}
                            className='text-lg lg:justify-end prose'
                        ></div>
                    </div>
                    {/* contact */}
                    <div className='flex gap-[20px]'>
                        <TelegramProductLink message={message} />
                        <WhatsAppProductLink message={message} />
                    </div>
                </div>
            </div>
        </div>
    );
}

function TelegramProductLink({ message }: { message: string }) {
    return (
        <SocialLink
            href={`https://t.me/RaikMac/msg?text=${message}`}
            label='Telegram'
        />
    );
}

function WhatsAppProductLink({ message }: { message: string }) {
    return (
        <SocialLink
            href={`https://wa.me/+5354132120?text=${message}`}
            label='WhatsApp'
        />
    );
}

function SocialLink({ href, label }: { href: string; label: string }) {
    return (
        <a
            href={href}
            className='px-[30px] py-[16px] bg-azulito text-white text-xl rounded-full border-azulito/10 shadow-xl'
        >
            {label}
        </a>
    );
}
