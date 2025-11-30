"use client"
import { Button } from "@/components/ui/button";
import { ItemsProps, ProfileForm } from "./formZod";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
} from "@/components/ui/form"

import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader } from "@/components/ui/card";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { HorarioDialog } from "./horario-dialog";

import { useState } from "react";
import { Prisma } from "../../../../../../generated/prisma";
import Image from "next/image";
import UpdateUser from "../_actions/update-user";
import { toast } from "sonner";
import { FormatPhone, OnlyNumber } from "@/utils/formatPhone";
import { Session } from "next-auth";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { ChangeImage } from "./changeImage";


type UserWithSubscription = Prisma.UserGetPayload<{
    include: {
        subscription: true
    }
}>

interface InfoUser {
    user: UserWithSubscription
}








export function ContainerProfile({ user }: InfoUser) {


    const { status, update } = useSession()

    const router = useRouter()



    const [selectedHours, setSelectedHours] = useState<string[]>(user.times ?? [])

    

    const form = ProfileForm({
        address: user.address,
        name: user.name,
        phone: user.phone,
        status: user.status,
        timeZone: user.timeZone
    })

    async function onSubmit(items: ItemsProps) {

        

        

        const phoneFormat = OnlyNumber(items.phone || "")


        const itemsAndTimers = {
            items,
            selectedHours
        }

        const response = await UpdateUser({
            name: items.name,
            status: items.status === "active" ? true : false,
            timeZone: items.timeZone,
            address: items.address,
            phone: items.phone,
            times: selectedHours || []
        })

        if (response.error) {
            toast.error(response.error)
            return
        }

        console.log(response)
        toast.success(response.message)





    }


    const timeZone = Intl.supportedValuesOf("timeZone").filter((zone) =>
        zone.startsWith("America/Sao_Paulo") ||
        zone.startsWith("America/Fortaleza") ||
        zone.startsWith("America/Recife") ||
        zone.startsWith("America/Bahia") ||
        zone.startsWith("America/Belem") ||
        zone.startsWith("America/Manaus") ||
        zone.startsWith("America/Cuiaba") ||
        zone.startsWith("America/Boa_Vista")
    )

    async function handleLogout() {
        signOut()
        update()
        router.replace("/")
    }

    return (
        <div className="w-full flex flex-col gap-2">

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">



                    <Card>
                        <CardHeader>Meu perfil</CardHeader>
                        <CardContent>
                            <div className="my-10 flex justify-center">
                                <ChangeImage userId={user.id} userImage={user.image}/>
                            </div>

                            <div className="space-y-5 flex flex-col gap-4">
                                <FormField
                                    control={form.control}
                                    name="name"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Nome completo</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Digite seu nome" {...field} />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="address"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Endereço</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Digite seu endereço" {...field} />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="phone"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Telefone</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Digite seu telefone" {...field} onChange={(e) => {
                                                    const formatedValue = FormatPhone(e.target.value)
                                                    field.onChange(formatedValue)
                                                }}

                                                />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />


                                <FormField
                                    control={form.control}
                                    name="status"
                                    render={({ field }) => (
                                        <FormItem className="w-full">
                                            <FormLabel>Status da clínica</FormLabel>
                                            <FormControl className="w-full">
                                                <Select onValueChange={field.onChange}
                                                   
                                                >
                                                    <SelectTrigger className="w-full">
                                                        <SelectValue placeholder="Selecione o status da cliníca" />
                                                    </SelectTrigger>
                                                    <SelectContent className="">
                                                        <SelectItem value="active">Clínica aberta</SelectItem>
                                                        <SelectItem value="inactive">Clínica fechada</SelectItem>
                                                    </SelectContent>


                                                </Select>
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />



                                <HorarioDialog sendItem={setSelectedHours} />


                                <FormField
                                    control={form.control}
                                    name="timeZone"
                                    render={({ field }) => (
                                        <FormItem className="w-full">
                                            <FormLabel>Selecione o fuso horário</FormLabel>
                                            <FormControl className="w-full">
                                                <Select onValueChange={field.onChange}
                                                    defaultValue={field.value}
                                                >
                                                    <SelectTrigger className="w-full">
                                                        <SelectValue placeholder="Selecione o seu fuso horário" />
                                                    </SelectTrigger>
                                                    <SelectContent className="">
                                                        {timeZone.map((time) => (
                                                            <SelectItem value={time} key={time}>{time}</SelectItem>
                                                        ))}
                                                    </SelectContent>


                                                </Select>
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />



                                <Button type="submit" className="w-full bg-emerald-500 hover:bg-emerald-400">Salvar alterações</Button>





                            </div>
                        </CardContent>
                    </Card>
                </form>
            </Form>

            <Button className="mt-4 w-fit" onClick={handleLogout} variant={"destructive"}>Sair da conta</Button>

        </div>
    )
}