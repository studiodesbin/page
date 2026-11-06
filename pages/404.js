import Link from 'next/link';
import Page from '../components/Page';
export default function NotFound() { return <Page title="Page not found"><main className="letter" id="main"><div className="letter-body"><h1>This page hasn’t taken shape yet.</h1><p className="muted">The page you’re looking for may have moved.</p><p><Link href="/" className="text-link">Back to the studio</Link></p></div></main></Page>; }
