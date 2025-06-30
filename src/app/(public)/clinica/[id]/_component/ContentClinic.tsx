"use client"

import Image from "next/image";
import testImg from "../../../../../../public/foto1.png"
import { CalendarIcon, MapPin } from "lucide-react";

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"

import { Input } from "@/components/ui/input"
import { FormSchema, ProfileForm } from "./formValidations"
import { Button } from "@/components/ui/button";
import { Prisma } from "../../../../../../generated/prisma";
import { format } from "date-fns"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"



import { cn } from "@/lib/utils"
import { Calendar } from "@/components/ui/calendar"


import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { useCallback, useEffect, useState } from "react";
import { Label } from "@radix-ui/react-label";
import { ContentTimers } from "./timers-content";
import { AppointmentRegister } from "../_actions/appointment-register";
import { toast } from "sonner";



type UserWithSubscriptionsAndServiceProps = Prisma.UserGetPayload<{
    include: {
        subscription: true,
        service: true
    }
}>


interface UserProps {
    clinic: UserWithSubscriptionsAndServiceProps
}

export interface TimeSlot {
    time: string
    available: boolean
}

export function ContentClinic({ clinic }: UserProps) {

    const form = ProfileForm()

    const { watch } = form


    const selectedDate = watch("date")
    const selectedServiceId = watch("serviceId")

    const [selectedTime, setSelectedTime] = useState("")

    const [blockedTimes, setBlockedTimes] = useState<string[]>([])

    const [avaliableTimes, setAvaliableTimes] = useState<TimeSlot[]>([])

    const [loadingSlots, setLoadingSlots] = useState(false)




    async function onSubmit(formData: FormSchema) {

        const response = await AppointmentRegister({
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            appointmentTime: selectedTime,
            date: formData.date,
            serviceId: formData.serviceId,
            clinicId: clinic.id

        })

        if (response.error) {
            toast.error("Erro ao agendar")
            return
        }

        toast.success("Horário agendado")
        form.reset()
        setSelectedTime("")


    }

    const fetchBlockedTimes = useCallback(async (date: Date): Promise<string[]> => {

        setLoadingSlots(true)

        try {
            const dateString = date.toISOString().split("T")[0]
            console.log(dateString)
            const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/schedule/get-timers?userId=${clinic.id}&date=${dateString}`)

            const json = await response.json()

            setLoadingSlots(false)
            return json
        } catch (err) {
            setLoadingSlots(false)
            return []
        }

    }, [clinic.id])


    useEffect(() => {
        if (selectedDate) {

            fetchBlockedTimes(selectedDate).then((blocked) => {
                console.log("Horarios reservados:", blocked)
                setBlockedTimes(blocked)

                const times = clinic.times || []

                const finalSlots = times.map((time) => ({
                    time: time,
                    available: !blocked.includes(time)

                }))

                setAvaliableTimes(finalSlots)

                const actuallyAvailableHour = finalSlots.find(
                    (slot) => slot.time === selectedTime && slot.available
                )


                if (!actuallyAvailableHour) {
                    setSelectedTime("")
                }


            })

        }
    }, [selectedDate, selectedTime, fetchBlockedTimes, clinic.times])




    return (
        <div className="min-h-screen w-full ">

            <div className="w-full h-32 bg-emerald-500" />

            <div className="container mx-auto ">

                <div className="max-w-2xl mx-auto flex flex-col justify-center items-center  ">

                    <div className="relative w-64 h-64 -mt-24 mb-10 rounded-full overflow-hidden">
                        <Image src={clinic.image ? clinic.image : testImg} alt="Imagem user" className="object-cover" fill />
                    </div>

                    <div className="flex flex-col justify-center items-center gap-3">
                        <p className="text-2xl md:text-3xl">{clinic.name}</p>

                        <div className="flex gap-2 mb-6">
                            <MapPin />
                            <p>Rua dev, 92, Sp</p>

                        </div>
                    </div>


                    <div className="w-full p-2">


                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 w-full p-2 border rounded-md">
                                <FormField
                                    control={form.control}
                                    name="name"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Name</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Digite seu nome" {...field} />
                                            </FormControl>

                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />


                                <FormField
                                    control={form.control}
                                    name="email"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Email</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Digite seu email" {...field} />
                                            </FormControl>

                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />




                                <FormField
                                    control={form.control}
                                    name="phone"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel >Telefone</FormLabel>
                                            <FormControl className="w-ful">
                                                <Input className="w-full" placeholder="Digite seu telefone" {...field} />
                                            </FormControl>

                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />


                                <FormField
                                    control={form.control}
                                    name="date"
                                    render={({ field }) => (
                                        <FormItem className="flex flex-col">
                                            <FormLabel>Agendar</FormLabel>
                                            <Popover>
                                                <PopoverTrigger asChild>
                                                    <FormControl className="w-ful">
                                                        <Button
                                                            variant={"outline"}
                                                            className={cn(
                                                                "w-[240px] pl-3 text-left font-normal",
                                                                !field.value && "text-muted-foreground"
                                                            )}
                                                        >
                                                            {field.value ? (
                                                                format(field.value, "dd/MM/yyyy")
                                                            ) : (
                                                                <span>Selecione uma data</span>
                                                            )}
                                                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                        </Button>
                                                    </FormControl>
                                                </PopoverTrigger>
                                                <PopoverContent className="w-auto p-0" align="start">
                                                    <Calendar
                                                        mode="single"
                                                        selected={field.value}
                                                        onSelect={(e) => {
                                                            field.onChange(e)
                                                            setSelectedTime("")
                                                        }}
                                                        disabled={(date) =>
                                                            date < new Date()
                                                        }
                                                        captionLayout="dropdown"
                                                    />
                                                </PopoverContent>
                                            </Popover>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />


                                <FormField
                                    control={form.control}
                                    name="serviceId"
                                    render={({ field }) => (
                                        <FormItem className="w-full">
                                            <FormLabel >Serviços</FormLabel>
                                            <FormControl className="">
                                                <Select onValueChange={(e) => {
                                                    field.onChange(e)

                                                }}>
                                                    <SelectTrigger className="w-full">
                                                        <SelectValue placeholder="Selecione o serviço" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        {clinic.service.map((service) => (
                                                            <SelectItem key={service.id} value={service.id}>{service.name} - {Math.round(service.duration / 60)}H:{service.duration % 60}Min</SelectItem>
                                                        ))}

                                                    </SelectContent>
                                                </Select>
                                            </FormControl>

                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                {selectedServiceId && (
                                    <div>
                                        <Label className="font-semibold my-2">Horários disponíveis:</Label>
                                        <div>
                                            {loadingSlots ? <p className="">Carregando horários</p>
                                                : avaliableTimes.length === 0 ? <p className="font-semibold my-2">Nenhum horário disponivel</p>
                                                    :
                                                    <>
                                                        <ContentTimers
                                                            availableTimeSlots={avaliableTimes}
                                                            blockedTimes={blockedTimes}
                                                            grabHowManySlots={
                                                                clinic.service.find(service => service.id === selectedServiceId) ? Math.ceil(clinic.service.find(service => service.id === selectedServiceId)!.duration / 30) : 1
                                                            }
                                                            refreshSelectedTimer={(time) => setSelectedTime(time)}
                                                            selectedTime={selectedTime}
                                                            clinicTimers={clinic.times}
                                                            selectedDate={selectedDate}

                                                        />

                                                    </>}
                                        </div>
                                    </div>
                                )}


                                {clinic.status ? (
                                    <Button disabled={!watch("name") || !watch("email") ||
                                        !watch("phone") || !watch("date")} type="submit">Agendar</Button>
                                ) : <p className="bg-red-500 p-2 rounded-md text-center text-white">{clinic.name} está fechada no momento</p>}
                            </form>
                        </Form>

                    </div>


                </div>

            </div>
        </div>
    )
}