"use server"

import prisma from "@/lib/prisma"


export async function getClinics() {



    try {
        const response = await prisma.user.findMany({
            where: {
                status: true
            }
        })


        return response
    } catch (err) {
        return []
    }
}