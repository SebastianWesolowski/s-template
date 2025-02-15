import { RiAlarmWarningFill } from 'react-icons/ri';
import { BasicLayout, Seo } from '@components';

export default function NotFound() {
  return (
    <BasicLayout>
      <Seo templateTitle='Not Found' />

      <main>
        <section className='light:bg-white dark:bg-gray-900'>
          <div className='flex min-h-screen flex-col items-center justify-center text-center text-black'>
            <RiAlarmWarningFill size={60} className='animate-flicker text-red-500' />
            <h1 className='mt-8 text-4xl md:text-6xl'>Page Not Found</h1>
            Back to Home
          </div>
        </section>
      </main>
    </BasicLayout>
  );
}
