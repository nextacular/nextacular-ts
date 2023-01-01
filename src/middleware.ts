import { NextRequest, NextResponse } from 'next/server';

const APP_URL = String(process.env.APP_URL);

const middleware = (req: NextRequest) => {
  const { host } = new URL(APP_URL);
  const url = req.nextUrl.clone();
  const { pathname } = req.nextUrl;
  const hostname = req.headers.get('host');
  const currentHost = hostname?.replace(`.${host}`, '');
  if (pathname.startsWith(`/_sites`)) {
    return new Response(null, { status: 404 });
  }

  if (!pathname.includes('.') && !pathname.startsWith('/api')) {
    if (hostname === host) {
      url.pathname = `${pathname}`;
    } else {
      url.pathname = `/_sites/${currentHost}${pathname}`;
    }

    return NextResponse.rewrite(url);
  }
};

export default middleware;
