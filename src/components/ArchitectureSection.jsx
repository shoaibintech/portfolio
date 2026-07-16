import { useState } from 'react';
import { architecture } from '../data/portfolio.js';
import { capture } from '../lib/analytics.js';

export default function ArchitectureSection() {
  const [layer, setLayer] = useState('edge');
  const active = architecture[layer];
  return <section className="architecture" id="architecture"><div className="wrap"><div className="architecture-heading"><div><p className="eyebrow">Architecture lab</p><h2>Systems designed<br />to <span>keep moving.</span></h2></div><p>Explore the patterns I use to build production systems that remain observable, resilient, and ready to scale.</p></div><div className="architecture-lab"><div className="system-map">{Object.entries(architecture).map(([key, value]) => <button key={key} className={`arch-node ${key === 'services' ? 'node-core' : ''} ${layer === key ? 'active' : ''}`} onClick={() => { setLayer(key); capture('architecture_layer_selected', { layer: key }); }}>{value[1]}</button>)}</div><aside className="architecture-panel"><p className="panel-index">{active[0]}</p><h3>{active[1]}</h3><p>{active[2]}</p><ul>{active[3].map((item) => <li key={item}>{item}</li>)}</ul><a className="text-link" href="#/blog" onClick={() => capture('architecture_notes_opened')}>Open architecture notes <b>↗</b></a></aside></div></div></section>;
}
