"use server"

import prisma from "@/lib/prisma"
import { revalidatePath } from "next/cache"
import { z } from "zod"


const formSchema = z.object({
    reminderId: z.string({ errorMap: () => ({ message: "O id do lembrete está invalido" }) }).min(1, "Id do lembrete é obrigatório")
})


type FormSchema = z.infer<typeof formSchema>


export async function DeleteReminder(formData: FormSchema) {

    const zodSchema = formSchema.safeParse(formData)

    if (!zodSchema.success) {
        return {
            error: zodSchema.error.issues[0].message
        }
    }


    try {

        const response = await prisma.reminder.delete({
            where: {
                id: formData.reminderId
            }
        })

        revalidatePath("/dashboard")

        return {
            data: response
        }

    } catch (err) {
        return {
            error: "Falha ao deletar lembrete"
        }
    }

}