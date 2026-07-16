import { useState } from 'react';
import { capture, initAnalytics, isAnalyticsDisabled, setAnalyticsDisabled } from '../lib/analytics.js';

export default function AnalyticsPreference() {
  const [disabled, setDisabled] = useState(isAnalyticsDisabled());
  const toggle = () => {
    const nextDisabled = !disabled;
    setAnalyticsDisabled(nextDisabled);
    setDisabled(nextDisabled);
    if (!nextDisabled) initAnalytics().then(() => capture('analytics_reenabled'));
  };
  return <details className="privacy-control"><summary>Privacy</summary><p>This site uses PostHog for anonymous usage analytics. Form contents are sent only to Formspree, never to analytics.</p><button className="text-button" onClick={toggle}>{disabled ? 'Enable analytics' : 'Turn analytics off'}</button></details>;
}
