import { useState } from 'react';
import { capture, CONSENT_KEY, initAnalytics } from '../lib/analytics.js';

export default function AnalyticsConsent({ onChange }) {
  const [choice, setChoice] = useState(() => localStorage.getItem(CONSENT_KEY));
  if (choice) return null;

  const choose = (granted) => {
    const value = granted ? 'granted' : 'declined';
    localStorage.setItem(CONSENT_KEY, value);
    setChoice(value);
    onChange(granted);
    if (granted) initAnalytics().then(() => capture('analytics_consent_granted'));
  };

  return <aside className="analytics-consent" role="dialog" aria-label="Analytics preference">
    <p className="eyebrow">Privacy choice</p>
    <p>May I use anonymous analytics to understand portfolio visits and improve the site?</p>
    <div><button className="button yellow" onClick={() => choose(true)}>Allow analytics</button><button className="text-button" onClick={() => choose(false)}>No thanks</button></div>
  </aside>;
}
