import { TeamRole } from '@prisma/client';

import { validateSession } from '@/config/api-validation';
import { getMember, toggleRole } from '@/prisma/services/membership';
import { NextApiRequest, NextApiResponse } from 'next';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;

  if (method === 'PUT') {
    await validateSession(req, res);
    const { memberId } = req.body;
    const member = await getMember(memberId);
    //TODO: Revisit
    await toggleRole(
      memberId,
      member?.teamRole === TeamRole.MEMBER ? TeamRole.OWNER : TeamRole.MEMBER
    );
    res.status(200).json({ data: { updatedAt: new Date() } });
  } else {
    res
      .status(405)
      .json({ errors: { error: { msg: `${method} method unsupported` } } });
  }
};

export default handler;
