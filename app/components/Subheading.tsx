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
            className='text-2xl md:text-3xl font-bold py-[54px] text-center'
        >
            {children}
        </h2>
    );
};
