const SYMBOLS = [
  { label: 'π', insert: 'pi' },
  { label: 'e', insert: 'e' },
  { label: '√', insert: 'sqrt(' },
  { label: 'x²', insert: '^2' },
  { label: 'xⁿ', insert: '^' },
  { label: 'sin', insert: 'sin(' },
  { label: 'cos', insert: 'cos(' },
  { label: 'tan', insert: 'tan(' },
  { label: 'ln', insert: 'log(' },
  { label: 'log₁₀', insert: 'log10(' },
  { label: '|x|', insert: 'abs(' },
  { label: '1/x', insert: '1/' },
  { label: 'asin', insert: 'asin(' },
  { label: 'acos', insert: 'acos(' },
  { label: 'atan', insert: 'atan(' },
];

export default function QuickInsertBar({ onInsert }) {
  return (
    <div className="quick-insert-bar">
      {SYMBOLS.map((s) => (
        <button
          key={s.label}
          className="quick-btn"
          onClick={() => onInsert(s.insert)}
          title={`Insert ${s.insert}`}
        >
          {s.label}
        </button>
      ))}
    </div>
  );
}
