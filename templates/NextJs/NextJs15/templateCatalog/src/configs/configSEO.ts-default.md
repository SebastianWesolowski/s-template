import basicConfig from './configBasic';
import { type ISEOConfig } from './type';

const cardImage = {
  first: 'https://hr.wesolowski.dev/assets/image/openGraph.png',
  second: 'https://hr.wesolowski.dev/assets/image/openGraph.png',
};

const seoConfig: ISEOConfig = {
  additionalLinkTags: [
    {
      rel: 'icon',
      href: '/assets/favicon/favicon.ico',
    },
  ],
  title: basicConfig.title,
  siteName: basicConfig.title,
  description: basicConfig.description,
  canonical: basicConfig.url.production,
  locale: basicConfig.locale,
  keywords:
    'Learn React, React Workshops, Testing JavaScript Training, React Training, Learn JavaScript, Learn TypeScript',
  twitter: {
    site: '@wesolowski',
    cardType: 'summary_large_image',
  },
  type: 'website',
  robots: 'follow, index',
  image: cardImage,
};

export default seoConfig;
