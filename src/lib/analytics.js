const POSTHOG_KEY = 'phc_rKMsGuyQKFjSe5AD9ZobSmHNWygBsKUEZ6unmttUhhWM';
const POSTHOG_HOST = 'https://us.i.posthog.com';
const OPT_OUT_KEY = 'portfolio-analytics-disabled';
let loader;
let initialized = false;

export const isAnalyticsDisabled = () => typeof window !== 'undefined' && localStorage.getItem(OPT_OUT_KEY) === 'true';

export function initAnalytics() {
  if (isAnalyticsDisabled()) return Promise.resolve(null);
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
  if (isAnalyticsDisabled()) return;
  initAnalytics().then((posthog) => posthog?.capture(event, properties));
}

export function setAnalyticsDisabled(disabled) {
  localStorage.setItem(OPT_OUT_KEY, String(disabled));
  if (disabled) window.posthog?.opt_out_capturing();
  else window.posthog?.opt_in_capturing();
}
