"use client";

import * as React from "react";

// import { CheckIcon, CopyIcon } from "@/components/icons/"

// import { Event, trackEvent } from "@/lib/events"
import { cn } from "@/lib/utils";

export function CopyIcon(props, className) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            className={cn("h-6 w-6", className)}
            viewBox="0 0 24 24"
            {...props}
        >
            <g fill="currentColor">
                <path d="M6.6 11.397c0-2.726 0-4.089.843-4.936c.844-.847 2.201-.847 4.917-.847h2.88c2.715 0 4.072 0 4.916.847c.844.847.844 2.21.844 4.936v4.82c0 2.726 0 4.089-.844 4.936c-.843.847-2.201.847-4.916.847h-2.88c-2.716 0-4.073 0-4.917-.847c-.843-.847-.843-2.21-.843-4.936v-4.82Z"></path>
                <path
                    d="M4.172 3.172C3 4.343 3 6.229 3 10v2c0 3.771 0 5.657 1.172 6.828c.617.618 1.433.91 2.62 1.048c-.192-.84-.192-1.996-.192-3.66v-4.819c0-2.726 0-4.089.843-4.936c.844-.847 2.201-.847 4.917-.847h2.88c1.652 0 2.8 0 3.638.19c-.138-1.193-.43-2.012-1.05-2.632C16.657 2 14.771 2 11 2C7.229 2 5.343 2 4.172 3.172Z"
                    opacity=".5"
                ></path>
            </g>
        </svg>
    );
}

export function ErrorIcon(props, className) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            className={cn("h-6 w-6", className)}
            viewBox="0 0 24 24"
            {...props}
        >
            <g >
                <path
                    d="M3 10.417c0-3.198 0-4.797.378-5.335c.377-.537 1.88-1.052 4.887-2.081l.573-.196C10.405 2.268 11.188 2 12 2c.811 0 1.595.268 3.162.805l.573.196c3.007 1.029 4.51 1.544 4.887 2.081C21 5.62 21 7.22 21 10.417v1.574c0 5.638-4.239 8.375-6.899 9.536C13.38 21.842 13.02 22 12 22s-1.38-.158-2.101-.473C7.239 20.365 3 17.63 3 11.991v-1.574Z"
                    opacity=".5"
                ></path>
                <path d="M12 7.25a.75.75 0 0 1 .75.75v4a.75.75 0 0 1-1.5 0V8a.75.75 0 0 1 .75-.75ZM12 16a1 1 0 1 0 0-2a1 1 0 0 0 0 2Z"></path>
            </g>
        </svg>
    );
}



export function CheckIcon(className, props) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            className={cn("h-4 w-4", className)}
            viewBox="0 0 24 24"
            {...props}
        >
            <g fill="currentColor">
                <path
                    d="M3.464 20.535C4.93 22 7.286 22 12 22c4.714 0 7.071 0 8.535-1.465C22 19.072 22 16.714 22 12s0-7.071-1.465-8.536C19.072 2 16.714 2 12 2S4.929 2 3.464 3.464C2 4.93 2 7.286 2 12c0 4.714 0 7.071 1.464 8.535Z"
                    opacity=".5"
                ></path>
                <path d="M18.581 9.474a.75.75 0 1 0-1.162-.948l-5.168 6.33a.749.749 0 0 0-.879 1.116l.286.438a.75.75 0 0 0 1.209.064l5.714-7Zm-4 0a.75.75 0 1 0-1.162-.948l-5.133 6.288l-1.705-2.088a.75.75 0 0 0-1.162.948l2.286 2.8a.75.75 0 0 0 1.162 0l5.714-7Z"></path>
            </g>
        </svg>
    );
}


export async function copyToClipboardWithMeta(value, event) {
    navigator.clipboard.writeText(value);
    if (event) {
        trackEvent(event);
    }
}




export function CopyButton({ value, className, src, event, ...props }) {
    const [hasCopied, setHasCopied] = React.useState(false);

    React.useEffect(() => {
        setTimeout(() => {
            setHasCopied(false);
        }, 2000);
    }, [hasCopied]);

    return (
        <button
            size="icon"
            variant="ghost"
            className={cn(
                "relative z-10 h-8 w-8 rounded-sm dark:bg-zinc-700 bg-gray-50 shadow dark:text-zinc-50 dark:hover:bg-zinc-800 dark:hover:text-zinc-50",
                hasCopied &&
                "  bg-green-500/20 text-green-400 hover:bg-green-500/20 hover:text-green-500",
                className,
            )}
            onClick={() => {
                copyToClipboardWithMeta(
                    value,
                    event
                        ? {
                            name: event,
                            properties: {
                                code: value,
                            },
                        }
                        : undefined,
                );
                setHasCopied(true);
            }}
            {...props}
        >
            <span className="sr-only">Copy</span>
            {hasCopied ? (
                <CheckIcon className="h-8 w-8 " />
            ) : (
                <CopyIcon className="h-6 w-6 " />
            )}
        </button>
    );
}