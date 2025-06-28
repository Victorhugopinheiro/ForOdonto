"use server"

import prisma from "@/lib/prisma"


export async function GetClinicTimers(userId: string | undefined) {


    if (!userId) {
        return {
            error: "Usuário não encontrado",
            userId: ""
        }
    }

    try {

        const response = await prisma.user.findFirst({
            where: {
                id: userId
            },
            select: {
                times: true,
                id: true
            }
        })

        if (!response) {
            return {
                error: "Usuário não encontrado",
                userId: ""
            }
        }


        return {
            data: response
        }

    } catch (err) {
        return {
            error: "Erro de requisição",
            userId: ""
        }
    }

}