import Head from 'next/head';
import { studio } from '../data/studio';
import { asset } from '../lib/assets';
export default function Page({ children, title, description }) {
  return <>
    <Head><title>{title ? `${title} — des.bin` : 'des.bin — independent design studio'}</title><meta name="description" content={description || studio.description} /><link rel="icon" href={asset('/favicon.svg')} /><meta name="theme-color" content="#fcfcfc" /></Head>
    <a className="skip-link" href="#main">Skip to content</a>
    {children}
  </>;
}
