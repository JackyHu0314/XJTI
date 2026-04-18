import { useCallback, useRef, useState } from 'react';
import type { CSSProperties } from 'react';
import { createPortal } from 'react-dom';
import html2canvas from 'html2canvas';
import RadarChart from '../components/RadarChart';
import SoulmateCard from '../components/SoulmateCard';
import RecipeModal from '../components/RecipeModal';
import { PERSONALITIES } from '../data/personalities';
import { PERSONALITY_CODES } from '../types';
import type { Result } from '../types';

const SITE_URL = 'http://www.xjti.top/';

const STAR_CHARS = ['★', '✦', '✧', '⋆', '✨'];
const FOOD_CHARS = ['🍜', '🥟', '🍚', '🍗', '🍔', '🥢', '🍳', '🥬', '🌶️', '🍖', '🍅', '🍱', '🍲'];

interface Particle {
  id: number;
  left: number;
  size: number;
  duration: number;
  delay: number;
  char: string;
  color?: string;
  glow?: string;
}

interface Leaf {
  id: number;
  left: number;
  size: number;
  duration: number;
  delay: number;
  swayDur: number;
  rotateEnd: number;
  hue: string;
  warning: boolean;
}

const GOLD_COLOR = '#f5c84c';
const GOLD_GLOW = 'rgba(255, 200, 80, 0.7)';

const RAINBOW_PALETTE: Array<[string, string]> = [
  ['#ff5a5a', 'rgba(255, 90, 90, 0.75)'],
  ['#ff9a3a', 'rgba(255, 154, 58, 0.75)'],
  ['#ffd93a', 'rgba(255, 217, 58, 0.8)'],
  ['#2ecc71', 'rgba(46, 204, 113, 0.7)'],
  ['#3aa0e0', 'rgba(58, 160, 224, 0.75)'],
  ['#4e6cff', 'rgba(78, 108, 255, 0.75)'],
  ['#9c4cf0', 'rgba(156, 76, 240, 0.75)'],
];

const LEAF_HUES = ['#c88b3a', '#d9a24a', '#b56a2b', '#e2b351', '#8a5a2b', '#caa052'];

const LEAF_SVG = 'M32 4 C40 14, 50 18, 58 22 C48 30, 40 40, 34 58 C30 42, 22 32, 8 26 C18 22, 26 14, 32 4 Z';

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
  const radarRef = useRef<HTMLDivElement>(null);
  const [downloading, setDownloading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [showChinese, setShowChinese] = useState(false);
  const [particles, setParticles] = useState<Particle[]>([]);
  const particleIdRef = useRef(0);
  const [leaves, setLeaves] = useState<Leaf[]>([]);
  const leafIdRef = useRef(0);
  const [turtleKey, setTurtleKey] = useState(0);
  const [radarSpread, setRadarSpread] = useState<{ id: number; cx: number; cy: number; r: number } | null>(null);
  const [radarMaxed, setRadarMaxed] = useState(false);
  const [showRecipe, setShowRecipe] = useState(false);

  const personality = PERSONALITIES[result.primary];
  const isMeal = personality.code === 'MEAL';

  const rainStars = useCallback(() => {
    const batch: Particle[] = Array.from({ length: 80 }, () => ({
      id: particleIdRef.current++,
      left: Math.random() * 100,
      size: 14 + Math.random() * 22,
      duration: 4.5 + Math.random() * 3.5,
      delay: Math.random() * 2.5,
      char: STAR_CHARS[Math.floor(Math.random() * STAR_CHARS.length)],
      color: GOLD_COLOR,
      glow: GOLD_GLOW,
    }));
    setParticles((prev) => [...prev, ...batch]);
  }, []);

  const rainRainbowStars = useCallback(() => {
    const batch: Particle[] = Array.from({ length: 90 }, () => {
      const [color, glow] = RAINBOW_PALETTE[Math.floor(Math.random() * RAINBOW_PALETTE.length)];
      return {
        id: particleIdRef.current++,
        left: Math.random() * 100,
        size: 14 + Math.random() * 22,
        duration: 4.5 + Math.random() * 3.5,
        delay: Math.random() * 2.5,
        char: STAR_CHARS[Math.floor(Math.random() * STAR_CHARS.length)],
        color,
        glow,
      };
    });
    setParticles((prev) => [...prev, ...batch]);
  }, []);

  const rainFood = useCallback(() => {
    const batch: Particle[] = Array.from({ length: 60 }, () => ({
      id: particleIdRef.current++,
      left: Math.random() * 100,
      size: 22 + Math.random() * 18,
      duration: 4.5 + Math.random() * 3.5,
      delay: Math.random() * 2.5,
      char: FOOD_CHARS[Math.floor(Math.random() * FOOD_CHARS.length)],
    }));
    setParticles((prev) => [...prev, ...batch]);
  }, []);

  const removeParticle = useCallback((id: number) => {
    setParticles((prev) => prev.filter((s) => s.id !== id));
  }, []);

  const dropLeaves = useCallback(() => {
    const batch: Leaf[] = Array.from({ length: 12 }, (_, i) => ({
      id: leafIdRef.current++,
      left: Math.random() * 95 + 2,
      size: 28 + Math.random() * 16,
      duration: 6 + Math.random() * 3,
      delay: Math.random() * 2,
      swayDur: 2.4 + Math.random() * 1.6,
      rotateEnd: 360 + Math.random() * 360,
      hue: LEAF_HUES[Math.floor(Math.random() * LEAF_HUES.length)],
      warning: i === Math.floor(Math.random() * 12),
    }));
    setLeaves((prev) => [...prev, ...batch]);
  }, []);

  const removeLeaf = useCallback((id: number) => {
    setLeaves((prev) => prev.filter((l) => l.id !== id));
  }, []);

  const walkTurtle = useCallback(() => {
    setTurtleKey((k) => (k !== 0 ? k : Date.now()));
  }, []);

  const spreadCodes = useCallback(() => {
    if (!radarRef.current) return;
    const svg = radarRef.current.querySelector('svg');
    if (!svg) return;
    const rect = svg.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    // RadarChart viewBox 300×300, 标签圆周半径 labelR = radius(98) + 28 = 126
    const sizePx = Math.min(rect.width, rect.height);
    const r = (sizePx / 2) * (126 / 150);
    setRadarSpread({ id: Date.now(), cx, cy, r });

    // 同时触发雷达图拉满
    setRadarMaxed(true);
    setTimeout(() => setRadarMaxed(false), 1500);
  }, []);

  const downloadPoster = useCallback(async () => {
    if (!cardRef.current) return;
    setDownloading(true);
    try {
      // 9:16 海报尺寸
      const W = 1080;
      const H = 1920;

      const cardCanvas = await html2canvas(cardRef.current, {
        backgroundColor: '#ffffff',
        scale: 2,
        useCORS: true,
      });

      const poster = document.createElement('canvas');
      poster.width = W;
      poster.height = H;
      const ctx = poster.getContext('2d')!;

      // 白底 + 网格背景
      ctx.fillStyle = '#F3F3F3';
      ctx.fillRect(0, 0, W, H);
      ctx.strokeStyle = '#E1E1E1';
      ctx.lineWidth = 1;
      const grid = 55;
      for (let x = 0; x <= W; x += grid) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke(); }
      for (let y = 0; y <= H; y += grid) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke(); }

      // 居中放卡片
      const cardW = Math.min(cardCanvas.width, W - 80);
      const cardH = cardCanvas.height * (cardW / cardCanvas.width);
      const cardX = (W - cardW) / 2;
      const cardY = (H - cardH) / 2;
      ctx.drawImage(cardCanvas, cardX, cardY, cardW, cardH);

      // 底部署名
      ctx.fillStyle = '#a3a3a3';
      ctx.font = '28px ui-monospace, Menlo, monospace';
      ctx.textAlign = 'center';
      ctx.fillText('XJTI · xjti.top', W / 2, H - 60);

      const link = document.createElement('a');
      link.download = `XJTI-${personality.code}.jpg`;
      link.href = poster.toDataURL('image/jpeg', 0.92);
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
        <div
          className={`result__code${isMeal ? ' result__code--meal' : ''} result__code--clickable`}
          onClick={isMeal ? rainFood : () => setShowRecipe(true)}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); isMeal ? rainFood() : setShowRecipe(true); } }}
          title="查看专属食谱"
        >
          {personality.code}
        </div>
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
          <div className="result__radar" ref={radarRef} onDoubleClick={spreadCodes}>
            <RadarChart scores={result.scores} highlight={personality.code} size={300} showChinese={showChinese} maxed={radarMaxed} />
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
          <p className="result__outro">
            <strong>交大</strong>很大{'\n'}
            容得下硬核的<strong>极客</strong>{'\n'}
            也装得下浪漫的
            <strong
              className="outro-leaves"
              onClick={dropLeaves}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); dropLeaves(); } }}
            >
              慢行者
            </strong>
            {'\n'}
            {'\n'}
            不管你是哪一种<strong>人格</strong>{'\n'}
            都是这所百廿<strong>学府</strong>里不可或缺的
            <strong
              className="outro-rainbow"
              onClick={rainRainbowStars}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); rainRainbowStars(); } }}
            >
              色彩
            </strong>
            {'\n'}
            {'\n'}
            <strong
              className="outro-turtle"
              onClick={walkTurtle}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); walkTurtle(); } }}
            >
              长安
            </strong>
            道远{'\n'}
            愿你在<strong>交大</strong>{'\n'}
            找到<strong>自己</strong>的节奏{'\n'}
            <strong
              className="outro-shine"
              onClick={rainStars}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); rainStars(); } }}
            >
              闪闪发光
            </strong>
          </p>
        </div>
      </div>

      {particles.length > 0 && createPortal(
        <div className="star-rain" aria-hidden="true">
          {particles.map((s) => {
            const style: CSSProperties = {
              left: `${s.left}%`,
              fontSize: `${s.size}px`,
              animationDuration: `${s.duration}s`,
              animationDelay: `${s.delay}s`,
            };
            if (s.color) style.color = s.color;
            if (s.glow) style.textShadow = `0 0 10px ${s.glow}, 0 0 4px ${s.glow}`;
            return (
              <span
                key={s.id}
                className="star-rain__star"
                style={style}
                onAnimationEnd={() => removeParticle(s.id)}
              >
                {s.char}
              </span>
            );
          })}
        </div>,
        document.body
      )}

      {leaves.length > 0 && createPortal(
        <div className="leaf-rain" aria-hidden="true">
          {leaves.map((l) => (
            <span
              key={l.id}
              className="leaf-rain__leaf"
              style={{
                left: `${l.left}%`,
                animationDuration: `${l.duration}s`,
                animationDelay: `${l.delay}s`,
                ['--rot-end' as string]: `${l.rotateEnd}deg`,
                ['--sway-dur' as string]: `${l.swayDur}s`,
              } as CSSProperties}
              onAnimationEnd={(e) => { if (e.currentTarget === e.target) removeLeaf(l.id); }}
            >
              <span className="leaf-rain__sway">
                <svg width={l.size} height={l.size} viewBox="0 0 64 64" fill={l.hue}>
                  <path d={LEAF_SVG} stroke="#7a4b1e" strokeWidth="1" strokeOpacity="0.4" />
                </svg>
                {l.warning && <span className="leaf-rain__warning">⚠ 小心头顶</span>}
              </span>
            </span>
          ))}
        </div>,
        document.body
      )}

      {turtleKey !== 0 && createPortal(
        <div
          key={turtleKey}
          className="turtle-walk"
          aria-hidden="true"
          onAnimationEnd={() => setTurtleKey(0)}
        >
          <span className="turtle-walk__body">
            <span className="turtle-walk__bubble">真的很远……</span>
            🐢
          </span>
        </div>,
        document.body
      )}

      {radarSpread && createPortal(
        <div className="radar-spread" aria-hidden="true">
          {PERSONALITY_CODES.map((code, i) => {
            const a = -Math.PI / 2 + (2 * Math.PI * i) / PERSONALITY_CODES.length;
            const tx = Math.cos(a) * radarSpread.r;
            const ty = Math.sin(a) * radarSpread.r;
            return (
              <span
                key={code}
                className="radar-spread__code"
                style={{
                  left: `${radarSpread.cx}px`,
                  top: `${radarSpread.cy}px`,
                  ['--tx' as string]: `${tx}px`,
                  ['--ty' as string]: `${ty}px`,
                } as CSSProperties}
                onAnimationEnd={i === 0 ? () => setRadarSpread(null) : undefined}
              >
                {code}
              </span>
            );
          })}
        </div>,
        document.body
      )}


      {showRecipe && <RecipeModal code={personality.code} onClose={() => setShowRecipe(false)} />}

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
