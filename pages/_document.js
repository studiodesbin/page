import { Html, Head, Main, NextScript } from 'next/document';
import { asset } from '../lib/assets';
export default function Document() {
  return <Html lang="en"><Head><link rel="preload" href={asset('/fonts/IBMPlexSans-Regular.ttf')} as="font" type="font/ttf" crossOrigin="anonymous" /></Head><body><Main /><NextScript /></body></Html>;
}
