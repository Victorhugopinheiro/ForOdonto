import { Button } from "@/components/ui/button";
import { TimeSlot } from "./ContentClinic";
import clsx from "clsx";
import { cn } from "@/lib/utils";
import { isPastTime, isToday, SlotSequence } from "./utills-timers";


interface TimersProps {
    selectedTime: string,
    blockedTimes: string[] | []
    availableTimeSlots: TimeSlot[],
    refreshSelectedTimer: (time: string) => void;
    grabHowManySlots: number,
    clinicTimers: string[],
    selectedDate: Date | undefined
   

}

export function ContentTimers({
    availableTimeSlots,
    blockedTimes,
    grabHowManySlots,
    refreshSelectedTimer,
    selectedTime,
    clinicTimers,
    selectedDate,
 
}: TimersProps) {



    const dateIsToday = isToday(selectedDate)

   




    return (
        <>
            <div className="grid grid-cols-3 gap-3 md:grid-cols-5">
                {availableTimeSlots.map((times, index) => {


                    const sequenceOk = SlotSequence(clinicTimers, times.time, blockedTimes, grabHowManySlots)

                    const validaTionPastTimes = isPastTime(times.time, selectedDate)

                    const validationsAvaliableDate = dateIsToday && !validaTionPastTimes



                    const correctSequency = validationsAvaliableDate && sequenceOk && times.available


                    return (
                        <Button
                            key={index}
                            onClick={() => refreshSelectedTimer(times.time)}
                            variant={"outline"}
                            type="button"
                            disabled={!correctSequency}
                            className={cn("",
                                times.time === selectedTime && "border border-emerald-500 text-primary",





                            )}>{times.time}</Button>
                    )
                })}

            </div>
        </>
    )
}