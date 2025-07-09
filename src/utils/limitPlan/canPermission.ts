import { auth } from "@/lib/auth";
import { PlanDetailProps } from "../plans";
import prisma from "@/lib/prisma";
import { create } from "domain";
import { CreatePermission } from "./createpermission";


export type PlanIdProps = "BASIC" | "PROFESSIONAL" | "TRIAL" | "EXPIRED";

export interface ResultPermission{
    hasPermission: boolean;
    planId: PlanIdProps;
    expired: boolean;
    plan: PlanDetailProps | null
}

type ServicesType = "service"

export interface TypeProps{
    type: ServicesType
}

export async function canPermission(type:TypeProps): Promise<ResultPermission> {


const session = await auth();

if(!session?.user?.id){
    return {
        hasPermission: false,
        planId: "EXPIRED",
        expired: false,
        plan: null
    }
}


const subscription = await prisma.subscription.findFirst({

    where: {
        userId: session.user.id
    }
})  





switch (type.type) {
    case "service": 
        const permission = await CreatePermission(subscription , session);

        return permission;

    default:
        return {
            hasPermission: false,
            planId: "EXPIRED",
            expired: false,
            plan: null
        }


}



}