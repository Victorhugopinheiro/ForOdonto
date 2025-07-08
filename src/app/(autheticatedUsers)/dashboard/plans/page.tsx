
import getSession from "@/lib/getSession"
import { redirect } from "next/navigation"
import { PlansContent } from "./_components/plans-content"
import { GetSubscription } from "@/utils/getSubscription"
import {ActiveSubscription} from './_components/active-subscription'

export default async function Plans() {


    const session = await getSession()

    if (!session) {
        redirect("/")
    }

    const userSubscription = await GetSubscription(session.user.id)



    return (
        <div>
            {userSubscription.data && (
                <ActiveSubscription subscriptions={userSubscription.data}/>
                
            )}

            {!userSubscription.data  && (
                <PlansContent/>
            )}


        </div>
    )
}