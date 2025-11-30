
import { auth } from "@/lib/auth"
import prisma from "@/lib/prisma"
import { NextResponse } from "next/server"



export const GET = auth(async function GET(request) {
    if (!request.auth) {
        return NextResponse.json({ erro: "Acesso não autorizado" }, { status: 401 })
    }

    const seacrchParams = request.nextUrl.searchParams
    const date = seacrchParams.get("date")
    const clinicId = request.auth?.user?.id

    if (!date) {
        return NextResponse.json({ erro: "Data não informada" }, { status: 400 })
    }

    if (!clinicId) {
        return NextResponse.json({ erro: "Usuário não encontrado" }, { status: 400 })
    }


    try {

        const [year, month, day] = date.split("-").map(Number)

        const startDate = new Date(Date.UTC(year, month -1, day, 0, 0, 0, 0))
        const endDate = new Date(Date.UTC(year, month -1, day, 23, 59, 59, 999))

       
        const appointmets = await prisma.appointment.findMany({
            where: {
                userId: clinicId,
                appointmentDate: {
                    gte: startDate,
                    lte: endDate
                }
            },
            include:{
                service:true
            }
        })

        return NextResponse.json(appointmets)

    } catch (err) {
        return NextResponse.json({ erro: "Erro de requisição" }, { status: 400 })
    }

}) as any;