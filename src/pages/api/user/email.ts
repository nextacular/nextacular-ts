import {
  validateUpdateEmail,
  validateSession,
} from '@/config/api-validation/index';
import { ExtendedSession } from '@/lib/common';
import { updateEmail } from '@/prisma/services/user';
import { NextApiRequest, NextApiResponse } from 'next';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;

  if (method === 'PUT') {
    const session = await validateSession(req, res) as ExtendedSession;
    await validateUpdateEmail(req, res);
    const { email } = req.body;
    await updateEmail(session.user.userId, email, session.user.email!);
    res.status(200).json({ data: { email } });
  } else {
    res
      .status(405)
      .json({ errors: { error: { msg: `${method} method unsupported` } } });
  }
};

export default handler;
