import { json, type LoaderArgs, type V2_MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import type { GlobalSettings, Product, SEO } from "~/lib/lib.going.out.server";

type LoaderData = {
    seo: SEO;
    product: Product;
    global_settings: GlobalSettings;
};

export async function loader({ request }: LoaderArgs) {
    return json<LoaderData>({
        seo: {
            title: "",
            description: "",
            og_image: "",
        },
        product: {
            id: "1",
            slug: "a1707",
            title: "A1707",
            image: "/img/proto/alexandre-debieve-FO7JIlwjOtU-unsplash.webp",
            price: "250",
            short_description: `MacBook Pro 15" 2016/2017 i7 16gb Ram 500ssd`,
            full_description: `MacBook Pro 15" 2016/2017 i7 16gb Ram 500ssd`,
        },
        global_settings: {
            telegram_link: "",
            whatsapp_link: "",
        },
    });
}

export const meta: V2_MetaFunction = ({ data }: { data: LoaderData }) => {
    return [{ title: data.seo.title }, { name: "description", content: data.seo.description }];
};

export default function Index() {
    const { product, global_settings } = useLoaderData<LoaderData>();
    return (
        <div className='grid grid-cols-1 lg:grid-cols-2 lg:pt-[90px]'>
            <div className='lg:order-2 lg:w-[80%]'>
                <img
                    src={product.image}
                    aria-hidden='true'
                    className='w-full h-auto lg:rounded-[12px]'
                />
            </div>
            <div className='frame lg:flex lg:justify-end lg:items-start'>
                <div className='grid grid-cols-1 gap-[20px] pt-[20px] '>
                    {/* name & price */}
                    <div className='flex items-baseline justify-between lg:flex-col lg:justify-end lg:items-end'>
                        <h1 className='text-3xl lg:text-5xl font-bold'>{product.title}</h1>
                        <span className='text-2xl lg:text-3xl'>${product.price}</span>
                    </div>
                    <div>
                        <p
                            dangerouslySetInnerHTML={{ __html: product.full_description }}
                            className='text-lg lg:justify-end '
                        ></p>
                    </div>
                </div>
            </div>
        </div>
    );
}
