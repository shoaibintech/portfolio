const POSTHOG_KEY = 'phc_rKMsGuyQKFjSe5AD9ZobSmHNWygBsKUEZ6unmttUhhWM';
const POSTHOG_HOST = 'https://us.i.posthog.com';
const CONSENT_KEY = 'portfolio-analytics-consent';
let loader;
let initialized = false;

export const hasAnalyticsConsent = () => typeof window !== 'undefined' && localStorage.getItem(CONSENT_KEY) === 'granted';

export function initAnalytics() {
  if (!hasAnalyticsConsent()) return Promise.resolve(null);
  if (initialized && window.posthog) return Promise.resolve(window.posthog);
  if (loader) return loader;

  loader = new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = `${POSTHOG_HOST}/static/array.js`;
    script.async = true;
    script.onload = () => {
      if (!window.posthog) return reject(new Error('PostHog did not load'));
      window.posthog.init(POSTHOG_KEY, {
        api_host: POSTHOG_HOST,
        autocapture: true,
        capture_pageview: false,
        capture_pageleave: true,
        person_profiles: 'identified_only',
      });
      initialized = true;
      resolve(window.posthog);
    };
    script.onerror = () => reject(new Error('PostHog script failed to load'));
    document.head.appendChild(script);
  }).catch(() => null);
  return loader;
}

export function capture(event, properties = {}) {
  if (!hasAnalyticsConsent()) return;
  initAnalytics().then((posthog) => posthog?.capture(event, properties));
}

export { CONSENT_KEY };
