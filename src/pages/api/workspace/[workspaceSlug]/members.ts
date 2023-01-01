import { getMembers } from '@/prisma/services/membership';
import { validateSession } from '@/config/api-validation';
import { NextApiRequest, NextApiResponse } from 'next';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;

  if (method === 'GET') {
    await validateSession(req, res);
    const workspaceSlug = req.query.workspaceSlug as string;
    const members = await getMembers(workspaceSlug);
    res.status(200).json({ data: { members } });
  } else {
    res
      .status(405)
      .json({ errors: { error: { msg: `${method} method unsupported` } } });
  }
};

export default handler;
