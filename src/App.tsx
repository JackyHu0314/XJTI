import { useCallback, useState } from 'react';
import Landing from './pages/Landing';
import Quiz from './pages/Quiz';
import ResultView from './pages/Result';
import { clearAnswers, clearResult, loadResult, saveResult } from './lib/storage';
import type { Result } from './types';

type View = 'landing' | 'quiz' | 'result';

export default function App() {
  const [view, setView] = useState<View>(() => {
    const existing = loadResult();
    return existing ? 'result' : 'landing';
  });
  const [result, setResult] = useState<Result | null>(() => loadResult());

  const start = useCallback(() => {
    clearAnswers();
    clearResult();
    setResult(null);
    setView('quiz');
  }, []);

  const finish = useCallback((r: Result) => {
    saveResult(r);
    setResult(r);
    setView('result');
  }, []);

  const restart = useCallback(() => {
    clearAnswers();
    clearResult();
    setResult(null);
    setView('landing');
  }, []);

  return (
    <div className="app">
      <main className="app__main">
        {view === 'landing' && <Landing onStart={start} />}
        {view === 'quiz' && <Quiz onFinish={finish} />}
        {view === 'result' && result && <ResultView result={result} onRestart={restart} />}
      </main>
      <footer className="app__footer">
        <span>XJTI · EST.1896</span>
        <span>1956 → 2026 // 西迁 70th</span>
      </footer>
    </div>
  );
}
