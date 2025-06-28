"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"



const formSchema = z.object({
    name: z.string().min(2, {
        message: "Nome é um campo obrigatório",
    }),
    price: z.string().min(1, {
        message: "Nome é um campo obrigatório",
    }),
    hour: z.string(),
    minute: z.string()
})


export type TypesForm = z.infer<typeof formSchema>

export interface UseDialogServiceFormProps{
    initialValue?:{
        name:string,
        price:string,
        hour:string,
        minute:string
    }
}


export function ProfileForm({initialValue}:UseDialogServiceFormProps) {
    // 1. Define your form.
    return useForm<TypesForm>({
        resolver: zodResolver(formSchema),
        defaultValues: initialValue || {
            name: "",
            price:"",
            hour:"",
            minute:""
        },
    })

   
}