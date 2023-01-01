import { validateSession } from '@/config/api-validation';
import { getWorkspaces } from '@/prisma/services/workspace';
import { NextApiRequest, NextApiResponse } from 'next';
import { Session } from 'next-auth';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;

  if (method === 'GET') {
    const session = await validateSession(req, res) as Session;
    const workspaces = await getWorkspaces(
      session.user.userId,
      session.user.email
    );
    res.status(200).json({ data: { workspaces } });
  } else {
    res.status(405).json({ error: `${method} method unsupported` });
  }
};

export default handler;
