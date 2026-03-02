export default function HistoryPanel({ history, onSelect }) {
  if (history.length === 0) return null;

  return (
    <div className="history-panel">
      <div className="history-title">History</div>
      <div className="history-list">
        {history.map((item, i) => (
          <button
            key={i}
            className="history-item"
            onClick={() => onSelect(item)}
          >
            <span className="history-mode">{item.mode}</span>
            <span className="history-expr">{item.expression}</span>
            <span className="history-result">= {item.result}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
