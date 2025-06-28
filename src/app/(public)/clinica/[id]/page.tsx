import { redirect } from "next/navigation"
import { FindClinic } from "../data-access/find-clinic"
import { ContentClinic } from "./_component/ContentClinic"



export default async function Clinic({params}:{params:Promise<{id:string}>}){

    const {id} = await params

    const response = await FindClinic(id)

    if(!response){
        redirect("/")
    }

    return(
        <div>
            <ContentClinic clinic={response}/>
        </div>
    )
}