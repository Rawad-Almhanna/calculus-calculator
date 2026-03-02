const MODES = [
  { id: 'evaluate', label: 'Evaluate', icon: '=' },
  { id: 'derivative', label: 'Derivative', icon: 'dⲭ' },
  { id: 'integral', label: 'Integral', icon: '∫' },
  { id: 'limit', label: 'Limit', icon: 'lim' },
];

export default function ModeSelector({ mode, onChange }) {
  return (
    <div className="mode-selector">
      {MODES.map((m) => (
        <button
          key={m.id}
          className={`mode-btn ${mode === m.id ? 'active' : ''}`}
          onClick={() => onChange(m.id)}
          title={m.label}
        >
          <span className="mode-icon">{m.icon}</span>
          <span className="mode-label">{m.label}</span>
        </button>
      ))}
    </div>
  );
}
