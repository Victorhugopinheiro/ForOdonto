import Image from "next/image";
import DoctorImage from "../../../../public/doctor-hero.png"
import { Button } from "@/components/ui/button";

export function HeaderDoctor() {

    return (
        <section className="bg-white px-10 pt-16">
            <div className="container mx-auto">
                <main className="flex justify-center">

                    <article className=" flex flex-col  space-y-8 max-w-2xl ">
                        <h1 className="text-4xl font-bold max-w-xl tracking-tight">Encontre os melhores Profissionais em um unico local</h1>
                        <span>
                            Nós somos uma plataforma da area da saúde com foco em
                            agilizar seu atendimento de forma simplificada e organizada
                        </span>
                        <Button className="flex w-fit px-2 py-1 font-semibold bg-emerald-500 hover:bg-emerald-400">Encontre uma clinica</Button>
                    </article>

                    <div className="hidden lg:flex">
                        <Image className="object-contain" width={300} height={300} src={DoctorImage} alt="Imagem header Doctor"/>
                    </div>
                </main>
            </div>
        </section>
    )
}