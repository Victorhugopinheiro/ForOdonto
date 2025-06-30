import getSession from "@/lib/getSession"
import { redirect } from "next/navigation"
import { ContainerServices } from "./_components/containerServices"
import { Suspense } from "react"



export default async function Services() {

    const session = await getSession()

    if (!session) {
        redirect("/")
    }


    return (
        <div>
            <Suspense fallback={<div>Carregando...</div>}>
                <ContainerServices userId={session?.user.id!} />
            </Suspense>
        </div>
    )
}