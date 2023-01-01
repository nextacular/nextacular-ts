import { useEffect, useState } from 'react';
import Link from 'next/link';
import { getProviders, signIn, useSession } from 'next-auth/react';
import toast from 'react-hot-toast';
import isEmail from 'validator/lib/isEmail';

import Meta from '@/components/Meta/index';
import { AuthLayout } from '@/layouts/index';

const Login = () => {
  const { status } = useSession();
  const [email, setEmail] = useState('');
  const [isSubmitting, setSubmittingState] = useState(false);
  const [socialProviders, setSocialProviders] = useState<any>();
  const validate = isEmail(email);

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setEmail(event.target.value);

  const signInWithEmail = async (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    setSubmittingState(true);
    const response = await signIn('email', { email, redirect: false });

    if (response?.error === null) {
      toast.success(`Please check your email (${email}) for the login link.`, {
        duration: 5000,
      });
      setEmail('');
    }

    setSubmittingState(false);
  };

  const signInWithSocial = (socialId: string) => {
    signIn(socialId);
  };

  useEffect(() => {
    (async () => {
      const socialProviders = [];
      const { email, ...providers }: any = await getProviders();
      // FIXME: Property 'email' does not exist on type 'Record<LiteralUnion<BuiltInProviderType, string>, ClientSafeProvider> | null'

      for (const provider in providers) {
        socialProviders.push(providers[provider]);
      }

      setSocialProviders([...socialProviders]);
    })();
  }, []);

  return (
    <AuthLayout>
      <Meta
        title="NextJS SaaS Boilerplate | Login"
        description="A boilerplate for your NextJS SaaS projects."
      />
      <div className="flex flex-col items-center justify-center p-5 m-auto space-y-5 rounded shadow-lg md:p-10 md:w-1/3">
        <div>
          <Link href="/" className="text-4xl font-bold">
            Nextacular
          </Link>
        </div>
        <div className="text-center">
          <h1 className="text-2xl font-bold">Sign in with your email</h1>
          <h2 className="text-gray-600">
            We&apos;ll send a magic link to your inbox to confirm your email
            address and sign you in.
          </h2>
        </div>
        <form className="flex flex-col w-full space-y-3">
          <input
            className="px-3 py-2 border rounded"
            onChange={handleEmailChange}
            placeholder="user@email.com"
            type="email"
            value={email}
          />
          <button
            className="py-2 text-white bg-blue-600 rounded hover:bg-blue-500 disabled:opacity-75"
            disabled={status === 'loading' || !validate || isSubmitting}
            onClick={signInWithEmail}
          >
            {status === 'loading'
              ? 'Checking session...'
              : isSubmitting
              ? 'Sending the link...'
              : 'Send the Magic Link'}
          </button>
        </form>
        {socialProviders.length > 0 && (
          <>
            <span className="text-sm text-gray-400">or sign in with</span>
            <div className="flex flex-col w-full space-y-3">
              {socialProviders.map((provider: any, index: number) => (
                <button
                  key={index}
                  className="py-2 bg-gray-100 border rounded hover:bg-gray-50 disabled:opacity-75"
                  disabled={status === 'loading'}
                  onClick={() => signInWithSocial(provider.id)}
                >
                  {provider.name}
                </button>
              ))}
            </div>
          </>
        )}
      </div>
    </AuthLayout>
  );
};

export default Login;
