"use client"

import { format } from "date-fns"
import { useRouter } from "next/navigation"
import { useState } from "react"

export function DatePicker() {

    const router = useRouter()

   

    function changeDate(e: React.ChangeEvent<HTMLInputElement>) {
       
        setSelectedDate(e.target.value)

        const url = new URL(window.location.href)

        url.searchParams.set("date", e.target.value)


        router.push(url.toString())
    }

     const [selectedDate, setSelectedDate] = useState(format(new Date(), "yyyy-MM-dd"))

    return (
        <input
            onChange={changeDate}
            type="date"
            className="px-2 py-1 rounded-md text-sm md:text-base"
            value={selectedDate}
        />
    )
}