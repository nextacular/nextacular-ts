import { html, text } from '@/config/email-templates/email-update';
import { sendMail } from '@/lib/server/mail';
import prisma from '@/prisma/index';

export const deactivate = async (id: string) =>
  await prisma.user.update({
    data: { deletedAt: new Date() },
    where: { id },
  });

export const getUser = async (id: string) =>
  await prisma.user.findUnique({
    select: {
      email: true,
      name: true,
      userCode: true,
    },
    where: { id },
  });

export const updateEmail = async (
  id: string,
  email: string,
  previousEmail: string
) => {
  await prisma.user.update({
    data: {
      email,
      emailVerified: null,
    },
    where: { id },
  });
  await sendMail({
    from: process.env.EMAIL_FROM,
    html: html({ email }),
    subject: `[Nextacular] Email address updated`,
    text: text({ email }),
    to: [email, previousEmail],
  });
};

export const updateName = async (id: string, name: string) =>
  await prisma.user.update({
    data: { name },
    where: { id },
  });
