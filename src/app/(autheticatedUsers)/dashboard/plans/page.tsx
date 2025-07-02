
import getSession from "@/lib/getSession"
import { redirect } from "next/navigation"
import { PlansContent } from "./_components/plans-content"


export default async function Plans() {


    const session = await getSession()

    if (!session) {
        redirect("/")
    }

    return (
        <div>
            <PlansContent/>
        </div>
    )
}