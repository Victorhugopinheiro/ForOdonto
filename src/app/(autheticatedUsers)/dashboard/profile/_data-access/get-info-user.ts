import prisma from "@/lib/prisma"

interface GetUserInfoProps {
    user_id: string | undefined
}

export async function GetUserInfo({ user_id }: GetUserInfoProps) {

    if(!user_id){
        return null
    }

    const user = await prisma.user.findFirst({
        where:{
            id:user_id
        },
        include:{
            subscription:true
        }
    })


    if(!user){
        return null
    }

    return user

}