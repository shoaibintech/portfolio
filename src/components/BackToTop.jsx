import { useEffect, useState } from 'react';
import { capture } from '../lib/analytics.js';

export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const update = () => setVisible(window.scrollY > 520);
    update();
    window.addEventListener('scroll', update, { passive: true });
    return () => window.removeEventListener('scroll', update);
  }, []);

  return <button className={`back-to-top ${visible ? 'is-visible' : ''}`} onClick={() => { capture('back_to_top_clicked'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} aria-label="Back to top">↑</button>;
}
