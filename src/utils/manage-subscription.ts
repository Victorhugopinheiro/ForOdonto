import prisma from "@/lib/prisma";
import { Plan, Subscription } from "../../generated/prisma";
import { stripe } from '../utils/stripe'
import { revalidatePath } from "next/cache";


interface ManageSubscriptionProps {
    subscriptionId: string,
    customerId: string,
    createAction: boolean,
    deleteAction: boolean,
    type?: Plan
}

export async function ManageSubscription({createAction, customerId, deleteAction, subscriptionId, type}:ManageSubscriptionProps) {

    const user = await prisma.user.findFirst({
        where: {
            stripe_customer_id: customerId
        }
    })

    if (!user) {
        return Response.json({ error: 'Falha ao encontrar a assinatura' }, { status: 400 })
    }


    const subscription = await stripe.subscriptions.retrieve(subscriptionId)

    const subscriptionData = {
        id: subscription.id,
        userId: user.id,
        plan: type ?? 'BASIC',
        status: subscription.status,
        priceId: subscription.items.data[0].price.id,
    }


    if (subscriptionId && deleteAction) {
        try {

            const response = await prisma.subscription.delete({
                where: {
                    id: subscriptionId
                }
            })

        } catch (err) {

            console.log('Erro Deletar subscription', err)

        }
    }

    if (createAction) {

        try {

            const response = await prisma.subscription.create({
                data: subscriptionData
            })

            revalidatePath("/dashboard/plans")

        } catch (err) {

            console.log('Erro ao salvar no banco a assinatura', err)

        }

    } else {

        try {

            const findSubscription = await prisma.subscription.findFirst({
                where: {
                    id: subscriptionId
                }
            })

            if (!findSubscription) {
                return
            }

            const response = await prisma.subscription.update({
                where: {
                    id: findSubscription.id
                },
                data: {
                    status: subscription.status,
                    priceId: subscription.items.data[0].price.id,
                    plan: type ?? 'BASIC'

                }
            })

            revalidatePath("/dashboard/plans")



        } catch (err) {

            console.log('Erro ao salvar no banco a assinatura', err)

        }

    }





}