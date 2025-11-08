import { cva, type VariantProps } from 'class-variance-authority';
import Link from 'next/link';
import { twMerge } from 'tailwind-merge';
import { MobileNavigation } from '@/components/Header/MobileNavigation';
import MinimalLogo from '@assets/svg/MinimalLogo';
import { type PropsWithChildren } from 'react';

import { Container } from '../Container';

/**
 * Defines styling variants for the Header component
 */
const header = cva(['py-10'], {
  variants: {
    variant: {
      default: [],
      transparent: ['bg-transparent'],
      filled: ['bg-white', 'dark:bg-gray-900'],
    },
    sticky: {
      true: ['sticky', 'top-0', 'z-40'],
      false: [],
    },
    shadow: {
      true: ['shadow-sm'],
      false: [],
    },
  },
  defaultVariants: {
    variant: 'default',
    sticky: false,
    shadow: false,
  },
});

/**
 * Header component props interface
 */
export interface HeaderProps extends PropsWithChildren, VariantProps<typeof header> {
  /**
   * Additional CSS classes to apply to the header
   */
  className?: string;
}

/**
 * Header component that displays navigation menus and logo
 *
 * @param props - Component props
 * @returns Header component
 */
export function Header({ className, variant, sticky, shadow, children }: HeaderProps): React.ReactElement {
  return (
    <header className={twMerge(header({ variant, sticky, shadow }), className)}>
      <Container>
        <div className='flex'>
          <nav className='relative z-50 text-sm'>
            <ul className='flex items-center'>
              <li>
                <Link href='/'>
                  <span className='sr-only'>Home</span>
                  <MinimalLogo className='mr-12 h-10 w-auto' />
                </Link>
              </li>

              <li className='ml-auto hidden md:block'>
                <Link
                  href={'#'}
                  className='rounded-lg px-2 py-1 text-slate-700 hover:bg-slate-100 hover:text-slate-900'
                >
                  ### example
                </Link>
              </li>

              {children}
            </ul>
          </nav>
          <nav className='relative z-50 ml-auto text-sm'>
            <ul className='flex items-center'>
              <li className='ml-auto hidden md:block'>
                <Link
                  href={'#'}
                  className='rounded-lg px-2 py-1 text-slate-700 hover:bg-slate-100 hover:text-slate-900'
                >
                  ### example
                </Link>
              </li>
              <li className='-mr-1 ml-5 md:hidden'>
                <MobileNavigation />
              </li>
            </ul>
          </nav>
        </div>
      </Container>
    </header>
  );
}
