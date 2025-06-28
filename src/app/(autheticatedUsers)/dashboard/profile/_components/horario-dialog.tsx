"use client"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import clsx from "clsx"
import { ArrowRight } from "lucide-react"
import { useState } from "react"


interface HoursProps {
    sendItem: (valor: string[]) => void;
}

export function HorarioDialog({sendItem}:HoursProps) {

    const [selectedHours, setSelectedHours] = useState<string[]>([])
    const [controlDialog, setControlDialog] = useState(false)


    function generateTimesSlot() {
        const hours: string[] = []


        for (let h = 6; h <= 23; h++) {

            for (let m = 0; m < 2; m++) {
                const hour = h.toString().padStart(2, "0")
                const minute = (m * 30).toString().padStart(2, "0")
                hours.push(`${hour}:${minute}`)
            }

        }



        return hours
    }


    const hours: string[] = generateTimesSlot()


    function toggleHours(hour: string) {
        setSelectedHours((prev) => prev.includes(hour) ? prev.filter((items) => items !== hour) : [...prev, hour])
        sendItem(selectedHours)
    }

    return (
        <div className="space-y-2 ">
            <Dialog open={controlDialog} onOpenChange={setControlDialog}>
                <DialogTrigger asChild className="">
                    <Button variant={"outline"} className="w-full justify-between">Escolher horários <ArrowRight /></Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle className="font-semibold">Horários da clínica</DialogTitle>
                        <DialogDescription>
                            Selecione abaxio os horários de funcionamento da clínica
                        </DialogDescription>
                    </DialogHeader>

                    <section>
                        <p className="text-slate-800 opacity-45">Clique nos horários abaixo para marcar ou desmarcar</p>

                        <div className="grid grid-cols-5 gap-2 mt-2">
                            {hours.map((hour, index) => (
                                <Button className={clsx("", selectedHours.includes(hour) ? "border-2 border-emerald-500 text-primary" : "")} onClick={() => toggleHours(hour)} variant={"outline"} key={index}>{hour}</Button>
                            ))}

                        </div>

                        <Button onClick={() => setControlDialog(false)} className="bg-emerald-500 w-full mt-2 hover:bg-emerald-400">Salvar</Button>
                    </section>
                </DialogContent>



            </Dialog>

            
        </div>

    )
}