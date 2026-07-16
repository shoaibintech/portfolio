import { useState } from 'react';
import { capture } from '../lib/analytics.js';

const FORM_ENDPOINT = 'https://formspree.io/f/xpqvqkyd';

export default function InquiryForm() {
  const [status, setStatus] = useState('idle');
  const [started, setStarted] = useState(false);

  const trackStart = () => {
    if (!started) {
      setStarted(true);
      capture('inquiry_form_started', { source: 'contact_section' });
    }
  };

  const submit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.checkValidity()) return form.reportValidity();
    setStatus('sending');
    try {
      const response = await fetch(FORM_ENDPOINT, { method: 'POST', body: new FormData(form), headers: { Accept: 'application/json' } });
      if (!response.ok) throw new Error('Submission failed');
      form.reset();
      setStatus('success');
      capture('inquiry_form_submitted', { source: 'contact_section' });
    } catch {
      setStatus('error');
      capture('inquiry_form_submission_failed', { source: 'contact_section' });
    }
  };

  return <form className="inquiry-form" onSubmit={submit} onFocus={trackStart}>
    <div className="inquiry-heading"><p className="eyebrow">Hiring or collaboration inquiry</p><p>Share a little context and I’ll get back to you by email.</p></div>
    <div className="form-grid"><label>Name<input name="name" autoComplete="name" required /></label><label>Work email<input name="email" type="email" autoComplete="email" required /></label><label>Company<input name="company" autoComplete="organization" /></label><label>Role or opportunity<input name="opportunity" required /></label></div>
    <label>Message<textarea name="message" rows="5" required /></label>
    <label className="consent-check"><input name="contactConsent" type="checkbox" required /> <span>I consent to Shoaib using these details to respond to this inquiry.</span></label>
    <div className="form-actions"><button className="button yellow" disabled={status === 'sending'}>{status === 'sending' ? 'Sending…' : 'Send inquiry'} <b>↗</b></button>{status === 'success' && <p className="form-status success">Thanks — your message is on its way.</p>}{status === 'error' && <p className="form-status error">Something went wrong. Please email me directly.</p>}</div>
  </form>;
}
