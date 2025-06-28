import getSession from "@/lib/getSession"
import { redirect } from "next/navigation"
import { GetUserInfo } from "./_data-access/get-info-user"
import { ContainerProfile } from "./_components/containerprofile"


export default async function ProfileUser() {


    const session = await getSession()

    if (!session) {
        redirect("/")
    }

    const user = await GetUserInfo({ user_id: session.user.id })

    

    if (!user) {
        redirect("/")
    }


    return (
        <>
            <ContainerProfile user={user}/>
        </>
    )
}