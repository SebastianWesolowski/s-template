import Link from 'next/link';
import MinimalLogo from '@assets/svg/MinimalLogo';
import { type IMenuItem } from '@configs';
import config from '@configs/config';

import { MobileNavigation } from './MobileNavigation';
import { ButtonLink } from '../Button';
import { Container } from '../Container';

interface HeaderProps {
  menuContent?: IMenuItem[];
  menuRightContent?: IMenuItem[];
}

export function Header({
  menuContent = config.content.menu['headerMenu'],
  menuRightContent = config.content.menu['headerCTAMenu'],
}: HeaderProps): React.ReactElement {
  return (
    <header className='py-10'>
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
