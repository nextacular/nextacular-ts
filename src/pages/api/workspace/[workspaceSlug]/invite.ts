import {
  validateWorkspaceInvite,
  validateSession,
} from '@/config/api-validation/index';
import { inviteUsers } from '@/prisma/services/workspace';
import { NextApiRequest, NextApiResponse } from 'next';
import { Session } from 'next-auth';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;

  if (method === 'POST') {
    const session = await validateSession(req, res) as Session;
    const workspaceSlug = req.query.workspaceSlug as string;
    await validateWorkspaceInvite(req, res);
    const { members } = req.body;
    await inviteUsers(
      session.user.userId,
      session.user.email,
      members,
      workspaceSlug
    )
      .then((members) => res.status(200).json({ data: { members } }))
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
