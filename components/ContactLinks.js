import Link from 'next/link';
import Icon from './Icon';
export default function ContactLinks() {
  return <div className="pills"><Link href="/contact/" className="pill pill-secondary icon-left"><Icon name="at" />Contact</Link><Link href="/contact/?intent=call" className="pill pill-quiet">Take a call<Icon /></Link></div>;
}
