import { BasicLayout, Seo } from '@components';
import React from 'react';


type CodeProps = {
  children: React.ReactNode;
};

const Code = ({ children }: CodeProps): React.ReactElement => (
  <code className="text-[#be00ff] text-base whitespace-pre-wrap before:content-['`'] after:content-['`']">
    {children}
  </code>
);

const DevelopmentPage = (): React.ReactElement => {
  // The following console.log statements will only be executed on Node.js.
  // Check the terminal to see the environment variables.
  // Using the variables below in the browser will return `undefined`.
  // Next.js doesn't expose environment variables unless they start with `NEXT_PUBLIC_`.
  console.info("[Node.js only] ENV_VARIABLE:", process.env.ENV_VARIABLE);
  console.info(
    "[Node.js only] ENV_LOCAL_VARIABLE:",
    process.env.ENV_LOCAL_VARIABLE,
  );

  // Redirect to home page if not in development
  // if (process.env.NODE_ENV === 'production') {
  //   redirect('/');
  // }

  // Get all environment variables that start with NEXT_PUBLIC_
  const publicEnvVars = Object.entries(process.env).filter(([key]) =>
    key.startsWith('NEXT_PUBLIC_')
  );

  return (
    <BasicLayout>
      <Seo title="Development Environment" />
      <main className="p-8">
        <h2>TODO create developer component</h2>
        <h2>NEXT_PUBLIC_NODE_ENV</h2>
        <p>{process.env.NEXT_PUBLIC_NODE_ENV}</p>
        <section className="light:bg-white dark:bg-gray-900">
          <h1 className="text-3xl font-bold mb-6">Development Environment Variables</h1>

          <table className="block overflow-auto border-collapse my-10">
            <thead>
              <tr>
                <th className="font-semibold p-3.5 border border-[#eaeaea]">Variable Name</th>
                <th className="font-semibold p-3.5 border border-[#eaeaea]">Value</th>
                <th className="font-semibold p-3.5 border border-[#eaeaea]">Added By</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="text-sm p-3.5 border border-[#eaeaea]">NEXT_PUBLIC_ENV_VARIABLE</td>
                <td className="text-sm p-3.5 border border-[#eaeaea]">{process.env.NEXT_PUBLIC_ENV_VARIABLE}</td>
                <td className="text-sm p-3.5 border border-[#eaeaea]">
                  <Code>.env</Code>
                </td>
              </tr>
              <tr>
                <td className="text-sm p-3.5 border border-[#eaeaea]">NEXT_PUBLIC_ENV_LOCAL_VARIABLE</td>
                <td className="text-sm p-3.5 border border-[#eaeaea]">{process.env.NEXT_PUBLIC_ENV_LOCAL_VARIABLE}</td>
                <td className="text-sm p-3.5 border border-[#eaeaea]">
                  <Code>.env.local</Code>
                </td>
              </tr>
              <tr>
                <td className="text-sm p-3.5 border border-[#eaeaea]">NEXT_PUBLIC_DEVELOPMENT_ENV_VARIABLE</td>
                <td className="text-sm p-3.5 border border-[#eaeaea]">{process.env.NEXT_PUBLIC_DEVELOPMENT_ENV_VARIABLE}</td>
                <td className="text-sm p-3.5 border border-[#eaeaea]">
                  <Code>.env.development</Code>
                </td>
              </tr>
              <tr>
                <td className="text-sm p-3.5 border border-[#eaeaea]">NEXT_PUBLIC_PRODUCTION_ENV_VARIABLE</td>
                <td className="text-sm p-3.5 border border-[#eaeaea]">{process.env.NEXT_PUBLIC_PRODUCTION_ENV_VARIABLE}</td>
                <td className="text-sm p-3.5 border border-[#eaeaea]">
                  <Code>.env.production</Code>
                </td>
              </tr>
            </tbody>
          </table>

          <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg shadow-sm">
            <div className="grid grid-cols-2 gap-4">
              {publicEnvVars.map(([key, value]) => (
                <div key={key} className="border-b border-gray-200 dark:border-gray-700 py-3">
                  <p className="font-medium text-gray-700 dark:text-gray-300">{key}</p>
                  <code className="text-sm text-purple-600 dark:text-purple-400">
                    {value || '(undefined)'}
                  </code>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8 p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
            <h2 className="text-xl font-semibold mb-2">Note:</h2>
            <p className="text-gray-700 dark:text-gray-300">
              Only environment variables prefixed with NEXT_PUBLIC_ are visible in the browser.
              Other environment variables are only accessible on the server side.
            </p>
          </div>
        </section>
      </main>
    </BasicLayout>
  );
};

export default DevelopmentPage;
