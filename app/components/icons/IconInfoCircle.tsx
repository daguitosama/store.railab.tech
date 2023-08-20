interface IconInfoCircleProps {
    /**
     * Property description
     */
    stroke_width?: number;
    classes?: string;
}

/**
 * Component
 */
export const IconInfoCircle = ({ classes, stroke_width, ...props }: IconInfoCircleProps) => {
    return (
        <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            xmlns="http://www.w3.org/2000/svg"
            className={classes}
        >
            <path
                d="M12 16V12M12 8H12.01M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z"
                strokeWidth={stroke_width ? stroke_width : "1.5"}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>

        // <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        // <path d="M12 16V12M12 8H12.01M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        // </svg>
    );
};
