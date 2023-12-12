"use client";
import { useRef, useState } from "react";
import { cn } from "@/lib/utils";

const MenuIcon = (props) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            {...props}
        >
            <g
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeWidth="2"
            >
                <path d="M5 5L12 12L19 5">
                    <animate
                        fill="freeze"
                        attributeName="d"
                        dur="0.4s"
                        values="M5 5L12 12L19 5;M5 5L12 5L19 5"
                    ></animate>
                </path>
                <path d="M12 12H12">
                    <animate
                        fill="freeze"
                        attributeName="d"
                        dur="0.4s"
                        values="M12 12H12;M5 12H19"
                    ></animate>
                </path>
                <path d="M5 19L12 12L19 19">
                    <animate
                        fill="freeze"
                        attributeName="d"
                        dur="0.4s"
                        values="M5 19L12 12L19 19;M5 19L12 19L19 19"
                    ></animate>
                </path>
            </g>
        </svg>
    );
}


const XIon = (props) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            {...props}
        >
            <g
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeWidth="2"
            >
                <path d="M5 5L12 5L19 5">
                    <animate
                        fill="freeze"
                        attributeName="d"
                        dur="0.4s"
                        values="M5 5L12 5L19 5;M5 5L12 12L19 5"
                    ></animate>
                </path>
                <path d="M5 12H19">
                    <animate
                        fill="freeze"
                        attributeName="d"
                        dur="0.4s"
                        values="M5 12H19;M12 12H12"
                    ></animate>
                </path>
                <path d="M5 19L12 19L19 19">
                    <animate
                        fill="freeze"
                        attributeName="d"
                        dur="0.4s"
                        values="M5 19L12 19L19 19;M5 19L12 12L19 19"
                    ></animate>
                </path>
            </g>
        </svg>
    );
}

const MobileNav = ({ children }) => {
    const [open, setOpen] = useState(false);
    const ref = useRef(null);
    const buttonRef = useRef(null);
    return (
        <div ref={ref} className="h-full lg:hidden">
            <button
                ref={buttonRef}
                onClick={() => setOpen(!open)}
                className={cn(
                    "text-stone-800 dark:text-stone-300 ",
                    open && "dark:bg-stone-900  bg-yellow-100",
                    "h-full dark:hover:bg-stone-900 hover:bg-yellow-100 place-content-center flex items-center justify-center border-l lg:px-16 sm:px-8 px-4 lg:hidden"
                )}
            >
                {open ? (
                    <XIon className="sm:h-8 h-5  animate-out duration-700" />
                ) : (
                    <MenuIcon className="sm:h-8 h-5" />
                )}
            </button>

            <nav
                onClick={() => setOpen(false)}
                className={cn(
                    "absolute right-0  origin-bottom overflow-hidden w-screen  backdrop-blur-sm bg-amber-700/20 dark:bg-stone-950/80 transition-all duration-500",
                    open ? "h-full" : "h-0"
                )}
            >
                {children}
            </nav>
        </div>
    );
};

export default MobileNav;
