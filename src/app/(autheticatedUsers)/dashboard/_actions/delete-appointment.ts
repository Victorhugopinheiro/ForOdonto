"use server"

import { auth } from "@/lib/auth"
import prisma from "@/lib/prisma"
import { revalidatePath } from "next/cache"
import { z } from "zod"


const formSchema = z.object({
    appointmentId: z.string().min(1, "O id do agendamento é obrigatório")
})


type FormSchema = z.infer<typeof formSchema>


export async function DeleteAppointment(formData: FormSchema) {


    const zodSchema = formSchema.safeParse(formData)

    if (!zodSchema.success) {
        return {
            error: zodSchema.error?.issues[0].message
        }
    }

    const user = await auth()


    if (!user?.user.id) {
        return {
            error: "Usuário não encontrado"
        }
    }


    try{

        const response = await prisma.appointment.delete({
            where:{
                id:formData.appointmentId,
                userId:user.user.id
            }
        })


        revalidatePath("/dashboard")

        return{
            data:"Agendamento cancelado"
        }

    }catch(err){
         return {
            error: "Erro de requisição"
        }
    }


}