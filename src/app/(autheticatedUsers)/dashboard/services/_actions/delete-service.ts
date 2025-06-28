'use server'



import { auth } from "@/lib/auth"
import prisma from "@/lib/prisma"
import { revalidatePath } from "next/cache"
import { z } from "zod"


const formSchema = z.object({
    serviceId: z.string().min(1, { message: "O serviço é obrigatório" })
   
})


type FormType =  z.infer<typeof formSchema>

export async function DeleteService(formData:FormType) {

    const zodSchema = formSchema.safeParse(formData)


    console.log(zodSchema)

    if(!zodSchema.success){
        return{
            error:"Serviço não encontrado"
        }
    }


    const session = await auth()

    if (!session?.user.id) {
        return {
            error: "Usuário não encontrado!"
        }
    }


    try {
        const response = await prisma.service.update({
            where: {
                id: formData.serviceId,
                userId:session.user.id
                
            },
            data:{
                status:false
            }
        })


        revalidatePath("/dashboard/services")

        return{
            data:response
        }

    }catch(err){
        return{
            error:"Erro ao deletar serviço!"
        }
    }





}