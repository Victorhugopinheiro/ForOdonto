'use client'

import Image from "next/image";
import { useState } from "react";
import fixImage from '../../../../../../public/foto1.png'
import { Loader, Upload } from "lucide-react";
import { toast } from "sonner";
import { ChangeAvatarClinic } from "../_actions/change-avatar-clinic";
import { useSession } from "next-auth/react";

interface ChangeImageProps {
    userImage?: string | null;
    userId: string;
}

export function ChangeImage({ userId, userImage }: ChangeImageProps) {

    const {update} = useSession()

    const [previewImage, setPreviewImage] = useState(userImage)
    const [loading, setLoading] = useState(false);

    async function changeImage(event: React.ChangeEvent<HTMLInputElement>) {

        setLoading(true);

        if (event.target.files && event.target.files[0]) {
            const file = event.target.files?.[0];

            if (file?.type !== "image/jpeg" && file?.type !== "image/png") {
                toast.error("Apenas imagens JPEG ou PNG são permitidas.");
                return;
            }

            const newFilename = `${userId}`;
            const newFile = new File([file], newFilename, { type: file.type });

            const fileUrl = await uploadImage(newFile);

       

            if (!fileUrl || fileUrl === '') {

                toast.error("Erro ao enviar a imagem.");

            }

            

            setPreviewImage(URL.createObjectURL(newFile));

            await ChangeAvatarClinic({imageUrl:fileUrl!})


            update({Image: fileUrl})

            

            toast.success("Imagem alterada com sucesso!");




        }


        setLoading(false);
        return


    }

    async function uploadImage(file: File) {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("userId", userId);

        const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/image/upload`, {
            method: "POST",
            body: formData,
        });

        if (!response.ok) {
            toast.error("Erro ao enviar a imagem.");
            return;
        }

        const data = await response.json();


       
        return data.secure_url as string


    }

    return (



        <div className="relative w-40 h-40 md:w-48 md:h-48">

            <div className="w-full h-full flex justify-center items-center">
                <span className="absolute z-[2] bg-slate-50/80 p-2 cursor-pointer shadow-xl rounded-full ">
                    {loading ? (
                        <span className="animate-spin"><Loader className="animate-spin" /></span>
                    ) : (
                        <Upload size={16} color="#131313" className="z-20" />
                    )}
                </span>

                <input onChange={changeImage} className="opacity-0 cursor-pointer relative z-20 w-48 h-48" type="file" />
            </div>


            {userImage ? (
                <Image src={previewImage!} alt="User Image" fill quality={100} priority className="rounded-full w-full h-48 object-cover" />


            ) : <Image src={fixImage} alt="User Image" fill quality={100} priority className="rounded-full w-full h-48 object-cover" />}
        </div>

    )


}