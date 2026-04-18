import { useCallback, useEffect, useState } from 'react';
import { QUESTIONS } from '../data/questions';
import { calculateResult } from '../lib/score';
import { loadAnswers, saveAnswers } from '../lib/storage';
import ProgressBar from '../components/ProgressBar';
import QuestionCard from '../components/QuestionCard';
import type { Answers, Choice, Result } from '../types';

interface Props {
  onFinish: (result: Result) => void;
}

export default function Quiz({ onFinish }: Props) {
  const [answers, setAnswers] = useState<Answers>(() => loadAnswers(QUESTIONS.length));
  const [index, setIndex] = useState<number>(() => {
    const loaded = loadAnswers(QUESTIONS.length);
    const first = loaded.findIndex((a) => a === null);
    return first === -1 ? 0 : first;
  });

  useEffect(() => { saveAnswers(answers); }, [answers]);

  const question = QUESTIONS[index];
  const current = answers[index];

  // 计算已答题数
  const answeredCount = answers.filter((a) => a !== null).length;

  const select = useCallback((choice: Choice) => {
    const next: Answers = [...answers];
    next[index] = choice;
    setAnswers(next);

    if (index < QUESTIONS.length - 1) {
      window.setTimeout(() => setIndex(index + 1), 220);
    } else {
      window.setTimeout(() => {
        onFinish(calculateResult(next, QUESTIONS));
      }, 260);
    }
  }, [answers, index, onFinish]);

  const back = useCallback(() => {
    if (index > 0) setIndex(index - 1);
  }, [index]);

  if (!question) return null;

  return (
    <section className="quiz">
      <ProgressBar current={answeredCount} total={QUESTIONS.length} currentQuestion={index + 1} />
      <QuestionCard question={question} selected={current} onSelect={select} />
      <div className="quiz__nav">
        <button type="button" className="btn-ghost" onClick={back} disabled={index === 0}>
          ← 上一题
        </button>
        <span style={{ fontSize: 11, color: 'var(--muted-2)', fontFamily: 'var(--font-mono)', letterSpacing: '0.06em' }}>
          选择后自动进入下一题
        </span>
      </div>
    </section>
  );
}
