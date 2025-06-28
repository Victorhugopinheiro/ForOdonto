"use server"

import { z } from "zod"

import prisma from "@/lib/prisma"


const formSchema = z.object({
    name: z.string().min(1, {
        message: "Name é um campo obrigatório",
    }),
    email: z.string().email(
        "Email é um campo obrigátorio",
    ),
    phone: z.string().min(1, "O telefone é obrigatório"),
    appointmentTime: z.string().min(1, "Horário é um campo obrigatório"),
    date: z.date(),
    serviceId: z.string().min(1, {
        message: "Selecione o serviço",
    }),
    clinicId: z.string().min(1, "Usuário não encontrado")
})


type FormSchema = z.infer<typeof formSchema>


export async function AppointmentRegister(formData: FormSchema) {

    const zodSchema = formSchema.safeParse(formData)

    if (!zodSchema.success) {
        return {
            error: zodSchema.error.issues[0].message
        }
    }







    try {

        const selectedDate = new Date(formData.date)

        const year = selectedDate.getFullYear();
        const month = selectedDate.getMonth();
        const day = selectedDate.getDate();

        const appointmentDate = new Date(year, month, day, 0, 0, 0, 0)


        const response = await prisma.appointment.create({
            data: {
                appointmentDate: appointmentDate,
                appointmentTime: formData.appointmentTime,
                email: formData.email,
                name: formData.name,
                userId: formData.clinicId,
                serviceId: formData.serviceId,
                phone: formData.phone

            }
        })


        return {
            data: response
        }
    } catch (err) {
        return {
            error: "Erro ao fazer requisição"
        }
    }





}