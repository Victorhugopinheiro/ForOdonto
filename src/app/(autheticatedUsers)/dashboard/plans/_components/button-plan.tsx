"use client"

import { Button } from "@/components/ui/button"
import { Plan } from "../../../../../../generated/prisma"
import { CreateSubscription } from "../_action/create-subscription"
import { toast } from "sonner"
import {getStripeJs} from "../../../../../utils/stripe-js"


export type PlanProps = {
    type: Plan
}

export function ButtonPlan({ type }: PlanProps) {

    async function handleCreateBilling() {

        const {sessionId, error, url} = await CreateSubscription({ type: type })

        if(error){
            console.log(error)
            toast.error("Erro ao assinar")
            return
        }

        if(url){
            window.location.href = url
        }





    }

    return (
        <Button onClick={handleCreateBilling} className={`w-full ${type === "PROFESSIONAL" && "bg-pink-500 hover:bg-pink-400"}`}>
            Assinar</Button>
    )
}