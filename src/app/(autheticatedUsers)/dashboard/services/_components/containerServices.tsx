
import { GetAllServices } from "../_data-access/get-all-services"
import { ContentService } from "./contentService"


interface UserSessionProps{
    userId:string
}

export async function ContainerServices({userId}:UserSessionProps){

    const response = await GetAllServices({user_id:userId})

   

    return(
        <div>
            <ContentService service={response.data || []}/>
        </div>
    )
}