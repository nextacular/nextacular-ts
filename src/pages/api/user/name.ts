import {
  validateUpdateName,
  validateSession,
} from '@/config/api-validation/index';
import { ExtendedSession } from '@/lib/common';
import { updateName } from '@/prisma/services/user';
import { NextApiRequest, NextApiResponse } from 'next';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;

  if (method === 'PUT') {
    const session = await validateSession(req, res) as ExtendedSession;
    await validateUpdateName(req, res);
    const { name } = req.body;
    await updateName(session.user.userId, name);
    res.status(200).json({ data: { name } });
  } else {
    res
      .status(405)
      .json({ errors: { error: { msg: `${method} method unsupported` } } });
  }
};

export default handler;
