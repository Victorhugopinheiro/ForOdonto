"use client"


import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { FormSchemaProps, useReminderForm } from "./form-reminder"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { useSession } from "next-auth/react"
import { Reminder } from "../../../../../../generated/prisma"
import { toast } from "sonner"
import { RegisterReminder } from "../../_actions/register-reminder"


interface remiderProps {
    closeModal: () => void
}

export function ReminderContent({ closeModal }: remiderProps) {


    const form = useReminderForm()


    async function onSubmit(values: FormSchemaProps) {


        const response = await RegisterReminder({ description: values.description })

        if (response?.erro) {
            toast.error("Erro ao cadastrar lembrete")
            return
        }


        toast.success("Lembrete cadastrado")
        closeModal()


    }



    return (
        <div>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="font-semibold">Decreva seu lembrete</FormLabel>
                                <FormControl>
                                    <Textarea className="max-h-52" placeholder="Digite para se lembrar mais tarde" {...field} />
                                </FormControl>

                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button className="w-full" type="submit">Cadastrar lembrete</Button>
                </form>
            </Form>
        </div>
    )
}