import { redirect } from "next/navigation"
import getsession from "../../../lib/getSession"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { AlertCircle, Copy, Plus } from "lucide-react"
import { CopyPage } from "./_components/copyPage"
import { ReminderComponent } from "./_components/reminder/index"
import { Appointment } from "./_components/appointment/appointment"


export default async function Dashboard() {

    const session = await getsession()

    if (!session) {
        redirect("/")
    }

    return (
        <main className="flex flex-col">
            <div className="space-x-4 flex justify-end items-center">
                <Link href={`/clinica/${session.user.id}`}>
                    <Button className="bg-emerald-500 hover:bg-emerald-400">
                        Meu Agendamento
                    </Button>
                </Link>

                <CopyPage userId={session?.user?.id} />
            </div>


            <div className="grid lg:grid-cols-2  gap-2 py-6">


                <Appointment userId={session.user.id}/>

                <ReminderComponent userId={session.user.id} />


            </div>
        </main>
    )
}