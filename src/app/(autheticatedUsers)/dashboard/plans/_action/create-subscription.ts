"use server"

import { auth } from "@/lib/auth"
import { Plan } from "../../../../../../generated/prisma"
import prisma from "@/lib/prisma"
import { stripe } from "../../../../../utils/stripe"


type PlanProps = {
    type: Plan
}


export async function CreateSubscription({ type }: PlanProps) {

    const session = await auth()
    const userId = session?.user.id


    if (!userId) {
        return {
            sessionId: "",
            error: "Usuário não encontrado",

        }
    }


    const user = await prisma.user.findFirst({
        where: {
            id: userId
        }
    })


    if (!user) {
        return {
            sessionId: "",
            error: "Usuário não encontrado",

        }
    }

    let customerId = user.stripe_customer_id

    if (!customerId) {
        const customer = await stripe.customers.create({
            email: user.email
        })

        await prisma.user.update({
            where: {
                id: userId
            },
            data: {
                stripe_customer_id: customer.id
            }
        })


        customerId = customer.id

    }


    const sessionStripe = await stripe.checkout.sessions.create({
        customer: customerId,
        payment_method_types: ["card"],
        billing_address_collection: "required",
        line_items: [
            {
                price: type === "BASIC" ? process.env.STRIPE_PLAN_BASIC : process.env.STRIPE_PLAN_PROFISSIONAL,
                quantity: 1

            }
        ],
        metadata: {
            type: type
        },
        mode: "subscription",
        allow_promotion_codes: true,
        success_url: process.env.STRIPE_SUCCESS_URL,
        cancel_url: process.env.STRIPE_CANCEL_URL
    })

    return {
        sessionId: sessionStripe.id
    }



}

