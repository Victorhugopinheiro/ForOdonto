'use client'

import Image from "next/image";
import { useState } from "react";
import fixImage from '../../../../../../public/foto1.png'
import { Upload } from "lucide-react";

interface ChangeImageProps {
    userImage?:string;
    userId:string;
}

export function ChangeImage({userId, userImage}:ChangeImageProps){

    const [previewImage, setPreviewImage] = useState(userImage)

    return(
      


            <div className="relative w-40 h-40 md:w-48 md:h-48">

                <div className="w-full h-full flex justify-center items-center">
                    <span className="absolute z-[2] bg-slate-50/80 p-2 cursor-pointer shadow-xl rounded-full ">
                        <Upload size={16} color="#131313" className="z-20" />
                    </span>

                    <input className="opacity-0 cursor-pointer relative z-20 w-48 h-48" type="file"/>
                </div>
                

                {userImage ? (
                    <Image src={previewImage} alt="User Image"  fill quality={100} priority className="rounded-full w-full h-48 object-cover" />
                        
                 
                ): <Image src={fixImage} alt="User Image"  fill quality={100} priority className="rounded-full w-full h-48 object-cover" />}
            </div>
     
    )


}