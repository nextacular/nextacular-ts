import { PrismaAdapter } from '@next-auth/prisma-adapter';
import NextAuth, { Session, User } from 'next-auth';
import EmailProvider from 'next-auth/providers/email';

import prisma from '@/prisma/index';
import { html, text } from '@/config/email-templates/signin';
import { emailConfig, sendMail } from '@/lib/server/mail';
import { createPaymentAccount, getPayment } from '@/prisma/services/customer';
import { log } from '@/lib/server/logsnag';

export default NextAuth({
  adapter: PrismaAdapter(prisma),
  callbacks: {
    session: async ({ session, user }: { session: Session, user: User }) => {
      if (session.user) {
        const customerPayment = await getPayment(user.email!);
        session.user.userId = user.id;

        if (customerPayment) {
          session.user.subscription = customerPayment.subscriptionType;
        }
      }

      return session;
    },
  },
  debug: !(process.env.NODE_ENV === 'production'),
  events: {
    signIn: async ({ user, isNewUser }) => {
      const customerPayment = await getPayment(user.email!);

      if (isNewUser || customerPayment === null || user.createdAt === null) {
        await Promise.all([
          createPaymentAccount(user.email!, user.id),
          log(
            'user-registration',
            'New User Signup',
            `A new user recently signed up. (${user.email})`
          ),
        ]);
      }
    },
  },
  providers: [
    EmailProvider({
      from: process.env.EMAIL_FROM,
      server: emailConfig,
      sendVerificationRequest: async ({ identifier: email, url }) => {
        const { host } = new URL(url);
        await sendMail({
          html: html({ email, url }),
          subject: `[Nextacular] Sign in to ${host}`,
          text: text({ email, url }),
          to: email,
        });
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET as string,
  // TODO: need to revisit
  // session: {
  //   jwt: true,
  // },
});
