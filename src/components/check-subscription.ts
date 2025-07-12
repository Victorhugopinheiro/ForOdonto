"use server"
import prisma from "@/lib/prisma";
import { TRIAL_DAYS } from "@/utils/limitPlan/trialDay";
import { addDays, differenceInDays, isAfter } from "date-fns";
import { Session } from "next-auth";



export type PlanIdProps = "BASIC" | "PROFESSIONAL" | "TRIAL" | "EXPIRED";

export interface ResultPermission {
    planId: PlanIdProps;
    expired: boolean;
    message?: string;
}


export async function checkSubscription(session: Session): Promise<ResultPermission> {


    const user = session?.user;

    if (!user) {
        return {

            planId: "EXPIRED",
            expired: true,
            message: "Usuário não autenticado"

        }
    }

    const subscription = await prisma.subscription.findFirst({
        where: {
            userId: user.id
        }
    })

    if (subscription?.status === "active") {
        return {
            planId: subscription.plan as PlanIdProps,
            expired: false,
            message: "Assinatura ativa"
        }

    }


   const trailEndDate = addDays(user.createdAt, TRIAL_DAYS);

   if(isAfter(new Date(), trailEndDate)){
         return {
        planId: "EXPIRED",
        expired: true,
        message: "Período de teste expirado"
    }

   }


   const daysRemaining = differenceInDays(new Date(), trailEndDate);


    return {
        planId: "TRIAL",
        expired: true,
        message: `Período de teste ativo. Restam ${daysRemaining} dias.`
    }

}


