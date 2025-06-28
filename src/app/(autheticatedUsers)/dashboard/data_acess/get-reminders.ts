"use server"

import prisma from "@/lib/prisma"


export async function GetReminders(userId: string | undefined) {

    if (!userId) {
        return {
            error: []
        }
    }


    try {
        const response = await prisma.reminder.findMany({
            where: {
                userId: userId
            }
        })


        return {
            data: response
        }
    } catch (err) {
        return {
            error: []
        }
    }

}