import { evaluate, derivative, parse, simplify } from 'mathjs';

export function evalExpression(expr) {
  try {
    const result = evaluate(expr);
    if (typeof result === 'function') {
      return 'Please provide a complete expression to evaluate.';
    }
    return formatResult(result);
  } catch (err) {
    throw new Error(cleanError(err.message));
  }
}

export function computeDerivative(expr, variable = 'x') {
  try {
    const d = derivative(expr, variable);
    const simplified = simplify(d).toString();
    return simplified;
  } catch (err) {
    throw new Error(cleanError(err.message));
  }
}

export function computeIntegral(expr, variable = 'x', a, b, n = 10000) {
  try {
    const node = parse(expr);
    const compiled = node.compile();
    const lower = evaluate(String(a));
    const upper = evaluate(String(b));

    if (!isFinite(lower) || !isFinite(upper)) {
      throw new Error('Bounds must be finite numbers.');
    }

    const h = (upper - lower) / n;
    let sum = evalAt(compiled, variable, lower) + evalAt(compiled, variable, upper);

    for (let i = 1; i < n; i++) {
      const x = lower + i * h;
      const coeff = i % 2 === 0 ? 2 : 4;
      sum += coeff * evalAt(compiled, variable, x);
    }

    const result = (h / 3) * sum;
    return formatResult(result);
  } catch (err) {
    if (err.message.includes('Bounds') || err.message.includes('finite')) throw err;
    throw new Error(cleanError(err.message));
  }
}

export function computeLimit(expr, variable = 'x', point, direction = 'both') {
  try {
    const node = parse(expr);
    const compiled = node.compile();
    const target = evaluate(String(point));

    const deltas = [1e-2, 1e-4, 1e-6, 1e-8, 1e-10, 1e-12];

    if (direction === 'left' || direction === 'both') {
      var leftVals = deltas.map(d => evalAt(compiled, variable, target - d));
    }
    if (direction === 'right' || direction === 'both') {
      var rightVals = deltas.map(d => evalAt(compiled, variable, target + d));
    }

    if (direction === 'left') {
      return formatLimit(leftVals);
    }
    if (direction === 'right') {
      return formatLimit(rightVals);
    }

    const leftLimit = convergeTo(leftVals);
    const rightLimit = convergeTo(rightVals);

    if (leftLimit === null || rightLimit === null) {
      return 'Does not exist (diverges)';
    }

    if (Math.abs(leftLimit - rightLimit) < 1e-4) {
      return formatResult((leftLimit + rightLimit) / 2);
    }

    return `Does not exist (left = ${formatResult(leftLimit)}, right = ${formatResult(rightLimit)})`;
  } catch (err) {
    throw new Error(cleanError(err.message));
  }
}

function evalAt(compiled, variable, value) {
  return compiled.evaluate({ [variable]: value });
}

function convergeTo(values) {
  const last = values[values.length - 1];
  if (!isFinite(last)) return null;
  return last;
}

function formatLimit(values) {
  const last = values[values.length - 1];
  if (!isFinite(last)) return 'Does not exist (diverges)';
  return formatResult(last);
}

function formatResult(value) {
  if (typeof value === 'object' && value.toString) {
    return value.toString();
  }
  if (typeof value === 'number') {
    if (Number.isInteger(value)) return String(value);
    const rounded = parseFloat(value.toPrecision(10));
    return String(rounded);
  }
  return String(value);
}

function cleanError(msg) {
  return msg.replace(/^Error:\s*/i, '').replace(/\(char \d+\)/, '').trim();
}
