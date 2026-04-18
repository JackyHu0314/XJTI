import type { Choice, Question } from '../types';

interface Props {
  question: Question;
  selected: Choice | null;
  onSelect: (choice: Choice) => void;
}

export default function QuestionCard({ question, selected, onSelect }: Props) {
  return (
    <div className="question fade-in" key={question.id}>
      <div className="question__scene">{question.scene}</div>
      <h2 className="question__prompt">{question.prompt}</h2>
      <div className="options">
        {(['A', 'B'] as const).map((key) => (
          <button
            key={key}
            type="button"
            className={`option ${selected === key ? 'option--selected' : ''}`}
            onClick={() => onSelect(key)}
            aria-pressed={selected === key}
          >
            <span className="option__key">{key}</span>
            <span>{question.options[key].text}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
