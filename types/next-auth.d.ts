import { DefaultSession } from "next-auth";

declare module 'next-auth'{
    interface Session{
        user: User & DefaultSession["user"]
    }
}


interface User{
    address?:string,
    phone?:string,
    status: boolean
    timeZone: null | string
    times: string[],
    stripe_customer_id?:string | null
    createdAt: string
    updatedAt:string
}