import prisma from "@/lib/prisma"




export async function GetSubscription(userId:string | undefined){

    if(!userId){
        return{
            error: "usuario nao encontrado"
            
        }
    }


    try{

        const response = await prisma.subscription.findFirst({
            where:{
                userId:userId
            }
        })

        return{
            data: response 
        }

    }catch(err){
         return{
            error: "Erro de requisiçao"
            
        }
    }



}