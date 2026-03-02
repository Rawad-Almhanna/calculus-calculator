export default function ExpressionInput({
  mode,
  expression,
  setExpression,
  variable,
  setVariable,
  lowerBound,
  setLowerBound,
  upperBound,
  setUpperBound,
  limitPoint,
  setLimitPoint,
  limitDirection,
  setLimitDirection,
  onCalculate,
}) {
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') onCalculate();
  };

  const placeholder = {
    evaluate: 'e.g.  3^2 + sin(pi/4)  or  sqrt(144)',
    derivative: 'e.g.  3*x^2 + sin(x)  or  x^3 * ln(x)',
    integral: 'e.g.  x^2  or  sin(x) + cos(x)',
    limit: 'e.g.  sin(x)/x  or  (x^2 - 1)/(x - 1)',
  };

  return (
    <div className="input-section">
      <div className="main-input-row">
        <input
          type="text"
          className="expression-input"
          value={expression}
          onChange={(e) => setExpression(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder[mode]}
          autoFocus
        />
      </div>

      {mode !== 'evaluate' && (
        <div className="param-row">
          <label>
            Variable
            <input
              type="text"
              className="param-input small"
              value={variable}
              onChange={(e) => setVariable(e.target.value)}
              maxLength={1}
            />
          </label>
        </div>
      )}

      {mode === 'integral' && (
        <div className="param-row">
          <label>
            Lower bound
            <input
              type="text"
              className="param-input"
              value={lowerBound}
              onChange={(e) => setLowerBound(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="a"
            />
          </label>
          <label>
            Upper bound
            <input
              type="text"
              className="param-input"
              value={upperBound}
              onChange={(e) => setUpperBound(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="b"
            />
          </label>
        </div>
      )}

      {mode === 'limit' && (
        <div className="param-row">
          <label>
            Approaching
            <input
              type="text"
              className="param-input"
              value={limitPoint}
              onChange={(e) => setLimitPoint(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="e.g. 0, pi, inf"
            />
          </label>
          <label>
            Direction
            <select
              className="param-input"
              value={limitDirection}
              onChange={(e) => setLimitDirection(e.target.value)}
            >
              <option value="both">Both sides</option>
              <option value="left">From left (⁻)</option>
              <option value="right">From right (⁺)</option>
            </select>
          </label>
        </div>
      )}

      <button className="calculate-btn" onClick={onCalculate}>
        Calculate
      </button>
    </div>
  );
}
