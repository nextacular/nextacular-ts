import initStripe from 'stripe';

const stripe = new initStripe(process.env.PAYMENTS_SECRET_KEY as string, {
  apiVersion: "2020-08-27",
  typescript: true,
});

export const createCustomer = async (email: string) =>
  await stripe.customers.create({
    email,
  });

export const getInvoices = async (customer: string) => {
  const invoices = await stripe.invoices.list({ customer });
  return invoices?.data;
};

export const getProducts = async () => {
  const [products, prices] = await Promise.all([
    stripe.products.list(),
    stripe.prices.list(),
  ]);
  const productPrices: any = {};
  prices?.data.map((price: any) => (productPrices[price.product] = price));
  products?.data.map((product: any) => (product.prices = productPrices[product.id]));
  return products?.data.reverse();
};

export default stripe;
