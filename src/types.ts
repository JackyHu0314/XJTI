export const PERSONALITY_CODES = [
  'WISE', 'BARK', 'RISE', 'DAWN', 'GENT',
  'RUSH', 'MEAL', 'QUIE-T', 'DDLS', 'LIB-ER'
] as const;

export type PersonalityCode = typeof PERSONALITY_CODES[number];

export type Weights = Partial<Record<PersonalityCode, number>>;

export interface Personality {
  code: PersonalityCode;
  title: string;
  tagline: string;
  description: string;
  soulmates: PersonalityCode[];
}

export interface Option {
  text: string;
  weights: Weights;
}

export interface Question {
  id: number;
  scene: string;
  prompt: string;
  options: {
    A: Option;
    B: Option;
  };
}

export type Choice = 'A' | 'B';

export type Answers = (Choice | null)[];

export type Scores = Record<PersonalityCode, number>;

export interface Result {
  scores: Scores;
  primary: PersonalityCode;
  ties: PersonalityCode[];
}
