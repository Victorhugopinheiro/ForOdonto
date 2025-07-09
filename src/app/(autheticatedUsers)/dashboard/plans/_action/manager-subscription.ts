'use server'

import { auth } from "@/lib/auth"
import prisma from "@/lib/prisma"
import { stripe } from "@/utils/stripe"
import { ca } from "date-fns/locale"



export async function managerSubscription() {
    const session = await auth()

    if (!session?.user.id) {
        return {
            error: "Usuário não autenticado",
            session: ''
        }
    }

    const user = await prisma.user.findFirst({
        where: {
            id: session.user.id
        }
    })


    const customerId = user?.stripe_customer_id

    if(!customerId) {
        return {
            error: "Usuário não possui uma assinatura ativa",
            session: ''
        }
    }

   try{
        const sessionStripe = await stripe.billingPortal.sessions.create({
            customer: customerId,
            return_url: process.env.STRIPE_SUCCESS_URL
        })

        return {
            session: sessionStripe.url
        }
   }catch (error) {
        console.error("Erro ao criar sessão de portal de cobrança:", error)
        return {
            error: "Erro ao criar sessão de portal de cobrança",
            session: ''
        }
    }

}
