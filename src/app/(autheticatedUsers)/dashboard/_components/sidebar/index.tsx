"use client"
import { clsx } from "clsx";
import { usePathname } from "next/navigation";
import { useState } from "react";
import cl from "clsx";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, Banknote, Calendar, Folder, Menu, Settings } from "lucide-react";
import Link from "next/link";
import path from "path";


import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible"
import Image from "next/image";
import logoOdonto from "../../../../../../public/logo-odonto.png"




export function SideBar({ children }: { children: React.ReactNode }) {

    const [compacted, setCompacted] = useState(false)

    const path = usePathname()


    return (
        <div className="flex min-h-screen w-full p-2">

            <aside className={cl("hidden bg-white p-2 border-r-1 text-black md:flex flex-col gap-4 transition-all duration-300", {
                "md:w-20": compacted,
                "md:w-60": !compacted,
            })}>



                {!compacted && (
                    <div className="">
                        <Link className="text-4xl font-bold" href={"/"}><span className="text-pink-500">GO AGENDAR</span></Link>
                    </div>
                )}

                {compacted ? <Button onClick={() => setCompacted(!compacted)} className="self-end w-fit bg-slate-100 hover:bg-slate-50 text-black"><ArrowRight size={18} /></Button>
                    : <Button onClick={() => setCompacted(!compacted)} className="self-end w-fit bg-slate-100 hover:bg-slate-50 text-black"><ArrowLeft size={18} /></Button>}


                {compacted && (
                    <nav className="grid gap-2 px-6 overflow-hidden">
                        <LinksForUser
                            actualPage={path}
                            compacted={compacted}
                            href="/dashboard"
                            icon={<Calendar />}
                            label="Agendamentos"
                        />

                        <LinksForUser
                            actualPage={path}
                            compacted={compacted}
                            href="/dashboard/services"
                            icon={<Folder />}
                            label="Serviços"
                        />





                        <LinksForUser
                            actualPage={path}
                            compacted={compacted}
                            href="/dashboard/profileUser"
                            icon={<Settings />}
                            label="Meu perfil"
                        />


                        <LinksForUser
                            actualPage={path}
                            compacted={compacted}
                            href="/dashboard/plans"
                            icon={<Banknote />}
                            label="Planos"
                        />
                    </nav>

                )}

                <Collapsible open={!compacted}>

                    <CollapsibleContent>

                        <h1 className=" uppercase text-sm text-gray-400 font-medium my-1">Painel</h1>
                        <LinksForUser
                            actualPage={path}
                            compacted={compacted}
                            href="/dashboard"
                            icon={<Calendar />}
                            label="Agendamentos"
                        />

                        <LinksForUser
                            actualPage={path}
                            compacted={compacted}
                            href="/dashboard/services"
                            icon={<Folder />}
                            label="Serviços"
                        />



                        <h1 className=" uppercase text-sm text-gray-400 font-medium my-1">Minha conta</h1>

                        <LinksForUser
                            actualPage={path}
                            compacted={compacted}
                            href="/dashboard/profile"
                            icon={<Settings />}
                            label="Meu perfil"
                        />


                        <LinksForUser
                            actualPage={path}
                            compacted={compacted}
                            href="/dashboard/plans"
                            icon={<Banknote />}
                            label="Planos"
                        />
                    </CollapsibleContent>
                </Collapsible>


            </aside>




            <div className={clsx("flex-1 flex flex-col p-2 transition-all duration-300",
                {
                    "md:ml-20": compacted,
                    "md:ml-10": !compacted
                })}>


                <header className="md:hidden">
                    <div className="flex items-center gap-4">
                        <Sheet>
                            <div className="flex gap-2 py-2 mx-2 items-center justify-center  ">

                                <SheetTrigger asChild>
                                    <Button onClick={() => setCompacted(false)} variant={"outline"} size={"icon"} className="flex md:hidden"><Menu size={18} /></Button>
                                </SheetTrigger>
                                <h1 className="font-bold">Menu</h1>

                            </div>
                            <SheetContent>
                                <SheetHeader>
                                    <SheetTitle>GO AGENDAR</SheetTitle>
                                    <SheetDescription>
                                        Menu administrativo
                                    </SheetDescription>
                                </SheetHeader>


                                <nav className="grid gap-2 px-6 overflow-hidden">

                                    <SheetDescription className="">
                                        Dashboard
                                    </SheetDescription>
                                    <LinksForUser
                                        actualPage={path}
                                        compacted={compacted}
                                        href="/dashboard"
                                        icon={<Calendar />}
                                        label="Agendamentos"
                                    />

                                    <LinksForUser
                                        actualPage={path}
                                        compacted={compacted}
                                        href="/dashboard/services"
                                        icon={<Folder />}
                                        label="Serviços"
                                    />
                                    <SheetDescription className="">
                                        Minha conta
                                    </SheetDescription>

                                    <LinksForUser
                                        actualPage={path}
                                        compacted={compacted}
                                        href="/dashboard/profile"
                                        icon={<Settings />}
                                        label="Meu perfil"
                                    />

                                    <LinksForUser
                                        actualPage={path}
                                        compacted={compacted}
                                        href="/dashboard/plans"
                                        icon={<Banknote />}
                                        label="Planos"
                                    />

                                </nav>
                            </SheetContent>
                        </Sheet>
                    </div>
                </header>
                <main className="w-full">
                    {children}

                </main>


            </div>
        </div>
    )
}

interface PropsLinksForUser {
    href: string,
    compacted: boolean,
    label: string,
    actualPage: string,
    icon: React.ReactNode
}


function LinksForUser({ actualPage, compacted, href, label, icon }: PropsLinksForUser) {
    return (
        <Link className={clsx("py-2 px-2 flex gap-2 rounded-md", {
            "bg-blue-500 text-white": href === actualPage,
            "bg-white text-gray-600": href !== actualPage
        })} href={href}>
            <span className="w-6 h-6">{icon}</span>
            {!compacted && (
                <span>{label}</span>
            )}
        </Link>
    )
}