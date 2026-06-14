import { useMemo, useState } from 'react';
import {
  ProductCategory,
  ProductIdea,
  SellerMode,
  buildQualityVerificationGuide,
  categoryLabels,
  filterProducts,
  pddSearchUrl,
  productIdeas,
  scoreProduct,
  sourcingCenter,
  wholesaleSearchUrl,
} from '../../lib/productResearch';

type CategoryFilter = ProductCategory | 'all';

const modeLabels: Record<SellerMode, string> = {
  starter: '新手测款',
  steady: '稳健铺货',
  margin: '利润优先',
};

const modeProfiles: Record<SellerMode, { title: string; description: string; focus: string }> = {
  starter: {
    title: '低风险起量',
    description: '优先轻小件、低客诉、容易现场验货的 SKU。',
    focus: '看物流难度、质检难度、售后风险',
  },
  steady: {
    title: '稳定补货',
    description: '优先需求稳定、供应链近、价格波动小的 SKU。',
    focus: '看需求、货源匹配、持续补货',
  },
  margin: {
    title: '利润空间',
    description: '优先可做差异化包装、套装和溢价的 SKU。',
    focus: '看毛利潜力、差异化、风险兜底',
  },
};

export default function ProductResearchApp() {
  const [category, setCategory] = useState<CategoryFilter>('all');
  const [mode, setMode] = useState<SellerMode>('starter');
  const [searchText, setSearchText] = useState('');
  const [selectedIds, setSelectedIds] = useState<string[]>(['no-drill-hooks', 'motion-night-light']);

  const rankedProducts = useMemo(() => {
    return filterProducts(productIdeas, category, searchText)
      .map((product) => ({ product, score: scoreProduct(product, mode) }))
      .sort((a, b) => b.score.score - a.score.score);
  }, [category, mode, searchText]);

  const activeModeProfile = modeProfiles[mode];

  const toggleSelected = (id: string) => {
    setSelectedIds((current) =>
      current.includes(id) ? current.filter((item) => item !== id) : [...current, id],
    );
  };

  return (
    <main className="app-shell product-focus-shell">
      <section className="product-hero">
        <div>
          <p className="eyebrow">中山横栏 · 拼多多小商品选品</p>
          <h1>先看能不能卖，再展开验证质量</h1>
          <p className="lead">
            中心点：{sourcingCenter}。页面只保留选品建议和验证建议，适合手机端快速筛选测试款。
          </p>
        </div>
        <div className="strategy-card">
          <span>当前策略</span>
          <strong>{modeLabels[mode]}</strong>
          <small>{activeModeProfile.description}</small>
        </div>
      </section>

      <section className="focus-toolbar" aria-label="选品筛选">
        <label className="search-box">
          <span>关键词</span>
          <input
            value={searchText}
            placeholder="小夜灯、挂钩、收纳、五金..."
            onChange={(event) => setSearchText(event.target.value)}
          />
        </label>

        <div className="filter-group">
          <span>经营策略</span>
          <div className="segmented">
            {Object.entries(modeLabels).map(([key, label]) => (
              <button
                type="button"
                key={key}
                className={mode === key ? 'active' : ''}
                onClick={() => setMode(key as SellerMode)}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        <details className="category-filter">
          <summary>
            <strong>{category === 'all' ? '全部品类' : categoryLabels[category]}</strong>
            <span>{rankedProducts.length} 个候选</span>
          </summary>
          <div className="chip-row">
            <button
              type="button"
              className={category === 'all' ? 'chip active' : 'chip'}
              onClick={() => setCategory('all')}
            >
              全部
            </button>
            {Object.entries(categoryLabels).map(([key, label]) => (
              <button
                type="button"
                key={key}
                className={category === key ? 'chip active' : 'chip'}
                onClick={() => setCategory(key as ProductCategory)}
              >
                {label}
              </button>
            ))}
          </div>
        </details>
      </section>

      <section className="product-table focus-product-table" id="product-list" aria-label="选品建议">
        <div className="section-heading">
          <div>
            <p className="eyebrow">{activeModeProfile.title}</p>
            <h2>选品建议</h2>
            <small>{activeModeProfile.focus}</small>
          </div>
          <span>{rankedProducts.length} 个候选</span>
        </div>

        <div className="cards-grid focus-cards-grid">
          {rankedProducts.map(({ product, score }) => (
            <article className="product-card focus-product-card" key={product.id}>
              <ProductImageReferences product={product} />

              <div className="product-card-main">
                <div className="product-card-header">
                  <div className="product-card-title">
                    <div className="card-topline">
                      <span>{categoryLabels[product.category]}</span>
                    </div>
                    <h3>{product.name}</h3>
                    <p>{product.audience}</p>
                  </div>
                  <div className="score-stack">
                    <strong>{score.score}</strong>
                    <span>{score.label}</span>
                  </div>
                </div>

                <dl className="product-metrics">
                  <div>
                    <dt>货源带</dt>
                    <dd>{product.supplyBase}</dd>
                  </div>
                  <div>
                    <dt>测款量</dt>
                    <dd>{product.testUnits} 件左右</dd>
                  </div>
                  <div>
                    <dt>样品预算</dt>
                    <dd>
                      {product.sampleCostMin}-{product.sampleCostMax} 元
                    </dd>
                  </div>
                </dl>

                <div className="reason-list">
                  {product.reasons.slice(0, 3).map((reason) => (
                    <span key={reason}>{reason}</span>
                  ))}
                </div>

                <VerificationPanel product={product} />

                <div className="action-row">
                  <a href={pddSearchUrl(product.pddQuery)} target="_blank" rel="noreferrer">
                    拼多多比价
                  </a>
                  <a href={wholesaleSearchUrl(product.procurementQuery)} target="_blank" rel="noreferrer">
                    1688 货源
                  </a>
                  <button type="button" onClick={() => toggleSelected(product.id)}>
                    {selectedIds.includes(product.id) ? '已加入' : '加入测款'}
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}

function ProductImageReferences({ product }: { product: ProductIdea }) {
  const taobaoUrl = `https://s.taobao.com/search?q=${encodeURIComponent(product.pddQuery)}`;
  const imageSearchUrl = `https://image.baidu.com/search/index?tn=baiduimage&word=${encodeURIComponent(product.pddQuery)}`;

  return (
    <div className="image-reference-panel">
      <div className="image-reference-heading">
        <span>真实图参考</span>
        <strong>2-3 张为主</strong>
      </div>
      <div className="image-reference-grid">
        <a href={pddSearchUrl(product.pddQuery)} target="_blank" rel="noreferrer">
          <span>图 1</span>
          <strong>拼多多售卖图</strong>
          <small>看主图、短视频、买家图</small>
        </a>
        <a href={wholesaleSearchUrl(product.procurementQuery)} target="_blank" rel="noreferrer">
          <span>图 2</span>
          <strong>1688 工厂图</strong>
          <small>看白底图、细节图、包装图</small>
        </a>
        <a href={product.category === 'ai-gadget' ? taobaoUrl : imageSearchUrl} target="_blank" rel="noreferrer">
          <span>图 3</span>
          <strong>{product.category === 'ai-gadget' ? '淘宝场景图' : '全网场景图'}</strong>
          <small>看桌搭、使用场景、同款风格</small>
        </a>
      </div>
    </div>
  );
}

function VerificationPanel({
  product,
}: {
  product: ProductIdea;
}) {
  const guide = buildQualityVerificationGuide(product);
  const advice =
    product.afterSalesRisk >= 4
      ? '先拿样压力测试，风险不过关不要上架。'
      : product.afterSalesRisk >= 2
        ? '先小批测款，差评集中时立即停补货。'
        : '适合新店先测，重点核实数量和包装。';

  return (
    <details className="verification-panel">
      <summary>
        <strong>验证建议</strong>
        <span>{categoryLabels[product.category]} · {advice}</span>
      </summary>

      <div className="verification-grid">
        <GuideBlock title="线下怎么验" items={guide.offlineSteps} />
        <GuideBlock title="线上怎么验" items={guide.onlineSteps} />
        <GuideBlock title="防坑规则" items={guide.antiPitfallRules} danger />
        <GuideBlock title="拿样决策" items={guide.sampleDecision} />
      </div>

      <div className="verification-shortlist">
        <QualityBlock title="重点看" items={product.qualityChecklist.slice(0, 3)} />
        <QualityBlock title="直接避开" items={product.avoidSignals.slice(0, 2)} warning />
      </div>
    </details>
  );
}

function GuideBlock({ title, items, danger = false }: { title: string; items: string[]; danger?: boolean }) {
  return (
    <section className={danger ? 'guide-block danger' : 'guide-block'}>
      <h4>{title}</h4>
      <ol>
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ol>
    </section>
  );
}

function QualityBlock({
  title,
  items,
  warning = false,
}: {
  title: string;
  items: string[];
  warning?: boolean;
}) {
  return (
    <div className={warning ? 'quality-block warning' : 'quality-block'}>
      <strong>{title}</strong>
      <ul>
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
}
