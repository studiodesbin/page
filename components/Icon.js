export default function Icon({ name = 'arrow' }) {
  return <svg viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{name === 'at' ? <><circle cx="7" cy="7" r="2" /><path d="M9 7v.9a1.6 1.6 0 0 0 3.2 0V7A5.2 5.2 0 1 0 7 12.2" /></> : <path d="M4 10 10 4M5.2 4H10v4.8" />}</svg>;
}
