import { PERSONALITY_CODES } from '../types';
import type { Answers, PersonalityCode, Question, Result, Scores } from '../types';

/**
 * 计算测试结果。
 * - 每道题按 `answers[i]` 指定的选项，把 weights 里的分数加到 scores
 * - 分数最高的人格作为 primary；并列时取声明顺序靠前者
 */
export function calculateResult(answers: Answers, questions: Question[]): Result {
  const scores: Scores = Object.fromEntries(
    PERSONALITY_CODES.map((c) => [c, 0])
  ) as Scores;

  answers.forEach((choice, i) => {
    if (!choice) return;
    const question = questions[i];
    if (!question) return;
    const weights = question.options[choice].weights;
    for (const [code, w] of Object.entries(weights) as [PersonalityCode, number][]) {
      scores[code] += w;
    }
  });

  const max = Math.max(...Object.values(scores));
  const ties = (Object.entries(scores) as [PersonalityCode, number][])
    .filter(([, s]) => s === max)
    .map(([code]) => code);

  return { scores, primary: ties[0], ties };
}
