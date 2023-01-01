import { validateSession } from '@/config/api-validation';
import { ExtendedSession } from '@/lib/common';
import stripe from '@/lib/server/stripe';
import { getPayment } from '@/prisma/services/customer';
import { NextApiRequest, NextApiResponse } from 'next';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;

  if (method === 'POST') {
    const session = await validateSession(req, res) as ExtendedSession;
    const { priceId } = req.query;
    const [customerPayment, price] = await Promise.all([
      getPayment(session.user.email!),
      stripe.prices.retrieve(priceId as string),
    ]);
    const product = await stripe.products.retrieve(price.product as string);
    const lineItems = [
      {
        price: price.id,
        quantity: 1,
      },
    ];
    const paymentSession = await stripe.checkout.sessions.create({
      customer: customerPayment?.paymentId,
      mode: 'subscription',
      payment_method_types: ['card'],
      line_items: lineItems,
      success_url: `${process.env.APP_URL}/account/payment?status=success`,
      cancel_url: `${process.env.APP_URL}/account/payment?status=cancelled`,
      metadata: {
        customerId: customerPayment?.customerId || null,
        type: product.metadata.type,
      },
    });
    res.status(200).json({ data: { sessionId: paymentSession.id } });
  } else {
    res
      .status(405)
      .json({ errors: { error: { msg: `${method} method unsupported` } } });
  }
};

export default handler;
