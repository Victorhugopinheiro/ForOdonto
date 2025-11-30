"use server"

import { useSearchParams } from "next/navigation"
import { GetClinicTimers } from "../../data_acess/get-clinic-timers"
import { AppointmentContent } from "./appointment-content"

interface UserProps {
    userId: string | undefined
}

export async function Appointment({ userId }: UserProps) {


    const getTimers = await GetClinicTimers(userId)


    

    return (
        <>
            <AppointmentContent timers={getTimers.data?.times} />
        </>
    )
}