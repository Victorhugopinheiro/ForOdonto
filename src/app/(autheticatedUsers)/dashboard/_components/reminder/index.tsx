import { GetReminders } from "../../data_acess/get-reminders";
import { Remindercontent } from "./reminder-list"

interface UserProps {
    userId: string | undefined
}


export async function ReminderComponent({ userId }: UserProps) {

    const response = await GetReminders(userId)

    if (response.error) {
        return
    }

    

    console.log("Lembretes encontrados", response.data)




    return (

        <>
           
           <Remindercontent reminder={response.data}/>
        </>

    )


}