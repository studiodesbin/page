import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Icon from './Icon';

export default function Navigation() {
  const { pathname } = useRouter();
  const activeRoute = pathname.startsWith('/projects/') ? '/' : pathname;
  const trackRef = useRef(null);
  const [selection, setSelection] = useState(null);

  useEffect(() => {
    const track = trackRef.current;
    let disposed = false;
    const updateSelection = () => {
      if (disposed) return;
      const activeLink = track.querySelector('[aria-current="page"]');
      if (!activeLink) {
        setSelection(null);
        return;
      }
      // Measure within the clipped inner track, independent of the outer
      // glass surface's border, transform and backdrop-filter.
      const trackBox = track.getBoundingClientRect();
      const linkBox = activeLink.getBoundingClientRect();
      const width = Math.min(linkBox.width, trackBox.width);
      setSelection({
        left: Math.max(0, Math.min(linkBox.left - trackBox.left, trackBox.width - width)),
        width,
        height: Math.min(linkBox.height, trackBox.height),
      });
    };
    updateSelection();
    const observer = new ResizeObserver(updateSelection);
    observer.observe(track);
    for (const link of track.querySelectorAll('a')) observer.observe(link);
    document.fonts.ready.then(updateSelection);
    return () => {
      disposed = true;
      observer.disconnect();
    };
  }, [activeRoute]);

  return <nav className="nav" aria-label="Main navigation" data-selection-ready={selection ? 'true' : undefined}>
    <div ref={trackRef} className="nav-items">
    <span className="nav-selection" aria-hidden="true" style={selection ? { width: selection.width, height: selection.height, transform: `translate(${selection.left}px, 0px)`, opacity: 1 } : { opacity: 0 }} />
    <Link className="nav-home" href="/" aria-current={activeRoute === '/' ? 'page' : undefined}><svg viewBox="0 0 12 13" className="nav-mark" aria-hidden="true"><circle cx="1.5" cy="1.5" r="1.2" /><circle cx="10.5" cy="1.5" r="1.2" /><circle cx="1.5" cy="11.5" r="1.2" /><path d="M9.5 10.5h2v2h-2z" /></svg><span>des.bin</span></Link>
    <Link href="/services/" className="nav-link" aria-current={activeRoute === '/services' ? 'page' : undefined}>Services</Link>
    <Link href="/about/" className="nav-link" aria-current={activeRoute === '/about' ? 'page' : undefined}>About</Link>
    <Link href="/contact/" className="pill icon-left nav-contact" aria-current={activeRoute === '/contact' ? 'page' : undefined}><Icon name="at" />Contact</Link>
    </div>
  </nav>;
}
