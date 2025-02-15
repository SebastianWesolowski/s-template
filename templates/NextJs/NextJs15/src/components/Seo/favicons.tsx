import config from '@configs';

import { type Favicons } from './types';

// https://realfavicongenerator.net/

/* <link rel="apple-touch-icon" sizes="180x180" href="/assets/favicon/apple-touch-icon.png">
<link rel="icon" type="image/png" sizes="32x32" href="/assets/favicon/favicon-32x32.png">
<link rel="icon" type="image/png" sizes="16x16" href="/assets/favicon/favicon-16x16.png">
<link rel="manifest" href="/assets/favicon/site.webmanifest">
<link rel="mask-icon" href="/assets/favicon/safari-pinned-tab.svg" color="#5bbad5">
<link rel="shortcut icon" href="/assets/favicon/favicon.ico">
<meta name="msapplication-TileColor" content="#ffc40d">
<meta name="msapplication-config" content="/assets/favicon/browserconfig.xml">
<meta name="theme-color" content="#ffffff"> */

export const favicons: Array<Favicons> = [
  { key: 1, tag: 'link', rel: 'apple-touch-icon', sizes: '180x180', href: '/assets/favicon/apple-touch-icon.png' },
  { key: 2, tag: 'link', rel: 'icon', type: 'image/png', sizes: '32x32', href: '/assets/favicon/favicon-32x32.png' },
  { key: 3, tag: 'link', rel: 'icon', type: 'image/png', sizes: '16x16', href: '/assets/favicon/favicon-16x16.png' },
  { key: 4, tag: 'link', rel: 'manifest', href: '/assets/favicon/site.webmanifest' },
  {
    key: 5,
    tag: 'link',
    rel: 'mask-icon',
    href: '/assets/favicon/safari-pinned-tab.svg',
    color: config.UI.theme.palette.primary.main,
  },
  { key: 6, tag: 'link', rel: 'shortcut icon', href: '/assets/favicon/favicon.ico' },
  { key: 7, tag: 'meta', name: 'msapplication-TileColor', content: config.UI.theme.palette.primary.main },
  { key: 8, tag: 'meta', name: 'msapplication-config', content: '/assets/favicon/browserconfig.xml' },
  { key: 9, tag: 'meta', name: 'theme-color', content: config.UI.theme.palette.primary.main },
];
