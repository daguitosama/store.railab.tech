import clsx from "clsx";
import type { SVGAttributes } from "react";

interface Props extends SVGAttributes<SVGElement> {
    /**
     * Classes
     */
    className?: string;
}

/**
 * IconEye
 */
export const IconChevronDown = ({ className, ...props }: Props) => {
    return (
        <svg
            viewBox='0 0 24 24'
            fill='none'
            stroke='currentColor'
            xmlns='http://www.w3.org/2000/svg'
            strokeWidth={1.5}
            className={clsx(className ? className : " w-6 h-6 ")}
            {...props}
        >
            <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M19.5 8.25l-7.5 7.5-7.5-7.5'
            />
        </svg>
    );
};
