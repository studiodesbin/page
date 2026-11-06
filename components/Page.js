import Head from 'next/head';
import { useRouter } from 'next/router';
import { studio } from '../data/studio';
import { asset } from '../lib/assets';
import { siteUrl, socialImageUrl } from '../lib/site';
export default function Page({ children, title, description }) {
  const { asPath } = useRouter();
  const pageTitle = title ? `${title} — des.bin` : 'des.bin — independent design studio';
  const pageDescription = description || studio.description;
  const canonicalUrl = new URL(asPath.split(/[?#]/)[0].replace(/^\//, ''), siteUrl).href;
  return <>
    <Head><title>{title ? `${title} — des.bin` : 'des.bin — independent design studio'}</title><meta name="description" content={description || studio.description} /><link rel="icon" href={asset('/favicon.svg')} /><meta name="theme-color" content="#fcfcfc" /></Head>
    <Head>
      <link rel="canonical" href={canonicalUrl} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="des.bin" />
      <meta property="og:locale" content="en_US" />
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={pageDescription} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={socialImageUrl} />
      <meta property="og:image:secure_url" content={socialImageUrl} />
      <meta property="og:image:type" content="image/jpeg" />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content="des.bin studio homepage with selected design projects" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={pageDescription} />
      <meta name="twitter:image" content={socialImageUrl} />
      <meta name="twitter:image:alt" content="des.bin studio homepage with selected design projects" />
    </Head>
    <a className="skip-link" href="#main">Skip to content</a>
    {children}
  </>;
}
