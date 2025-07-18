"use server"
import {signIn} from "@/lib/auth"

type HandleRegister = "google" | "github";

export default async function handleRegister(provider:HandleRegister){
    await signIn(provider, {redirectTo:"/dashboard"})
}