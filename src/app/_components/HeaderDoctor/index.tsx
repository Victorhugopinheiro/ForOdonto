import Image from "next/image";
import DoctorImage from "../../../../public/img_manicure_2 (1).png"
import { Button } from "@/components/ui/button";

export function HeaderDoctor() {

    return (
        <section className="bg-white px-10 pt-16">
            <div className="container mx-auto">
                <main className="flex justify-center">

                    <article className=" flex flex-col  space-y-8 max-w-2xl ">
                        <h1 className="text-4xl font-bold max-w-xl tracking-tight">Suas unhas perfeitas, sem fila.</h1>
                        <span>
                            Praticidade para você e suas clientes. Gerencie horários e serviços com apenas alguns cliques.
                        </span>
                        <Button className="flex w-fit px-2 py-1 font-semibold bg-pink-400 hover:bg-pink-500">Encontre sua Manicure</Button>
                    </article>

                    <div className="hidden lg:flex">
                        <Image className="object-contain" width={300} height={300} src={DoctorImage} alt="Imagem header Doctor"/>
                    </div>
                </main>
            </div>
        </section>
    )
}