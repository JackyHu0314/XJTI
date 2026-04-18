import type { PersonalityCode } from '../types';

export interface Recipe {
  emoji: string;
  name: string;
  rating: string;
  comment: string;
}

export const RECIPES: Record<PersonalityCode, Recipe[]> = {
  WISE: [
    { emoji: '🍜', name: '臊子面', rating: '★★★★★', comment: '一碗面里藏着三秦历史，慢慢品' },
    { emoji: '📚', name: '钱图咖啡', rating: '★★★★☆', comment: '图书馆一楼的续命神器，学到闭馆' },
    { emoji: '🥣', name: '胡辣汤', rating: '★★★★☆', comment: '早起的鸟儿有汤喝，配油条绝了' },
    { emoji: '🍵', name: '茯茶', rating: '★★★★☆', comment: '陕西特产，喝出长期主义的沉稳' },
  ],
  BARK: [
    { emoji: '🧋', name: '桂花酸梅汤', rating: '★★★★★', comment: '梧桐树下一杯，秋天的浪漫' },
    { emoji: '🥮', name: '水晶饼', rating: '★★★★☆', comment: '陕西名点，一口酥到心里' },
    { emoji: '🍰', name: '镜糕', rating: '★★★★★', comment: '老校区门口的童年记忆，慢慢吃' },
    { emoji: '🫖', name: '泾阳茯茶', rating: '★★★★☆', comment: '一壶茶配一下午，急不得' },
  ],
  RISE: [
    { emoji: '🥤', name: '冰峰汽水', rating: '★★★★★', comment: '陕西人的快乐水，跑完操场灌一瓶' },
    { emoji: '🥙', name: '肉夹馍', rating: '★★★★★', comment: '边走边吃的能量炸弹，三个起步' },
    { emoji: '🌶️', name: '油泼辣子biangbiang面', rating: '★★★★★', comment: '一口下去多巴胺爆炸，辣得过瘾' },
    { emoji: '🍖', name: '腊牛肉', rating: '★★★★☆', comment: '撸铁后的蛋白质补给站' },
  ],
  DAWN: [
    { emoji: '☕', name: '美式咖啡', rating: '★★★★★', comment: '六点钟的第一杯仪式感' },
    { emoji: '🥣', name: '胡辣汤', rating: '★★★★★', comment: '西安早餐扛把子，喝完精神一整天' },
    { emoji: '🥛', name: '豆浆油条', rating: '★★★★☆', comment: '自律的人早起吃热乎的' },
    { emoji: '🥪', name: '菜夹馍', rating: '★★★★☆', comment: '五分钟搞定早饭，时间精确到秒' },
  ],
  GENT: [
    { emoji: '🍜', name: '岐山臊子面', rating: '★★★★★', comment: '会给室友多盛一碗的那种温柔' },
    { emoji: '🥟', name: '韭黄盒子', rating: '★★★★★', comment: '一起包的才香，不许嫌皮破' },
    { emoji: '🍲', name: '羊肉泡馍', rating: '★★★★★', comment: '掰馍是耐心活，适合温柔的你' },
    { emoji: '🫖', name: '一壶暖茶', rating: '★★★★☆', comment: '冬天给人递一杯的那种温柔' },
  ],
  RUSH: [
    { emoji: '🥙', name: '肉夹馍', rating: '★★★★★', comment: '边走边吃，不影响赶课节奏' },
    { emoji: '🌯', name: '菜夹馍', rating: '★★★★☆', comment: '三分钟干完赶上课铃' },
    { emoji: '🥤', name: '冰峰', rating: '★★★★★', comment: '拧开就能喝的救急神器' },
    { emoji: '🍞', name: '锅盔', rating: '★★★★☆', comment: '揣兜里一路啃到教室' },
  ],
  MEAL: [
    { emoji: '🍜', name: 'biangbiang面', rating: '★★★★★', comment: '一碗人生的顿悟，油泼辣子是灵魂' },
    { emoji: '🥙', name: '肉夹馍', rating: '★★★★★', comment: '陕西人的终极答案，三个不够' },
    { emoji: '🍲', name: '羊肉泡馍', rating: '★★★★★', comment: '掰馍掰到天荒地老，吃到地老天荒' },
    { emoji: '🍚', name: '葫芦头泡馍', rating: '★★★★★', comment: '一口肥肠一口馍，一口一个满足' },
  ],
  'QUIE-T': [
    { emoji: '🍵', name: '茯茶一盏', rating: '★★★★☆', comment: '独自斟饮，不用应付任何人' },
    { emoji: '🍞', name: '锅盔', rating: '★★★★☆', comment: '简单到不用解释的主食' },
    { emoji: '🥣', name: '八宝粥', rating: '★★★★☆', comment: '煮给自己的慢时光' },
    { emoji: '🥮', name: '水晶饼', rating: '★★★★☆', comment: '独享就够，不分人' },
  ],
  DDLS: [
    { emoji: '☕', name: '美式咖啡', rating: '★★★★★', comment: '今天第五杯，明天不算今天' },
    { emoji: '🍜', name: '泡面', rating: '★★★★☆', comment: '凌晨两点的救赎，加蛋加火腿' },
    { emoji: '🥤', name: '冰峰', rating: '★★★★★', comment: '给我快乐，给我命' },
    { emoji: '🥙', name: '肉夹馍', rating: '★★★★★', comment: '三分钟速战速决，继续肝' },
  ],
  'LIB-ER': [
    { emoji: '☕', name: '钱图咖啡', rating: '★★★★★', comment: '一楼咖啡厅陪你到闭馆' },
    { emoji: '🥮', name: '水晶饼', rating: '★★★★☆', comment: '藏书包里的甜，偷偷吃' },
    { emoji: '🍵', name: '茯茶', rating: '★★★★★', comment: '护眼三件套之首，泡一壶看一天' },
    { emoji: '🍪', name: '独立包装饼干', rating: '★★★★☆', comment: '一包饼干分三天吃的精打细算' },
  ],
};
