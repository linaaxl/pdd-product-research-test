import { useState } from 'react';
import ElectromagneticInductionApp from './modules/electromagnetic-induction/ElectromagneticInductionApp';
import ProductResearchApp from './modules/product-research/ProductResearchApp';

type ModuleId = 'home' | 'electromagnetic-induction' | 'product-research';

const moduleCards = [
  {
    id: 'electromagnetic-induction' as const,
    title: '高中物理：电磁感应课件',
    eyebrow: 'AI 互动课件',
    description: '拖动磁铁穿过线圈，观察磁通量、感应电动势、电流方向和楞次定律。',
    audience: '高中物理老师 / 高二学生',
  },
  {
    id: 'product-research' as const,
    title: '中山小商品选品平台',
    eyebrow: '电商选品参谋',
    description: '保留当前选品控制台，用于产业带、拼多多链接和质检风险的交互研判。',
    audience: '电商选品 / 运营调研',
  },
];

export default function App() {
  const [activeModule, setActiveModule] = useState<ModuleId>(() => readInitialModule());
  const openModule = (moduleId: ModuleId) => {
    setActiveModule(moduleId);
    window.location.hash = moduleId === 'home' ? '' : moduleId;
  };

  if (activeModule === 'electromagnetic-induction') {
    return <ElectromagneticInductionApp onBack={() => openModule('home')} />;
  }

  if (activeModule === 'product-research') {
    return (
      <div>
        <div className="module-backbar">
          <button type="button" onClick={() => openModule('home')}>
            返回入口
          </button>
        </div>
        <ProductResearchApp />
      </div>
    );
  }

  return <HomePage onOpen={openModule} />;
}

function HomePage({ onOpen }: { onOpen: (moduleId: ModuleId) => void }) {
  return (
    <main className="home-shell">
      <section className="home-hero">
        <p className="eyebrow">本地开发入口</p>
        <h1>选择要查看的开发内容</h1>
        <p className="lead">
          这个首页把不同开发任务拆成独立模块，避免 `http://127.0.0.1:5173/` 被后续任务覆盖后找不到之前内容。
        </p>
      </section>

      <section className="module-card-grid" aria-label="模块入口">
        {moduleCards.map((card) => (
          <article className="module-card" key={card.id}>
            <span>{card.eyebrow}</span>
            <h2>{card.title}</h2>
            <p>{card.description}</p>
            <small>{card.audience}</small>
            <button type="button" onClick={() => onOpen(card.id)}>
              进入模块
            </button>
          </article>
        ))}
      </section>
    </main>
  );
}

function readInitialModule(): ModuleId {
  const hash = window.location.hash.replace('#', '');
  if (hash === 'electromagnetic-induction' || hash === 'product-research') return hash;
  return 'home';
}
