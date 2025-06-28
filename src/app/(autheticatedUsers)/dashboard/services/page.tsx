import getSession from "@/lib/getSession"
import { redirect } from "next/navigation"
import { ContainerServices } from "./_components/containerServices"



export default async function Services() {

    const session = await getSession()

    if (!session) {
        redirect("/")
    }


    return (
        <div>
            <ContainerServices userId={session?.user.id!} />
        </div>
    )
}