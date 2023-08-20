type SubheadingProps = {
    /**
     * Property description
     */
    children: JSX.Element;
};

/**
 * Component
 */
export const Subheading = ({ children, ...props }: SubheadingProps) => {
    return (
        <h2
            {...props}
            className='text-4xl font-bold py-[54px] text-center'
        >
            {children}
        </h2>
    );
};
