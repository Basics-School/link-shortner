import AuthLinkForm from "@/components/forms/auth-link-form"
import { CopyButton } from "@/components/ui/copy-button"
import { auth } from "@/lib/auth"
import { generateCode } from "@/lib/generate-code"
import prisma from "@/lib/prisma"

const getLinks = async () => {
    const session = await auth()
    console.log(session);
    const links = await prisma.link.findMany({
        where: {
            userId: session?.user?.id
        }
    })
    return links
}

const DashboardPage = async () => {
    const code = await generateCode(6)
    const links = await getLinks()
    console.log(links);
    return (
        <div className="flex flex-col p-10 ">
            <div className="h-full border-r px-2"><AuthLinkForm shortCode={code} /></div>
            {
                links?.map((link) => (<div key={link.id} className=" max-w-md w-ful h-20 max-w-xl rounded-md mt-10 items-center flex w-full bg-white justify-between px-10 text-black ">
                    <div className="flex flex-col gap-1 py-2">
                        <h1>{link.title}</h1>
                        <p>{link.url}</p>
                        <p>{process.env.NEXT_PUBLIC_AUTH_URL + "/" + link.shortCode}</p>
                    </div>


                    <CopyButton value={process.env.NEXT_PUBLIC_AUTH_URL + "/" + link.shortCode} />
                </div>)

                )
            }

        </div>
    )
}

export default DashboardPage
