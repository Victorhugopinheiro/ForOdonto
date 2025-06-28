import { DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { AppointmentAndService } from "./appointment-content";
import { format } from "date-fns";
import { FormatCurrency } from "@/utils/formatValue";

interface AppointmentProps {
    AppointmentAndService: AppointmentAndService | null
}

export function DialogAppointment({ AppointmentAndService }: AppointmentProps) {
    return (
        <DialogContent>
            <DialogHeader>
                <DialogTitle>Detalhes</DialogTitle>
                <DialogDescription>Detalhes dos seus agendamentos</DialogDescription>
            </DialogHeader>

            {AppointmentAndService && (
                <div className="flex flex-col gap-4">
                    <article className="flex flex-col gap-1">
                        <p><span className="font-semibold">Horarário:</span> {AppointmentAndService.appointmentTime}</p>
                        <p><span className="font-semibold">Data:</span> {format(AppointmentAndService.appointmentDate, "dd-MM-yyyy")}</p>

                        <p className="mt-2"><span className="font-semibold">Nome:</span> {AppointmentAndService?.name}</p>
                        <p className=""><span className="font-semibold">Telefone:</span> {AppointmentAndService?.phone}</p>
                        <p><span className="font-semibold">Email:</span> {AppointmentAndService?.email}</p>



                    </article>

                    <div className="bg-slate-200 p-2 rounded-md">
                        <p><span className="font-semibold">Serviço:</span> {AppointmentAndService?.service.name}</p>
                        <p><span className="font-semibold">Preço:</span> {FormatCurrency((AppointmentAndService?.service.price / 100))}</p>

                    </div>
                </div>
            )}
        </DialogContent>
    )
}