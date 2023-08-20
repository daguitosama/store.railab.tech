import { Fragment, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { IconX } from "~/components/icons/IconX";
import { Dialog, Transition } from "@headlessui/react";

interface ModalDownProps {
    /**
     * Children
     */
    children?: JSX.Element;

    /**
     * Close fn handler
     */
    onClose: () => void;

    /**
     * Close fn handler
     */
    open: boolean;

    /**
     * Close btn label
     */
    closeLabel: string;

    /**
     * Optional Container
     * will defaults to body
     */
    container_node?: JSX.Element;
}

/**
 * ModalDown
 */
export const ModalDown = ({
    children,
    open,
    onClose = () => {
        console.log("on close evt");
    },
    closeLabel = "Close",
    ...props
}: ModalDownProps) => {
    const transition = (
        <Transition
            show={open}
            enter='transition duration-200 ease-out'
            enterFrom='transform-gpu translate-y-full '
            enterTo='transform-gpu translate-y-0 '
            leave='transition duration-100 ease-in'
            leaveFrom='transform-gpu translate-y-0 '
            leaveTo='transform-gpu translate-y-full '
            as={Fragment}
        >
            <div
                className={`
                fixed bottom-12 left-0 z-20 w-full
            `}
            >
                <div
                    className='
                         relative mx-auto p-[30px]   max-w-[500px] border border-slate-300
                        bg-white rounded-tl-[24px] rounded-[24px] modal_shadow
                        transition-transform duration-300 '
                >
                    <button
                        onClick={onClose}
                        className={` 
                            absolute right-[15px] top-[15px] p-[10px] rounded-full
                            hover:bg-slate-100
                            focus-visible:outline-none focus-visible:ring-black 
                            focus-visible:ring-2 transition-all duration-300
                        `}
                        aria-label={closeLabel}
                    >
                        <IconX stroke_width={2} />
                    </button>
                    {children}
                </div>
            </div>
        </Transition>
    );
    return transition;
    // return open ? createPortal(modal, document.body) : null;
};
