import { Link } from "@remix-run/react";
import { Product } from "~/lib/lib.going.out.server";

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
                        src={product.image}
                        aria-hidden='true'
                        className='blur-0 absolute inset-0 h-full w-full object-cover group-hover:scale-125 duration-500 transform-gpu'
                    />
                </div>

                <div className='flex items-center justify-between text-2xl font-bold font-mono'>
                    <h3 className=''>{product.title}</h3>
                    <span>${product.price}</span>
                </div>

                <div>
                    <p>{product.short_description}</p>
                </div>
            </div>

            <Link
                to={`/products/${product.slug}`}
                className='absolute inset-0 w-full h-full z-30'
            >
                <span className='sr-only'>{product.title}</span>{" "}
            </Link>
            <div className='group-hover:opacity-100 opacity-0 bg-white group-hover:scale-110 rounded-[12px] duration-300 absolute inset-0 w-full h-full z-10'></div>
        </article>
    );
}
