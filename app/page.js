
import LinkForm from "@/components/forms/link-form";
import { generateCode } from "@/lib/generate-code";


export default async function Home() {
  const code = await generateCode(6)
  return (
    <main className="flex h-full items-center flex-col items-center justify-center p-24">
      <LinkForm shortCode={code} />
    </main>
  )
}
