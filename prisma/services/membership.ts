import { InvitationStatus, TeamRole } from '@prisma/client';

import prisma from '@/prisma/index';

export const getMember = async (id: string) =>
  await prisma.member.findFirst({
    select: { teamRole: true },
    where: { id },
  });

export const getMembers = async (slug: string) =>
  await prisma.member.findMany({
    select: {
      id: true,
      email: true,
      status: true,
      teamRole: true,
      member: { select: { name: true } },
    },
    where: {
      deletedAt: null,
      workspace: {
        deletedAt: null,
        slug,
      },
    },
  });

export const getPendingInvitations = async (email: string) =>
  await prisma.member.findMany({
    select: {
      id: true,
      email: true,
      joinedAt: true,
      status: true,
      teamRole: true,
      invitedBy: {
        select: {
          email: true,
          name: true,
        },
      },
      workspace: {
        select: {
          createdAt: true,
          inviteCode: true,
          name: true,
          slug: true,
          workspaceCode: true,
          creator: {
            select: {
              email: true,
              name: true,
            },
          },
        },
      },
    },
    where: {
      deletedAt: null,
      email,
      status: InvitationStatus.PENDING,
      workspace: { deletedAt: null },
    },
  });

export const remove = async (id: string) =>
  await prisma.member.update({
    data: { deletedAt: new Date() },
    where: { id },
  });

export const toggleRole = async (id: string, teamRole: TeamRole) =>
  await prisma.member.update({
    data: { teamRole },
    where: { id },
  });

export const updateStatus = async (id: string, status: InvitationStatus) =>
  await prisma.member.update({
    data: { status },
    where: { id },
  });
