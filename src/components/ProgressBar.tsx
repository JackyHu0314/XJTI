interface Props {
  current: number; // 已答题数（0-based）
  total: number;
  currentQuestion: number; // 当前题号（1-based，用于显示）
}

export default function ProgressBar({ current, total, currentQuestion }: Props) {
  const fraction = Math.max(0, Math.min(1, current / total));
  const padded = (n: number) => n.toString().padStart(2, '0');

  return (
    <div className="progress">
      <div className="progress__meta">
        <span>{padded(currentQuestion)} / {padded(total)}</span>
        <span>{Math.round(fraction * 100)}%</span>
      </div>
      <div className="progress__bar" aria-hidden>
        <div
          className="progress__fill"
          style={{ transform: `scaleX(${fraction})` }}
        />
      </div>
    </div>
  );
}
