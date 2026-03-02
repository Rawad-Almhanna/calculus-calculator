import { useState, useCallback } from 'react';
import ModeSelector from './components/ModeSelector';
import ExpressionInput from './components/ExpressionInput';
import QuickInsertBar from './components/QuickInsertBar';
import ResultDisplay from './components/ResultDisplay';
import HistoryPanel from './components/HistoryPanel';
import {
  evalExpression,
  computeDerivative,
  computeIntegral,
  computeLimit,
} from './utils/mathEngine';
import './App.css';

export default function App() {
  const [mode, setMode] = useState('evaluate');
  const [expression, setExpression] = useState('');
  const [variable, setVariable] = useState('x');
  const [lowerBound, setLowerBound] = useState('');
  const [upperBound, setUpperBound] = useState('');
  const [limitPoint, setLimitPoint] = useState('');
  const [limitDirection, setLimitDirection] = useState('both');
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [history, setHistory] = useState([]);

  const handleInsert = useCallback(
    (text) => setExpression((prev) => prev + text),
    []
  );

  const handleCalculate = useCallback(() => {
    if (!expression.trim()) return;

    setError(null);
    setResult(null);

    try {
      let res;
      switch (mode) {
        case 'evaluate':
          res = evalExpression(expression);
          break;
        case 'derivative':
          res = computeDerivative(expression, variable);
          break;
        case 'integral':
          if (!lowerBound || !upperBound) {
            setError('Please provide both lower and upper bounds.');
            return;
          }
          res = computeIntegral(expression, variable, lowerBound, upperBound);
          break;
        case 'limit':
          if (!limitPoint) {
            setError('Please provide the point to approach.');
            return;
          }
          res = computeLimit(expression, variable, limitPoint, limitDirection);
          break;
        default:
          return;
      }

      setResult(String(res));
      setHistory((prev) => [
        { mode, expression, result: String(res) },
        ...prev.slice(0, 19),
      ]);
    } catch (err) {
      setError(err.message);
    }
  }, [mode, expression, variable, lowerBound, upperBound, limitPoint, limitDirection]);

  const handleHistorySelect = useCallback((item) => {
    setMode(item.mode);
    setExpression(item.expression);
    setResult(item.result);
    setError(null);
  }, []);

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>
          <span className="logo-icon">∑</span> Calculus Calculator
        </h1>
        <p className="subtitle">
          Arithmetic &middot; Trigonometry &middot; Derivatives &middot; Integrals &middot; Limits
        </p>
      </header>

      <main className="calculator-card">
        <ModeSelector mode={mode} onChange={setMode} />
        <QuickInsertBar onInsert={handleInsert} />
        <ExpressionInput
          mode={mode}
          expression={expression}
          setExpression={setExpression}
          variable={variable}
          setVariable={setVariable}
          lowerBound={lowerBound}
          setLowerBound={setLowerBound}
          upperBound={upperBound}
          setUpperBound={setUpperBound}
          limitPoint={limitPoint}
          setLimitPoint={setLimitPoint}
          limitDirection={limitDirection}
          setLimitDirection={setLimitDirection}
          onCalculate={handleCalculate}
        />
        <ResultDisplay
          result={result}
          error={error}
          mode={mode}
          expression={expression}
        />
      </main>

      <HistoryPanel history={history} onSelect={handleHistorySelect} />

      <footer className="app-footer">
        Powered by <a href="https://mathjs.org" target="_blank" rel="noreferrer">math.js</a>
      </footer>
    </div>
  );
}
