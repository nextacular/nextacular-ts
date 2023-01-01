import slugify from 'slugify';

import {
  validateCreateWorkspace,
  validateSession,
} from '@/config/api-validation/index';
import { createWorkspace } from '@/prisma/services/workspace';
import { NextApiRequest, NextApiResponse } from 'next';
import { Session } from 'next-auth';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;

  if (method === 'POST') {
    const session = await validateSession(req, res) as Session;
    await validateCreateWorkspace(req, res);
    const { name } = req.body;
    let slug = slugify(name.toLowerCase());
    await createWorkspace(session.user.userId, session.user.email, name, slug);
    res.status(200).json({ data: { name, slug } });
  } else {
    res
      .status(405)
      .json({ errors: { error: { msg: `${method} method unsupported` } } });
  }
};

export default handler;
