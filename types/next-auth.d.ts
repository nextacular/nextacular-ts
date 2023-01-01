import { SubscriptionType } from "@prisma/client"
import NextAuth, { DefaultSession, DefaultUser } from "next-auth"

declare module "next-auth" {
    interface Session {
        user: {
            userId: string,
            subscription?: SubscriptionType
        } & DefaultUser['user'],
    }
}