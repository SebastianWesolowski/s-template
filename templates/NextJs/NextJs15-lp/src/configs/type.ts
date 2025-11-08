import { type ReactElement } from 'react';

export interface ISocialMediaIcon {
  normal: ReactElement;
  large: ReactElement;
}

export interface ISocialMedia {
  icon: ISocialMediaIcon;
  name: string;
  url: string;
}

export interface IPrivacyPolicy {
  globalHref: string;
  href: string;
  file: string;
  title: string;
}

export interface ILegalConfig {
  privacyPolicy: IPrivacyPolicy;
  marketingApprovals: string;
}

export interface IMenuItem {
  title: string;
  url: string;
  button?: boolean;
  id?: string;
}

export interface IMenuConfig {
  [key: string]: IMenuItem[];
}

export interface IAnalyticsConfig {
  hjid: string;
  hjsv: string;
  umamiWebsiteId: string;
  umamiInstance: string;
  googleAnalyticsId: string;
}

export interface IBasicConfig {
  title: string;
  description: string;
  locale: string;
  url: {
    test: string;
    production: string;
  };
}

export interface IUIConfig {
  theme: {
    palette: {
      primary: {
        main: string;
      };
    };
  };
}

export interface ISEOImage {
  first: string;
  second: string;
}

export interface ISEOConfig {
  additionalLinkTags: Array<{
    rel: string;
    href: string;
  }>;
  title: string;
  siteName: string;
  description: string;
  canonical: string;
  locale: string;
  keywords: string;
  twitter: {
    site: string;
    cardType: string;
  };
  type: string;
  robots: string;
  image: ISEOImage;
}

export interface IAppConfig {
  url: {
    test: string;
    production: string;
  };
  SEO: ISEOConfig;
  UI: IUIConfig;
  analytics: IAnalyticsConfig;
  content: {
    menu: IMenuConfig;
  };
  socialMedia: ISocialMedia[];
  legal: ILegalConfig;
}
