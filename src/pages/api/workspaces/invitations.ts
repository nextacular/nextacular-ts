import { validateSession } from '@/config/api-validation';
import { getPendingInvitations } from '@/prisma/services/membership';
import { NextApiRequest, NextApiResponse } from 'next';
import { Session } from 'next-auth';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;

  if (method === 'GET') {
    const session = await validateSession(req, res) as Session;
    const invitations = await getPendingInvitations(session.user.email);
    res.status(200).json({ data: { invitations } });
  } else {
    res.status(405).json({ error: `${method} method unsupported` });
  }
};

export default handler;
