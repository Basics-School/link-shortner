"use client";

import { signUp } from "@/actions/auth-action";
import { Input } from "./input";
import { useFormState } from "react-dom";

export function SignUpForm() {
  const [state, action] = useFormState(signUp, null);
  return (
    <>
      <form
        action={async (formaData) => {
          await action(formaData);
        }}
        className="w-full"
      >
        <div className="gap-2 w-full  flex flex-col  justify-center ">
          <div className="w-full flex-col flex gap-1">
            <label htmlFor="email" className="p-1">
              Enter Email
            </label>
            <div className="flex gap-2  items-end justify-center">
              <Input
                name="email"
                id="email"
                placeholder="johndoe@example.com"
                required
              />
            </div>
            <div className="text-base">
            </div>
          </div>
          <div className="flex w-full gap-4 flex-col">
            <div className="flex w-full gap-2">
              <div className="space-y-2">
                <label htmlFor="first-name">First name</label>
                <Input
                  id="first-name"
                  name="first-name"
                  type="text"
                  placeholder="John"
                  required
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="last-name">Last name</label>
                <Input
                  id="last-name"
                  type="text"
                  name="last-name"
                  placeholder="Doe"
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <label htmlFor="username">Username</label>
              <Input
                name="username"
                type="text"
                minLength={3}
                maxLength={32}
                id="username"
                required
                placeholder="username"
              />
              {state?.code === 302 && (
                <p className="text-sm text-red-500 p-1">{state?.error}</p>
              )}
            </div>
            <div className="space-y-2">
              <label htmlFor="password">Password</label>
              <Input
                required
                name="password"
                type="password"
                id="password"
                placeholder="password"
              />
            </div>
            <button type="submit" className="w-full bg-white p-2 rounded text-black">
              Sign Up
            </button>
          </div>
        </div>
      </form>
    </>
  );
}