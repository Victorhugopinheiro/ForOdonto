'use server'

import { auth } from "@/lib/auth"
import prisma from "@/lib/prisma"

export async function ChangeAvatarClinic({ imageUrl }: { imageUrl: string }) {

    const session = await auth()

    if (!session?.user?.id) {
        return new Response("Unauthorized", { status: 401 })
    }

    if (!imageUrl) {
        return new Response("Image URL is required", { status: 400 })
    }

    try {
        const response = await prisma.user.update({
            where: {
                id: session.user.id
            },
            data: {
                image: imageUrl
            }
        })

        return 'Usuário atualizado com sucesso'
    }catch (error) {
        console.error("Error updating user avatar:", error)
        return new Response("Error updating user avatar", { status: 500 })
    }




}