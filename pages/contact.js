import { useRef, useState } from 'react';
import { useRouter } from 'next/router';
import Page from '../components/Page';
import Row from '../components/Row';
import Icon from '../components/Icon';
import { getFormspreeEndpoint, submitEnquiry } from '../lib/contact.mjs';
import { studio } from '../data/studio';

const endpoint = getFormspreeEndpoint(process.env.NEXT_PUBLIC_FORMSPREE_ENDPOINT || studio.formspreeEndpoint);
const contactEmail = (process.env.NEXT_PUBLIC_CONTACT_EMAIL || '').trim();
export default function Contact() {
  const { query } = useRouter();
  const [copied, setCopied] = useState(false);
  const [copyError, setCopyError] = useState(false);
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState('');
  const sendingRef = useRef(false);
  async function copyEmail() { try { await navigator.clipboard.writeText(contactEmail); setCopied(true); setCopyError(false); setTimeout(() => setCopied(false), 2500); } catch { setCopyError(true); } }
  async function submit(event) {
    event.preventDefault();
    if (sendingRef.current) return;
    const form = event.currentTarget;
    const data = new FormData(form);
    data.set('needs', data.getAll('needs').join(', ') || 'To be discussed');
    data.set('_subject', 'New project enquiry - des.bin');
    sendingRef.current = true;
    setError('');
    setStatus('sending');
    try {
      await submitEnquiry(data, { endpoint });
      form.reset();
      setStatus('success');
      requestAnimationFrame(() => document.getElementById('submission-status')?.focus());
    } catch (error) {
      setError(error instanceof TypeError ? 'Could not reach the enquiry service. Check your connection and try again. Your details have been kept.' : error.message);
      setStatus('error');
    } finally {
      sendingRef.current = false;
    }
  }
  return <Page title="Contact"><main id="main" className="contact"><section className="rows"><Row label="Contact"><h1>Good things begin with a conversation. Tell us what you’re thinking about.</h1></Row><Row><div className="pills"><a href="#project-form" className="pill pill-secondary">Fill in the form</a><a href="#project-form" className="pill pill-quiet">Take a call<Icon /></a>{contactEmail && <button className="text-link copy-email" type="button" onClick={copyEmail}>{copied ? 'Copied' : contactEmail}</button>}<span className="sr-only" role="status">{copied ? 'Email address copied.' : ''}</span></div>{copyError && <p className="muted">Copy this email address: {contactEmail}</p>}<p className="muted contact-hint">{query.intent === 'call' ? 'Call scheduling is not available yet. Tell us about your project using the form below.' : (endpoint ? 'Tell us a little about your project. Your enquiry is processed by Formspree and sent to our inbox.' : 'Email delivery is not available yet. Please check back soon.')}</p></Row></section>
    <form id="project-form" className="rows contact-form" onSubmit={submit} aria-busy={status === 'sending'}>
      <div className="sr-only" aria-hidden="true"><label htmlFor="website">Leave this field empty</label><input id="website" name="_gotcha" type="text" tabIndex={-1} autoComplete="off" /></div>
      <Row label={<label htmlFor="name">Name</label>} className="row-field"><input className="field" id="name" name="name" placeholder="Your name" autoComplete="name" disabled={status === 'sending'} required maxLength={120} /></Row>
      <Row label={<label htmlFor="email">Email</label>} className="row-field"><input className="field" id="email" name="email" type="email" placeholder="you@example.com" autoComplete="email" disabled={status === 'sending'} required maxLength={254} /></Row>
      <Row label={<span id="needs-label">You need</span>} className="row-pills"><div className="pills option-group" role="group" aria-labelledby="needs-label">{['Strategy', 'Identity', 'Digital', 'Website'].map((item) => <label className="choice" key={item}><input type="checkbox" disabled={status === 'sending'} name="needs" value={item} /><span className="pill pill-quiet">{item}</span></label>)}</div></Row>
      <Row label={<span id="budget-label">Budget</span>} className="row-pills"><div className="pills option-group" role="radiogroup" aria-labelledby="budget-label">{['Under ₹2 lakh', '₹2–5 lakh', '₹5–10 lakh', '₹10 lakh+', 'Not sure yet'].map((item) => <label className="choice" key={item}><input type="radio" disabled={status === 'sending'} name="budget" value={item} defaultChecked={item === 'Not sure yet'} /><span className="pill pill-quiet">{item}</span></label>)}</div></Row>
      <Row label={<label htmlFor="message">Message</label>} className="row-field"><textarea className="field" id="message" name="message" placeholder="A little about the project, the timing and what you have in mind." disabled={status === 'sending'} required maxLength={6000} /></Row>
      <Row><div className="send"><p className="muted">{endpoint ? 'Your enquiry goes to our studio inbox.' : 'Email delivery is not available yet.'}</p><button className="pill pill-primary" type="submit" disabled={!endpoint || status === 'sending'}>{status === 'sending' ? 'Sending...' : 'Send'}<Icon /></button></div></Row>
      {status === 'error' && <Row><p role="alert">{error}</p></Row>}
    </form>
    {status === 'success' && <section id="submission-status" className="rows brief-preview" tabIndex={-1} aria-label="Enquiry received"><Row label="Thank you"><div className="brief" role="status"><h2>Your enquiry has been submitted.</h2><p>Thanks for getting in touch. We will reply to the email address you provided.</p><button type="button" className="pill pill-secondary" onClick={() => { setStatus('idle'); document.getElementById('name')?.focus(); }}>Send another enquiry</button></div></Row></section>}
  </main></Page>;
}
