import { Link } from "@remix-run/react";
import { Category } from "~/lib/lib.going.out.server";
import { Subheading } from "./Subheading";

interface CategoryGridProps {
    /**
     * Title
     */
    title: string;

    /**
     * Categories
     */
    categories: Category[];
}

/**
 * Component
 */
export const CategoryGrid = ({ title, categories, ...props }: CategoryGridProps) => {
    return (
        <div>
            <Subheading>
                <span>{title}</span>
            </Subheading>
            <ul className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[54px] lg:gap-[20px] xl:gap-[54px]'>
                {categories.map((category) => {
                    return (
                        <li
                            key={category.id}
                            className=''
                        >
                            <CategoryCard category={category} />
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

function CategoryCard({ category, ...props }: { category: Category }) {
    return (
        <article className='mx-auto w-full h-[200px] relative rounded-[12px] overflow-hidden hover:scale-105 transform-gpu duration-300 group'>
            <img
                src={category.image}
                aria-hidden='true'
                className='blur-0 absolute inset-0 h-full w-full object-cover group-hover:scale-125 duration-500 transform-gpu'
            />
            <Link
                to={`/${category.slug}`}
                className='bg-black/60 absolute inset-0 w-full h-full grid place-items-center'
            >
                <h3 className='relative z-20 text-2xl font-bold text-white'>{category.title}</h3>
            </Link>
        </article>
    );
}
