import React from 'react';
import { ExternalLinkIcon } from '@heroicons/react/outline';
import DefaultErrorPage from 'next/error';
import Link from 'next/link';
import { useRouter } from 'next/router';

import Meta from '@/components/Meta';
import {
  getSiteWorkspace,
  getWorkspacePaths,
} from '@/prisma/services/workspace';
import { Workspace } from '@prisma/client';
import { GetStaticPaths, GetStaticProps } from 'next';
import type { ParsedUrlQuery } from 'querystring';

interface PathProps extends ParsedUrlQuery {
  site: string;
}

interface IndexProps {
  workspace: any;
}

const Site: React.FC<{ workspace: Workspace }> = ({ workspace }) => {
  const router = useRouter();

  if (router.isFallback) {
    return <h1>Loading...</h1>;
  }

  return workspace ? (
    <main className="relative flex flex-col items-center justify-center h-screen space-y-10 text-gray-800 bg-gray-50">
      <Meta title={workspace.name} />
      <div className="flex flex-col items-center justify-center p-10 space-y-5 text-center ">
        <h1 className="text-4xl font-bold">
          Welcome to your workspace & apos;s subdomain!
        </h1>
        <h2 className="text-2xl">
          This is the workspace of <strong> {workspace.name}.</strong>
        </h2>
        <p> You can also visit these links: </p>
        <Link
          href={`https://${workspace.hostname}`}
          className="flex space-x-3 text-blue-600 hover:underline"
          target="_blank"
        >
          <span>{`${workspace.hostname}`}</span>
          <ExternalLinkIcon className="w-5 h-5" />
        </Link>
        {workspace.domains.map((domain, index) => (
          <Link
            key={index}
            href={`https://${domain.name}`}
            className="flex space-x-3 text-blue-600 hover:underline"
            target="_blank"
          >
            <span>{domain.name} </span>
            <ExternalLinkIcon className="w-5 h-5" />
          </Link>
        ))}
      </div>
    </main>
  ) : (
    <>
      <Meta noIndex />
      <DefaultErrorPage statusCode={404} />
    </>
  );
};

export const getStaticPaths: GetStaticPaths<PathProps> = async () => {
  const paths = await getWorkspacePaths();
  return {
    paths,
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps<IndexProps, PathProps> = async ({
  params,
}) => {
  if (!params) throw new Error('No path parameters found');

  const { site } = params;
  const siteWorkspace = await getSiteWorkspace(site, site.includes('.'));
  // FIXME: Need to check why boolean param is passed to getSiteWorkspace
  let workspace = null;

  if (siteWorkspace) {
    const { host } = new URL(process.env.APP_URL as string);
    workspace = {
      domains: siteWorkspace.domains,
      name: siteWorkspace.name,
      hostname: `${siteWorkspace.slug}.${host}`,
    };
  }

  return {
    props: { workspace },
    revalidate: 10,
  };
};

export default Site;
