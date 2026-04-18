import type { Answers, Result } from '../types';

const ANSWERS_KEY = 'xjti:answers';
const RESULT_KEY = 'xjti:result';

export function saveAnswers(answers: Answers): void {
  sessionStorage.setItem(ANSWERS_KEY, JSON.stringify(answers));
}

export function loadAnswers(totalQuestions: number): Answers {
  const raw = sessionStorage.getItem(ANSWERS_KEY);
  if (!raw) return Array(totalQuestions).fill(null);
  try {
    const parsed = JSON.parse(raw) as Answers;
    if (Array.isArray(parsed) && parsed.length === totalQuestions) return parsed;
  } catch {
    // fall through
  }
  return Array(totalQuestions).fill(null);
}

export function clearAnswers(): void {
  sessionStorage.removeItem(ANSWERS_KEY);
}

export function saveResult(result: Result): void {
  sessionStorage.setItem(RESULT_KEY, JSON.stringify(result));
}

export function loadResult(): Result | null {
  const raw = sessionStorage.getItem(RESULT_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as Result;
  } catch {
    return null;
  }
}

export function clearResult(): void {
  sessionStorage.removeItem(RESULT_KEY);
}
