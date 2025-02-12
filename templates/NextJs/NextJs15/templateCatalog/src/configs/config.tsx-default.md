import { BsFacebook as Facebook, BsInstagram as Instagram, BsYoutube as YouTube } from "react-icons/bs";

import analytics from "./configAnalytics";
import Basic from "./configBasic";
import SEO from "./configSEO";

const UI = {
  theme: { palette: { primary: { main: "#fac846" } } },
};

const config = {
  theme: "system", // system, dark or light
  url: Basic.url,
  SEO,
  UI,
  analytics,
  socialMedia: [
    {
      icon: {
        normal: <Instagram />,
        large: <Instagram size='100%' />,
      },
      name: "Instagram",
      url: "https://www.instagram.com/wesolowski.dev/",
    },
    {
      icon: {
        normal: <Facebook />,
        large: <Facebook size='100%' />,
      },
      name: "Facebook",
      url: "https://www.facebook.com/Wesolowskidev-105113151219138/",
    },
    {
      icon: {
        normal: <YouTube />,
        large: <YouTube size='100%' />,
      },
      name: "YouTube",
      url: "https://www.youtube.com/channel/UCCQS_dsZJDN_35AL7LBiMMA",
    },
  ],
  legal: {
    privacyPolicy: {
      globalHref: "https://hr.wesolowski.dev/privacy-policy",
      href: "/privacy-policy",
      file: "/file/polityka-prywatnosci.pdf",
      title: "Polityka prywatności",
    },
    marketingApprovals:
      "Zgadzam się na przetwarzanie moich danych osobowych przez Sebastiana Wesołowskiego w celu realizacji usługi newsletter, a tym samym wysyłania mi informacji o produktach blogowych, usługach, promocjach lub nowościach zgodnie z <a href=''>polityką prywatności</a>. Wiem, że zgodę tę mogę w każdej chwili cofnąć. *",
  },
};

config.legal.marketingApprovals = `Zgadzam się na przetwarzanie moich danych osobowych przez Sebastiana Wesołowskiego w celu realizacji usługi newsletter, a tym samym wysyłania mi informacji o produktach blogowych, usługach, promocjach lub nowościach zgodnie z <a href='${config.legal.privacyPolicy.href}' target="_blank" rel="noopener">polityką prywatności</a>. Wiem, że zgodę tę mogę w każdej chwili cofnąć. *`;

export default config;
