"use client"

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"


import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Pencil, Plus, X } from "lucide-react"
import { ContentDialog } from "./contentDialog"
import { useState } from "react"
import { Service } from "../../../../../../generated/prisma"
import { FormatCurrency } from "@/utils/formatValue"
import { DeleteService } from "../_actions/delete-service"
import { toast } from "sonner"


interface ServicesProps {
    service: Service[]
}


export function ContentService({ service }: ServicesProps) {

    console.log(service)


    const [controlDialog, setControlDialog] = useState(false)
    const [editingService, setEditingService] = useState<Service | null>(null)


    async function handleDeleteService(serviceId: string) {

        const response = await DeleteService({ serviceId: serviceId })

        if (response.error) {
            toast.error("Erro ao deletar serviço")
            return
        }

        toast.success("Serviço deletado!")

    }

    function editItem(service: Service) {
        console.log(service)
        setEditingService(service)
        setControlDialog(true)


        console.log(editingService)

    }

    return (
        <Dialog open={controlDialog} onOpenChange={(open) => {
            setControlDialog(open)
            if (!open) {
                setEditingService(null)
            }
        }}>
            <Card>

                <CardHeader className="flex items-center justify-between">
                    <CardTitle className="text-xl md:text-2xl">Serviços</CardTitle>

                    <DialogTrigger asChild><Button><Plus /></Button></DialogTrigger>


                    <DialogContent onInteractOutside={(e) => {
                        e.preventDefault()
                        setControlDialog(false)
                        setEditingService(null)
                    }}>
                        <ContentDialog
                            closeModal={() => { setControlDialog(false), setEditingService(null) }}
                            serviceId={editingService?.id}
                            initialValue={editingService ? {
                                name: editingService.name,
                                price: (editingService.price / 100).toFixed(2).replace(".", ","),
                                hour: Math.floor(editingService.duration / 60).toString(),
                                minute: (editingService.duration % 60).toString()

                            } : undefined} />
                    </DialogContent>
                </CardHeader>

                <CardContent>
                    <section className="mt-6">
                        {service && service?.map((item, index) => (
                            <section className="flex items-center justify-between py-4  border-b border-slate-200" key={item.id}>

                                <div className="flex items-center space-x-1">
                                    <span className="font-medium">{item.name}:</span>

                                    <span className="text-slate-600">{FormatCurrency((item.price / 100))}</span>
                                </div>


                                <div className="flex items-center">
                                    <Button onClick={() => editItem(item)} variant={"ghost"} size={"icon"} >
                                        <Pencil />
                                    </Button>

                                    <Button onClick={() => handleDeleteService(item.id)} variant={"ghost"} size={"icon"} >
                                        <X />
                                    </Button>


                                </div>
                            </section>
                        ))}
                    </section>
                </CardContent>

            </Card>
        </Dialog>
    )
}