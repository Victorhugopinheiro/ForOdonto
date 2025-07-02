"use client"

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { subscription } from "@/utils/plans";
import { ButtonPlan } from "./button-plan";

export function PlansContent() {
    return (
        <div className="grid gap-6 lg:grid-cols-2">

            {subscription.map((plan, index) => (




                <Card className={`${index === 1 && "pt-0 border-emerald-500"} `} key={plan.id}>

                    {index === 1 && (
                        <div className="bg-emerald-500 w-full rounded-t-lg py-3">
                            <p className="text-center font-semibold text-white">PROMOÇÃO EXCLUSIVA</p>
                        </div>
                    )}
                    <CardHeader>
                        <CardTitle className="text-xl">{plan.name}</CardTitle>
                        <CardDescription>{plan.description}</CardDescription>
                    </CardHeader>

                    <CardContent>
                        <ul className="text-sm md:text-base">
                            {plan.features.map((item, index) => (
                                <li key={index}>{item}</li>
                            ))}
                        </ul>

                        <div className="mt-4">
                            <p className="text-gray-400 line-through">{plan.oldPrice}</p>
                            <p className="text-black text-2xl font-bold">{plan.price}</p>
                        </div>
                    </CardContent>

                    <CardFooter>
                        <ButtonPlan type={plan.id === "BASIC" ? "BASIC" : "PROFESSIONAL"}/>
                    </CardFooter>
                </Card>

            ))}

        </div>
    )
}