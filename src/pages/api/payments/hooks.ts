import { buffer } from 'micro';

import stripe from '@/lib/server/stripe';
import { updateSubscription } from '@/prisma/services/customer';
import prisma from '@/prisma/index';
import { NextApiRequest, NextApiResponse } from 'next';

export const config = { api: { bodyParser: false } };

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const reqBuffer = await buffer(req);
  const signature = req.headers['stripe-signature'] as string;
  let event: any = null;
  // FIXME: Need to apply type according to stripe event

  try {
    event = stripe.webhooks.constructEvent(
      reqBuffer,
      signature,
      process.env.PAYMENTS_SIGNING_SECRET as string
    );
  } catch (err: any) {
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (event) {
    const { metadata } = event.data.object;

    switch (event.type) {
      case 'charge.succeeded':
        if (metadata?.customerId && metadata?.type) {
          await updateSubscription(metadata.customerId, metadata.type);
        }
        break;
      default:
        res
          .status(400)
          .send(`Webhook Error: Unhandled event type ${event.type}`);
    }
  } else {
    return res.status(400).send(`Webhook Error: Event not created`);
  }

  await prisma.$disconnect();
  res.status(200).send({ received: true });
};

export default handler;
