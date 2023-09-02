type SubheadingProps = {
    /**
     * Property description
     */
    children: JSX.Element;
};

/**
 * Component
 */
export const Heading = ({ children, ...props }: SubheadingProps) => {
    return (
        <h1
            {...props}
            className='text-3xl md:text-4xl font-bold py-[54px] text-center'
        >
            {children}
        </h1>
    );
};
