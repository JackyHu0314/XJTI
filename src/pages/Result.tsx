import { useCallback, useRef, useState } from 'react';
import html2canvas from 'html2canvas';
import RadarChart from '../components/RadarChart';
import SoulmateCard from '../components/SoulmateCard';
import { PERSONALITIES } from '../data/personalities';
import type { Result } from '../types';

const OUTRO_TEXT = `交大很大，容得下硬核的极客，也装得下浪漫的慢行者。
不管你是哪一种人格，都是这所百廿学府里不可或缺的色彩。
长安道远，愿你在交大，找到自己的节奏，闪闪发光。`;

const SITE_URL = 'xjti.top';

function buildShareText(code: string, title: string, tagline: string, soulmates: string[]): string {
  return `我在 XJTI 西安交大人格测试中测出了——

${code} · ${title}
「${tagline}」

灵魂搭子：${soulmates.join(' / ')}

13 道题，70 个切片，130 年交大基因。
你是哪种交大人？→ ${SITE_URL}`;
}

interface Props {
  result: Result;
  onRestart: () => void;
}

export default function ResultView({ result, onRestart }: Props) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [downloading, setDownloading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [showChinese, setShowChinese] = useState(false);

  const personality = PERSONALITIES[result.primary];

  const downloadPoster = useCallback(async () => {
    if (!cardRef.current) return;
    setDownloading(true);
    try {
      const canvas = await html2canvas(cardRef.current, {
        backgroundColor: '#ffffff', scale: 2, useCORS: true,
      });
      const link = document.createElement('a');
      link.download = `XJTI-${personality.code}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    } finally {
      setDownloading(false);
    }
  }, [personality.code]);

  const share = useCallback(async () => {
    const text = buildShareText(
      personality.code, personality.title, personality.tagline,
      personality.soulmates as string[]
    );
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      const el = document.createElement('textarea');
      el.value = text;
      el.style.cssText = 'position:fixed;opacity:0';
      document.body.appendChild(el);
      el.select();
      document.execCommand('copy');
      document.body.removeChild(el);
    }
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2200);
  }, [personality]);

  return (
    <section className="result">
      <div ref={cardRef} className="result__card">
        <div className="result__code">{personality.code}</div>
        <h2 className="result__title">{personality.title}</h2>
        <p className="result__tagline">— {personality.tagline}</p>
        <div className="result__divider" />
        <p className="result__description">{personality.description}</p>

        {/* 雷达图 */}
        <div style={{ marginTop: 20 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
            <div className="result__section-title" style={{ marginBottom: 0 }}>人格雷达</div>
            <button
              type="button"
              className="translate-btn"
              onClick={() => setShowChinese((v) => !v)}
              title={showChinese ? '切换到英文代码' : '切换到中文'}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 8l6 6M4 14l6-6 2-3M2 5h12M7 2h1M22 22l-5-10-5 10M14.5 18h6.5"/>
              </svg>
              {showChinese ? '中' : 'EN'}
            </button>
          </div>
          <div className="result__radar">
            <RadarChart scores={result.scores} highlight={personality.code} size={300} showChinese={showChinese} />
          </div>
        </div>

        {/* 灵魂搭子 */}
        <div style={{ marginTop: 16 }}>
          <div className="result__section-title">灵魂搭子</div>
          <div className="soulmates">
            {personality.soulmates.map((code) => (
              <SoulmateCard key={code} code={code} />
            ))}
          </div>
        </div>

        <div style={{ marginTop: 16 }}>
          <p className="result__outro">{OUTRO_TEXT}</p>
        </div>
      </div>

      {/* 操作按钮 */}
      <div className="result__actions">
        <button
          type="button"
          className={`btn-share ${copied ? 'btn-share--copied' : ''}`}
          onClick={share}
        >
          {copied ? '✓ 已复制，去分享吧' : '一键分享'}
        </button>
        <div className="result__actions-row">
          <button type="button" className="btn-icon" onClick={downloadPoster} disabled={downloading} title="保存图片">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
              <polyline points="7 10 12 15 17 10"/>
              <line x1="12" y1="15" x2="12" y2="3"/>
            </svg>
          </button>
          <button type="button" className="btn-icon btn-icon--secondary" onClick={onRestart} title="重新测试">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="23 4 23 10 17 10"/>
              <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/>
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
