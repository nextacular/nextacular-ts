import { loadStripe } from '@stripe/stripe-js';

export const redirectToCheckout = async (sessionId: string) => {
  const clientStripe = await loadStripe(
    process.env.NEXT_PUBLIC_PUBLISHABLE_KEY as string
  );
  await clientStripe?.redirectToCheckout({ sessionId });
};
