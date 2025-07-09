"use server";

import prisma from "@/lib/prisma";
import { Session } from "next-auth";
import {addDays, isAfter} from "date-fns"
import { is, tr } from "date-fns/locale";
import { ResultPermission } from "./canPermission";


const TRIAL_DAYS = 7; // Define the number of trial days
export async function isTrialTime(session:Session): Promise<ResultPermission> {

    const currentDate = new Date();

    const createdAt = session.user.createdAt

    const trialEndDate = addDays(createdAt, TRIAL_DAYS);

    if(isAfter(currentDate, trialEndDate)){
        return {
            hasPermission: false,
            planId: "EXPIRED",
            expired: false,
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