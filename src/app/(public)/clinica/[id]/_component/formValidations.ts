"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

const formSchema = z.object({
    name: z.string().min(1, {
        message: "Name é um campo obrigatório",
    }),
    email: z.string().email(
        "Email é um campo obrigátorio",
    ),
    phone: z.string().min(1, "O telefone é obrigatório"),
    date: z.date(),
    serviceId: z.string().min(1, {
        message: "Selecione o serviço",
    }),


})

export type FormSchema = z.infer<typeof formSchema>

export function ProfileForm() {
    // 1. Define your form.
    return useForm<FormSchema>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            email: "",
            phone: "",
            date: new Date(),
            serviceId: "",

        },
    })


}