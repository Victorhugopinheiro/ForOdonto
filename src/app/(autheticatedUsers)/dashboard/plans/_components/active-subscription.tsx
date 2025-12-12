'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Subscription } from "../../../../../../generated/prisma";
import { subscription } from '../../../../../utils/plans/index'
import { Button } from "@/components/ui/button";
import { managerSubscription } from "../_action/manager-subscription";
import { toast } from "sonner";
interface subscriptionProps {
    subscriptions: Subscription
}

export function ActiveSubscription({ subscriptions }: subscriptionProps) {

    const findSubscription = subscription.find(item => item.id === subscriptions.plan)


    console.log(subscriptions)

    async function handleManagerSign() {
        const response = await managerSubscription()

        if (response.error) {
            console.error(response.error)
            toast.error("Erro ao gerenciar assinatura")
            return
        }

        
        window.location.href = response.session

    }

    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-2xl md:text-3xl font-bold">
                    Seu plano atual
                </CardTitle>

                <CardDescription>Sua assinatura está ativa</CardDescription>
            </CardHeader>

            <CardContent>
                <div className="flex justify-between items-center">
                    <h3 className="font-semibold text-lg md:text-xl">Profissional</h3>

                    <div className="bg-pink-500 rounded-md py-1 px-4 text-white font-semibold">
                        Ativo
                    </div>
                </div>


                <ul className="list-disc list-inside space-y-2">
                    {findSubscription?.features.map((detail, index) => (
                        <li className="" key={index}>{detail}</li>
                    ))}
                </ul>


                <Button onClick={handleManagerSign} className="my-2">Gerenciar Assinatura</Button>
            </CardContent>

        </Card>
    )
}