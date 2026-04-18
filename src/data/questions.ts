import type { Question } from '../types';

/**
 * 13 道 A/B 情景题。
 * 筛选原则：
 *   1. 剔除敏感话题（绩点极端比较 / 家庭 / 恋爱 / 地域 / 政治 / 社交 KPI）
 *   2. 10 个人格均衡覆盖（每个 2-3 题）
 *   3. 偏中性、生活化（作息、学习地点、情绪调节、饮食、空间偏好）
 *
 * 人格覆盖：
 *   WISE × 2   | BARK × 2  | RISE × 3  | DAWN × 3   | GENT × 3
 *   RUSH × 2   | MEAL × 3  | QUIE-T×3  | DDLS × 3   | LIB-ER × 2
 *   —— 合计 26 = 13 × 2（每题 2 分）
 *
 * 权重约定：单倾向 +2 / 双倾向各 +1，每题总贡献恒为 2。
 */
export const QUESTIONS: Question[] = [
  {
    id: 1,
    scene: '校园通勤',
    prompt: '上午两节课在不同楼栋，中间休息时间很短，你的通勤状态是：',
    options: {
      A: {
        text: '走位拉满，极限赶路，每一天都在和上课铃赛跑。',
        weights: { RUSH: 2 }
      },
      B: {
        text: '不慌不忙，叹口气慢慢走过去，顺其自然。',
        weights: { BARK: 2 }
      }
    }
  },
  {
    id: 2,
    scene: '清晨作息',
    prompt: '关于"早八"，你最真实的日常写照是：',
    options: {
      A: {
        text: '迎着清晨天光出发，早课不逃，甚至还能提前去教室。',
        weights: { DAWN: 2 }
      },
      B: {
        text: '次次卡点起床，主打极限出门，不到最后一秒绝不离开被窝。',
        weights: { RUSH: 2 }
      }
    }
  },
  {
    id: 3,
    scene: '课余时光',
    prompt: '没课的下午，你通常会选择在哪里度过你的专属时光？',
    options: {
      A: {
        text: '扎根钱学森图书馆，安稳搞定手头的任务，觉得这样最踏实。',
        weights: { 'LIB-ER': 2 }
      },
      B: {
        text: '换上运动鞋去操场慢跑或打球，甩开久坐疲惫，给自己续航。',
        weights: { RISE: 2 }
      }
    }
  },
  {
    id: 4,
    scene: '课后回血',
    prompt: '经历了一整天满课，身心俱疲的你，下课后最想做的是：',
    options: {
      A: {
        text: '直奔食堂，熟练走向最爱的窗口，靠一顿美食治愈所有烦恼。',
        weights: { MEAL: 2 }
      },
      B: {
        text: '找个没人的座位或湖边独处，安静放空，用低消耗的方式回血。',
        weights: { 'QUIE-T': 2 }
      }
    }
  },
  {
    id: 5,
    scene: '压力排解',
    prompt: '遇到烦心事或者学业压力很大时，你的排解方式更偏向：',
    options: {
      A: {
        text: '去运动出一身汗，用多巴胺的活力对抗精神内耗。',
        weights: { RISE: 2 }
      },
      B: {
        text: '一个人待着看树吹风，静静思索，慢慢消化这些情绪。',
        weights: { 'QUIE-T': 2 }
      }
    }
  },
  {
    id: 6,
    scene: '学习风格',
    prompt: '在处理需要长期推进的大作业时，你更像哪种类型的学生？',
    options: {
      A: {
        text: '沉稳专注，按照自己的节奏慢慢积累，稳步向前。',
        weights: { WISE: 2 }
      },
      B: {
        text: '被小组任务层层叠加，只能在 Deadline 中极限求生。',
        weights: { DDLS: 2 }
      }
    }
  },
  {
    id: 7,
    scene: '踏实感来源',
    prompt: '你觉得大学生活里，最能给你带来"踏实感"的是什么？',
    options: {
      A: {
        text: '用温柔的自律对抗散漫，每天保持规律作息带来的掌控感。',
        weights: { DAWN: 2 }
      },
      B: {
        text: '待在图书馆里，把积压已久的报告和任务一项项清空。',
        weights: { 'LIB-ER': 2 }
      }
    }
  },
  {
    id: 8,
    scene: '小组协作',
    prompt: '在小组大作业中，你最怕遇到哪种情况？',
    options: {
      A: {
        text: '组会开到饭点还不结束，耽误了去食堂吃热门菜的时间。',
        weights: { MEAL: 2 }
      },
      B: {
        text: '进度卡在关键节点，所有任务最后叠加到一起。',
        weights: { DDLS: 2 }
      }
    }
  },
  {
    id: 9,
    scene: '情绪支持',
    prompt: '同学遇到不开心的事来找你倾诉，你通常扮演的角色是：',
    options: {
      A: {
        text: '耐心倾听，温柔安慰，是个极其靠谱的"树洞"。',
        weights: { GENT: 2 }
      },
      B: {
        text: '帮对方分析问题，并建议一起去操场跑两圈释放负能量。',
        weights: { RISE: 2 }
      }
    }
  },
  {
    id: 10,
    scene: '回报方式',
    prompt: '如果帮了同学一个大忙，对方问你想怎么感谢你，你的第一反应是：',
    options: {
      A: {
        text: '"不用客气啦，举手之劳而已。"',
        weights: { GENT: 2 }
      },
      B: {
        text: '"请我吃顿好的就行，梧桐苑那家我惦记很久了。"',
        weights: { MEAL: 2 }
      }
    }
  },
  {
    id: 11,
    scene: '周末独处',
    prompt: '没课的周末，如果是你一个人度过，你更倾向于怎么安排？',
    options: {
      A: {
        text: '找个安静的角落看书、听歌、发呆，享受低消耗的放空状态。',
        weights: { 'QUIE-T': 2 }
      },
      B: {
        text: '在校园里没有目的地慢走，穿行在梧桐道上，享受舒缓节奏。',
        weights: { BARK: 2 }
      }
    }
  },
  {
    id: 12,
    scene: '迷茫时刻',
    prompt: '面对大学里偶尔出现的"迷茫感"，你的做法是：',
    options: {
      A: {
        text: '继续保持早起和上课，用规律的生活稳住阵脚。',
        weights: { DAWN: 2 }
      },
      B: {
        text: '去做志愿服务或帮助他人，从具体且温暖的小事中找回价值感。',
        weights: { GENT: 2 }
      }
    }
  },
  {
    id: 13,
    scene: '应对变化',
    prompt: '你如何看待"计划"和"变化"？',
    options: {
      A: {
        text: '我喜欢掌控感。有清晰的计划和日程表，稳步推进让我觉得安心。',
        weights: { WISE: 2 }
      },
      B: {
        text: '计划就是用来打破的。突发任务会堆叠过来，只能见招拆招。',
        weights: { DDLS: 2 }
      }
    }
  }
];
