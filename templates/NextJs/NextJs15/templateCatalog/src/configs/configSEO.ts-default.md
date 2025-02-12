import Basic from "./configBasic";

const cardImage = {
  first: "https://hr.wesolowski.dev/assets/image/openGraph.png",
  second: "https://hr.wesolowski.dev/assets/image/openGraph.png",
};

const SEO = {
  additionalLinkTags: [
    {
      rel: "icon",
      href: "/assets/favicon/favicon.ico",
    },
  ],
  title: Basic.title,
  siteName: Basic.title,
  description: Basic.description,
  canonical: Basic.url.production,
  locale: Basic.locale,
  keywords:
    "Learn React, React Workshops, Testing JavaScript Training, React Training, Learn JavaScript, Learn TypeScript",
  twitter: {
    site: "@wesolowski",
    cardType: "summary_large_image",
  },
  type: "website",
  robots: "follow, index",
  image: cardImage,
};

export default SEO;
