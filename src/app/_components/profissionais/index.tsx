
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
import { User } from "../../../../generated/prisma"




interface UserProps {
    clinics: User[]
}

export function Profissionais({ clinics }: UserProps) {
    return (
        <section className="bg-gray-100 py-12 mt-10">
            <div className="container mx-auto p-2">
                <h1 className="text-center font-bold text-3xl">Clinicas disponíveis</h1>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 mt-16">
                    {clinics.map((clinic) => (
                        <Card key={clinic.id} className="overflow-hidden p-0 border-none">

                            <CardContent className="flex flex-col gap-2 p-0 border-none">
                                <div className="relative h-48">
                                    <Image quality={100} priority fill className="object-cover" src={clinic.image ?? ImgServico} alt="Imagem serviços" />
                                </div>

                                <div className="flex flex-col p-4 gap-2">

                                    <div className="flex justify-between ">
                                        <div>
                                            <p className="font-semibold">{clinic.name}</p>
                                            <p className="text-gray-500 text-sm">{clinic.address ?? "Nenhum endereço informado"}</p>
                                        </div>

                                        <span className="h-2.5 w-2.5 rounded-full my-2 bg-emerald-500" />
                                    </div>

                                    <Link href={`/clinica/${clinic.id}`} className="bg-emerald-500
                             px-2 py-2 flex justify-center items-center text-center rounded-lg text-white hover:bg-emerald-400">
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