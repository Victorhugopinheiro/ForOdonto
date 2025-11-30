



export function isToday(selectedDate: Date | undefined) {

    const actualDate = new Date()

    if(selectedDate === undefined){
        return
    }

    return (
        selectedDate.getFullYear() === actualDate.getFullYear() &&
        selectedDate.getMonth() === actualDate.getMonth() 

    )

}

export function isPastTime(time: string, date:Date | undefined) {
    const [selectedHour, selectedMinute] = time.split(":").map(Number)

    const actualDate = new Date()

    const actualHour = actualDate.getHours()
    const actualMinute = actualDate.getMinutes()


    if (actualDate.getDate() === date?.getDate() && selectedHour < actualHour) {
        return true
    }
    else if (actualDate.getDate() === date?.getDate() && selectedHour === actualHour && selectedMinute <= actualMinute) {
        return true
    }


    return false
}



export function SlotSequence(
    allSlots: string[],
    slotSelected: string,
    blockedSlots: string[],
    requiredSlots: number
) {
    


    const inicialSlot:number = allSlots.indexOf(slotSelected)

    const totalSlots = Number(inicialSlot + requiredSlots)

    if (inicialSlot === -1 ||  totalSlots > allSlots.length) {
        return false
    }

    for(let q = inicialSlot; q < totalSlots; q++ ){
        const actualSlot = allSlots[q] 
        if(blockedSlots.includes(actualSlot)){
            return false
        }
    }

    return true


}