"use server"

import { auth } from "@/lib/auth"
import prisma from "@/lib/prisma"
import { revalidatePath } from "next/cache"
import { z } from "zod"

const formSchema = z.object({
    name: z.string().min(1, { message: "O nome do serviço é obrigatório" }),
    price: z.number().min(1, { message: "O preço do serviço é obrigatório" }),
    duration: z.number(),
    serviceId: z.string()
})


type ZodProps = z.infer<typeof formSchema>


export async function updateService(formData: ZodProps) {

    const zodSchema = formSchema.safeParse(formData)

    if (!zodSchema.success) {
        return {
            error: "Erro de validação"
        }
    }


    const session = await auth()

    if (!session?.user.id) {
        return {
            error: "Usuário não encontrado"
        }
    }


    try {

        const response = await prisma.service.update({
            where: {
                id: formData.serviceId,
                userId: session.user.id
            },
            data: {
                name: formData.name,
                price: formData.price,
                duration: formData.duration
            }
        })

        revalidatePath("/dashboard/services")

        return{
            data:response
        }

    } catch (err) {
        return {
            error: "Erro de requisição"
        }
    }

}