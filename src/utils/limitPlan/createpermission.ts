import { Session } from "next-auth";
import { Subscription } from "../../../generated/prisma";
import prisma from "@/lib/prisma";
import { getPlan, plans } from "./getPlan";
import { isTrialTime } from "./isTrialTime";
import { ResultPermission } from "./canPermission";




export async function CreatePermission(subscription: Subscription | null, session: Session): Promise<ResultPermission> {

    try {

        const countServices = await prisma.service.count({
            where: {
                userId: session.user.id
            }

        })


        if (subscription && subscription.status === "active") {

            const getDetailPlan = getPlan(subscription.plan);

            console.log("getDetailPlan", getDetailPlan);

            if (countServices < getDetailPlan.maxServices) {
                return {
                    hasPermission: true,
                    planId: subscription.plan,
                    expired: false,
                    plan: plans[subscription.plan]
                }
            } else {
                return {
                    hasPermission: false,
                    planId: subscription.plan,
                    expired: false,
                    plan: null
                }
            }

        }

        const isTrial = await isTrialTime(session);
        return isTrial;




    } catch (error) {
        console.error("Error creating permission:", error);
        return {
            hasPermission: false,
            planId: "EXPIRED",
            expired: true,
            plan: null
        };
    }

}