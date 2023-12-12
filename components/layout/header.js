
import NavLink from "./nav-link";
import Link from "next/link";
import { cn } from "@/lib/utils";
import MobileNav from "./mobile-nav";
import { auth, signOut } from "@/lib/auth";
import { revalidatePath } from "next/server";
const Header = async () => {
  const session = await auth();
  return (
    <header
      className={cn(
        "md:h-24  h-12 border-b dark:bg-stone-950 bg-yellow-50 dark:border-stone-800 border-stone-300 flex items-center  justify-between lg:h-36 max-w-[1920px] "
       
      )}
    >
      <Link
        href={"/"}
        className={cn(
          "lg:text-7xl text-3xl sm:text-5xl bg-gradient-to-r sm:px-10 px-2 from-yellow-400/90 animate-pulse  dark:from-yellow-200 dark:to-indigo-700  to-indigo-600 text-transparent bg-clip-text"
        )}
      >
        Link-Shortner
      </Link>

      <div className="h-full place-content-center flex">
        {" "}
        <nav className="h-full hidden  lg:flex flex-col  ">
          {session ? (
            <>
              <NavLink
                className="border-r md:px-10 flex border-b hover:bg-yellow-100 dark:hover:bg-stone-900 place-content-center items-center justify-center border-l h-full "
                href={"/dashboard"}
                title={"Dashboard"}
              />
              <form
                action={async () => {
                  "use server";
                  await signOut({
                    redirect: true,
                    redirectTo: "/sign-in",
                  });
                  revalidatePath("/");
                }}
                className="border-r md:px-10  h-full flex hover:bg-yellow-100 dark:hover:bg-stone-900 place-content-center items-center justify-center border-l "
              >
                <button className="h-full w-full" type="submit">
                  Sign Out
                </button>{" "}
              </form>
            </>
          ) : (
            <>
              <NavLink
                className="border-r md:px-10 flex border-b hover:bg-yellow-100 dark:hover:bg-stone-900 place-content-center items-center justify-center border-l h-full "
                href={"/sign-up"}
                title={"Sign Up"}
              />
              <NavLink
                className="border-r md:px-10  h-full flex hover:bg-yellow-100 dark:hover:bg-stone-900 place-content-center items-center justify-center border-l "
                href={"/sign-in"}
                title={"Signin"}
              />
            </>
          )}
        </nav>
        <MobileNav>
          <ul className="w-full flex flex-col">
            {session ? (
              <>
                <NavLink
                  className="border-r p-10 md:px-10 flex border-b hover:bg-yellow-100 dark:hover:bg-stone-900 place-content-center items-start justify-start border-l h-full "
                  href={"/dashboard"}
                  title={"Dashboard"}
                />
                <form
                  action={async () => {
                    "use server";
                    await signOut();
                  }}
                  className="border-r p-10 md:px-10  h-full flex hover:bg-yellow-100 dark:hover:bg-stone-900 place-content-start items-start justify-start border-l "
                >
                  <button className="h-full w-full" type="submit">Sign Out</button>{" "}
                </form>
              </>
            ) : (
              <>
                <NavLink
                  className="border-r p-10 md:px-10 flex border-b hover:bg-yellow-100 dark:hover:bg-stone-900 place-content-start items-start justify-start border-l h-full "
                  href={"/sign-up"}
                  title={"Sign Up"}
                />
                <NavLink
                  className="border-r border-b p-10 md:px-10  h-full flex hover:bg-yellow-100 dark:hover:bg-stone-900 place-content-start items-start justify-start border-l "
                  href={"/sign-in"}
                  title={"Signin"}
                />
              </>
            )}
          </ul>
        </MobileNav>
      </div>
    </header>
  );
};

export default Header;