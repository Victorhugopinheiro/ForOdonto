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

        const {sessionId, error} = await CreateSubscription({ type: type })

        if(error){
            toast.error("Erro ao assinar")
            return
        }

        const stripe = await getStripeJs()

        if(stripe){
           await stripe.redirectToCheckout({sessionId:sessionId})
        }





    }

    return (
        <Button onClick={handleCreateBilling} className={`w-full ${type === "PROFESSIONAL" && "bg-emerald-500 hover:bg-emerald-400"}`}>
            Assinar</Button>
    )
}