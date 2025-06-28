"use client"
import {
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"


import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { ProfileForm, TypesForm } from "./dialog-services-form"
import { Button } from "@/components/ui/button"
import { ConvertRealToCents } from "@/utils/convertRealToCents"
import { CreateNewService } from "../_actions/create-new-service"
import { toast } from "sonner"
import { useState } from "react"
import { updateService } from "../_actions/update-service"

interface ContentProps {
    closeModal: () => void;
    serviceId?: string
    initialValue?: {
        name: string,
        price: string,
        hour: string;
        minute: string
    }
}

export function ContentDialog({ closeModal, initialValue, serviceId }: ContentProps) {

    const [loading, setLoading] = useState(false)

    const form = ProfileForm({ initialValue: initialValue })


    async function onSubmit(values: TypesForm) {

        setLoading(true)

        const hour = Number(values.hour) || 0
        const minutes = Number(values.minute) || 0
        const priceInCents = await ConvertRealToCents(values.price)

        const duration = (hour * 60) + minutes

        if (serviceId) {
            editServiceByServiceId(
                values.name,
                priceInCents,
                duration,
                serviceId
            )
            return
        }


        const response = await CreateNewService({
            name: values.name,
            price: priceInCents,
            duration: duration
        })

        setLoading(false)

        if (response.error) {
            toast.error("Erro ao cadastrar serviço")
            setLoading(false)
            return
        }


        toast.success("Serviço cadastrado")
        changeModal()
    }

    function changeModal() {
        closeModal()
        form.reset()
    }

    async function editServiceByServiceId(name: string, value: number, duration: number, serviceId: string) {

        const response = await updateService({duration:duration, name:name, price:value, serviceId:serviceId})

        if(response.error){
            toast.error("Erro ao atualizar serviço")
            setLoading(false)
            return
        }

        toast.success("Serviço atualizado com sucesso")
        setLoading(false)
        changeModal()



    }




    function changeCurrency(event: React.ChangeEvent<HTMLInputElement>) {

        let { value } = event.target

        value = value.replace(/\D/g, '');

        if (value) {
            value = (parseInt(value, 10) / 100).toFixed(2)
            value = value.replace('.', ',')
            value = value.replace(/\B(?=(\d{3})+(?!\d))/g, ".")
            event.target.value = value
            form.setValue("price", value)
        }
    }


    return (
        <section>
            <DialogHeader className="flex justify-center flex-col">
                <DialogTitle className="flex justify-center">Novo serviço</DialogTitle>
                <DialogDescription className="flex justify-center">
                    Adicione um novo serviço
                </DialogDescription>
            </DialogHeader>

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="font-semibold">Nome do serviço</FormLabel>
                                <FormControl>
                                    <Input placeholder="Digite seu nome" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />


                    <FormField
                        control={form.control}
                        name="price"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="font-semibold">Valor do serviço</FormLabel>
                                <FormControl>
                                    <Input placeholder="Ex: 200.00" {...field} onChange={(e) => changeCurrency(e)} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <p className="font-semibold py-0">Tempo de duração do serviço</p>
                    <div className="flex gap-6 w-full">

                        <FormField
                            control={form.control}
                            name="hour"
                            render={({ field }) => (
                                <FormItem className="w-full">
                                    <FormLabel className="font-semibold">Horas:</FormLabel>
                                    <FormControl>
                                        <Input type="number" min="0" placeholder="01 " {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />



                        <FormField
                            control={form.control}
                            name="minute"

                            render={({ field }) => (
                                <FormItem className="w-full">
                                    <FormLabel>Minutos:</FormLabel>
                                    <FormControl>
                                        <Input type="number" min="0" placeholder="00" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />


                    </div>

                    {serviceId ? <Button className="text-white w-full" type="submit">{loading ? "Atualizando serviço" : "Atualizar serviço"}</Button>
                        : <Button className="text-white w-full" type="submit">{loading ? "Cadastrando serviço..." : "Adicionar serviço"}</Button>
                    }
                </form>
            </Form>




        </section>
    )
}