import { redirect } from "next/navigation"
import getsession from "../../../lib/getSession"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { AlertCircle, Copy, Plus } from "lucide-react"
import { CopyPage } from "./_components/copyPage"
import { ReminderComponent } from "./_components/reminder/index"
import { Appointment } from "./_components/appointment/appointment"
import { checkSubscription } from "@/components/check-subscription"
import { ShowLimitPlan } from "@/components/show-limit-plan"


export default async function Dashboard() {

    const session = await getsession()

    if (!session) {
        redirect("/")
    }

    const hasPermission = await checkSubscription(session)



    return (
        <main className="flex flex-col">

            
            {hasPermission.planId != "EXPIRED" && (

                <div className="space-x-4 flex justify-end items-center">
                    <Link href={`/clinica/${session.user.id}`}>
                        <Button className="bg-emerald-500 hover:bg-emerald-400">
                            Meu Agendamento
                        </Button>
                    </Link>

                    <CopyPage userId={session?.user?.id} />
                </div>
            )}

             {hasPermission.planId === "TRIAL" && (
                <div className="flex w-full my-2 bg-green-500 rounded-md  ">
                    <p className="text-white p-2 font-semibold">
                        {hasPermission.message}
                    </p>
                </div>
            )}



            {hasPermission.planId != "EXPIRED" && (
                <div className="grid lg:grid-cols-2  gap-2 py-6">


                    <Appointment userId={session.user.id} />

                    <ReminderComponent userId={session.user.id} />


                </div>
            )}


            {hasPermission.planId === "EXPIRED" && (
                <div>
                    <ShowLimitPlan expired={hasPermission.expired} />
                </div>
            )}


           
        </main>
    )
}