# agent_readme.md

给 Claude / 其它 AI agent 看的项目入门说明。人类读者请看 `README.md`。

> **所有操作此仓库的 agent（包括未来的我自己）必须遵守以下硬性责任：**
>
> **1. 主动维护两份文档，不要等用户提醒**
> - **`agent_readme.md`（本文件）**：当目录结构、技术栈、约定、依赖、数据口径发生变化时，**立即更新对应章节**。这是后续 agent 的入口，过时即误导。
> - **`progress.md`**：完成有意义的迭代后（新页面 / 新组件 / 数据结构变更 / 算法调整 / 文案改动 / 删除文件等），**立即追加时间线条目**。日期用绝对日期（YYYY-MM-DD）。
> - 不要在 `progress.md` 里留 `- [ ]` 空 TODO 让用户填——待办由你根据对话总结。
>
> **2. 根据用户对话中的新信息及时更新两份文档**
> 当用户在对话中告诉你新的事实（约定变化、技术决策、个人偏好、新规则、待办、踩坑等），不要只在当前对话里点头答应——**立即把它落到 `agent_readme.md`（约定/规则类）或 `progress.md`（进展/决策类）里**，让下次会话能继续生效。
>
> **3. 保护私人素材，不上传到 GitHub**
> - `文本内容/` 是用户放的原始题库 / 人格文档 / 文案草稿（未公开），**必须被 `.gitignore` 拦住**，不进任何 commit。
> - 看到疑似个人 / 未公开内容（手机号、身份证、私人聊天截图、内部表格等），**先停下来确认**，不要默认 commit。

## 项目概述

**XJTI（西安交大人格测试）** 是一个纯前端的极简校园人格测试网站。

用户进入首页 → 看到欢迎语 + "进入"按钮 → 回答 13 道 A/B 情景题 → 根据加权算法在 10 个人格中给出主人格 → 结果页展示（人格卡片 + 10 维雷达图 + "保存为图片"分享按钮）。

- **使用场景**：做给**学生会**展示/传播。题目与文案要温和、正向，避免任何可能引起争议的话题（绩点焦虑极端化、家庭、恋爱、地域、政治、社交比较等一律不碰）。
- **视觉基调**：极简 Geek、大量留白、冷峻黑白、文字有呼吸感、按钮轻交互、拒绝花里胡哨。
- **移动优先**：学生会的传播主要靠手机分享海报，所有页面必须先在 375px 宽度下看着舒服。

## 视觉参考

- <https://sjti.netlify.app>（上交版，**参考性最大**——首页布局、进度条、题目交互直接看齐）
- <https://jackyhu.top>（用户个人博客，首页"进入"的极简黑白风）
- <https://hechaoyannet.github.io/jbti-test/>
- <https://sbti.unun.dev>

## 技术栈

- **React 18 + TypeScript (strict) + Vite 5**
- **html2canvas**：唯一运行时依赖，用于结果页"保存为图片"
- **雷达图**：纯 SVG 手绘（10 维，不引图表库）
- 不引 React Router（三视图用 `useState` 切换）、不引 Tailwind / chart.js

## 常用命令

```
npm install
npm run dev       # 本地开发（Vite 热更新）
npm run build     # tsc -b && vite build，产物在 dist/
npm run preview   # 本地预览构建产物
npm run typecheck # 仅类型检查（不构建）
```

## 目录结构

```
XJTI/
├── index.html
├── public/
│   └── favicon.svg
├── src/
│   ├── main.tsx            # React 挂载入口
│   ├── App.tsx             # 视图切换根组件（landing / quiz / result）+ 彩蛋提示
│   ├── types.ts            # 全局类型（PersonalityCode / Question / Result …）
│   ├── data/
│   │   ├── questions.ts    # 13 道题（唯一题库）
│   │   ├── personalities.ts# 10 个人格完整描述
│   │   └── recipes.ts      # 10 人格 × 4 道陕西美食推荐（v0.0.2 新增）
│   ├── lib/
│   │   ├── score.ts        # 计分算法
│   │   └── storage.ts      # sessionStorage 读写
│   ├── pages/
│   │   ├── Landing.tsx     # 首页（去标点换行优化）
│   │   ├── Quiz.tsx
│   │   └── Result.tsx      # 结果页（6 个彩蛋 + 食谱弹窗）
│   ├── components/
│   │   ├── ProgressBar.tsx
│   │   ├── QuestionCard.tsx
│   │   ├── RadarChart.tsx  # 支持 maxed 状态（双击拉满动画）
│   │   ├── SoulmateCard.tsx
│   │   └── RecipeModal.tsx # 食谱弹窗（v0.0.2 新增）
│   └── styles/
│       └── global.css      # 含 6 个彩蛋动画 + 食谱卡片样式
├── 文本内容/               # 用户原始素材（.gitignore 拦住，不上传）
├── agent_readme.md
├── progress.md
├── README.md
├── package.json
├── vite.config.ts
├── tsconfig.json
└── .gitignore
```

## 10 个人格

| 代码 | 标题 | 一句话 | 灵魂搭子 |
|---|---|---|---|
| WISE | 踏实治学党 | 喧嚣之外的长期主义者 | LIB-ER、DAWN |
| BARK | 梧桐慢行客 | 老校区里的浪漫诗人 | QUIE-T |
| RISE | 操场活力派 | 驱散内耗的多巴胺引擎 | MEAL、RUSH |
| DAWN | 晨光自律人 | 迎着天光的清醒破局者 | WISE |
| GENT | 志愿温柔家 | 饮水思源的传递者 | BARK |
| RUSH | 赶课特种兵 | 穿梭在红砖绿瓦间的风 | DDLS |
| MEAL | 干饭优先人 | 用烟火气治愈一切的乐天派 | RISE |
| QUIE-T | 独处静养者 | 隐居在象牙塔里的观察员 | BARK |
| DDLS | 任务堆叠者 | 绝地反击的抗压王者 | LIB-ER、RUSH |
| LIB-ER | 钱图常驻者 | 知识殿堂里的守望者 | DDLS、WISE |

完整人格描述见 `src/data/personalities.ts`（原稿见 `文本内容/XJTI问题+人格/XJTI 人格1.0`）。

## 核心算法

13 题 × 每题 A/B 单选。每个选项给 1-2 个人格加权：
- **单一倾向**：该人格 `+2`
- **双倾向**：两人格各 `+1`
- 每题总贡献恒为 2 分 → 所有题等权重

最终取得分最高的人格作为主结果；雷达图使用全 10 维分数。实现见 `src/lib/score.ts`。

## 数据口径

`src/data/questions.ts`、`src/data/personalities.ts`、`src/data/recipes.ts` 是**唯一数据源**。

- 改题 / 改权重 / 改人格文案 → 只改 `questions.ts` 和 `personalities.ts`
- 改食谱推荐 → 只改 `recipes.ts`（v0.0.2 新增，10 人格 × 4 道陕西美食）

## 交互彩蛋（v0.0.2）

结果页含 6 个隐藏彩蛋，所有浮层用 `createPortal` 挂到 `document.body`：

1. **点击人格代码** → 弹出专属陕西美食推荐（4 张动态卡片，hover 时 emoji 放大浮动）
2. **双击雷达图** → 雷达拉满动画（0.6s 过渡到满级）+ 10 个人格代码从中心散开
3. **点击"闪闪发光"** → 金色星雨（80 颗，4.5-8s 渐隐）
4. **点击"色彩"** → 七彩星雨（90 颗，赤橙黄绿青蓝紫随机）
5. **点击"慢行者"** → 梧桐叶飘落（12 片，随机 1 片带"⚠ 小心头顶"贴纸）
6. **点击"长安"** → 乌龟慢爬（8.5s，带"真的很远……"气泡）
7. **MEAL 限定** → 点击人格代码额外触发食堂菜 emoji 雨（60 个）

所有动画结束自动卸载 DOM，不污染海报截图（`cardRef` 只截卡片内容）。

## 内容约定

- **题目数量恒为 13**（用户硬约束）
- **敏感话题黑名单**（学生会场景必须过滤）：绩点极端比较 / 家庭背景 / 恋爱 / 地域 / 政治 / 社交 KPI 比较
- **保留话题**：生活节奏、学习地点偏好、校园空间、情绪调节方式、作息、饮食
- **首页欢迎语 / 结尾语**：`文本内容/封面+结尾/封面+结尾1.0` 里已有终稿，已硬编码进 `Landing.tsx` 和 `Result.tsx`
- **陕西美食推荐**（v0.0.2）：每个人格 4 道菜，结合人格特点 + 陕西地方特色（肉夹馍、biangbiang面、冰峰、羊肉泡馍、胡辣汤、茯茶等）

## 部署

- **Cloudflare Pages**（当前使用）：连 GitHub 仓库，build `npm run build`，publish `dist`，绑定域名 xjti.top
- **Netlify**（备选）：连 GitHub 仓库，build `npm run build`，publish `dist`
- **GitHub Pages**（备选）：`npm run build` → `dist/` 推到 `gh-pages` 分支

## 参考资源

- 原始素材：`文本内容/XJTI问题+人格/`、`文本内容/封面+结尾/`
- 用户 GitHub：JackyHu0314
- 用户博客（协作风格参考）：<https://jackyhu.top>，仓库 <https://github.com/JackyHu0314/Blog>
