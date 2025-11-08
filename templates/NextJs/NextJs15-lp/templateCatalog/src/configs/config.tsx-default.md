import { BsFacebook as Facebook, BsInstagram as Instagram, BsYoutube as YouTube } from 'react-icons/bs';

import analyticsConfig from './configAnalytics';
import basicConfig from './configBasic';
import contentConfig from './configContent';
import seoConfig from './configSEO';
import { type IAppConfig } from './type';

const uiConfig = {
  theme: { palette: { primary: { main: '#fac846' } } },
};

const socialMediaConfig = [
  {
    icon: {
      normal: <Instagram />,
      large: <Instagram size='100%' />,
    },
    name: 'Instagram',
    url: 'https://www.instagram.com/wesolowski.dev/',
  },
  {
    icon: {
      normal: <Facebook />,
      large: <Facebook size='100%' />,
    },
    name: 'Facebook',
    url: 'https://www.facebook.com/Wesolowskidev-105113151219138/',
  },
  {
    icon: {
      normal: <YouTube />,
      large: <YouTube size='100%' />,
    },
    name: 'YouTube',
    url: 'https://www.youtube.com/channel/UCCQS_dsZJDN_35AL7LBiMMA',
  },
];

const legalConfig = {
  privacyPolicy: {
    globalHref: 'https://hr.wesolowski.dev/privacy-policy',
    href: '/privacy-policy',
    file: '/file/polityka-prywatnosci.pdf',
    title: 'Polityka prywatności',
  },
  marketingApprovals: '',
};

const appConfig: IAppConfig = {
  url: basicConfig.url,
  SEO: seoConfig,
  UI: uiConfig,
  analytics: analyticsConfig,
  content: contentConfig,
  socialMedia: socialMediaConfig,
  legal: legalConfig,
};

// Update marketing approvals with dynamic privacy policy link
appConfig.legal.marketingApprovals = `Zgadzam się na przetwarzanie moich danych osobowych przez Sebastiana Wesołowskiego w celu realizacji usługi newsletter, a tym samym wysyłania mi informacji o produktach blogowych, usługach, promocjach lub nowościach zgodnie z <a href='${appConfig.legal.privacyPolicy.href}' target="_blank" rel="noopener">polityką prywatności</a>. Wiem, że zgodę tę mogę w każdej chwili cofnąć. *`;

export default appConfig;
