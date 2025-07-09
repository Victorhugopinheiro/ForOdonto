import { Session } from "next-auth";
import { Subscription } from "../../../generated/prisma";
import prisma from "@/lib/prisma";




export async function CreatePermission(subscription:Subscription, session:Session){

    try {

        const countServices = await prisma.service.count({
            where: {
                userId: session.user.id
            }

        })

    }catch (error) {
        console.error("Error creating permission:", error);
        return {
            hasPermission: false,
            planId: "",
            expired: false,
            plan: null
        };
    }


}