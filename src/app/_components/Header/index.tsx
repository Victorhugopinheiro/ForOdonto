"use client"
import Link from "next/link";

import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { Button } from "@/components/ui/button";
import { LogIn, Menu } from "lucide-react";
import { useState } from "react";
import { useSession } from "next-auth/react";
import handleRegister from "@/app/(public)/_actions/login"



export function Header() {

    const { data: session, status } = useSession()

    const [mobileControl, setMobileControl] = useState(false)
    const [user, setUser] = useState(false)


    const menu = [
        { label: "Profissionais", href: "#profissionais" }
    ]


    async function handleLogin() {
        await handleRegister("google")
    }


    const MenuComponent = () => (
        <div className="flex flex-col items-center gap-6 md:flex-row">
            {menu.map((item, index) => (
                <Button onClick={() => setMobileControl(false)} key={index} className="bg-transparent text-black shadow-none hover:bg-transparent">

                    <Link className="text-base" href={item.href}>{item.label}</Link>
                </Button>

            ))}

            {status === "loading" ? <></> : session ?
                <Link href={"dashboard"} className="flex justify-center text-white bg-zinc-900 px-2 py-1 rounded-md text-lg font-medium">
                    Acessar 
                </Link>
                :
                <Button onClick={handleLogin}>
                    <LogIn />
                    Portal da clinica
                </Button>
            }
        </div>
    )

    return (
        <header className="fixed top-0 right-0 left-0 bg-white py-4 px-6">
            <div className="container mx-auto flex justify-between items-center">
                <Link className="text-4xl font-bold" href={"/"}>GO<span className="text-pink-400 ml-2">AGENDAR</span></Link>


                <nav className="font-bold text-2xl hidden md:flex flex-row space-x-4">{<MenuComponent />}</nav>


                <Sheet open={mobileControl} onOpenChange={setMobileControl}>
                    <SheetTrigger asChild className="flex md:hidden" >
                        <Button variant={"ghost"} size={"icon"} className="text-black hover:bg-transparent">
                            <Menu width={6} height={6} />
                        </Button>
                    </SheetTrigger>


                    <SheetContent side="right" className="w-[240px] sm:w-[300px] md:hidden transition-all duration-300">
                        <SheetHeader>
                            <SheetTitle>Menu</SheetTitle>
                            <SheetDescription>
                                Veja nossos links
                            </SheetDescription>
                            <nav className="flex flex-col space-x-4 mt-6">
                                <MenuComponent />
                            </nav>
                        </SheetHeader>


                    </SheetContent>
                </Sheet>

            </div>
        </header>
    )
}