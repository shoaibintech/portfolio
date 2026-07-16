export default function ProjectVisual({ type }) {
  if (type === 'aio') return <><span className="orb" /><span className="device"><i /><i /><i /><b>aio</b><small>Everything a restaurant<br />needs to run smarter.</small></span></>;
  if (type === 'ultrasound') return <span className="scan">ULTRA<br /><b>SOUND</b><small>Machine learning for<br />earlier pregnancy insight.</small></span>;
  if (type === 'letsdata') return <span className="poster">LET’S<span>DATA</span><small>Public data,<br />made useful.</small></span>;
  if (type === 'imateam') return <span className="team-mark">iM<br />TEAM<small>find your people.<br />play together.</small></span>;
  return <span className="ticket">HEALING<small>Research tools for<br />care and understanding.</small></span>;
}
