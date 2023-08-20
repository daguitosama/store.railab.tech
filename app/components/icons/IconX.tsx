import clsx from "clsx";

interface IconXProps {
    /**
     * Property description
     */
    stroke_width?: number;
    className?: string;
}

/**
 * Component
 */
export const IconX = ({ stroke_width, className, ...props }: IconXProps) => {
    return (
        <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            xmlns="http://www.w3.org/2000/svg"
            className={clsx(className)}
        >
            <path
                d="M18 6L6 18M6 6L18 18"
                strokeWidth={stroke_width ? stroke_width : "1.5"}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
};
