# 项目进程

由 Claude 主动维护。记录 XJTI（西安交大人格测试）开发过程中的关键迭代、决策与背景。

## 版本

### v0.1.0 — 2026-04-18

**完整功能上线**

- React 18 + TypeScript + Vite 5 技术栈
- 10 个人格完整实现：WISE / BARK / RISE / DAWN / GENT / RUSH / MEAL / QUIE-T / DDLS / LIB-ER
- 13 道题目（从 70 道候选题精选，敏感话题已过滤）
- 首页：欢迎语 + 130 年 / 西迁 70 年彩蛋 + "进入"按钮
- 答题页：进度条 + 逐题渲染 + 上一题回退 + sessionStorage 续答
- 结果页：
  - 人格卡片（代码 + 标题 + tagline + 完整描述）
  - SVG 雷达图 + 中英文标签切换
  - 灵魂搭子卡片
  - 一键分享（复制文本 + xjti.top 链接）
  - 保存图片（html2canvas）
  - 重新测试
- 极简 Geek 风格：网格背景 + 白卡片 + Pearl Button + 移动优先
- 完整文档：`agent_readme.md` / `progress.md` / `README.md`

**说明**：v0.1.0 是首个完整可用版本，已完成所有核心功能，可直接部署到 GitHub Pages / Netlify。

### v0.0.0 — 2026-04-18

**新增**
- `agent_readme.md`：给后续 AI agent 的项目导航 + 硬性责任清单（主动维护两份文档、按对话更新、保护 `文本内容/` 不上传）
- `progress.md`：项目进度时间线

**说明**：v0.0.0 是项目**规划与协作文档**阶段，未产生任何运行时代码。技术栈、目录结构、算法、数据结构、视觉参考、内容边界均已与用户对齐。

## 时间线

### 2026-04-18

- **v0.1.0 完整功能上线**
  - 从零搭建 React 18 + TypeScript + Vite 5 项目
  - 实现 10 个人格 + 13 道题目（从 70 道候选题精选，敏感话题已过滤）
  - 首页：欢迎语 + 130 年 / 西迁 70 年数字彩蛋（13 题 / 70 切片 / 1896 → 2026）
  - 答题页：进度条（显示已答题数百分比）+ 逐题渲染 + sessionStorage 续答
  - 结果页：人格卡片 + SVG 雷达图（中英文标签切换）+ 灵魂搭子 + 一键分享 + 保存图片
  - 极简 Geek 风格：网格背景 + 白卡片 + Pearl Button + 移动优先（max-width: 480px）
  - 完整文档：`agent_readme.md` / `progress.md` / `README.md`
  - 修改文件：全部新建（首次提交）
- **项目启动**。用户给出核心需求：首页欢迎语 + "进入"按钮 → 13 道 A/B 情景题 → 10 个人格加权算法 → 结果页（人格卡片 + 雷达图 + 保存为图片）。目标用户：**学生会**传播场景。
- 用户已备好原始素材，放在 `文本内容/`：
  - `XJTI问题+人格/XJTI 人格1.0`：10 个人格（WISE / BARK / RISE / DAWN / GENT / RUSH / MEAL / QUIE-T / DDLS / LIB-ER）完整描述 + 灵魂搭子
  - `XJTI问题+人格/XJTI问题1.0`：70 道候选题（每题 A/B + 人格倾向标注），最终需精选 13 道
  - `封面+结尾/封面+结尾1.0`：首页欢迎语 + 结果页结尾语终稿
- **技术栈定档**：React 18 + TypeScript (strict) + Vite 5，不引 React Router / Tailwind / chart.js
- **视觉参考锁定**：<https://sjti.netlify.app>（上交版）+ <https://jackyhu.top>（用户博客）
- **算法定档**：单倾向 `+2` / 双倾向各 `+1`，每题总贡献恒为 2 分
- **内容边界约定**：学生会展示场景，避免绩点极端比较 / 家庭 / 恋爱 / 地域 / 政治 / 社交 KPI 比较
- **海报导出确认**：结果页"保存为图片"按钮，`html2canvas` CDN 引入
- **创建两份协作文档**：`agent_readme.md`（agent 入口 + 硬性责任）、`progress.md`（本文件）

## 当前状态快照

- **阶段**：v0.1.0 完整功能已实现，等待推送到 GitHub
- **技术栈**：React 18 + TypeScript (strict) + Vite 5
- **页面**：Landing（首页）/ Quiz（答题）/ Result（结果）
- **功能**：10 人格 + 13 题 + 雷达图 + 中英文切换 + 一键分享 + 海报导出
- **视觉**：极简 Geek 风格，网格背景 + 白卡片，移动优先（max-width: 480px）
- **构建**：`npm run build` 通过，产物约 356KB（gzip 后约 104KB）
- **文档**：`agent_readme.md` / `progress.md` / `README.md` 已完整
- **素材归位**：`文本内容/` 已被 `.gitignore` 拦截

## 决策记录

- **React + TS 而非原生 JS**：用户明确要求 React + TypeScript + Vite 架构
- **不引 React Router**：三视图用 `useState` 切换，无需路由（学生会场景分享的是海报图片，不是链接）
- **不引 Tailwind / chart.js**：雷达图纯 SVG 手绘，样式用原生 CSS，保持极简
- **保留 html2canvas**：海报截图是学生会传播的核心（小红书 / 朋友圈），这是唯一运行时依赖
- **13 题是硬约束**：用户明确要求。从 70 题候选里精选，每个人格出现在 2-3 题里
- **数据单一源**：`src/data/questions.ts` + `src/data/personalities.ts` 是题库 / 人格的唯一真相来源
- **敏感话题黑名单**：学生会场景下避免争议，从候选题中筛选 / 改写时必须过这道关
- **130 年 / 西迁 70 年彩蛋**：13 题 / 70 切片 / 1896 → 2026，数字暗合，不喊口号，懂的人自然懂
- **文本内容/ 不上传**：该目录含用户原始素材（未公开），`.gitignore` 必须拦住

## 待办

- [ ] 推送到 GitHub 仓库（用户已创建 XJTI 仓库）
- [ ] 部署到静态托管平台（Netlify / GitHub Pages / Cloudflare Pages）
- [ ] 绑定域名 xjti.top（用户已提及）
