import { validateSession } from '@/config/api-validation';
import { remove } from '@/prisma/services/membership';
import { NextApiRequest, NextApiResponse } from 'next';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;

  if (method === 'DELETE') {
    await validateSession(req, res);
    const { memberId } = req.body;
    await remove(memberId);
    res.status(200).json({ data: { deletedAt: new Date() } });
  } else {
    res
      .status(405)
      .json({ errors: { error: { msg: `${method} method unsupported` } } });
  }
};

export default handler;
