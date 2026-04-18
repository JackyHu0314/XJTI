import { PERSONALITY_CODES } from '../types';
import type { PersonalityCode, Scores } from '../types';

// 中文译名（完整）
const CN_MAP: Record<PersonalityCode, string> = {
  WISE:     '踏实治学',
  BARK:     '梧桐慢行',
  RISE:     '操场活力',
  DAWN:     '晨光自律',
  GENT:     '志愿温柔',
  RUSH:     '赶课特种兵',
  MEAL:     '干饭优先',
  'QUIE-T': '独处静养',
  DDLS:     '任务堆叠',
  'LIB-ER': '钱图常驻',
};

interface Props {
  scores: Scores;
  size?: number;
  highlight?: PersonalityCode;
  showChinese?: boolean; // 是否显示中文
}

const PADDING = 52;
const RING_COUNT = 4;

export default function RadarChart({ scores, size = 300, highlight, showChinese = false }: Props) {
  const cx = size / 2;
  const cy = size / 2;
  const radius = size / 2 - PADDING;
  const codes = PERSONALITY_CODES;
  const n = codes.length;

  const maxScore = Math.max(2, ...Object.values(scores));
  const angleFor = (i: number) => (-Math.PI / 2) + (2 * Math.PI * i) / n;
  const axisEnd = (i: number) => {
    const a = angleFor(i);
    return { x: cx + radius * Math.cos(a), y: cy + radius * Math.sin(a) };
  };
  const pointFor = (i: number, value: number) => {
    const a = angleFor(i);
    const r = radius * (value / maxScore);
    return { x: cx + r * Math.cos(a), y: cy + r * Math.sin(a) };
  };

  const polygonPoints = codes
    .map((code, i) => { const { x, y } = pointFor(i, scores[code]); return `${x.toFixed(2)},${y.toFixed(2)}`; })
    .join(' ');

  const ringPolygons = Array.from({ length: RING_COUNT }, (_, ri) => {
    const frac = (ri + 1) / RING_COUNT;
    return codes.map((_, i) => {
      const a = angleFor(i);
      const r = radius * frac;
      return `${(cx + r * Math.cos(a)).toFixed(2)},${(cy + r * Math.sin(a)).toFixed(2)}`;
    }).join(' ');
  });

  return (
    <svg viewBox={`0 0 ${size} ${size}`} width={size} height={size} role="img" aria-label="10 维人格雷达图" style={{ maxWidth: '100%' }}>
      {ringPolygons.map((pts, i) => (
        <polygon key={i} points={pts} fill="none" stroke="#e5e5e5" strokeWidth={1} />
      ))}
      {codes.map((_, i) => {
        const end = axisEnd(i);
        return <line key={i} x1={cx} y1={cy} x2={end.x.toFixed(2)} y2={end.y.toFixed(2)} stroke="#e5e5e5" strokeWidth={1} />;
      })}
      <polygon points={polygonPoints} fill="#0a0a0a" fillOpacity={0.08} stroke="#0a0a0a" strokeWidth={1.5} strokeLinejoin="round" />
      {codes.map((code, i) => {
        const { x, y } = pointFor(i, scores[code]);
        const isMax = code === highlight;
        return <circle key={code} cx={x} cy={y} r={isMax ? 4 : 2.5} fill={isMax ? '#0a0a0a' : '#ffffff'} stroke="#0a0a0a" strokeWidth={1.5} />;
      })}
      {codes.map((code, i) => {
        const a = angleFor(i);
        const labelR = radius + 28;
        const x = cx + labelR * Math.cos(a);
        const y = cy + labelR * Math.sin(a);
        const isMax = code === highlight;
        const label = showChinese ? CN_MAP[code] : code;
        const fontFamily = showChinese
          ? '"PingFang SC","Noto Sans SC","Microsoft YaHei",sans-serif'
          : 'ui-monospace, SFMono-Regular, Menlo, Consolas, monospace';
        return (
          <text key={code} x={x} y={y} textAnchor="middle" dominantBaseline="middle"
            fontFamily={fontFamily}
            fontSize={11} fontWeight={isMax ? 700 : 400}
            fill={isMax ? '#0a0a0a' : '#8b8b8b'}
          >
            {label}
          </text>
        );
      })}
    </svg>
  );
}
