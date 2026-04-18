const WELCOME_TEXT = `从 70 个初始切片中，提取出 13 道核心样本。

13 个问题，致敬跨越 130 年的岁月；
70 个切片，回响 70 载西迁的足迹。

在庞大的时空坐标系里，
定位独属于你的交大基因。`;

interface Props {
  onStart: () => void;
}

export default function Landing({ onStart }: Props) {
  return (
    <section className="landing">
      <div className="landing__head">
        <h1 className="landing__brand">XJTI</h1>
        <p className="landing__subtitle">寻 迹 交 大</p>
      </div>

      <p className="landing__welcome">{WELCOME_TEXT}</p>

      <div className="landing__meta">
        <span>13 题</span>
        <span>70 切片</span>
        <span>1896 → 2026</span>
      </div>

      <button className="btn-pearl" onClick={onStart} type="button">
        进 入
      </button>

      <div className="landing__plate">
        EST.1896 // 130th · 西迁 70th // XJTU
      </div>
    </section>
  );
}
