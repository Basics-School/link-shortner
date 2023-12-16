"use client";
import React, { useRef, useState } from "react";

import { cn } from "@/lib/utils";
import { CopyButton } from "@/components/ui/copy-button";
import { Input } from "./input";
import { createLink } from "@/actions/link-action";

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

const LinkForm = ({ shortCode }) => {
    const [redLink, setRedLink] = useState();
    const [errorMessage, setErrorMessage] = useState();
    const ref = useRef();

    const handleSubmit = async (formData) => {
        const data = await createLink(formData);
        if (!data.error) {
            setRedLink(data.redirectUrl);
            setErrorMessage(null);
            ref.current.reset();
        } else {
            setErrorMessage(data.error);
            ref.current.reset();
        }
    };
    return (
        <>
            <form
                ref={ref}
                action={(formData) => handleSubmit(formData)}
                className=""
            >
                <div className="relative  bg-card flex gap-2 border sm:rounded-2xl rounded-md items-center justify-between p-1 max-w-xs sm:max-w-xl  ">
                    <Input
                        name="url"
                        type="text"
                        placeholder="Long url"
                        aria-label="Email address"
                        className=" w-3/5 sm:rounded-lg rounded-sm sm:h-16   border border-neutral-300 bg-transparent  text-base/6  ring-4 ring-transparent transition placeholder:text-foreground/50 focus:border-neutral-950 focus:outline-none focus:ring-neutral-950/5"
                    />
                    <p className="sm:text-5xl">/</p>
                    <Input
                        name="shortCode"
                        type="text"
                        placeholder="Short code"
                        defaultValue={shortCode}
                        readOnly={true}
                        aria-label="Email address"
                        className=" w-1/5 sm:rounded-lg sm:h-16 border border-neutral-300 bg-transparent  text-base/6  ring-4 ring-transparent transition placeholder:text-foreground/50 focus:border-neutral-950 focus:outline-none focus:ring-neutral-950/5"
                    />

                    <div className="relative p- flex justify-end">
                        <button
                            type="submit"
                            aria-label="Submit"
                            className={cn(
                                "flex aspect-square bg-white text-black sm:h-16 rounded-sm items-center justify-center sm:rounded-xl  text-sm w-16  transition "
                            )}
                        >
                            Short
                        </button>
                    </div>
                </div>
            </form>
            {redLink && (
                <div className=" h-20 max-w-xl rounded-md mt-10 items-center flex w-full bg-foreground justify-between px-10 text-background ">
                    <p>{redLink}</p>
                    <CopyButton value={redLink} />
                </div>
            )}
            {errorMessage && (
                <div className=" h-20 bg-white  max-w-xl rounded-md mt-10 items-center flex w-full bg-foreground  gap-4 px-10 text-background ">
                    <ErrorIcon className="h-6 w-6 fill-red-500" />
                    <p className="text-red-500">{errorMessage}</p>
                </div>
            )}
        </>
    );
};

export default LinkForm;