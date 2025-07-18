import { Star } from "lucide-react";



export function DestaquePlan() {
    return (
        <div className="bg-yellow-500 absolute top-2 right-2 w-10 h-10 z-10 
        rounded-lg shadow-md flex justify-center items-center">
            <Star color="white" size={24} />
        </div>
    );
}