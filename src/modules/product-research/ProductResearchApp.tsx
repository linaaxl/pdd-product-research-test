import { useMemo, useState } from 'react';
import {
  ProductCategory,
  ProductIdea,
  SellerMode,
  buildClosedLoopStatus,
  buildFeedback,
  buildQualityVerificationGuide,
  categoryLabels,
  estimateLaunchBudget,
  filterProducts,
  mapSearchUrl,
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

const questionBank = [
  {
    id: 'risk',
    prompt: '新店第一批 SKU 更应该避开什么？',
    options: ['高退货高售后电器', '低客单家居小件', '可组合套装'],
    answer: 0,
    feedback: '新店先把差评和售后压低，跑通标题、主图、发货和评价，再扩大高风险品。',
  },
  {
    id: 'supply',
    prompt: '以横栏镇茂意雅苑为中心，灯饰类先看哪里更高效？',
    options: ['横栏工厂带 + 古镇灯配城', '只去广州服装市场', '只看线上低价链接'],
    answer: 0,
    feedback: '横栏和古镇离中心点近，灯饰供应链密集，适合先看样、再线上比价。',
  },
  {
    id: 'quality',
    prompt: '判断小夜灯质量，最该先检查哪组指标？',
    options: ['续航、发热、感应距离', '包装颜色', '店名是否好听'],
    answer: 0,
    feedback: '电池续航、发热和感应稳定性会直接决定差评率和复购口碑。',
  },
];

const sourceLinks = [
  {
    label: '古镇灯饰产业',
    url: 'https://www.zs.gov.cn/gzz/gzgk/gzjj/index.html',
  },
  {
    label: '小榄五金与智能锁产业',
    url: 'https://www.zs.gov.cn/xlz/zjxz/xzgk/content/mpost_1262334.html',
  },
  {
    label: '东凤智能家电产业',
    url: 'https://www.zs.gov.cn/zwgk/zdxm/xmjj/content/post_2160301.html',
  },
  {
    label: '沙溪服装与电商产业',
    url: 'https://www.zs.gov.cn/shxz/wgk/jcgk/content/post_2027527.html',
  },
  {
    label: '拼多多商家后台',
    url: 'https://mms.pinduoduo.com/',
  },
];

export default function ProductResearchApp() {
  const [category, setCategory] = useState<CategoryFilter>('all');
  const [mode, setMode] = useState<SellerMode>('starter');
  const [budget, setBudget] = useState(1200);
  const [riskTolerance, setRiskTolerance] = useState(2);
  const [searchText, setSearchText] = useState('');
  const [selectedIds, setSelectedIds] = useState<string[]>(['no-drill-hooks', 'motion-night-light']);
  const [answers, setAnswers] = useState<Record<string, number>>({});

  const rankedProducts = useMemo(() => {
    return filterProducts(productIdeas, category, searchText)
      .map((product) => ({ product, score: scoreProduct(product, mode) }))
      .sort((a, b) => b.score.score - a.score.score);
  }, [category, mode, searchText]);

  const selectedProducts = useMemo(
    () => productIdeas.filter((product) => selectedIds.includes(product.id)),
    [selectedIds],
  );
  const launchBudget = estimateLaunchBudget(selectedProducts);
  const topProduct = rankedProducts[0]?.product ?? productIdeas[0];
  const topFeedback = buildFeedback(topProduct, budget, riskTolerance, mode);
  const activeModeProfile = modeProfiles[mode];
  const dashboardStats = useMemo(
    () => [
      { label: '候选 SKU', value: `${rankedProducts.length}`, hint: '可按品类和关键词继续缩小' },
      { label: '覆盖品类', value: `${Object.keys(categoryLabels).length}`, hint: '家居、灯饰、五金、服饰等' },
      {
        label: '低售后风险',
        value: `${rankedProducts.filter(({ product }) => product.afterSalesRisk <= riskTolerance).length}`,
        hint: `当前容忍度 ${riskTolerance}/5`,
      },
      {
        label: '线下触点',
        value: `${rankedProducts.reduce((total, { product }) => total + product.offlineContacts.length, 0)}`,
        hint: '地址、电话、地图搜索入口',
      },
    ],
    [rankedProducts, riskTolerance],
  );

  const toggleSelected = (id: string) => {
    setSelectedIds((current) =>
      current.includes(id) ? current.filter((item) => item !== id) : [...current, id],
    );
  };

  return (
    <main className="app-shell">
      <section className="top-band">
        <div>
          <p className="eyebrow">中山横栏中心圈 · 小商品选品参谋</p>
          <h1>以茂意雅苑为中心，对比线上价格、线下货源和商品质量</h1>
          <p className="lead">
            当前中心点：{sourcingCenter}。每个 SKU 都提供拼多多售卖搜索、1688 货源搜索、线下采购点、地址、联系电话或核验状态。
          </p>
          <div className="hero-actions">
            <a href="#product-list">查看选品清单</a>
            <a href="https://mms.pinduoduo.com/" target="_blank" rel="noreferrer">
              打开拼多多商家后台
            </a>
          </div>
        </div>
        <SupplyMap />
      </section>

      <section className="ops-summary" aria-label="卖家测试概览">
        {dashboardStats.map((item) => (
          <div className="ops-card" key={item.label}>
            <span>{item.label}</span>
            <strong>{item.value}</strong>
            <small>{item.hint}</small>
          </div>
        ))}
      </section>

      <section className="control-panel" aria-label="选品控制台">
        <div className="filter-group">
          <span>品类</span>
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
        </div>

        <label className="search-box">
          <span>关键词</span>
          <input
            value={searchText}
            placeholder="如：小夜灯、挂钩、横栏、瑞丰"
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
          <div className="mode-summary">
            <strong>{activeModeProfile.title}</strong>
            <span>{activeModeProfile.description}</span>
            <small>{activeModeProfile.focus}</small>
          </div>
        </div>

        <label className="slider-row">
          <span>
            首批预算 <strong>{budget} 元</strong>
          </span>
          <input
            type="range"
            min="300"
            max="5000"
            step="100"
            value={budget}
            onChange={(event) => setBudget(Number(event.target.value))}
          />
        </label>

        <label className="slider-row">
          <span>
            售后容忍度 <strong>{riskTolerance}/5</strong>
          </span>
          <input
            type="range"
            min="1"
            max="5"
            step="1"
            value={riskTolerance}
            onChange={(event) => setRiskTolerance(Number(event.target.value))}
          />
        </label>
      </section>

      <section className="coverage-panel" aria-label="品类覆盖">
        <div>
          <p className="eyebrow">品类覆盖</p>
          <h2>按拼多多小商品经营场景扩展，不只看少数几类</h2>
        </div>
        <div className="coverage-grid">
          {Object.entries(categoryLabels).map(([key, label]) => {
            const count = productIdeas.filter((product) => product.category === key).length;
            return (
              <button
                type="button"
                key={key}
                className={category === key ? 'coverage-chip active' : 'coverage-chip'}
                onClick={() => setCategory(key as ProductCategory)}
              >
                <strong>{label}</strong>
                <span>{count} 个候选</span>
              </button>
            );
          })}
        </div>
      </section>

      <section className="dashboard-grid">
        <aside className="insight-panel">
          <p className="eyebrow">今日首推 · {modeLabels[mode]}</p>
          <h2>{topProduct.name}</h2>
          <ScoreMeter score={scoreProduct(topProduct, mode).score} />
          <div className="feedback-list">
            {topFeedback.map((feedback) => (
              <p key={feedback}>{feedback}</p>
            ))}
          </div>
          <div className={launchBudget <= budget ? 'budget-box ok' : 'budget-box'}>
            <span>已选测款预算</span>
            <strong>{launchBudget} 元</strong>
            <small>{launchBudget <= budget ? '预算可覆盖' : '预算不足，建议减少 SKU 或改拿样'}</small>
          </div>
        </aside>

        <section className="product-table" id="product-list" aria-label="选品列表">
          <div className="section-heading">
            <div>
              <p className="eyebrow">选品建议</p>
              <h2>线上线下都可对比的候选 SKU</h2>
            </div>
            <span>{rankedProducts.length} 个候选</span>
          </div>

          <div className="cards-grid">
            {rankedProducts.map(({ product, score }) => (
              <article className="product-card" key={product.id}>
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
                <dl>
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
                  {product.reasons.map((reason) => (
                    <span key={reason}>{reason}</span>
                  ))}
                </div>
                <div className="action-row">
                  <a href={pddSearchUrl(product.pddQuery)} target="_blank" rel="noreferrer">
                    拼多多售卖比价
                  </a>
                  <a href={wholesaleSearchUrl(product.procurementQuery)} target="_blank" rel="noreferrer">
                    1688 货源比价
                  </a>
                  <button type="button" onClick={() => toggleSelected(product.id)}>
                    {selectedIds.includes(product.id) ? '移出测款' : '加入测款'}
                  </button>
                </div>
                <QualityDecisionPanel product={product} guide={buildQualityVerificationGuide(product)} />
                <OfflineSourcingPanel product={product} />
                <ClosedLoopPanel loop={buildClosedLoopStatus(product)} />
              </article>
            ))}
          </div>
        </section>
      </section>

      <section className="learning-panel">
        <div className="section-heading">
          <div>
            <p className="eyebrow">互动研判</p>
            <h2>卖家选品训练题</h2>
          </div>
          <a href="https://mms.pinduoduo.com/" target="_blank" rel="noreferrer">
            拼多多商家后台
          </a>
        </div>
        <div className="question-grid">
          {questionBank.map((question) => (
            <article className="question-card" key={question.id}>
              <h3>{question.prompt}</h3>
              <div className="option-row">
                {question.options.map((option, index) => (
                  <button
                    type="button"
                    key={option}
                    className={answers[question.id] === index ? 'selected' : ''}
                    onClick={() => setAnswers((current) => ({ ...current, [question.id]: index }))}
                  >
                    {option}
                  </button>
                ))}
              </div>
              {answers[question.id] !== undefined && (
                <p className={answers[question.id] === question.answer ? 'correct' : 'incorrect'}>
                  {answers[question.id] === question.answer ? '判断正确。' : '需要调整。'}
                  {question.feedback}
                </p>
              )}
            </article>
          ))}
        </div>
      </section>

      <section className="source-panel">
        <h2>调研依据与使用边界</h2>
        <p>
          本平台以 {sourcingCenter} 为中心展开线下采购点推荐。电话、档口和报价会变化，出发前必须通过地图或商家页二次核验。
          线上链接采用关键词搜索入口，用于比价和看评价，不把临时商品链接当作长期稳定货源。
        </p>
        <div className="source-link-row">
          {sourceLinks.map((source) => (
            <a href={source.url} target="_blank" rel="noreferrer" key={source.url}>
              {source.label}
            </a>
          ))}
        </div>
      </section>
    </main>
  );
}

function OfflineSourcingPanel({
  product,
}: {
  product: Pick<ProductIdea, 'procurementHint' | 'contactHint' | 'offlineContacts'>;
}) {
  return (
    <details className="offline-panel">
      <summary className="compact-summary">
        <strong>线下看样与联系点</strong>
        <span>{product.offlineContacts.length} 个可查触点，需要时展开</span>
      </summary>
      <p className="procurement">{product.procurementHint}</p>
      <p className="contact">{product.contactHint}</p>
      <div className="offline-grid">
        {product.offlineContacts.map((contact) => (
          <article className="offline-card" key={`${contact.name}-${contact.address}`}>
            <div className="offline-title-row">
              <h4>{contact.name}</h4>
              <span>{contact.verification}</span>
            </div>
            <p>{contact.address}</p>
            <p>
              电话：<b>{contact.phone}</b>
            </p>
            <small>{contact.distanceHint}</small>
            <em>{contact.note}</em>
            <a href={mapSearchUrl(contact.mapQuery)} target="_blank" rel="noreferrer">
              地图搜索
            </a>
          </article>
        ))}
      </div>
    </details>
  );
}

function ClosedLoopPanel({ loop }: { loop: ReturnType<typeof buildClosedLoopStatus> }) {
  const highConfidence = loop.sourceRecords.filter((record) => record.confidence === '高').length;
  const qualityPending = loop.qualityRecords.filter((record) => record.status.includes('待')).length;
  const priceSummary = loop.priceUpdates
    .slice(0, 2)
    .map((record) => record.value)
    .join(' / ');

  return (
    <details className="loop-panel">
      <summary className="loop-summary">
        <strong>闭环追踪</strong>
        <span>{highConfidence} 个高可信来源</span>
        <span>{qualityPending} 项待质检</span>
        <span>{priceSummary}</span>
      </summary>
      <div className="loop-heading">
        <strong>展开详情</strong>
        <span>{'来源 -> 价格 -> 质检 -> 销售反馈'}</span>
      </div>
      <div className="loop-grid">
        <section>
          <h4>数据来源记录</h4>
          {loop.sourceRecords.slice(0, 3).map((record) => (
            <a href={record.url} target="_blank" rel="noreferrer" key={`${record.type}-${record.sourceName}`}>
              <b>{record.type}</b>
              <span>{record.sourceName}</span>
              <small>
                {record.confidence} · {record.nextCheck}
              </small>
            </a>
          ))}
        </section>
        <section>
          <h4>价格更新</h4>
          {loop.priceUpdates.slice(0, 3).map((record) => (
            <div key={`${record.channel}-${record.label}`}>
              <b>{record.channel}</b>
              <span>{record.label}：{record.value}</span>
              <small>{record.nextAction}</small>
            </div>
          ))}
        </section>
        <section>
          <h4>质检记录</h4>
          {loop.qualityRecords.slice(0, 3).map((record) => (
            <div key={record.checkpoint}>
              <b>{record.checkpoint}</b>
              <span>{record.status} · {record.method}</span>
              <small>{record.passStandard}</small>
            </div>
          ))}
        </section>
        <section>
          <h4>销售反馈</h4>
          {loop.salesFeedback.slice(0, 3).map((record) => (
            <div key={record.metric}>
              <b>{record.metric}</b>
              <span>{record.target}</span>
              <small>{record.decisionRule}</small>
            </div>
          ))}
        </section>
      </div>
    </details>
  );
}

function QualityDecisionPanel({
  product,
  guide,
}: {
  product: {
    category: ProductCategory;
    qualityChecklist: string[];
    avoidSignals: string[];
    afterSalesRisk: number;
  };
  guide: ReturnType<typeof buildQualityVerificationGuide>;
}) {
  const mustCheck = product.qualityChecklist.slice(0, 3);
  const killSignals = product.avoidSignals.slice(0, 2);
  const advice =
    product.afterSalesRisk >= 4
      ? '先拿样压力测试，售后风险不过关不要上架。'
      : product.afterSalesRisk >= 2
        ? '先小批测款，差评集中时立即停补货。'
        : '适合新店先测，重点核实数量和包装。';

  return (
    <details className="quality-decision">
      <summary className="compact-summary">
        <strong>质量测试与验货建议</strong>
        <span>{categoryLabels[product.category]} · {advice}</span>
      </summary>
      <div className="quality-grid">
        <QualityBlock title="质量好坏看" items={product.qualityChecklist.slice(0, 4)} />
        <QualityBlock title="避坑信号" items={product.avoidSignals.slice(0, 3)} warning />
      </div>
      <div className="quality-quick">
        <ul>
          {mustCheck.map((item) => (
            <li key={item}>必查：{item}</li>
          ))}
          {killSignals.map((item) => (
            <li className="danger" key={item}>淘汰：{item}</li>
          ))}
        </ul>
      </div>
      <div className="quality-guide-grid">
        <GuideBlock title="线下怎么验" items={guide.offlineSteps} />
        <GuideBlock title="线上怎么验" items={guide.onlineSteps} />
        <GuideBlock title="防坑规则" items={guide.antiPitfallRules} danger />
        <GuideBlock title="拿样决策" items={guide.sampleDecision} />
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

function SupplyMap() {
  return (
    <svg className="supply-map" viewBox="0 0 430 230" role="img" aria-label="中山周边产业带示意">
      <rect x="12" y="12" width="406" height="206" rx="8" fill="#f8fafc" />
      <path d="M 74 126 C 120 92 172 82 250 84" fill="none" stroke="#2563eb" strokeWidth="5" />
      <path d="M 98 152 C 176 134 260 128 356 152" fill="none" stroke="#16a34a" strokeWidth="5" />
      {[
        ['茂意雅苑', 84, 122, '#0f172a'],
        ['横栏灯饰', 148, 92, '#f59e0b'],
        ['古镇灯配', 222, 76, '#2563eb'],
        ['小榄五金', 284, 138, '#dc2626'],
        ['沙溪服装', 344, 170, '#16a34a'],
      ].map(([label, x, y, color]) => (
        <g key={label}>
          <circle cx={Number(x)} cy={Number(y)} r="17" fill={String(color)} />
          <text x={Number(x)} y={Number(y) + 38} textAnchor="middle">
            {label}
          </text>
        </g>
      ))}
      <text x="24" y="38" className="map-title">
        茂意雅苑采购半径
      </text>
    </svg>
  );
}

function ScoreMeter({ score }: { score: number }) {
  return (
    <div className="score-meter">
      <div style={{ width: `${score}%` }} />
      <span>{score}/100</span>
    </div>
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
