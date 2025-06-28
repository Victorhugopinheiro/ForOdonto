"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"


interface InfoUser {
  name: string | null,
  address: string | null,
  phone: string | null,
  timeZone: string | null,
  status: boolean 
}

const formSchema = z.object({
  name: z.string().min(1, { message: "Name é obirgatório", }),
  address: z.string().optional(),
  phone: z.string().optional(),
  timeZone: z.string().min(1, {
    message: "Time zone é obrigatorio",
  }), status: z.string()
})

export type ItemsProps = z.infer<typeof formSchema>

export function ProfileForm({address, name,  phone, status, timeZone}:InfoUser) {
  // 1. Define your form.
  return useForm<ItemsProps>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: name || undefined || "",
      address:address || undefined || "",
      phone: phone || undefined ||   "",
      timeZone: timeZone || undefined || "",
      status: status? "Active" :"Inactive"
    },
  })

}