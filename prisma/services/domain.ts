import { Domain, Workspace } from '@prisma/client';

import prisma from '@/prisma/index';

export const createDomain = async (
  id: string,
  email: string,
  slug: string,
  name: string,
  apexName: string,
  verified: boolean,
  verificationData: Array<{ domain: string; value: string }> | []
) => {
  let subdomain = null;
  let verificationValue = null;

  if (!verified) {
    const { domain, value } = verificationData[0];
    subdomain = domain.replace(`.${apexName}`, '');
    verificationValue = value;
  }

  const workspace: Workspace | null = await prisma.workspace.findFirst({
    where: {
      OR: [
        { id },
        {
          members: {
            some: {
              email,
              deletedAt: null,
            },
          },
        },
      ],
      AND: {
        deletedAt: null,
        slug,
      },
    },
  });

  if (workspace) {
    await prisma.domain.create({
      data: {
        addedById: id,
        name,
        subdomain,
        value: verificationValue,
        verified,
        workspaceId: workspace.id,
      },
    });
  }
};

export const deleteDomain = async (
  id: string,
  email: string,
  slug: string,
  name: string
) => {
  const workspace: Workspace | null = await prisma.workspace.findFirst({
    where: {
      OR: [
        { id },
        {
          members: {
            some: {
              email,
              deletedAt: null,
            },
          },
        },
      ],
      AND: {
        deletedAt: null,
        slug,
      },
    },
  });

  if (workspace) {
    const domain: Domain | null = await prisma.domain.findFirst({
      where: {
        deletedAt: null,
        name,
        workspaceId: workspace.id,
      },
    });

    if (domain) {
      await prisma.domain.update({
        data: { deletedAt: new Date() },
        where: { id: domain.id },
      });
    }
  }
};

export const getDomains = async (slug: string) =>
  await prisma.domain.findMany({
    select: {
      name: true,
      subdomain: true,
      verified: true,
      value: true,
    },
    where: {
      deletedAt: null,
      workspace: {
        deletedAt: null,
        slug,
      },
    },
  });

export const verifyDomain = async (
  id: string,
  email: string,
  slug: string,
  name: string,
  verified: boolean
) => {
  const workspace: Workspace | null = await prisma.workspace.findFirst({
    where: {
      OR: [
        { id },
        {
          members: {
            some: {
              email,
              deletedAt: null,
            },
          },
        },
      ],
      AND: {
        deletedAt: null,
        slug,
      },
    },
  });

  if (workspace) {
    const domain: Domain | null = await prisma.domain.findFirst({
      where: {
        deletedAt: null,
        name,
        workspaceId: workspace.id,
      },
    });

    if (domain) {
      await prisma.domain.update({
        data: { verified },
        where: { id: domain.id },
      });
    }
  }
};
