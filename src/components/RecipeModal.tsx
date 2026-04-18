import { useEffect } from 'react';
import { RECIPES } from '../data/recipes';
import type { PersonalityCode } from '../types';

interface Props {
  code: PersonalityCode;
  onClose: () => void;
}

export default function RecipeModal({ code, onClose }: Props) {
  const recipes = RECIPES[code];

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [onClose]);

  return (
    <div className="recipe-overlay" onClick={onClose} role="dialog" aria-modal="true">
      <div className="recipe-modal" onClick={(e) => e.stopPropagation()}>
        <div className="recipe-modal__header">
          <span className="recipe-modal__title">你的专属食谱</span>
          <button className="recipe-modal__close" onClick={onClose} type="button" aria-label="关闭">✕</button>
        </div>
        <div className="recipe-modal__grid">
          {recipes.map((r) => (
            <div className="recipe-card" key={r.name}>
              <div className="recipe-card__emoji">{r.emoji}</div>
              <div className="recipe-card__body">
                <div className="recipe-card__name">{r.name}</div>
                <div className="recipe-card__rating">{r.rating}</div>
                <div className="recipe-card__comment">{r.comment}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
