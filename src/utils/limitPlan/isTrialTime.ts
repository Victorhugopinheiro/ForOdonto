"use server";

import { Session } from "next-auth";
import {addDays, isAfter} from "date-fns"
import { ResultPermission } from "./canPermission";


 // Define the number of trial days
export async function isTrialTime(session:Session): Promise<ResultPermission> {

    const currentDate = new Date();

     const TRIAL_DAYS = 7;

    const createdAt = session.user.createdAt

    const trialEndDate = addDays(createdAt, TRIAL_DAYS);

    if(isAfter(currentDate, trialEndDate)){
        return {
            hasPermission: false,
            planId: "EXPIRED",
            expired: true,
            plan: null
        }
    }

    return {
            hasPermission: true,
            planId: "TRIAL",
            expired: false,
            plan: null
        }

}