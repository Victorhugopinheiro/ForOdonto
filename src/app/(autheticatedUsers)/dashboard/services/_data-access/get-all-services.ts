import prisma from "@/lib/prisma";


export async function GetAllServices({ user_id }: { user_id: string }) {


    if (!user_id) {
        return {
            error: "Usuário não encontrado"
        }
    }



    try {
        const response = await prisma.service.findMany({
            where: {
                userId: user_id,
                status:true
            }
        })


        return {
            data:response
        }


    } catch (err) {
        console.log(err)
        return {
            error: "Usuário não encontrado"
        }
    }



}