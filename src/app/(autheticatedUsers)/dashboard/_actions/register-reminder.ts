"use server"

import { auth } from "@/lib/auth"
import prisma from "@/lib/prisma"
import { revalidatePath } from "next/cache"
import { z } from "zod"



const zodSchema = z.object({
    description: z.string().min(1, "Descricao obrigatória")
})


type FormProps = z.infer<typeof zodSchema>

export async function RegisterReminder(formData: FormProps) {

    const session = await auth()

    if (!session?.user?.id) {
        return {
            erro: "Nenhum usuário encontrado"
        }
    }

    const formZod = zodSchema.safeParse(formData)

    if (!formZod.success) {
        return {
            erro: "Erro de dados"
        }
    }

    try {

        const response = await prisma.reminder.create({
            data: {
                description: formData.description,
                userId: session.user.id
            }
        })

        revalidatePath("/dashboard")

        return {
            data: response
        }

    } catch (err) {
        console.log(err)
        return {
            erro: "Erro de requisição"
        }
    }

}