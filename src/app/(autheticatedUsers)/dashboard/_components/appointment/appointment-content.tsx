"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useQuery } from "@tanstack/react-query"
import { format } from "date-fns"
import { useSearchParams } from "next/navigation"
import { Prisma } from "../../../../../../generated/prisma"

interface AppointmentProps {
    timers: String[] | undefined
}

type AppointmentAndService = Prisma.AppointmentGetPayload<{
    include: {
        service: true
    }
}>

export function AppointmentContent({ timers }: AppointmentProps) {

    const params = useSearchParams()
    const date = params.get("date")



    const { data, isLoading } = useQuery({
        queryKey: ['get-appointments'], queryFn: async () => {

            let activeDate = date
            if (!activeDate) {
                const today = format(new Date(), "yyyy-MM-dd")
                activeDate = today
            }

            const url = `${process.env.NEXT_PUBLIC_URL}/api/clinic/appointment?date=${activeDate}`


            const response = await fetch(url)

            const json: AppointmentAndService[] = await response.json()

            console.log(json)

            if (!response.ok) {
                return []
            }


            return json



        },
        staleTime:20000,
        refetchInterval:60000
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

    console.log(occupantMap)
    return (
        <Card>
            <CardHeader className="flex items-center justify-between">
                <CardTitle className="text-xl md:text-2xl font-bold">Agendamentos</CardTitle>

                <CardDescription className="text-lg font-semibold">Horários</CardDescription>
            </CardHeader>

            <CardContent>
                <ScrollArea className="h-[calc(100vh-20rem)]">
                    {isLoading ? (<p>Carregando agenda</p>)
                        :
                        (timers?.map((time, index) => {

                            const ocuppant = occupantMap[time]

                            if (ocuppant) {
                                return (
                                    <div key={index} className="flex items-center gap-3 border-t p-2 last:border-b">
                                        <div className="text-lg font-semibold">
                                            {time}
                                        </div>

                                        <div className="">
                                            <p className="font-semibold">{ocuppant.name}</p>
                                            <p className="text-sm text-gray-400">{ocuppant.phone}</p>
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
    )
}