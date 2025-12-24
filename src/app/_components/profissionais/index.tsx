
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import Image from "next/image"

import ImgServico from "../../../../public/foto1.png"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Prisma, User } from "../../../../generated/prisma"
import { DestaquePlan } from "../destaquePlan"



type UserWithSubscription = Prisma.UserGetPayload<{
    include: {
        subscription: true
    }
}>

interface UserProps {
    clinics: UserWithSubscription[]
}

export function Profissionais({ clinics }: UserProps) {
    return (
        <section className="bg-gray-100 py-12 ">
            <div className="container mx-auto p-2">
                <h1 className="text-center font-bold text-3xl">Clinicas disponíveis</h1>

                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 mt-16">
                    {clinics.map((clinic) => (
                        <Card key={clinic.id} className="overflow-hidden p-0 border-none">

                            <CardContent className="flex flex-col gap-2 p-0 border-none">

                                <div className="relative h-48">
                                    <Image quality={100} priority fill className="object-cover" src={clinic.image ?? ImgServico} alt="Imagem serviços" />
                                    {clinic.subscription?.status === `active` &&
                                        <DestaquePlan />
                                    }
                                </div>

                                <div className="flex flex-col justify-between p-4 gap-2 ">

                                    <div className="flex justify-between min-h-20">
                                        <div>
                                            <p className="font-semibold line-clamp-2">{clinic.name}</p>
                                            <p className="text-gray-500 text-sm line-clamp-2">{clinic.address ?? "Nenhum endereço informado"}</p>
                                        </div>


                                    </div>

                                    <Link href={`/clinica/${clinic.id}`} className="bg-pink-500
                             px-2 py-2 flex justify-center items-center text-center rounded-lg text-white hover:bg-pink-200">
                                        Agende seu Horário
                                        <ArrowRight size={22} />
                                    </Link>
                                </div>


                            </CardContent>

                        </Card>
                    ))}
                </div>


            </div>
        </section>
    )
}