"use server"

import { z } from "zod"

import { auth } from "@/lib/auth"
import prisma from "@/lib/prisma"

const formSchema = z.object({
    name: z.string().min(1, { message: "Name é obirgatório", }),
    address: z.string().optional(),
    phone: z.string().optional(),
    timeZone: z.string().min(1, {
        message: "Time zone é obrigatorio",
    }), status: z.boolean(),
    times: z.array(z.string())
})

export type ItemsProps = z.infer<typeof formSchema>

export default async function UpdateUser(items: ItemsProps) {

    const user = await auth()

    if (!user?.user.id) {
        return {
            message: "Usuário invalido"
        }
    }

    const schema = formSchema.safeParse(items)

    if (!schema.success) {
        return {
            error: "Informações Inválidas"
        }
    }


    try {

        const response = await prisma.user.update({
            where: {
                id: user.user.id
            },
            data: {
                name: items.name,
                address: items.address,
                phone: items.phone,
                timeZone: items.timeZone,
                status: items.status,
                times: items.times
            }
        })


        return {
            message: "Items atualizados com sucesso"
        }

    } catch (err) {
        return {
            error: "Erro de requisição"
        }
    }






}