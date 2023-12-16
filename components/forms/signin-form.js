"use client";

import Link from "next/link";
import { Input } from "./input";
import { useFormState } from "react-dom";
import { signInWithCredential } from "@/actions/auth-action";

export function SignInForm() {
  const [state, action] = useFormState(signInWithCredential, null);
  return (
    <form
      className=" w-full max-w-md  border p-4 flex flex-col gap-y-4 rounded "
      action={async (formaData) => {
        console.log("hello")
        await action(formaData);
      }}
    >
      <div className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="email">Email</label>
          <Input
            type="email"
            name="email"
            id="email"
            placeholder="johndoe@example.com"
            required
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="password">Password</label>
          <Input
            type="password"
            minLength={8}
            id="password"
            name="password"
            required
          />
        </div>
        {state?.code ===301 && (
          <span className="flex gap-2 pl-2 text-xs text-red-500">
            Email and password don&apos;t match{" "}
          </span>
        )}

        <Link
          className="p-2  space-y-2 text-sm text-muted-foreground"
          href={"/forgot-pass"}
        >
          {" "}
          Forgot password? Reset Now.
        </Link>
      </div>

      <button
      type="submit"
        className="w-full text-foreground hover:text-white py-2 rounded dark:text-black dark:bg-white"
      >
        Log in
      </button>
    </form>
  );
}