"use client"
import { Button } from "@/components/ui/button";
import { Copy } from "lucide-react";
import { toast } from "sonner";


interface UserProps{
    userId:string | undefined
}

export function CopyPage({userId}:UserProps){

    function HandleCopyPage(){
        navigator.clipboard.writeText(`${process.env.NEXT_PUBLIC_URL}/clinica/${userId}`)

        toast.success("Link de compartilhamento copiado!")
    }

    return(
        <div>
            <Button onClick={HandleCopyPage}><Copy/></Button>
        </div>
    )

}