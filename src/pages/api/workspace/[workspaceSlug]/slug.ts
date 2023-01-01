import {
  validateUpdateWorkspaceSlug,
  validateSession,
} from '@/config/api-validation/index';
import { updateSlug } from '@/prisma/services/workspace';
import { NextApiRequest, NextApiResponse } from 'next';
import { Session } from 'next-auth';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;

  if (method === 'PUT') {
    const session = await validateSession(req, res) as Session;
    let { slug } = req.body;
    const workspaceSlug = req.query.workspaceSlug as string;
    await validateUpdateWorkspaceSlug(req, res);
    updateSlug(
      session.user.userId,
      session.user.email,
      slug,
      workspaceSlug
    )
      .then((slug) => res.status(200).json({ data: { slug } }))
      .catch((error) =>
        res.status(404).json({ errors: { error: { msg: error.message } } })
      );
  } else {
    res
      .status(405)
      .json({ errors: { error: { msg: `${method} method unsupported` } } });
  }
};

export default handler;
