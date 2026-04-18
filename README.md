# XJTI · 西安交大人格测试

13 道题，70 个切片，130 年交大基因。

在庞大的时空坐标系里，定位独属于你的交大基因。

## 在线体验

🔗 [xjti.top](https://xjti.top)

## 技术栈

- React 18 + TypeScript + Vite 5
- 纯 CSS（无 Tailwind / CSS-in-JS）
- SVG 雷达图（无 chart.js）
- html2canvas（结果海报导出）

## 本地运行

```bash
npm install
npm run dev
```

访问 `http://localhost:5173`

## 构建

```bash
npm run build
# 产物在 dist/，直接部署到任意静态托管平台
```

## 部署

### Netlify（推荐）

1. 连接 GitHub 仓库
2. Build command: `npm run build`
3. Publish directory: `dist`
4. 自动部署

### GitHub Pages

```bash
npm run build
# 将 dist/ 推到 gh-pages 分支
```

### Cloudflare Pages

1. 连接 GitHub 仓库
2. Build command: `npm run build`
3. Build output directory: `dist`

## 项目结构

```
src/
├── data/           # 题库 + 人格数据（唯一数据源）
├── lib/            # 计分算法 + sessionStorage
├── pages/          # Landing / Quiz / Result
├── components/     # ProgressBar / QuestionCard / RadarChart / SoulmateCard
└── styles/         # global.css
```

## 10 个人格

| 代码 | 标题 | 一句话 |
|---|---|---|
| WISE | 踏实治学党 | 喧嚣之外的长期主义者 |
| BARK | 梧桐慢行客 | 老校区里的浪漫诗人 |
| RISE | 操场活力派 | 驱散内耗的多巴胺引擎 |
| DAWN | 晨光自律人 | 迎着天光的清醒破局者 |
| GENT | 志愿温柔家 | 饮水思源的传递者 |
| RUSH | 赶课特种兵 | 穿梭在红砖绿瓦间的风 |
| MEAL | 干饭优先人 | 用烟火气治愈一切的乐天派 |
| QUIE-T | 独处静养者 | 隐居在象牙塔里的观察员 |
| DDLS | 任务堆叠者 | 绝地反击的抗压王者 |
| LIB-ER | 钱图常驻者 | 知识殿堂里的守望者 |

## 数字彩蛋

- **13 道题** → 致敬跨越 **130 年**的岁月（1896 → 2026）
- **70 个切片** → 回响 **70 载**西迁的足迹（1956 → 2026）

## License

MIT

---

EST.1896 // 130th · 西迁 70th // XJTU
