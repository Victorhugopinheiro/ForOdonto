"use server"
import {signIn} from "@/lib/auth"


export default async function handleRegister(provider:string){
    await signIn(provider, {redirectTo:"/dashboard"})
}