import { cva, type VariantProps } from 'class-variance-authority';
import Link from 'next/link';
import { twMerge } from 'tailwind-merge';
import MinimalLogo from '@assets/svg/MinimalLogo';
import { type IMenuItem } from '@configs';
import config from '@configs/config';
import { type PropsWithChildren } from 'react';

import { MobileNavigation } from './MobileNavigation';
import { ButtonLink } from '../Button';
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

  /**
   * Left side menu items
   */
  menuContent?: IMenuItem[];

  /**
   * Right side menu items (typically CTAs)
   */
  menuRightContent?: IMenuItem[];
}

/**
 * Header component that displays navigation menus and logo
 *
 * @param props - Component props
 * @returns Header component
 */
export function Header({
  className,
  variant,
  sticky,
  shadow,
  menuContent = config.content.menu['headerMenu'],
  menuRightContent = config.content.menu['headerCTAMenu'],
  children,
}: HeaderProps): React.ReactElement {
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

              {menuContent?.map(({ title, url, id }) => (
                <li key={id} className='mr-6 hidden md:block'>
                  <Link
                    href={url}
                    className='rounded-lg px-2 py-1 text-slate-700 hover:bg-slate-100 hover:text-slate-900'
                  >
                    {title}
                  </Link>
                </li>
              ))}

              {children}
            </ul>
          </nav>
          <nav className='relative z-50 ml-auto text-sm'>
            <ul className='flex items-center'>
              {menuRightContent?.map(({ title, url, id, button }) => {
                if (button) {
                  return (
                    <li key={id} className='ml-auto md:ml-8'>
                      <ButtonLink href={url} intent='secondary'>
                        <span>{title}</span>
                      </ButtonLink>
                    </li>
                  );
                } else {
                  return (
                    <li key={id} className='ml-auto hidden md:block'>
                      <Link
                        href={url}
                        className='rounded-lg px-2 py-1 text-slate-700 hover:bg-slate-100 hover:text-slate-900'
                      >
                        {title}
                      </Link>
                    </li>
                  );
                }
              })}

              <li className='-mr-1 ml-5 md:hidden'>
                <MobileNavigation menuContent={[...(menuContent ?? []), ...(menuRightContent ?? [])]} />
              </li>
            </ul>
          </nav>
        </div>
      </Container>
    </header>
  );
}
