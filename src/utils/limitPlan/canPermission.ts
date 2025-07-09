import { auth } from "@/lib/auth";
import { PlanDetailProps } from "../plans";


interface ResultPermission{
    hasPermission: boolean;
    planId: string;
    expired: boolean;
    plan: PlanDetailProps | null
}

export async function canPermission(type:string): Promise<ResultPermission> {


const session = await auth();

if(!session?.user?.id){
    return {
        hasPermission: false,
        planId: "",
        expired: false,
        plan: null
    }

}



}