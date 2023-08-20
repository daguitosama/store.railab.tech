import { Link, NavLink } from "@remix-run/react";
import clsx from "clsx";
import { useState } from "react";
import { ModalDown } from "./ModalDown";

export type NavigationLink = {
    id: string;
    label: string;
    slug: string;
};

interface NavigationProps {
    /**
     * Property description
     */
    links: NavigationLink[];
}

/**
 * Component
 */
export const Navigation = ({ links, ...props }: NavigationProps) => {
    const [is_menu_open, set_menu_open] = useState<boolean>(false);
    function toggle() {
        set_menu_open(!is_menu_open);
    }

    function onMenuBtnClick() {
        const is_a_open_attempt = !is_menu_open;
        toggle();
        if (is_a_open_attempt) {
            // focus menu first item
        }
    }
    function close_menu() {
        set_menu_open(false);
    }
    return (
        <div className='h-[0px] overflow-visible w-full flex items-center justify-center fixed z-50 bottom-20 left-0'>
            <header>
                <nav className='relative z-30 '>
                    <div className='max-w-[500px] mx-auto'>
                        <ModalDown
                            open={is_menu_open}
                            onClose={close_menu}
                            closeLabel='Close menu'
                        >
                            <ul className='pt-[30px] grid grid-cols-1 gap-[12px]'>
                                {links.map((link) => {
                                    return (
                                        <li
                                            key={link.slug}
                                            className=''
                                        >
                                            <NavMenuLink
                                                link={link}
                                                on_close={close_menu}
                                            />
                                        </li>
                                    );
                                })}
                            </ul>
                        </ModalDown>
                    </div>

                    {/* home & menu btn */}
                    <div className=' w-full flex items-center justify-between text-black gap-[24px] px-[22px] py-[12px] border-slate-300 border rounded-[24px] bg-white modal_shadow'>
                        <Link
                            to={"/"}
                            className=''
                        >
                            <span>Railab Store</span>
                        </Link>
                        <button
                            onClick={onMenuBtnClick}
                            className='rounded-full  p-2 hover:bg-blue-100 duration-200'
                        >
                            <span className='sr-only'>
                                {is_menu_open ? "Close Menu" : "Open Menu"}
                            </span>
                            <IconMenu />
                        </button>
                    </div>
                </nav>
            </header>
        </div>
    );
};

function IconMenu() {
    return (
        <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth='1.5'
            stroke='currentColor'
            className='w-6 h-6'
        >
            <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M3.75 9h16.5m-16.5 6.75h16.5'
            />
        </svg>
    );
}

function NavMenuLink({ link, on_close, ...props }: { link: NavigationLink; on_close: () => void }) {
    return (
        <NavLink
            to={link.slug}
            onClick={on_close}
            className={({ isActive, isPending }) => {
                const baseStyles = " block w-full h-full p-2 rounded-md";
                const activeStyles = " bg-blue-100 ";
                var styles = " ";
                if (isActive) {
                    styles = baseStyles + activeStyles;
                } else {
                    styles = baseStyles;
                }

                return styles;
            }}
        >
            {link.label}
        </NavLink>
    );
}
