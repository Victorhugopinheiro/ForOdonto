"use server"

import prisma from "@/lib/prisma"

export async function FindClinic(userId: string) {

    if (!userId) {
        return null
    }


    try {
        const response = await prisma.user.findFirst({
            where: {
                id: userId
            },
            include:{
                subscription:true,
                service:{
                    where:{
                        status:true
                    }
                }
            }
        })


        return response
    } catch (err) {
        return null
    }



}