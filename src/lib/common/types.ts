import { SubscriptionType } from "@prisma/client";
import { DefaultSession, Session } from "next-auth";


export type ExtendedSession = Session & {
    user: {
        userId: string;
    };
    subscription: SubscriptionType;
}

// enum InvitationStatus {
//     ACCEPTED = "ACCEPTED",
//     PENDING = "PENDING",
//     DECLINED = "DECLINED"
// }

// enum TeamRole {
//     MEMBER = "MEMBER",
//     OWNER = "OWNER",
// }

// enum SubscriptionType {
//     FREE = "FREE",
//     STANDARD = "STANDARD",
//     PREMIUM = "PREMIUM",
// }


// export type Member = {
//     id: string;
//     workspaceId: string;
//     email: string;
//     inviter: string;
//     invitedAt?: Date
//     joinedAt?: Date
//     deletedAt?: Date
//     updatedAt?: Date

//     status: InvitationStatus;
//     teamRole: TeamRole;
//     member?: User;
//     invitedBy?: User;
//     workspace: Workspace;



// }
// export type Session = {
//     id: string;
//     sessionToken: string;
//     userId: string;
//     expires: Date;

//     user: User;
// }


// export type Account = {
//     id: string;
//     userId: string;
//     type: string;
//     provider: string;
//     providerAccountId: string;
//     refresh_token?: string;
//     access_token?: string;
//     expires_at?: number;
//     token_type?: string;
//     scope?: string;
//     id_token?: string;
//     session_state?: string;
//     oauth_token_secret?: string;
//     oauth_token?: string;

//     user: User;
// }

// export type User = {
//     id: string;
//     userCode: string;
//     name?: string;
//     email?: string;
//     emailVerified?: Date;
//     image?: string;
//     createdAt?: Date;
//     deletedAt?: Date;
//     updatedAt?: Date;

//     accounts: Account[];
//     sessions: Session[];
//     membership: Member[];
//     invitedMembers: Member[];
//     createdWorkspace: Workspace[];
//     customerPayment?: CustomerPayment;
//     domains: Domain[];
// }

// export type Workspace = {
//     id: string;
//     workspaceCode: string;
//     inviteCode: string;
//     creatorId: string;
//     name: string;
//     slug: string;
//     createdAt: Date;
//     deletedAt?: Date;
//     updatedAt?: Date;

//     creator: User;
//     members: Member[];
//     domains: Domain[];
// }

// export type CustomerPayment = {
//     id: string;
//     paymentId: string;
//     customerId: string;
//     email?: string;
//     subscriptionType: SubscriptionType;
//     createdAt?: Date;
//     deletedAt?: Date;
//     updatedAt?: Date;

//     customer: User;


// }

// export type Domain = {
//     id: String;
//     workspaceId: String;
//     addedById: String;
//     name: String;
//     subdomain?: String;
//     verified?: Boolean;
//     value?: String;
//     createdAt?: Date;
//     deletedAt?: Date;
//     updatedAt?: Date;

//     addedBy: User;
//     workspace: Workspace;
// }