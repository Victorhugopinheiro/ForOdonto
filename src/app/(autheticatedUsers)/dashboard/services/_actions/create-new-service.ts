"use server"

import { auth } from "@/lib/auth"
import prisma from "@/lib/prisma"
import { ConvertRealToCents } from "@/utils/convertRealToCents"
import { zodResolver } from "@hookform/resolvers/zod"
import { revalidatePath } from "next/cache"
import { useForm } from "react-hook-form"
import { number, z } from "zod"

const formSchema = z.object({
    name: z.string().min(1, { message: "O nome do serviço é obrigatório" }),
    price: z.number().min(1, { message: "O preço do serviço é obrigatório" }),
    duration: z.number(),
})


type FormSchema = z.infer<typeof formSchema>

export async function CreateNewService(formData: FormSchema) {

    const user = await auth()

    console.log(user?.user)

    if (!user?.user?.id) {
        return {
            error: "Usuário não encontrado"
        }
    }

    const schema = formSchema.safeParse(formData)


    if (!schema.success) {
        return {
            error: schema.error.issues[0].message
        }
    }


    try {
        const response = await prisma.service.create({
            data: {
                name: formData.name,
                price: formData.price,
                duration: formData.duration,
                userId: user?.user?.id
            }
        })


        revalidatePath("/dashboard/services")

        return {
            data: response
        }


    } catch (err) {
        console.log(err);
        return {
            error: "Falha ao cadastra serviço",
        }

    }


}