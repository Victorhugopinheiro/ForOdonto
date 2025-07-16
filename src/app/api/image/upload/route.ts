
import { NextResponse } from "next/server";
import { v2 as cloudinary } from 'cloudinary'


cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET,
});

export async function POST(request: Request) {
    const formData = await request.formData();
    const file = formData.get("file") as File;
    const userId = formData.get("userId") as string;

    if (!file) {
        return new Response("No file uploaded", { status: 400 });
    }

    const byteArrayBuffer = await file.arrayBuffer();
    const buffer = new Uint8Array(byteArrayBuffer);

    if (userId === '' || userId === null) {
        return new Response("User ID is required", { status: 401 });
    }

    if (file.type !== "image/jpeg" && file.type !== "image/png") {
        return new Response("Only JPEG or PNG images are allowed", { status: 400 });
    }



    const result = await new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream({
            tags: [`${userId}`],
            public_id: file.name,
        },(error, uploadResult) => {
            if (error) {
                reject(error);
                return
            }

            resolve(uploadResult);
        }).end(buffer);
    });

   

    // Here you would typically handle the file upload, e.g., save it to a database or cloud storage
    // For demonstration, we will just return the file name and size

    return NextResponse.json(buffer)
}           