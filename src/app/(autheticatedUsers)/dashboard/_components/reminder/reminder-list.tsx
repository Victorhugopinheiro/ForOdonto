"use client"
import { Button } from "@/components/ui/button";
import { AlertCircle, Plus, PlusIcon, Trash } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area"

interface UserProps {
    userId: string | undefined
}


interface ReminderProps {
    reminder: Reminder[]

}

import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Reminder } from "../../../../../../generated/prisma";
import { DeleteReminder } from "@/app/(autheticatedUsers)/dashboard/_actions/delete-reminder";
import { toast } from "sonner";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { ReminderContent } from "./reminder-content";
import { useState } from "react";

export function Remindercontent({ reminder }: ReminderProps) {

    const [controlModal, setControlModal] = useState(false)




    async function handleDeleteReminder(reminderId: string) {

        const response = await DeleteReminder({ reminderId: reminderId })


        if (response.error) {
            toast.error(response.error)
            return
        }


        toast.success("Lembrete deletado")

    }

    return (
        <div className="w-full">



            <div className="">




                <Card className="space-y-0 p-2">
                    <CardHeader className="flex justify-between items-center">
                        <CardTitle className="text-xl font-semibold md:text-2xl">Lembretes</CardTitle>
                        <Dialog open={controlModal} onOpenChange={setControlModal}>
                            <DialogTrigger asChild>
                                <Button variant={"ghost"}><PlusIcon /></Button>
                            </DialogTrigger>
                            <DialogContent>
                                <DialogHeader className="flex justify-center">
                                    <DialogTitle className="text-center">Novo lembrete!</DialogTitle>
                                    <DialogDescription className="text-center">
                                        Crie um novo lembrete para sua lista
                                    </DialogDescription>
                                </DialogHeader>

                                <ReminderContent closeModal={() => setControlModal(false)} />

                            </DialogContent>
                        </Dialog>

                    </CardHeader>
                    <ScrollArea className="h-[300px] w-fullrounded-md  p-4 lg:h-[calc(100vh-15rem)]">
                        <CardContent className="">
                            {reminder.length === 0 ? <p className="text-slate-500">Nenhum lembrete...</p> : reminder.map((reminder, index) => (
                                

                                    <article key={index} className="bg-amber-200 p-2 my-6 rounded-md flex items-center space-x-2 justify-between">
                                        <p>{reminder.description}</p>
                                        <Button onClick={() => handleDeleteReminder(reminder.id)} className="rounded-full bg-red-500 p-2 shadow-none hover:bg-red-400" size={"sm"} ><Trash className="w-4 h-4" color="white" />
                                        </Button>

                                    </article>


                                

                            ))}
                        </CardContent>
                    </ScrollArea>
                </Card>
            </div>
        </div>
    )
}