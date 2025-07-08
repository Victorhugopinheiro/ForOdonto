import Stripe from 'stripe';
import { stripe } from '../../../utils/stripe'
import { NextRequest, NextResponse } from 'next/server'
import { ManageSubscription } from '@/utils/manage-subscription';
import { Plan } from '../../../../generated/prisma';

export const POST = async (request: Request) => {

    const signature = request.headers.get('stripe-signature');

    if (!signature) {
        return NextResponse.error();
    }

    const text = await request.text()


    const event = stripe.webhooks.constructEvent(
        text,
        signature,
        process.env.STRIPE_SECRET_WEBHOOK_KEY as string

    )

    switch (event.type) {
        case 'customer.subscription.deleted':
            const payment = event.data.object as Stripe.Subscription
            ManageSubscription({
                createAction: false,
                customerId: payment.customer.toString(),
                deleteAction: true,
                subscriptionId: payment.id
            })

            break;
        case 'customer.subscription.updated':
            const customerUpdate = event.data.object as Stripe.Subscription

            ManageSubscription({
                createAction: false,
                customerId: customerUpdate.customer.toString(),
                deleteAction: false,
                subscriptionId: customerUpdate.id
            })
            break;

        case 'checkout.session.completed':

            const checkoutSession = event.data.object as Stripe.Checkout.Session

            const type = checkoutSession?.metadata?.type ? checkoutSession?.metadata?.type : "BASIC"


            {
                checkoutSession.customer && checkoutSession.subscription && (
                    ManageSubscription({
                        createAction: true,
                        customerId: checkoutSession.customer?.toString(),
                         deleteAction: false,
                        subscriptionId: checkoutSession.subscription.toString(),
                        type: type as Plan
                    })
                )
            }

            break;

        default:
            console.log('Eventol nao tratado:', event.type)
    }

    return NextResponse.json({ received: true })

}