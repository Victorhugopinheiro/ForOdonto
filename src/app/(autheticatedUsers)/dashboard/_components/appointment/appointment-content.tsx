"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { format } from "date-fns"
import { useRouter, useSearchParams } from "next/navigation"
import { Prisma } from "../../../../../../generated/prisma"
import { Eye, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DeleteAppointment } from "../../_actions/delete-appointment"
import { toast } from "sonner"

import { Dialog, DialogTrigger } from "@/components/ui/dialog"
import { DialogAppointment } from "./dialog-appointment"
import { useState } from "react"
import { DatePicker } from "./datePickers"

interface AppointmentProps {
    timers: String[] | undefined
}

export type AppointmentAndService = Prisma.AppointmentGetPayload<{
    include: {
        service: true
    }
}>

export function AppointmentContent({ timers }: AppointmentProps) {

    const params = useSearchParams()
    const date = params.get("date")

    const queryClient = useQueryClient()

    const [appointmentDetails, setAppointmentDetails] = useState<AppointmentAndService | null>(null)






    const { data, isLoading, refetch } = useQuery({
        queryKey: ['get-appointments', date]
        , queryFn: async () => {

            let activeDate = date
            if (!activeDate) {
                const today = format(new Date(), "yyyy-MM-dd")
                activeDate = today
            }

            const url = `${process.env.NEXT_PUBLIC_URL}/api/clinic/appointment?date=${activeDate}`


            const response = await fetch(url)

            const json: AppointmentAndService[] = await response.json()

          

            if (!response.ok) {
                return []
            }


            return json



        },
        staleTime: 20000,
        refetchInterval: 60000
    })

    const occupantMap: Record<string, AppointmentAndService> = {}


    if (data && data?.length > 0) {

        for (const appointment of data) {

            const requiredSlots = Math.ceil(appointment.service.duration / 30)

            const startIndex = timers?.indexOf(appointment.appointmentTime)

            if (startIndex !== -1) {


                for (let q = 0; q < requiredSlots; q++) {
                    const slotIndex = Number(startIndex) + q;


                    if (slotIndex < Number(timers?.length)) {
                        occupantMap[timers[slotIndex]] = appointment
                    }

                }


            }


        }

    }


    async function handleDeleteAppointment(appointmentId: string) {
        const response = await DeleteAppointment({ appointmentId: appointmentId })

        if (response.error) {
            toast.error("Erro ao cancelar agendamento")
            return
        }

        queryClient.invalidateQueries({ queryKey: ["get-appointments"] })

        await refetch()
        toast.success(response.data)

    }


    function detailsAppointment(appointment: AppointmentAndService) {
        setAppointmentDetails(appointment)
    }

    console.log(occupantMap)
    return (
        <Dialog>
            <Card>
                <CardHeader className="flex items-center justify-between">
                    <CardTitle className="text-xl md:text-2xl font-bold">Agendamentos</CardTitle>

                    <CardDescription className="text-lg font-semibold"><DatePicker/></CardDescription>
                </CardHeader>

                <CardContent>
                    <ScrollArea className="h-[calc(100vh-20rem)]">
                        {isLoading ? (<p>Carregando agenda</p>)
                            :
                            (timers?.map((time, index) => {

                                const ocuppant: AppointmentAndService = occupantMap[time]

                                if (ocuppant) {
                                    return (
                                        <div key={index} className="flex items-center justify-between border-t p-2 last:border-b">
                                            <div className="flex items-center gap-3 ">
                                                <div className="text-lg font-semibold">
                                                    {time}
                                                </div>

                                                <div className="">
                                                    <p className="font-semibold">{ocuppant.name}</p>
                                                    <p className="text-sm text-gray-400">{ocuppant.phone}</p>
                                                </div>
                                            </div>


                                            <div className="flex gap-1">

                                                <DialogTrigger asChild>
                                                    <Button onClick={() => detailsAppointment(ocuppant)} variant={"ghost"} size={"icon"}><Eye /></Button>

                                                </DialogTrigger>

                                                <Button onClick={() => handleDeleteAppointment(ocuppant.id)} variant={"ghost"} size={"icon"}> <X /></Button>

                                            </div>
                                        </div>
                                    )
                                }


                                return (
                                    <div key={index} className="flex items-center gap-3 border-t p-2 last:border-b">
                                        <div className="text-lg font-semibold">
                                            {time}
                                        </div>

                                        <div className="text-gray-400">
                                            Disponivel
                                        </div>
                                    </div>
                                )
                            }))}
                    </ScrollArea>
                </CardContent>
            </Card>
            <DialogAppointment AppointmentAndService={appointmentDetails} />
        </Dialog>
    )
}