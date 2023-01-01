import { getDomains } from '@/prisma/services/domain';
import { validateSession } from '@/config/api-validation';
import { NextApiRequest, NextApiResponse } from 'next';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;

  if (method === 'GET') {
    await validateSession(req, res);
    const workspaceSlug = req.query.workspaceSlug as string;
    const domains = await getDomains(workspaceSlug);
    res.status(200).json({ data: { domains } });
  } else {
    res.status(405).json({ error: `${method} method unsupported` });
  }
};

export default handler;
