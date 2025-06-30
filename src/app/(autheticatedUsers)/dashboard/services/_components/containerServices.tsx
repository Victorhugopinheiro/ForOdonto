
import { GetAllServices } from "../_data-access/get-all-services"
import { ContentService } from "./contentService"


interface UserSessionProps {
    userId: string
}

export async function ContainerServices({ userId }: UserSessionProps) {


    const delay = (ms: number): Promise<void> => {

        return new Promise((resolve) => {
            setTimeout(resolve, ms)
        })

    }   

    await delay(5000)

    const response = await GetAllServices({ user_id: userId })



    return (
        <div>
            <ContentService service={response.data || []} />
        </div>
    )
}