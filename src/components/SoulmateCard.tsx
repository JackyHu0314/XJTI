import { PERSONALITIES } from '../data/personalities';
import type { PersonalityCode } from '../types';

interface Props {
  code: PersonalityCode;
}

export default function SoulmateCard({ code }: Props) {
  const p = PERSONALITIES[code];
  return (
    <div className="soulmate">
      <span className="soulmate__code">{p.code}</span>
      <span className="soulmate__title">{p.title}</span>
    </div>
  );
}
