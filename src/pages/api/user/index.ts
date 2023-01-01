import { validateSession } from '@/config/api-validation';
import { ExtendedSession } from '@/lib/common';
import { deactivate } from '@/prisma/services/user';
import { NextApiRequest, NextApiResponse } from 'next';

const ALLOW_DEACTIVATION = false;

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;

  if (method === 'DELETE') {
    const session = await validateSession(req, res) as ExtendedSession;

    if (ALLOW_DEACTIVATION) {
      await deactivate(session?.user?.userId);
    }
    res.status(200).json({ data: { email: session.user.email } });
  } else {
    res
      .status(405)
      .json({ errors: { error: { msg: `${method} method unsupported` } } });
  }
};

export default handler;
