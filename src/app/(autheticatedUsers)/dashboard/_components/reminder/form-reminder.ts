import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";


const zodSchema = z.object({
    description: z.string().min(1, "Descrição obrigatória")
})


export type FormSchemaProps = z.infer<typeof zodSchema>


export function useReminderForm() {
    return useForm<FormSchemaProps>({
        resolver: zodResolver(zodSchema),
        defaultValues: {
            description: "",
        },
    })

}  