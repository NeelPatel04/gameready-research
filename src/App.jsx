import { useState, useEffect } from "react";
import "./App.css";
import { calculateReadiness, validate } from "./readiness";

const DEFAULTS = {
  sleep: "7",
  energy: "Medium",
  soreness: "Medium",
  stress: "Medium",
  hydration: "Medium",
  time: "45",
};

const STORAGE_KEY = "gameready-history";

function loadHistory() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  } catch {
    return [];
  }
}

function LevelSelect({ label, value, onChange, options }) {
  return (
    <label>
      {label}
      <select value={value} onChange={(e) => onChange(e.target.value)}>
        {options.map((o) => (
          <option key={o}>{o}</option>
        ))}
      </select>
    </label>
  );
}

function App() {
  const [form, setForm] = useState(DEFAULTS);
  const [errors, setErrors] = useState({});
  const [result, setResult] = useState(null);
  const [history, setHistory] = useState(loadHistory);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
  }, [history]);

  const update = (field) => (value) => setForm((f) => ({ ...f, [field]: value }));

  function handleSubmit() {
    const found = validate(form);
    setErrors(found);
    if (Object.keys(found).length > 0) {
      setResult(null);
      return;
    }
    const r = calculateReadiness(form);
    setResult(r);
    setHistory((h) =>
      [{ id: Date.now(), date: new Date().toLocaleString(), title: r.title, percent: r.percent, level: r.level }, ...h].slice(0, 10)
    );
  }

  function handleReset() {
    setForm(DEFAULTS);
    setErrors({});
    setResult(null);
  }

  return (
    <main>
      <header>
        <h1>GameReady</h1>
        <p>Daily athlete readiness check-in</p>
      </header>

      <section className="card">
        <h2>How are you feeling today?</h2>

        <label>
          Hours of sleep
          <input type="number" min="0" max="14" step="0.5" value={form.sleep} onChange={(e) => update("sleep")(e.target.value)} />
          {errors.sleep && <span className="error">{errors.sleep}</span>}
        </label>

        <LevelSelect label="Energy level" value={form.energy} onChange={update("energy")} options={["High", "Medium", "Low"]} />
        <LevelSelect label="Muscle soreness" value={form.soreness} onChange={update("soreness")} options={["Low", "Medium", "High"]} />
        <LevelSelect label="Stress level" value={form.stress} onChange={update("stress")} options={["Low", "Medium", "High"]} />
        <LevelSelect label="Hydration today" value={form.hydration} onChange={update("hydration")} options={["High", "Medium", "Low"]} />

        <label>
          Time available (minutes)
          <input type="number" min="0" max="180" value={form.time} onChange={(e) => update("time")(e.target.value)} />
          {errors.time && <span className="error">{errors.time}</span>}
        </label>

        <div className="actions">
          <button onClick={handleSubmit}>Get my recommendation</button>
          <button className="secondary" onClick={handleReset}>Reset</button>
        </div>
      </section>

      {result && (
        <section className={`result ${result.level}`}>
          <h2>{result.title}</h2>
          <div className="meter" role="img" aria-label={`Readiness ${result.percent} percent`}>
            <div className="meter-fill" style={{ width: `${result.percent}%` }} />
          </div>
          <p className="score">Readiness: {result.percent}% ({result.score}/{result.max})</p>
          <p>{result.text}</p>
          {result.tips.length > 0 && (
            <ul>
              {result.tips.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
          )}
        </section>
      )}

      <section className="card">
        <div className="history-head">
          <h2>Recent check-ins</h2>
          {history.length > 0 && (
            <button className="secondary small" onClick={() => setHistory([])}>Clear</button>
          )}
        </div>
        {history.length === 0 ? (
          <p className="muted">No check-ins yet. Submit one above and it will show up here.</p>
        ) : (
          <ul className="history">
            {history.map((h) => (
              <li key={h.id}>
                <span className={`dot ${h.level}`} />
                <span>{h.title} ({h.percent}%)</span>
                <span className="muted">{h.date}</span>
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  );
}

export default App;