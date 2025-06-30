import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";



export async function GET(req: NextRequest, res: NextResponse) {

    const { searchParams } = req.nextUrl

    const userId = searchParams.get("userId")
    const date = searchParams.get("date")


    if (!userId || !date) {
        return NextResponse.json({
            erro: "Usuário não encontrado"
        }, { status: 400 })
    }


    try {
        //Converte a data recebida em um objeto date
        const [year, month, day] = date.split("-").map(Number)
        const startDate = new Date(Date.UTC(year, month - 1, day, 0, 0, 0))
        const endDate = new Date(Date.UTC(year, month - 1, day, 23, 59, 59, 999))





        console.log("start date:", startDate)
        console.log("end date:", endDate)


        if (!userId) {
            return NextResponse.json({
                erro: "Nenhum agendamento encontrado!"
            }, { status: 400 })
        }


        const user = await prisma.user.findFirst({
            where: {
                id: userId
            }
        })


        if (!user) {
            return NextResponse.json({
                erro: "Nenhum agendamento encontrado!"
            }, { status: 400 })
        }


        const appointment = await prisma.appointment.findMany({
            where: {
                userId: userId,
                appointmentDate: {
                    gte: startDate,
                    lte: endDate
                },

            },
            include: {
                service: true
            }
        })

        // Montar com todos os (slots) ocupados
        const blockedSlots = new Set<string>()


        for (const apt of appointment) {
            const requiredSlots = Math.ceil(apt.service.duration / 30)
            const findTimeBlocked = user.times.indexOf(apt.appointmentTime)
            if (findTimeBlocked !== -1) {
                for (let i = 0; i < requiredSlots; i++) {
                    const blockedtSlot = user.times[findTimeBlocked + i]
                    if (blockedtSlot) {
                        blockedSlots.add(blockedtSlot)

                    }
                }

            }

        }


        const blockedTimes = Array.from(blockedSlots)


        console.log("blockedtimes: ", blockedTimes)

        return NextResponse.json(blockedTimes)


        return NextResponse.json({ message: "ok" })

    } catch (err) {

        return NextResponse.json({
            erro: "Usuário não encontradoo"
        }, { status: 400 })

    }




    return NextResponse.json({ ok: true })

}