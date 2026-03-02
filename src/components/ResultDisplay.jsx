export default function ResultDisplay({ result, error, mode, expression }) {
  if (error) {
    return (
      <div className="result-display error">
        <div className="result-label">Error</div>
        <div className="result-value error-text">{error}</div>
      </div>
    );
  }

  if (result === null) {
    return (
      <div className="result-display empty">
        <div className="result-placeholder">
          Enter an expression above and press Calculate
        </div>
      </div>
    );
  }

  const modeLabels = {
    evaluate: 'Result',
    derivative: 'Derivative',
    integral: 'Definite Integral',
    limit: 'Limit',
  };

  return (
    <div className="result-display">
      <div className="result-label">{modeLabels[mode]}</div>
      {mode === 'derivative' && expression && (
        <div className="result-sub">d/dx [{expression}]</div>
      )}
      <div className="result-value">{result}</div>
    </div>
  );
}
