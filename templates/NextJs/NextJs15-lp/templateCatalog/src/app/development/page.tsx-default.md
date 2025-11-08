import { BasicLayout, Seo } from '@components';
import React from 'react';

type CodeProps = {
  children: React.ReactNode;
};

const Code = ({ children }: CodeProps): React.ReactElement => (
  <code className="text-base whitespace-pre-wrap text-[#be00ff] before:content-['`'] after:content-['`']">
    {children}
  </code>
);

const DevelopmentPage = (): React.ReactElement => {
  // The following console.log statements will only be executed on Node.js.
  // Check the terminal to see the environment variables.
  // Using the variables below in the browser will return `undefined`.
  // Next.js doesn't expose environment variables unless they start with `NEXT_PUBLIC_`.
  console.info('[Node.js only] ENV_VARIABLE:', process.env.ENV_VARIABLE);
  console.info('[Node.js only] LOCAL_ENV_VARIABLE:', process.env.LOCAL_ENV_VARIABLE);

  // Redirect to home page if not in development
  // if (process.env.NODE_ENV === 'production') {
  //   redirect('/');
  // }

  // Get all environment variables that start with NEXT_PUBLIC_
  const publicEnvVars = Object.entries(process.env).filter(([key]) => key.startsWith('NEXT_PUBLIC_'));

  return (
    <BasicLayout>
      <Seo title='Development Environment' />
      <main className='p-8'>
        <h2>TODO create developer component</h2>
        <h2>NEXT_PUBLIC_NODE_ENV</h2>
        <p>{process.env.NEXT_PUBLIC_NODE_ENV}</p>
        <section className='light:bg-white dark:bg-gray-900'>
          <h1 className='mb-6 text-3xl font-bold'>Development Environment Variables</h1>

          <table className='my-10 block border-collapse overflow-auto'>
            <thead>
              <tr>
                <th className='border border-[#eaeaea] p-3.5 font-semibold'>Variable Name</th>
                <th className='border border-[#eaeaea] p-3.5 font-semibold'>Value</th>
                <th className='border border-[#eaeaea] p-3.5 font-semibold'>Added By</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className='border border-[#eaeaea] p-3.5 text-sm'>NEXT_PUBLIC_ENV_VARIABLE</td>
                <td className='border border-[#eaeaea] p-3.5 text-sm'>{process.env.NEXT_PUBLIC_ENV_VARIABLE}</td>
                <td className='border border-[#eaeaea] p-3.5 text-sm'>
                  <Code>.env</Code>
                </td>
              </tr>
              <tr>
                <td className='border border-[#eaeaea] p-3.5 text-sm'>NEXT_PUBLIC_LOCAL_ENV_VARIABLE</td>
                <td className='border border-[#eaeaea] p-3.5 text-sm'>{process.env.NEXT_PUBLIC_LOCAL_ENV_VARIABLE}</td>
                <td className='border border-[#eaeaea] p-3.5 text-sm'>
                  <Code>.env.local</Code>
                </td>
              </tr>
              <tr>
                <td className='border border-[#eaeaea] p-3.5 text-sm'>NEXT_PUBLIC_DEVELOPMENT_ENV_VARIABLE</td>
                <td className='border border-[#eaeaea] p-3.5 text-sm'>
                  {process.env.NEXT_PUBLIC_DEVELOPMENT_ENV_VARIABLE}
                </td>
                <td className='border border-[#eaeaea] p-3.5 text-sm'>
                  <Code>.env.development</Code>
                </td>
              </tr>
              <tr>
                <td className='border border-[#eaeaea] p-3.5 text-sm'>NEXT_PUBLIC_PRODUCTION_ENV_VARIABLE</td>
                <td className='border border-[#eaeaea] p-3.5 text-sm'>
                  {process.env.NEXT_PUBLIC_PRODUCTION_ENV_VARIABLE}
                </td>
                <td className='border border-[#eaeaea] p-3.5 text-sm'>
                  <Code>.env.production</Code>
                </td>
              </tr>
            </tbody>
          </table>

          <div className='rounded-lg bg-gray-50 p-6 shadow-sm dark:bg-gray-800'>
            <div className='grid grid-cols-2 gap-4'>
              {publicEnvVars.map(([key, value]) => (
                <div key={key} className='border-b border-gray-200 py-3 dark:border-gray-700'>
                  <p className='font-medium text-gray-700 dark:text-gray-300'>{key}</p>
                  <code className='text-sm text-purple-600 dark:text-purple-400'>{value || '(undefined)'}</code>
                </div>
              ))}
            </div>
          </div>

          <div className='mt-8 rounded-lg bg-yellow-50 p-4 dark:bg-yellow-900/20'>
            <h2 className='mb-2 text-xl font-semibold'>Note:</h2>
            <p className='text-gray-700 dark:text-gray-300'>
              Only environment variables prefixed with NEXT_PUBLIC_ are visible in the browser. Other environment
              variables are only accessible on the server side.
            </p>
          </div>
        </section>
      </main>
    </BasicLayout>
  );
};

export default DevelopmentPage;
