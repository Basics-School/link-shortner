import { Input } from "@/components/forms/input";
import { generateCode } from "@/lib/generate-code";
import { cn } from "@/lib/utils";

export default async function Home() {
  return (
    <main className="flex h-full items-center flex-col items-center justify-center p-24">
      <form
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
            defaultValue={await generateCode()}
            readOnly={true}
            aria-label="Email address"
            className=" w-1/5 sm:rounded-lg sm:h-16 border border-neutral-300 bg-transparent  text-base/6  ring-4 ring-transparent transition placeholder:text-foreground/50 focus:border-neutral-950 focus:outline-none focus:ring-neutral-950/5"
          />

          <div className="relative p- flex justify-end">
            <button
              type="submit"
              aria-label="Submit"
              className={cn(
                "flex aspect-square sm:h-16 rounded-sm items-center justify-center sm:rounded-xl  text-sm w-16  transition "
              )}
            >
              Short
            </button>
          </div>
        </div>
      </form>
      {/* {link && (
        <div className=" h-20 max-w-xl rounded-md mt-10 items-center flex w-full bg-foreground justify-between px-10 text-background ">
          <p>{link}</p>
          <CopyButton value={link} />
        </div>
      )}
      {errorMessage && (
        <div className=" h-20  max-w-xl rounded-md mt-10 items-center flex w-full bg-foreground  gap-4 px-10 text-background ">
          <ErrorIcon className="h-6 w-6 fill-red-500" />
          <p className="text-red-500">{errorMessage}</p>
        </div>
      )} */}
    </main>
  )
}
