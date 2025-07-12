"use client"

import Link from "next/link";



export function ShowLimitPlan({ expired }: { expired: boolean }) {
    return (
        <div className="flex flex-col justify-center gap-2 bg-red-400 text-white p-4 rounded-md shadow-md my-2 md:items-center ">
            <h1 className="text-2xl font-bold text-gray-100">Limite de serviços atingido</h1>
            <div className="flex flex-col md:items-center   ">
                <p className="text-gray-100">
                    {expired ? "Seu plano está inativo, por favor, renove para continuar usando nossos serviços." :
                        "Você atingiu o limite de serviços do seu plano. Por favor, atualize seu plano para continuar usando nossos serviços."}
                </p>

                <Link className="bg-black rounded-md  text-white w-fit 
                py-1 px-2 my-2" href={"/dashboard/plans"}>Acessar planos</Link>
            </div>
        </div>
    );

}