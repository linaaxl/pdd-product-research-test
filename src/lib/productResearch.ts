export type ProductCategory =
  | 'lighting'
  | 'hardware'
  | 'small-appliance'
  | 'storage'
  | 'apparel'
  | 'pet'
  | 'kitchen'
  | 'cleaning'
  | 'phone-accessory'
  | 'stationery'
  | 'beauty-tools'
  | 'personal-care'
  | 'baby'
  | 'outdoor'
  | 'auto'
  | 'packaging'
  | 'party'
  | 'sports'
  | 'ai-gadget';

export type SellerMode = 'starter' | 'steady' | 'margin';

export interface OfflineContact {
  name: string;
  address: string;
  phone: string;
  verification: '公开资料可核验' | '地图页复核' | '无统一电话';
  distanceHint: string;
  note: string;
  mapQuery: string;
  sourceUrl?: string;
  lastChecked?: string;
}

export interface DataSourceRecord {
  type: '产业依据' | '线上比价' | '线下联系点' | '地图复核' | '质检依据' | '销售反馈';
  sourceName: string;
  url: string;
  evidence: string;
  confidence: '高' | '中' | '待核验';
  lastChecked: string;
  nextCheck: string;
}

export interface PriceUpdateRecord {
  channel: '拼多多售卖' | '1688货源' | '线下拿样' | '预估毛利';
  label: string;
  value: string;
  updateMethod: string;
  lastChecked: string;
  nextAction: string;
}

export interface QualityInspectionRecord {
  checkpoint: string;
  method: string;
  passStandard: string;
  status: '待拿样' | '待复核' | '通过' | '风险';
}

export interface SalesFeedbackRecord {
  metric: string;
  target: string;
  current: string;
  decisionRule: string;
}

export interface ClosedLoopStatus {
  sourceRecords: DataSourceRecord[];
  priceUpdates: PriceUpdateRecord[];
  qualityRecords: QualityInspectionRecord[];
  salesFeedback: SalesFeedbackRecord[];
}

export interface QualityVerificationGuide {
  offlineSteps: string[];
  onlineSteps: string[];
  antiPitfallRules: string[];
  sampleDecision: string[];
}

export interface ProductIdea {
  id: string;
  name: string;
  category: ProductCategory;
  supplyBase: string;
  audience: string;
  pddQuery: string;
  procurementQuery: string;
  procurementHint: string;
  contactHint: string;
  offlineContacts: OfflineContact[];
  reasons: string[];
  qualityChecklist: string[];
  avoidSignals: string[];
  demandPotential: number;
  supplyFit: number;
  pddFit: number;
  logisticsEase: number;
  qualityControlEase: number;
  marginPotential: number;
  afterSalesRisk: number;
  sampleCostMin: number;
  sampleCostMax: number;
  testUnits: number;
}

export interface OfflineContactDisplay extends OfflineContact {
  distanceKm: number;
  distanceLabel: string;
  isNearby: boolean;
}

export interface ProductScore {
  score: number;
  label: '优先上架' | '小批测试' | '谨慎跟卖' | '暂缓';
}

export const sourcingCenter = '广东省中山市横栏镇茂意雅苑';

export const categoryLabels: Record<ProductCategory, string> = {
  lighting: '灯饰照明',
  hardware: '五金配件',
  'small-appliance': '小家电',
  storage: '收纳家居',
  apparel: '服装内衣',
  pet: '宠物用品',
  kitchen: '厨房日用',
  cleaning: '清洁洗护',
  'phone-accessory': '手机配件',
  stationery: '文具办公',
  'beauty-tools': '美妆工具',
  'personal-care': '个护小件',
  baby: '母婴小件',
  outdoor: '户外露营',
  auto: '汽车小件',
  packaging: '包装耗材',
  party: '节庆派对',
  sports: '运动健身',
  'ai-gadget': 'AI互动硬件',
};

const lightingContacts: OfflineContact[] = [
  {
    name: '横栏灯饰工厂带',
    address: '中山市横栏镇三沙、新茂、茂辉工业片区',
    phone: '无统一电话',
    verification: '无统一电话',
    distanceHint: '以茂意雅苑为中心，优先就近看样',
    note: '适合找小夜灯、柜灯、灯串、户外灯配套厂，先用地图按 SKU 搜工厂再约样。',
    mapQuery: '中山市横栏镇 小夜灯 灯饰 工厂',
  },
  {
    name: '瑞丰灯配城',
    address: '中山市古镇镇曹兴中路与中兴大道中交叉口',
    phone: '0760-22350233 / 0760-23366623',
    verification: '公开资料可核验',
    distanceHint: '茂意雅苑向古镇方向，适合半天比价',
    note: '灯具配件和 LED 配套集中，适合对比灯珠、电池盒、线材、外壳。',
    mapQuery: '瑞丰灯配城',
  },
  {
    name: '环球灯配城',
    address: '广东省中山市古镇镇华廷路1号',
    phone: '0760-89909999',
    verification: '公开资料可核验',
    distanceHint: '茂意雅苑向古镇方向',
    note: '适合补充灯串、灯配和照明类小件供应商。',
    mapQuery: '中山古镇环球灯配城',
    sourceUrl: 'https://www.denggle.com/',
    lastChecked: '2026-06-13',
  },
  {
    name: '星光联盟全球品牌灯饰中心',
    address: '中山市古镇镇中兴大道中68号',
    phone: '0760-89838888',
    verification: '公开资料可核验',
    distanceHint: '茂意雅苑向古镇方向，适合看品牌化灯具和高客单款',
    note: '适合做高质感灯饰、小夜灯外观趋势、品牌包装参考，不一定是最低价货源。',
    mapQuery: '中山古镇星光联盟灯饰',
    sourceUrl: 'https://www.staralliance.com.cn/',
    lastChecked: '2026-06-13',
  },
  {
    name: '灯都时代广场',
    address: '中山市古镇镇东兴中路12号',
    phone: '0760-22386220',
    verification: '公开资料可核验',
    distanceHint: '古镇核心灯饰商圈，适合补充展厅款和档口款',
    note: '适合看台灯、装饰灯、灯具配件和包装呈现，报价需与横栏工厂再比。',
    mapQuery: '中山古镇灯都时代广场',
    lastChecked: '2026-06-13',
  },
  {
    name: '曹三村灯配/电商厂企带',
    address: '中山市古镇镇曹三村创业园、工业大道周边',
    phone: '0760-22399102',
    verification: '公开资料可核验',
    distanceHint: '靠近古镇灯配商圈，适合找小众配件和电商型工厂',
    note: '适合灯串、小夜灯外壳、电源线、灯珠配件等小件深挖。',
    mapQuery: '中山市古镇镇曹三村 灯配 工厂',
    sourceUrl: 'https://www.zs.gov.cn/',
    lastChecked: '2026-06-13',
  },
];

const hardwareContacts: OfflineContact[] = [
  {
    name: '中山小榄五金机电商贸城',
    address: '广东省中山市小榄镇东区东生路8号',
    phone: '0760-87242375',
    verification: '公开资料可核验',
    distanceHint: '茂意雅苑往小榄方向，适合集中看五金配件',
    note: '适合门吸、挂钩、锁具配件、螺丝包、安装工具等低售后 SKU。',
    mapQuery: '中山小榄五金机电商贸城',
  },
  {
    name: '小榄锁具/五金工厂带',
    address: '中山市小榄镇民安南路、东生路周边',
    phone: '以地图商家页为准',
    verification: '地图页复核',
    distanceHint: '茂意雅苑往小榄方向',
    note: '适合找锁具配件和智能锁周边，不建议新手直接做整套智能锁。',
    mapQuery: '中山市小榄镇 锁具配件 工厂',
  },
  {
    name: '小榄五金锁具国际采购中心',
    address: '中山市小榄镇民安南路与小榄工业大道周边',
    phone: '以地图商家页为准',
    verification: '地图页复核',
    distanceHint: '茂意雅苑往小榄方向，适合找锁具和五金小件小众档口',
    note: '用于补充门吸、锁芯盖、合页、拉手、螺丝包等细分 SKU，出发前需地图核验。',
    mapQuery: '小榄五金锁具国际采购中心',
    lastChecked: '2026-06-13',
  },
  {
    name: '中山小榄轻工五金工厂带',
    address: '中山市小榄镇绩东一、绩西、民安南路周边',
    phone: '无统一电话',
    verification: '无统一电话',
    distanceHint: '适合从市场看样后反向找源头厂',
    note: '适合深挖背胶挂钩、门后架、收纳五金、厨卫五金等非标小件。',
    mapQuery: '中山市小榄镇 轻工五金 工厂',
    lastChecked: '2026-06-13',
  },
];

const applianceContacts: OfflineContact[] = [
  {
    name: '东凤小家电工厂带',
    address: '中山市东凤镇东海路、同安大道、东阜路周边',
    phone: '无统一电话',
    verification: '无统一电话',
    distanceHint: '茂意雅苑到东凤需跨镇看厂',
    note: '适合桌面风扇、厨房小电、个护小电。必须核验 3C、合格证、发热和电池安全。',
    mapQuery: '中山市东凤镇 USB 小风扇 工厂',
  },
  {
    name: '中山市家用电器行业协会',
    address: '广东省中山市南头镇南头大道中59号三楼',
    phone: '0760-22519221 / 0760-22519223',
    verification: '公开资料可核验',
    distanceHint: '用于找协会资源和产业带线索',
    note: '不是批发档口，适合核验家电产业带资源和寻找合规厂家线索。',
    mapQuery: '中山市家用电器行业协会',
  },
];

const apparelContacts: OfflineContact[] = [
  {
    name: '中山沙溪休闲服装城',
    address: '广东省中山市沙溪镇宝珠中路南侧',
    phone: '0760-7310998',
    verification: '公开资料可核验',
    distanceHint: '茂意雅苑到沙溪，适合集中看服装档口',
    note: '适合基础 T 恤、防晒衣、休闲服装。重点核验克重、尺码和缩水率。',
    mapQuery: '中山沙溪休闲服装城',
  },
  {
    name: '龙瑞国际服装城',
    address: '广东省中山市沙溪镇岐江公路云汉路段',
    phone: '以地图商家页为准',
    verification: '地图页复核',
    distanceHint: '茂意雅苑到沙溪，适合补充小商品和服装货源',
    note: '中山市较大的小商品/服装专业市场，适合做服装和日用小件对比。',
    mapQuery: '中山龙瑞国际服装城',
  },
];

const dailyContacts: OfflineContact[] = [
  {
    name: '龙瑞国际服装城/小商品市场',
    address: '广东省中山市沙溪镇岐江公路云汉路段',
    phone: '以地图商家页为准',
    verification: '地图页复核',
    distanceHint: '茂意雅苑到沙溪，适合看日用小商品档口',
    note: '用于收纳、厨房日用、宠物清洁小件线下比价；源头工厂仍建议线上询盘核验。',
    mapQuery: '中山龙瑞国际服装城 小商品',
  },
  {
    name: '横栏/古镇日用百货档口搜索',
    address: '中山市横栏镇、古镇镇周边',
    phone: '无统一电话',
    verification: '无统一电话',
    distanceHint: '茂意雅苑周边优先搜索',
    note: '适合先做就近拿样和包装对比，批量供货仍要查工厂资质。',
    mapQuery: '中山市横栏镇 日用百货 批发',
  },
  {
    name: '西郊小商品市场线索',
    address: '中山市西区小商品与日用百货商圈',
    phone: '以地图商家页为准',
    verification: '地图页复核',
    distanceHint: '适合补充日用百货、收纳、厨房小件、宠物清洁耗材',
    note: '属于小众补充源，不作为源头厂判断；适合拿样、看包装和对比零批价。',
    mapQuery: '中山 西郊 小商品市场',
    lastChecked: '2026-06-13',
  },
  {
    name: '沙溪云汉小商品档口带',
    address: '中山市沙溪镇云汉村、岐江公路周边',
    phone: '无统一电话',
    verification: '无统一电话',
    distanceHint: '可与沙溪服装市场同路线看样',
    note: '适合找包装、袜帽、小百货、服装配件和宠物清洁小件，需逐档口核价。',
    mapQuery: '中山沙溪 云汉 小商品 批发',
    lastChecked: '2026-06-13',
  },
];

const aiGadgetContacts: OfflineContact[] = [
  {
    name: '中山横栏/古镇智能灯饰改款带',
    address: '中山市横栏镇、古镇镇灯饰及灯配商圈',
    phone: '无统一电话',
    verification: '无统一电话',
    distanceHint: '茂意雅苑周边优先看灯具结构、灯臂、外壳、灯珠和电源方案',
    note: '适合找 Ongo 类互动台灯的外观、灯臂、灯头、感应灯控基础件；AI 模块可外采后组装验证。',
    mapQuery: '中山 古镇 横栏 智能台灯 工厂',
    sourceUrl: 'https://www.zs.gov.cn/gzz/gzgk/gzjj/index.html',
    lastChecked: '2026-06-14',
  },
  {
    name: '东凤/南头小家电智能硬件带',
    address: '中山市东凤镇、南头镇小家电产业带',
    phone: '无统一电话',
    verification: '无统一电话',
    distanceHint: '适合从中山跨镇找带主板、充电、电池和小电器经验的供应商',
    note: '适合 AI 氛围灯音箱、桌面小电器外壳、语音控制小硬件，必须核验电池和合规资料。',
    mapQuery: '中山 东凤 智能小家电 工厂',
    sourceUrl: 'https://www.zs.gov.cn/zwgk/zdxm/xmjj/content/post_2160301.html',
    lastChecked: '2026-06-14',
  },
  {
    name: '深圳华强北智能硬件/电子模块市场',
    address: '深圳市福田区华强北路及周边电子市场',
    phone: '以地图商家页为准',
    verification: '地图页复核',
    distanceHint: '全国扩展货源，适合找 AI 语音模块、摄像头、舵机、开发板和成品小机器人',
    note: '适合验证 AI 交互模块和小批样机，不建议未质检直接大批量铺货。',
    mapQuery: '深圳 华强北 AI语音模块 桌面机器人',
    lastChecked: '2026-06-14',
  },
  {
    name: '汕头澄海智能玩具/电子玩具产业带',
    address: '广东省汕头市澄海区玩具产业带',
    phone: '以地图商家页为准',
    verification: '地图页复核',
    distanceHint: '全国扩展货源，适合 AI 毛绒、语音玩具、桌面宠物和教育玩具',
    note: '适合找低成本互动玩具和外观件；重点验语音质量、电池安全和儿童玩具合规。',
    mapQuery: '汕头 澄海 AI玩具 智能玩具 工厂',
    lastChecked: '2026-06-14',
  },
];

export const productIdeas: ProductIdea[] = [
  {
    id: 'motion-night-light',
    name: '充电式人体感应小夜灯/柜灯',
    category: 'lighting',
    supplyBase: '中山横栏、中山古镇灯饰配套带',
    audience: '租房青年、宝妈、老人夜间起夜、宿舍用户',
    pddQuery: '充电式人体感应小夜灯 柜灯',
    procurementQuery: '中山横栏 古镇 充电式人体感应小夜灯 批发',
    procurementHint: '先在横栏周边找可小批拿样的灯饰厂，再去古镇灯配市场比灯珠、电池和外壳。',
    contactHint: '从茂意雅苑出发，优先看横栏工厂带；需要更多配件和价格对比时去古镇瑞丰/环球灯配城。',
    offlineContacts: lightingContacts,
    reasons: ['体积小、运费低，适合多件装', '场景明确，详情页容易做对比', '中山灯饰产业带供给密集'],
    qualityChecklist: ['电池容量实测', '感应距离和延迟', '充电口牢固度', '灯珠亮度一致性', '外壳阻燃与发热控制'],
    avoidSignals: ['无电池参数或参数虚标', '只有效果图没有实拍', '差评集中在续航和不亮'],
    demandPotential: 5,
    supplyFit: 5,
    pddFit: 5,
    logisticsEase: 5,
    qualityControlEase: 4,
    marginPotential: 4,
    afterSalesRisk: 2,
    sampleCostMin: 250,
    sampleCostMax: 500,
    testUnits: 30,
  },
  {
    id: 'solar-garden-light',
    name: '太阳能庭院灯/围墙灯',
    category: 'lighting',
    supplyBase: '中山横栏、中山古镇、江门外贸灯饰带',
    audience: '自建房、露台花园、乡镇家庭、户外店铺',
    pddQuery: '太阳能庭院灯 防水 围墙灯',
    procurementQuery: '中山 横栏 古镇 太阳能庭院灯 源头厂家',
    procurementHint: '找能提供防水测试、太阳能板规格、电池规格的灯饰厂。',
    contactHint: '先在横栏看户外灯工厂，再到古镇灯配市场比太阳能板、电池和外壳。',
    offlineContacts: lightingContacts,
    reasons: ['客单价比小夜灯高', '季节性和装修场景强', '中山灯饰供应链完整'],
    qualityChecklist: ['IP 防水等级', '电池类型和容量', '太阳能板尺寸', '阴雨天续航', '外壳耐晒'],
    avoidSignals: ['图片亮度明显过度渲染', '防水等级只写“防水”无参数', '售后退货集中在进水'],
    demandPotential: 4,
    supplyFit: 5,
    pddFit: 4,
    logisticsEase: 3,
    qualityControlEase: 3,
    marginPotential: 4,
    afterSalesRisk: 3,
    sampleCostMin: 450,
    sampleCostMax: 900,
    testUnits: 20,
  },
  {
    id: 'ongo-like-ai-desk-lamp',
    name: 'Ongo 类互动机械臂 AI 台灯',
    category: 'ai-gadget',
    supplyBase: '中山横栏/古镇灯饰结构件 + 深圳 AI 语音/舵机模块',
    audience: '桌搭玩家、亲子家庭、礼品用户、内容种草用户',
    pddQuery: 'AI智能台灯 互动台灯 机械臂台灯 会动台灯',
    procurementQuery: 'AI互动台灯 机械臂台灯 智能语音台灯 源头厂家',
    procurementHint: '不要一开始追完整 Ongo 同款，先拆成“可动灯臂 + 语音/触控 + 表情/灯效”的轻交互版本测款。',
    contactHint: '中山看灯臂、灯头、电源和外观件；深圳补语音模块、舵机和控制板；全国找成熟样机再反向拆成本。',
    offlineContacts: aiGadgetContacts,
    reasons: ['Ongo 类“会互动的物件”有强内容传播点', '中山灯饰供应链能承接灯具结构和外观件', '拼多多可先卖低配互动款，不必直接做高价完整机器人'],
    qualityChecklist: ['灯臂转动寿命', '舵机噪音和卡顿', '语音唤醒稳定性', '连续点亮发热', '跌落后灯头和关节牢固度'],
    avoidSignals: ['只展示概念视频无实拍', '无舵机寿命和电池参数', '交互依赖国外 App 或不可用云服务'],
    demandPotential: 5,
    supplyFit: 4,
    pddFit: 4,
    logisticsEase: 3,
    qualityControlEase: 2,
    marginPotential: 5,
    afterSalesRisk: 4,
    sampleCostMin: 900,
    sampleCostMax: 1800,
    testUnits: 10,
  },
  {
    id: 'ai-desktop-pet-robot',
    name: 'AI 桌面宠物机器人/情绪陪伴摆件',
    category: 'ai-gadget',
    supplyBase: '深圳智能硬件、汕头澄海电子玩具、东莞塑胶外壳',
    audience: '学生、办公室桌搭、二次元礼品、独居陪伴用户',
    pddQuery: 'AI桌面机器人 桌面宠物 互动机器人',
    procurementQuery: 'AI桌面宠物机器人 语音互动机器人 批发',
    procurementHint: '优先找有现成公模和固件的桌面机器人，先测“表情屏 + 语音互动 + 触摸反馈”版本。',
    contactHint: '深圳看主板和语音方案，澄海看玩具外壳和量产能力；中山只适合补包装和灯效件。',
    offlineContacts: aiGadgetContacts.slice(1),
    reasons: ['Eilik/LOOI/Rux 类桌面机器人说明桌面陪伴有话题性', '拼多多适合做低门槛礼品款和桌搭款', '可用外观、表情、灯效做差异化主图'],
    qualityChecklist: ['语音识别延迟', '屏幕表情显示', '触摸反馈', '续航和充电保护', '跌落后外壳开裂'],
    avoidSignals: ['宣传“真正 AI”但只能固定录音', 'App 无法下载或注册', '差评集中在死机和充不进电'],
    demandPotential: 5,
    supplyFit: 3,
    pddFit: 4,
    logisticsEase: 3,
    qualityControlEase: 2,
    marginPotential: 5,
    afterSalesRisk: 4,
    sampleCostMin: 800,
    sampleCostMax: 1600,
    testUnits: 8,
  },
  {
    id: 'ai-plush-voice-charm',
    name: 'AI 语音毛绒挂件/背包陪伴玩具',
    category: 'ai-gadget',
    supplyBase: '汕头澄海智能玩具、深圳语音模块、广州礼品包装',
    audience: '学生、礼品、情侣、亲子陪伴、IP 周边用户',
    pddQuery: 'AI语音毛绒玩具 会说话挂件 背包挂件',
    procurementQuery: 'AI语音毛绒挂件 智能玩具 批发 澄海',
    procurementHint: '比桌面机器人更适合拼多多低价测试，可先做“录音复读/语音问答/灯效”低配款。',
    contactHint: '线下优先看澄海玩具和深圳语音模块，确认毛绒安全、模块固定和电池仓结构。',
    offlineContacts: [aiGadgetContacts[2], aiGadgetContacts[3]],
    reasons: ['比完整机器人更轻、更便宜、更适合礼品冲动购', 'AI 话术可做“情绪陪伴/会聊天”卖点', '退货风险低于复杂机械结构'],
    qualityChecklist: ['毛绒掉毛和异味', '语音清晰度', '电池仓安全', '挂扣牢固度', '模块固定不硌手'],
    avoidSignals: ['儿童玩具无安全标识', '电池仓易打开', '语音内容不可控或侵权'],
    demandPotential: 4,
    supplyFit: 4,
    pddFit: 5,
    logisticsEase: 5,
    qualityControlEase: 3,
    marginPotential: 4,
    afterSalesRisk: 3,
    sampleCostMin: 360,
    sampleCostMax: 900,
    testUnits: 20,
  },
  {
    id: 'ai-study-story-companion',
    name: 'AI 问答学习灯/故事机小伴侣',
    category: 'ai-gadget',
    supplyBase: '中山智能灯饰、小家电 + 深圳语音方案 + 澄海教育玩具',
    audience: '小学生家庭、亲子阅读、作业陪伴、礼品用户',
    pddQuery: 'AI学习机 故事机 台灯 问答陪伴',
    procurementQuery: 'AI故事机 问答学习灯 智能语音台灯 批发',
    procurementHint: '不要做教育效果承诺，先做“故事、问答、护眼灯、计时提醒”的轻学习伴侣。',
    contactHint: '中山看灯和外壳，深圳看语音方案，澄海看故事机成熟供应；上架文案避免夸大学习效果。',
    offlineContacts: aiGadgetContacts,
    reasons: ['学习陪伴比纯玩具更容易解释使用场景', '灯具和故事机都能找到成熟供应链', '适合做亲子礼品和作业桌搭'],
    qualityChecklist: ['语音内容合规', '护眼灯频闪', '音量和音质', '按键误触', '充电和发热'],
    avoidSignals: ['宣称提分/治疗近视', '内容来源不明', '无儿童使用安全提示'],
    demandPotential: 4,
    supplyFit: 4,
    pddFit: 4,
    logisticsEase: 3,
    qualityControlEase: 2,
    marginPotential: 4,
    afterSalesRisk: 4,
    sampleCostMin: 700,
    sampleCostMax: 1500,
    testUnits: 10,
  },
  {
    id: 'ai-ambient-speaker-lamp',
    name: 'AI 氛围灯蓝牙音箱/桌面情绪灯',
    category: 'ai-gadget',
    supplyBase: '中山古镇灯饰、深圳蓝牙音频、东凤小家电',
    audience: '卧室桌搭、直播背景、宿舍、礼品用户',
    pddQuery: 'AI氛围灯 蓝牙音箱 桌面情绪灯',
    procurementQuery: '智能氛围灯 蓝牙音箱 语音控制 批发',
    procurementHint: '优先做“灯效 + 音箱 + 简单语音/APP控制”版本，避免复杂机器人结构。',
    contactHint: '中山灯饰可看外观灯效，深圳补蓝牙音频和控制板，东凤看小电器装配能力。',
    offlineContacts: aiGadgetContacts.slice(0, 3),
    reasons: ['比机器人更容易量产和售后', '灯效视频适合短视频主图', '可用礼品、宿舍、桌搭场景做组合卖点'],
    qualityChecklist: ['蓝牙连接稳定', '灯效色差', '音质破音', '连续播放发热', '充电保护'],
    avoidSignals: ['无音频认证资料', '灯效和实物色差大', '差评集中在断连和杂音'],
    demandPotential: 4,
    supplyFit: 5,
    pddFit: 4,
    logisticsEase: 4,
    qualityControlEase: 3,
    marginPotential: 4,
    afterSalesRisk: 3,
    sampleCostMin: 500,
    sampleCostMax: 1200,
    testUnits: 15,
  },
  {
    id: 'no-drill-hooks',
    name: '免打孔挂钩/门后挂架套装',
    category: 'hardware',
    supplyBase: '中山小榄五金塑电、佛山家居五金',
    audience: '租房家庭、宿舍、厨房卫浴收纳用户',
    pddQuery: '免打孔挂钩 门后挂架 套装',
    procurementQuery: '中山小榄 免打孔挂钩 批发',
    procurementHint: '重点找小榄五金、塑胶件配套商，要求承重测试视频和胶片替换包。',
    contactHint: '从茂意雅苑出发往小榄看五金机电商贸城，再按挂钩/背胶/门后架找工厂。',
    offlineContacts: hardwareContacts,
    reasons: ['低客单高复购，适合组合包', '不涉及电器认证，质检简单', 'PDD 用户对家居小件价格敏感'],
    qualityChecklist: ['承重测试', '背胶粘性', '边角毛刺', '防锈处理', '包装防压'],
    avoidSignals: ['承重只写夸张数字无测试', '胶片气味大', '金属边缘割手'],
    demandPotential: 5,
    supplyFit: 5,
    pddFit: 5,
    logisticsEase: 5,
    qualityControlEase: 5,
    marginPotential: 3,
    afterSalesRisk: 1,
    sampleCostMin: 180,
    sampleCostMax: 350,
    testUnits: 60,
  },
  {
    id: 'drawer-organizers',
    name: '抽屉分隔收纳盒/衣柜分层板',
    category: 'storage',
    supplyBase: '中山、佛山、广州家居塑料和家纺供应链',
    audience: '宝妈、租房青年、宿舍、衣柜整理用户',
    pddQuery: '抽屉分隔收纳盒 衣柜分层板',
    procurementQuery: '广东 抽屉收纳盒 衣柜分层板 批发',
    procurementHint: '找可混批颜色、支持一件代发或小批量发货的工厂/档口。',
    contactHint: '茂意雅苑周边先看日用档口样品，再用 1688 对比佛山/广州源头价。',
    offlineContacts: dailyContacts,
    reasons: ['用途高频，退货理由少', '可做尺寸/颜色组合', '适合直播间和详情页场景展示'],
    qualityChecklist: ['尺寸误差', '塑料韧性', '边缘毛刺', '承重变形', '运输压损'],
    avoidSignals: ['厚度不标', '买家晒图明显软塌', '套装尺寸不清晰'],
    demandPotential: 5,
    supplyFit: 4,
    pddFit: 5,
    logisticsEase: 4,
    qualityControlEase: 5,
    marginPotential: 3,
    afterSalesRisk: 1,
    sampleCostMin: 220,
    sampleCostMax: 420,
    testUnits: 50,
  },
  {
    id: 'lock-accessories',
    name: '门吸/锁芯保护盖/智能锁配件',
    category: 'hardware',
    supplyBase: '中山小榄锁具、五金制品产业带',
    audience: '装修用户、出租房房东、维修安装师傅',
    pddQuery: '门吸 锁芯保护盖 智能锁配件',
    procurementQuery: '中山小榄 锁具配件 门吸 批发',
    procurementHint: '不建议新手直接卖整套智能锁，先从低售后的配件切入。',
    contactHint: '小榄五金机电商贸城适合先看样，再按锁具配件找工厂报价。',
    offlineContacts: hardwareContacts,
    reasons: ['中山小榄产业优势强', '配件比整锁售后低', '装修维修场景搜索明确'],
    qualityChecklist: ['材质厚度', '电镀/喷涂耐磨', '螺丝配齐', '尺寸兼容', '防锈测试'],
    avoidSignals: ['尺寸图缺失', '表面处理粗糙', '差评集中在不匹配'],
    demandPotential: 4,
    supplyFit: 5,
    pddFit: 4,
    logisticsEase: 5,
    qualityControlEase: 4,
    marginPotential: 3,
    afterSalesRisk: 2,
    sampleCostMin: 250,
    sampleCostMax: 550,
    testUnits: 40,
  },
  {
    id: 'usb-desk-fan',
    name: 'USB 桌面小风扇/夹扇',
    category: 'small-appliance',
    supplyBase: '中山东凤、南头及顺德小家电带',
    audience: '办公室、学生宿舍、婴儿车、夏季通勤用户',
    pddQuery: 'USB 桌面小风扇 夹扇',
    procurementQuery: '中山东凤 USB 小风扇 工厂',
    procurementHint: '必须核实电机、噪音、充电安全和售后备件，不做无资质电器。',
    contactHint: '东凤/南头家电厂和顺德小家电厂均可比价，先拿样做 72 小时测试。',
    offlineContacts: applianceContacts,
    reasons: ['夏季爆发强', '小家电线上消费心智成熟', '中山北部家电供应链近'],
    qualityChecklist: ['电池/电机参数', '噪音分贝', '充电发热', '防夹手结构', '质检和认证材料'],
    avoidSignals: ['无品牌无合格证', '充电发热差评多', '风量与续航虚标'],
    demandPotential: 5,
    supplyFit: 4,
    pddFit: 4,
    logisticsEase: 4,
    qualityControlEase: 3,
    marginPotential: 4,
    afterSalesRisk: 4,
    sampleCostMin: 500,
    sampleCostMax: 1000,
    testUnits: 20,
  },
  {
    id: 'kitchen-timer-set',
    name: '厨房定时器/油壶/密封夹组合',
    category: 'kitchen',
    supplyBase: '中山、佛山、广州厨房日用供应链',
    audience: '家庭厨房、新手做饭、宝妈、租房人群',
    pddQuery: '厨房定时器 油壶 密封夹 套装',
    procurementQuery: '广东 厨房定时器 油壶 密封夹 批发',
    procurementHint: '组合包比单品更容易形成差异化，注意食品接触材料标识。',
    contactHint: '茂意雅苑周边先看样，批量货源再用 1688 与珠三角源头厂比价。',
    offlineContacts: dailyContacts,
    reasons: ['高频生活场景，容易做套装', '非电器款售后低', '详情页可用厨房场景提升转化'],
    qualityChecklist: ['食品接触材料标识', '油壶密封', '定时器按键寿命', '刻度清晰', '包装防漏'],
    avoidSignals: ['异味明显', '油壶漏液差评', '材料不明'],
    demandPotential: 4,
    supplyFit: 4,
    pddFit: 5,
    logisticsEase: 4,
    qualityControlEase: 4,
    marginPotential: 3,
    afterSalesRisk: 2,
    sampleCostMin: 280,
    sampleCostMax: 520,
    testUnits: 40,
  },
  {
    id: 'basic-tee',
    name: '沙溪基础款 T 恤/防晒衣',
    category: 'apparel',
    supplyBase: '中山沙溪休闲服装产业带',
    audience: '学生、工装团购、亲子家庭、低价基础款用户',
    pddQuery: '基础款T恤 防晒衣 宽松',
    procurementQuery: '中山沙溪 T恤 防晒衣 批发',
    procurementHint: '先做基础款和单色款，降低尺码、色差和版型售后。',
    contactHint: '从茂意雅苑到沙溪服装市场看档口，必须拍实穿图并核验尺码表。',
    offlineContacts: apparelContacts,
    reasons: ['沙溪服装链条成熟', '客群宽，价格带适合 PDD', '可做家庭装/团购装'],
    qualityChecklist: ['克重', '缩水率', '色牢度', '尺码表', '线头和缝制'],
    avoidSignals: ['盗图无实拍', '尺码差评集中', '面料克重不写'],
    demandPotential: 4,
    supplyFit: 5,
    pddFit: 4,
    logisticsEase: 4,
    qualityControlEase: 3,
    marginPotential: 3,
    afterSalesRisk: 4,
    sampleCostMin: 450,
    sampleCostMax: 900,
    testUnits: 30,
  },
  {
    id: 'pet-clean-set',
    name: '宠物拾便袋/粘毛器/梳毛器套装',
    category: 'pet',
    supplyBase: '珠三角日用塑胶、纺织与包装供应链',
    audience: '养猫养狗家庭、新手养宠、租房养宠用户',
    pddQuery: '宠物拾便袋 粘毛器 梳毛器 套装',
    procurementQuery: '广东 宠物拾便袋 粘毛器 梳毛器 批发',
    procurementHint: '优先做耗材和清洁工具，不碰食品、药品和复杂电器。',
    contactHint: '先在线下日用小商品档口对比厚度和手感，再线上找工厂核价。',
    offlineContacts: dailyContacts,
    reasons: ['耗材复购强', '低重量低破损', '套装容易提高客单'],
    qualityChecklist: ['袋子厚度', '断点易撕', '粘毛纸粘性', '梳齿圆润', '数量足量'],
    avoidSignals: ['卷数虚标', '梳齿刮皮肤', '塑料异味重'],
    demandPotential: 4,
    supplyFit: 4,
    pddFit: 5,
    logisticsEase: 5,
    qualityControlEase: 4,
    marginPotential: 3,
    afterSalesRisk: 1,
    sampleCostMin: 200,
    sampleCostMax: 450,
    testUnits: 50,
  },
  {
    id: 'festival-string-light',
    name: '节日氛围灯串/露营装饰灯',
    category: 'lighting',
    supplyBase: '中山横栏、中山古镇灯饰、深圳/东莞电子配套',
    audience: '露营用户、节日布置、民宿、直播间布景',
    pddQuery: '节日灯串 露营装饰灯 氛围灯',
    procurementQuery: '中山横栏 古镇 节日灯串 氛围灯 批发',
    procurementHint: '做季节前置备货，少量多款测试图片点击率。',
    contactHint: '从茂意雅苑先看横栏灯串厂，再去古镇配件市场比线材和电源。',
    offlineContacts: lightingContacts,
    reasons: ['中山灯饰链路吻合', '图文种草效果强', '节日前可快速放量'],
    qualityChecklist: ['线材规格', '插头/电池盒安全', '灯珠一致性', '防水等级', '包装抗压'],
    avoidSignals: ['低价无电源参数', '线材过细', '买家反馈短路或不亮'],
    demandPotential: 4,
    supplyFit: 5,
    pddFit: 4,
    logisticsEase: 4,
    qualityControlEase: 3,
    marginPotential: 4,
    afterSalesRisk: 3,
    sampleCostMin: 350,
    sampleCostMax: 800,
    testUnits: 25,
  },
  {
    id: 'microfiber-cleaning-set',
    name: '厨房去污擦/鱼鳞抹布/清洁刷套装',
    category: 'cleaning',
    supplyBase: '中山、佛山、广州日用清洁用品供应链',
    audience: '家庭厨房、租房用户、宝妈、保洁耗材用户',
    pddQuery: '厨房去污擦 鱼鳞抹布 清洁刷 套装',
    procurementQuery: '广东 厨房清洁刷 鱼鳞抹布 批发',
    procurementHint: '先看线下小商品档口的材质和包装，再用 1688 找源头价和套装组合。',
    contactHint: '从茂意雅苑出发可先看横栏/古镇日用档口、沙溪云汉小商品档口。',
    offlineContacts: dailyContacts,
    reasons: ['耗材复购强', '低重量低破损', '适合组合套装和多件装'],
    qualityChecklist: ['吸水性', '掉毛情况', '刷毛硬度', '异味', '包装数量足量'],
    avoidSignals: ['数量虚标', '掉毛明显', '异味重'],
    demandPotential: 5,
    supplyFit: 4,
    pddFit: 5,
    logisticsEase: 5,
    qualityControlEase: 5,
    marginPotential: 3,
    afterSalesRisk: 1,
    sampleCostMin: 180,
    sampleCostMax: 360,
    testUnits: 60,
  },
  {
    id: 'phone-cable-holder-set',
    name: '数据线保护套/理线器/手机支架套装',
    category: 'phone-accessory',
    supplyBase: '珠三角 3C 配件、塑胶件和包装供应链',
    audience: '学生、办公室、车载用户、手机配件低价用户',
    pddQuery: '数据线保护套 理线器 手机支架 套装',
    procurementQuery: '广东 数据线保护套 理线器 手机支架 批发',
    procurementHint: '避开高认证充电器，先做低风险塑胶配件和支架类。',
    contactHint: '线下可在中山小商品档口看样，批量建议线上找深圳/东莞源头厂核价。',
    offlineContacts: dailyContacts,
    reasons: ['轻小件运费低', '可做颜色组合', '适合低价引流'],
    qualityChecklist: ['塑胶韧性', '卡扣松紧', '支架稳定性', '毛边', '颜色一致性'],
    avoidSignals: ['塑料脆裂', '支架晃动', '图片与实物色差大'],
    demandPotential: 4,
    supplyFit: 4,
    pddFit: 5,
    logisticsEase: 5,
    qualityControlEase: 4,
    marginPotential: 3,
    afterSalesRisk: 1,
    sampleCostMin: 180,
    sampleCostMax: 420,
    testUnits: 60,
  },
  {
    id: 'student-stationery-pack',
    name: '便利贴/索引贴/中性笔文具组合',
    category: 'stationery',
    supplyBase: '中山小商品档口、广州/义乌文具供应链',
    audience: '学生、办公室、备考人群、宝妈采购',
    pddQuery: '便利贴 索引贴 中性笔 文具套装',
    procurementQuery: '广东 文具套装 便利贴 索引贴 批发',
    procurementHint: '优先做标准化文具套装，注意笔芯出墨和纸张粘性。',
    contactHint: '线下在小商品档口看包装和实物，批量用 1688 对比文具源头价。',
    offlineContacts: dailyContacts,
    reasons: ['标准化程度高', '学生用户广', '可做开学季组合'],
    qualityChecklist: ['笔芯出墨', '纸张粘性', '数量足量', '包装破损率', '印刷清晰度'],
    avoidSignals: ['漏墨断墨', '数量不足', '纸张异味'],
    demandPotential: 4,
    supplyFit: 3,
    pddFit: 5,
    logisticsEase: 5,
    qualityControlEase: 5,
    marginPotential: 3,
    afterSalesRisk: 1,
    sampleCostMin: 200,
    sampleCostMax: 450,
    testUnits: 50,
  },
  {
    id: 'makeup-tool-set',
    name: '化妆刷/粉扑/睫毛夹美妆工具包',
    category: 'beauty-tools',
    supplyBase: '广州美妆工具、珠三角包装供应链',
    audience: '学生党、新手化妆、直播间低价套装用户',
    pddQuery: '化妆刷 粉扑 睫毛夹 美妆工具套装',
    procurementQuery: '广州 化妆刷 粉扑 睫毛夹 批发',
    procurementHint: '只做工具类，不碰功效化妆品；重点看毛质、掉毛和皮肤接触安全。',
    contactHint: '中山线下可看小商品档口，源头价建议查广州美妆工具供应商。',
    offlineContacts: dailyContacts,
    reasons: ['低客单容易套装化', '不涉及化妆品功效宣传', '详情页展示空间大'],
    qualityChecklist: ['刷毛掉毛', '粉扑回弹', '金属夹口平整', '异味', '皮肤接触材质'],
    avoidSignals: ['刺脸掉毛', '金属毛刺', '异味明显'],
    demandPotential: 4,
    supplyFit: 3,
    pddFit: 5,
    logisticsEase: 5,
    qualityControlEase: 3,
    marginPotential: 4,
    afterSalesRisk: 2,
    sampleCostMin: 260,
    sampleCostMax: 600,
    testUnits: 40,
  },
  {
    id: 'travel-care-kit',
    name: '分装瓶/洗漱包/一次性毛巾旅行个护套装',
    category: 'personal-care',
    supplyBase: '中山日用百货、广州个护旅行用品供应链',
    audience: '出差旅行、学生宿舍、露营用户',
    pddQuery: '分装瓶 洗漱包 一次性毛巾 旅行套装',
    procurementQuery: '广东 分装瓶 洗漱包 一次性毛巾 批发',
    procurementHint: '分装瓶需看密封，一次性毛巾需看克重和独立包装。',
    contactHint: '可在中山日用小商品档口看样，批量找广州/佛山日用品源头。',
    offlineContacts: dailyContacts,
    reasons: ['出行场景明确', '套装客单更高', '非电器低售后'],
    qualityChecklist: ['瓶盖密封', '毛巾克重', '洗漱包拉链', '异味', '独立包装'],
    avoidSignals: ['漏液', '克重虚标', '拉链卡顿'],
    demandPotential: 4,
    supplyFit: 4,
    pddFit: 5,
    logisticsEase: 5,
    qualityControlEase: 4,
    marginPotential: 3,
    afterSalesRisk: 1,
    sampleCostMin: 240,
    sampleCostMax: 520,
    testUnits: 40,
  },
  {
    id: 'baby-safety-set',
    name: '儿童防撞角/安全锁/插座保护盖套装',
    category: 'baby',
    supplyBase: '珠三角塑胶日用、母婴安全小件供应链',
    audience: '新手爸妈、租房家庭、幼儿园场景',
    pddQuery: '儿童防撞角 安全锁 插座保护盖 套装',
    procurementQuery: '广东 儿童防撞角 安全锁 插座保护盖 批发',
    procurementHint: '不碰食品和入口类母婴品，先做安全防护小件。',
    contactHint: '中山小商品档口可看样，批量需核验材质和安全测试说明。',
    offlineContacts: dailyContacts,
    reasons: ['刚需场景强', '轻小件套装化', '不需要复杂售后'],
    qualityChecklist: ['材质柔软度', '背胶牢固度', '边缘圆润', '异味', '安全提示包装'],
    avoidSignals: ['刺激性气味', '背胶易脱落', '边缘割手'],
    demandPotential: 4,
    supplyFit: 3,
    pddFit: 5,
    logisticsEase: 5,
    qualityControlEase: 3,
    marginPotential: 3,
    afterSalesRisk: 2,
    sampleCostMin: 240,
    sampleCostMax: 520,
    testUnits: 40,
  },
  {
    id: 'camping-hook-light-set',
    name: '露营挂钩/地钉收纳袋/营地小灯组合',
    category: 'outdoor',
    supplyBase: '中山灯饰、五金配件、珠三角户外用品供应链',
    audience: '露营、钓鱼、户外摆摊、民宿布置用户',
    pddQuery: '露营挂钩 地钉收纳袋 营地灯 套装',
    procurementQuery: '广东 露营挂钩 地钉 营地灯 批发',
    procurementHint: '优先做非承重安全风险较低的小件组合，灯类仍需检查电池和防水。',
    contactHint: '五金件看小榄，灯类看横栏/古镇，布袋类线上比价。',
    offlineContacts: [...hardwareContacts.slice(0, 2), ...lightingContacts.slice(0, 2)],
    reasons: ['户外场景清晰', '可跨灯饰和五金供应链组合', '套装差异化空间大'],
    qualityChecklist: ['承重', '防锈', '灯具续航', '布袋缝线', '包装清单'],
    avoidSignals: ['地钉弯曲', '灯具进水', '数量漏发'],
    demandPotential: 4,
    supplyFit: 5,
    pddFit: 4,
    logisticsEase: 4,
    qualityControlEase: 3,
    marginPotential: 4,
    afterSalesRisk: 3,
    sampleCostMin: 360,
    sampleCostMax: 820,
    testUnits: 30,
  },
  {
    id: 'car-cleaning-accessory',
    name: '车载挂钩/除尘刷/临停号码牌组合',
    category: 'auto',
    supplyBase: '珠三角汽车用品、塑胶五金供应链',
    audience: '私家车车主、网约车、通勤家庭',
    pddQuery: '车载挂钩 除尘刷 临停号码牌 套装',
    procurementQuery: '广东 车载挂钩 除尘刷 号码牌 批发',
    procurementHint: '避开高售后的电子车品，先做非电子低风险小件。',
    contactHint: '线下小商品档口看样，线上找汽车用品源头厂核价。',
    offlineContacts: dailyContacts,
    reasons: ['轻小件适合组合', '车主场景明确', '非电子售后低'],
    qualityChecklist: ['塑胶韧性', '号码牌磁吸/滑盖', '刷毛掉毛', '挂钩承重', '异味'],
    avoidSignals: ['高温变形', '号码易掉', '刷毛掉落'],
    demandPotential: 4,
    supplyFit: 3,
    pddFit: 5,
    logisticsEase: 5,
    qualityControlEase: 4,
    marginPotential: 3,
    afterSalesRisk: 1,
    sampleCostMin: 220,
    sampleCostMax: 520,
    testUnits: 40,
  },
  {
    id: 'shipping-packaging-set',
    name: '快递气泡袋/封箱胶/标签纸耗材',
    category: 'packaging',
    supplyBase: '中山包装印刷、珠三角电商耗材供应链',
    audience: '电商卖家、手作店、档口发货用户',
    pddQuery: '快递气泡袋 封箱胶 标签纸 电商耗材',
    procurementQuery: '中山 快递气泡袋 封箱胶 标签纸 批发',
    procurementHint: '适合服务本地电商卖家，重点比厚度、胶粘性和纸张兼容性。',
    contactHint: '中山本地包装印刷厂和小商品档口均可询价，体积大时优先本地配送。',
    offlineContacts: dailyContacts,
    reasons: ['电商卖家高频复购', '质量标准明确', '可做本地配送服务'],
    qualityChecklist: ['袋子厚度', '胶带粘性', '标签纸兼容', '数量足量', '抗压防水'],
    avoidSignals: ['米数虚标', '胶带不粘', '标签纸卡纸'],
    demandPotential: 4,
    supplyFit: 4,
    pddFit: 4,
    logisticsEase: 3,
    qualityControlEase: 5,
    marginPotential: 3,
    afterSalesRisk: 1,
    sampleCostMin: 300,
    sampleCostMax: 700,
    testUnits: 30,
  },
  {
    id: 'resistance-band-set',
    name: '弹力带/跳绳/握力器运动小件套装',
    category: 'sports',
    supplyBase: '珠三角塑胶五金、运动小件供应链',
    audience: '居家健身、学生、减脂人群、办公室人群',
    pddQuery: '弹力带 跳绳 握力器 运动套装',
    procurementQuery: '广东 弹力带 跳绳 握力器 批发',
    procurementHint: '不做高承重复杂器械，先做可测试的轻运动小件。',
    contactHint: '五金塑胶件可看小榄，批量建议线上比东莞/深圳运动用品源头价。',
    offlineContacts: hardwareContacts,
    reasons: ['轻小件易发货', '居家健身场景稳定', '套装可提高客单'],
    qualityChecklist: ['弹力带拉伸', '跳绳轴承', '握力器弹簧', '异味', '承重风险提示'],
    avoidSignals: ['拉断风险', '轴承卡顿', '塑料异味'],
    demandPotential: 4,
    supplyFit: 3,
    pddFit: 4,
    logisticsEase: 5,
    qualityControlEase: 3,
    marginPotential: 3,
    afterSalesRisk: 2,
    sampleCostMin: 260,
    sampleCostMax: 620,
    testUnits: 35,
  },
];

export function scoreProduct(product: ProductIdea, mode: SellerMode = 'starter'): ProductScore {
  const modeBoost =
    mode === 'starter'
      ? product.logisticsEase + product.qualityControlEase - product.afterSalesRisk
      : mode === 'margin'
        ? product.marginPotential * 1.6 - product.afterSalesRisk * 0.6
        : product.demandPotential + product.supplyFit - product.afterSalesRisk;

  const raw =
    product.demandPotential * 15 +
    product.supplyFit * 14 +
    product.pddFit * 14 +
    product.logisticsEase * 10 +
    product.qualityControlEase * 12 +
    product.marginPotential * 8 -
    product.afterSalesRisk * 9 +
    modeBoost * 3;

  const score = Math.max(0, Math.min(100, Math.round((raw / 370) * 100)));

  return {
    score,
    label:
      score >= 78
        ? '优先上架'
        : score >= 66
          ? '小批测试'
          : score >= 54
            ? '谨慎跟卖'
            : '暂缓',
  };
}

export function pddSearchUrl(query: string): string {
  return `https://mobile.yangkeduo.com/search_result.html?search_key=${encodeURIComponent(query)}`;
}

export function wholesaleSearchUrl(query: string): string {
  return `https://s.1688.com/selloffer/offer_search.htm?keywords=${encodeURIComponent(query)}`;
}

export function mapSearchUrl(query: string): string {
  return `https://uri.amap.com/search?keyword=${encodeURIComponent(query)}&city=中山市&src=agent_ppt`;
}

const contactDistanceRules: Array<{ keywords: string[]; km: number; label: string; nearby: boolean }> = [
  { keywords: ['茂意雅苑', '横栏'], km: 3, label: '横栏附近，约 0-5 km', nearby: true },
  { keywords: ['古镇', '瑞丰灯配城', '环球灯配城', '星光联盟', '灯都时代', '曹三'], km: 9, label: '古镇灯饰商圈，约 8-15 km', nearby: true },
  { keywords: ['小榄'], km: 18, label: '小榄五金商圈，约 15-25 km', nearby: true },
  { keywords: ['沙溪', '龙瑞', '云汉'], km: 24, label: '沙溪/云汉商圈，约 20-35 km', nearby: true },
  { keywords: ['东凤', '南头'], km: 30, label: '东凤/南头家电带，约 25-40 km', nearby: true },
  { keywords: ['西区'], km: 32, label: '中山西区，约 25-40 km', nearby: true },
  { keywords: ['中山'], km: 35, label: '中山周边，约 30-50 km', nearby: true },
  { keywords: ['江门'], km: 45, label: '江门周边，约 40-70 km', nearby: true },
  { keywords: ['深圳', '华强北'], km: 135, label: '深圳扩展货源，约 120-160 km', nearby: false },
  { keywords: ['汕头', '澄海'], km: 430, label: '汕头澄海扩展货源，约 400 km+', nearby: false },
];

function scoreOfflineContactDistance(contact: OfflineContact): Omit<OfflineContactDisplay, keyof OfflineContact> {
  const searchable = `${contact.name} ${contact.address} ${contact.distanceHint} ${contact.mapQuery}`;
  const matchedRule = contactDistanceRules.find((rule) =>
    rule.keywords.some((keyword) => searchable.includes(keyword)),
  );

  if (matchedRule) {
    return {
      distanceKm: matchedRule.km,
      distanceLabel: matchedRule.label,
      isNearby: matchedRule.nearby,
    };
  }

  return {
    distanceKm: 999,
    distanceLabel: '扩展货源，需先地图复核',
    isNearby: false,
  };
}

export function selectOfflineContactsForDisplay(
  contacts: OfflineContact[],
  limit = 6,
): OfflineContactDisplay[] {
  const rankedContacts = contacts
    .map((contact, index) => ({
      ...contact,
      ...scoreOfflineContactDistance(contact),
      originalIndex: index,
    }))
    .sort((a, b) => a.distanceKm - b.distanceKm || a.originalIndex - b.originalIndex);

  const nearbyContacts = rankedContacts.filter((contact) => contact.isNearby);
  const displayContacts = nearbyContacts.length > 0 ? nearbyContacts : rankedContacts;

  return displayContacts.slice(0, limit).map((contact) => ({
    name: contact.name,
    address: contact.address,
    phone: contact.phone,
    verification: contact.verification,
    distanceHint: contact.distanceHint,
    note: contact.note,
    mapQuery: contact.mapQuery,
    sourceUrl: contact.sourceUrl,
    lastChecked: contact.lastChecked,
    distanceKm: contact.distanceKm,
    distanceLabel: contact.distanceLabel,
    isNearby: contact.isNearby,
  }));
}

export function estimateLaunchBudget(products: ProductIdea[]): number {
  return products.reduce(
    (sum, product) => sum + Math.round((product.sampleCostMin + product.sampleCostMax) / 2),
    0,
  );
}

export function buildClosedLoopStatus(product: ProductIdea): ClosedLoopStatus {
  return {
    sourceRecords: buildDataSourceRecords(product),
    priceUpdates: buildPriceUpdateRecords(product),
    qualityRecords: buildQualityInspectionRecords(product),
    salesFeedback: buildSalesFeedbackRecords(product),
  };
}

export function buildQualityVerificationGuide(product: ProductIdea): QualityVerificationGuide {
  const categoryRules = getCategoryQualityRules(product.category);
  const offlineSteps = [...categoryRules.offlineSteps, ...buildProductSpecificOfflineChecks(product)];
  const onlineSteps = [...categoryRules.onlineSteps, ...buildProductSpecificOnlineChecks(product)];
  const antiPitfallRules = [
    ...categoryRules.antiPitfallRules,
    ...product.avoidSignals.slice(0, 3).map((signal) => `出现“${signal}”时，不建议首批备货。`),
  ];
  const sampleDecision = [
    ...categoryRules.sampleDecision,
    product.afterSalesRisk >= 4
      ? `售后风险高：样品不过压力测试，不上架。`
      : `样品通过后再按 ${product.testUnits} 件以内小批测款。`,
  ];

  return {
    offlineSteps: uniqueTake(offlineSteps, 3),
    onlineSteps: uniqueTake(onlineSteps, 3),
    antiPitfallRules: uniqueTake(antiPitfallRules, 3),
    sampleDecision: uniqueTake(sampleDecision, 3),
  };
}

export function buildDataSourceRecords(product: ProductIdea): DataSourceRecord[] {
  const industrySource = getIndustrySource(product.category);
  const offlineSources = product.offlineContacts.slice(0, 3).map<DataSourceRecord>((contact) => ({
    type: contact.verification === '地图页复核' ? '地图复核' : '线下联系点',
    sourceName: contact.name,
    url: contact.sourceUrl ?? mapSearchUrl(contact.mapQuery),
    evidence: `${contact.address}；电话：${contact.phone}`,
    confidence:
      contact.verification === '公开资料可核验'
        ? '高'
        : contact.verification === '地图页复核'
          ? '中'
          : '待核验',
    lastChecked: contact.lastChecked ?? '2026-06-13',
    nextCheck: '出发看样前 24 小时内复核',
  }));

  return [
    {
      type: '产业依据',
      sourceName: industrySource.name,
      url: industrySource.url,
      evidence: industrySource.evidence,
      confidence: '高',
      lastChecked: '2026-06-13',
      nextCheck: '每月复核一次产业资料和市场状态',
    },
    {
      type: '线上比价',
      sourceName: '拼多多关键词售卖搜索',
      url: pddSearchUrl(product.pddQuery),
      evidence: product.pddQuery,
      confidence: '中',
      lastChecked: '需商家打开实时搜索',
      nextCheck: '每次上架前和改价前复核',
    },
    {
      type: '线上比价',
      sourceName: '1688 关键词货源搜索',
      url: wholesaleSearchUrl(product.procurementQuery),
      evidence: product.procurementQuery,
      confidence: '中',
      lastChecked: '需商家打开实时搜索',
      nextCheck: '每次补货前复核',
    },
    ...offlineSources,
  ];
}

export function buildPriceUpdateRecords(product: ProductIdea): PriceUpdateRecord[] {
  const averageSampleCost = Math.round((product.sampleCostMin + product.sampleCostMax) / 2);
  const pddFloor = Math.max(9, Math.round((averageSampleCost / Math.max(product.testUnits, 1)) * 1.6));
  const pddCeiling = Math.round(pddFloor * (product.marginPotential >= 4 ? 2.2 : 1.8));
  const unitCostLow = Math.max(2, Math.round(product.sampleCostMin / Math.max(product.testUnits, 1)));
  const unitCostHigh = Math.max(unitCostLow + 1, Math.round(product.sampleCostMax / Math.max(product.testUnits, 1)));

  return [
    {
      channel: '拼多多售卖',
      label: '建议监控售价',
      value: `${pddFloor}-${pddCeiling} 元/件或套`,
      updateMethod: '打开拼多多比价入口，记录同款低价、销量、差评关键词',
      lastChecked: '待商家实时搜索',
      nextAction: '低于成本价竞争时，改做套装、赠品或差异化主图',
    },
    {
      channel: '1688货源',
      label: '参考拿货单价',
      value: `${unitCostLow}-${unitCostHigh} 元/件或套`,
      updateMethod: '打开 1688 入口，按起批量、运费、是否一件代发分开记录',
      lastChecked: '基于当前样品预算估算',
      nextAction: '至少询 3 家，要求实拍、质检参数和发货时效',
    },
    {
      channel: '线下拿样',
      label: '首轮样品预算',
      value: `${product.sampleCostMin}-${product.sampleCostMax} 元`,
      updateMethod: `按 ${product.testUnits} 件左右测款量，线下看样后更新真实单价`,
      lastChecked: '2026-06-13',
      nextAction: '记录档口/工厂报价、是否含税、是否含包装、是否支持退换',
    },
    {
      channel: '预估毛利',
      label: '毛利验证',
      value: product.marginPotential >= 4 ? '优先验证 35% 以上毛利' : '优先验证 20%-30% 毛利',
      updateMethod: '售价 - 拿货价 - 运费 - 平台/推广/售后成本',
      lastChecked: '需接入真实店铺数据',
      nextAction: '毛利不足时淘汰单品或改为组合套装',
    },
  ];
}

export function buildQualityInspectionRecords(product: ProductIdea): QualityInspectionRecord[] {
  const base = product.qualityChecklist.slice(0, 5).map<QualityInspectionRecord>((checkpoint) => ({
    checkpoint,
    method: getQualityMethod(product.category, checkpoint),
    passStandard: getQualityStandard(product.category, checkpoint),
    status: '待拿样',
  }));

  return [
    ...base,
    {
      checkpoint: '差评词复核',
      method: '打开拼多多同款链接，记录前 30 条差评和追评',
      passStandard: '无集中出现“坏、虚标、漏、发热、尺寸不准、异味”等同一问题',
      status: '待复核',
    },
  ];
}

export function buildSalesFeedbackRecords(product: ProductIdea): SalesFeedbackRecord[] {
  return [
    {
      metric: '点击率',
      target: product.category === 'lighting' ? '主图点击率高于同店均值 20%' : '主图点击率不低于同店均值',
      current: '待上架采集',
      decisionRule: '点击低则先改主图、标题和价格锚点，不急于补货',
    },
    {
      metric: '转化率',
      target: scoreProduct(product).score >= 78 ? '首周转化率达到店铺均值' : '小批测试期观察是否接近店铺均值',
      current: '待上架采集',
      decisionRule: '有点击无转化，优先检查价格、评价、详情页和规格组合',
    },
    {
      metric: '退款/售后率',
      target: product.afterSalesRisk >= 4 ? '严格控制在可承受区间，异常即暂停' : '低于同类目均值',
      current: '待订单回流',
      decisionRule: '售后集中在同一质量点时，停止补货并回到质检环节',
    },
    {
      metric: '补货/淘汰',
      target: '7-14 天形成继续、优化或淘汰结论',
      current: '待测款',
      decisionRule: '高点击高转化低售后则补货；低点击低转化则淘汰或换款',
    },
  ];
}

function getIndustrySource(category: ProductCategory): { name: string; url: string; evidence: string } {
  if (category === 'lighting') {
    return {
      name: '中山市古镇镇政府：灯饰产业资料',
      url: 'https://www.zs.gov.cn/gzz/gzgk/gzjj/index.html',
      evidence: '用于确认横栏、古镇周边灯饰产业带基础',
    };
  }
  if (category === 'hardware') {
    return {
      name: '中山市小榄镇政府：五金与智能锁产业资料',
      url: 'https://www.zs.gov.cn/xlz/zjxz/xzgk/content/mpost_1262334.html',
      evidence: '用于确认小榄五金、锁具、轻工五金产业基础',
    };
  }
  if (category === 'small-appliance') {
    return {
      name: '中山市政府：东凤智能家电产业资料',
      url: 'https://www.zs.gov.cn/zwgk/zdxm/xmjj/content/post_2160301.html',
      evidence: '用于确认东凤、南头小家电供应链方向',
    };
  }
  if (category === 'ai-gadget') {
    return {
      name: '中山灯饰/小家电 + 深圳智能硬件 + 澄海玩具供应链组合',
      url: 'https://www.zs.gov.cn/gzz/gzgk/gzjj/index.html',
      evidence: '用于确认 AI 互动硬件可拆分为灯饰结构、小电器装配、电子模块和玩具外观供应链',
    };
  }
  if (category === 'apparel') {
    return {
      name: '中山市沙溪镇政府：服装与电商产业资料',
      url: 'https://www.zs.gov.cn/shxz/wgk/jcgk/content/post_2027527.html',
      evidence: '用于确认沙溪休闲服装与电商产业基础',
    };
  }
  return {
    name: '中山周边珠三角日用小商品供应链',
    url: 'https://www.zs.gov.cn/',
    evidence: '用于日用、厨房、宠物、收纳类小商品的区域供应链参考',
  };
}

function getQualityMethod(category: ProductCategory, checkpoint: string): string {
  if (category === 'lighting') return `现场点亮并连续测试：${checkpoint}`;
  if (category === 'ai-gadget') return `连续交互测试、充电发热和结构寿命检查：${checkpoint}`;
  if (category === 'small-appliance') return `连续运行 72 小时并检查认证资料：${checkpoint}`;
  if (category === 'apparel') return `抽样水洗、尺码平铺测量、实拍试穿：${checkpoint}`;
  if (category === 'hardware') return `承重、盐雾/防锈、毛刺和配件齐套检查：${checkpoint}`;
  return `拿样开箱、尺寸称重、异味和耐用性检查：${checkpoint}`;
}

function getQualityStandard(category: ProductCategory, checkpoint: string): string {
  if (checkpoint.includes('发热') || category === 'small-appliance') return '无明显异常发热、无异响、资料齐全';
  if (category === 'ai-gadget') return '交互稳定、无异常发热、无卡顿死机，儿童/电池安全说明清楚';
  if (checkpoint.includes('尺寸') || category === 'apparel') return '实测与详情页标注误差可接受，尺码表清晰';
  if (category === 'lighting') return '亮度、续航、防水/线材与页面承诺一致';
  if (category === 'hardware') return '无割手毛刺，承重/防锈表现与宣传一致';
  return '无明显异味、破损、虚标和包装压损';
}

function getCategoryQualityRules(category: ProductCategory): QualityVerificationGuide {
  const common: QualityVerificationGuide = {
    offlineSteps: ['看实物细节、包装和数量，不符合页面承诺就不拿样。'],
    onlineSteps: ['拼多多看差评集中点，1688 看实拍、起批量和买家复购。'],
    antiPitfallRules: ['只给效果图、不肯发实拍细节的供应商直接跳过。'],
    sampleDecision: ['先小单拿样，确认质量稳定后再补货。'],
  };

  const rules: Partial<Record<ProductCategory, QualityVerificationGuide>> = {
    lighting: {
      offlineSteps: ['现场点亮 15 分钟，摸外壳温度，看灯珠亮度是否一致。', '充电款测充电口松紧；户外款问清防水等级和电池容量。'],
      onlineSteps: ['差评搜“不亮、续航短、发热、进水、感应失灵”。', '要求点亮视频、参数铭牌、包装图和合格证照片。'],
      antiPitfallRules: ['只写“超亮/超长续航”但无功率、电池容量，不拿样。'],
      sampleDecision: ['至少测一次满电续航，再决定是否上架。'],
    },
    hardware: {
      offlineSteps: ['摸边缘是否割手，看电镀/喷涂是否粗糙。', '能承重的现场挂重物；带螺丝的检查配件是否齐套。'],
      onlineSteps: ['差评重点搜“不粘、掉落、生锈、毛刺、尺寸不符”。'],
      antiPitfallRules: ['承重数字夸张但无测试视频，按虚标处理。'],
      sampleDecision: ['留样 3-5 天，看生锈、背胶脱落和变形。'],
    },
    'small-appliance': {
      offlineSteps: ['查 3C/合格证/说明书，现场运行看发热、异响。', '充电款检查电池标识、充电口松紧和线材。'],
      onlineSteps: ['差评重点搜“发热、充不进电、电池、噪音、坏了、售后”。'],
      antiPitfallRules: ['无合格证、无品牌主体、无售后承诺的小电器不卖。'],
      sampleDecision: ['小电器必须做 72 小时压力测试，退货率可控后再补货。'],
    },
    'ai-gadget': {
      offlineSteps: ['现场连续交互 10 分钟：语音、触摸、灯效/动作是否稳定。', '充电运行后摸外壳和电池仓，检查发热、异响、卡顿和松动。'],
      onlineSteps: ['差评重点搜“死机、连不上、语音不灵、充不进电、声音小、卡顿”。', '要求供应商发实拍交互视频、说明书、质检资料和售后换新规则。'],
      antiPitfallRules: ['只讲“AI”但没有可演示功能、依赖不可用 App/云服务、无电池安全说明的不要测。'],
      sampleDecision: ['先拿 1-3 台样机做 3 天压力测试，再按低配款小批测图和测价。'],
    },
    apparel: {
      offlineSteps: ['摸面料厚薄，看走线和线头；拉扯缝线看是否开线。', '拿样水洗一次，看缩水、掉色和起球。'],
      onlineSteps: ['差评重点搜“尺码不准、薄、起球、掉色、线头”。'],
      antiPitfallRules: ['没有实拍图、尺码表和克重，不铺货。'],
      sampleDecision: ['服装先用基础色和少尺码测款，避免多色多码压库存。'],
    },
    kitchen: {
      offlineSteps: ['接触食品的看材质标识；容器类装水倒置看漏不漏。', '按键/夹子/盖子反复开合 20 次，看是否卡顿。'],
      onlineSteps: ['差评搜“漏、异味、刻度不准、盖不紧、坏”。'],
      antiPitfallRules: ['食品接触材质不明、异味明显，直接淘汰。'],
      sampleDecision: ['先测密封和异味，再做套装组合。'],
    },
    storage: {
      offlineSteps: ['量尺寸，看塑料/布料厚度；装重物看是否塌陷。'],
      onlineSteps: ['差评搜“软、塌、尺寸小、味道、破”。'],
      antiPitfallRules: ['尺寸不清楚或厚度不标，不做主推款。'],
      sampleDecision: ['优先测 2-3 个主流尺寸，不一次铺全规格。'],
    },
    pet: {
      offlineSteps: ['耗材数数量和厚度；梳齿/边角摸一遍看是否刮手。'],
      onlineSteps: ['差评搜“数量少、太薄、刮皮肤、异味”。'],
      antiPitfallRules: ['宠物食品、药品不纳入普通小商品测款。'],
      sampleDecision: ['先做清洁耗材和工具，不碰入口类商品。'],
    },
    cleaning: {
      offlineSteps: ['抹布测吸水和掉毛；刷子看刷毛牢固度。'],
      onlineSteps: ['差评搜“掉毛、数量少、没效果、异味”。'],
      antiPitfallRules: ['清洁效果夸张、无实测视频，不做主图卖点。'],
      sampleDecision: ['优先做多件装，先验证数量足量。'],
    },
    'phone-accessory': {
      offlineSteps: ['支架测稳定性；保护套/理线器折弯看是否脆裂。'],
      onlineSteps: ['差评搜“松、断、色差、尺寸不合”。'],
      antiPitfallRules: ['带电 3C 配件无认证不卖，先做非电小件。'],
      sampleDecision: ['颜色款先少量测，避免色差退货。'],
    },
    stationery: {
      offlineSteps: ['笔类试写 30 秒；贴纸测粘性和纸张厚度。'],
      onlineSteps: ['差评搜“断墨、不粘、数量少、破损”。'],
      antiPitfallRules: ['数量和规格不清楚，不做组合包。'],
      sampleDecision: ['开学季前小批测套装，先验证漏发率。'],
    },
    'beauty-tools': {
      offlineSteps: ['刷具在白纸上扫，看掉毛掉色；金属件摸毛刺。'],
      onlineSteps: ['差评搜“掉毛、刺脸、异味、生锈”。'],
      antiPitfallRules: ['功效化妆品和三无接触皮肤产品不碰。'],
      sampleDecision: ['只做工具类，先测触感和异味。'],
    },
    'personal-care': {
      offlineSteps: ['分装瓶装水倒置看漏液；拉链/按扣反复开合。'],
      onlineSteps: ['差评搜“漏、味道、薄、拉链坏”。'],
      antiPitfallRules: ['入口、功效、消字号模糊的个护品不要卖。'],
      sampleDecision: ['先做旅行收纳和一次性用品小套装。'],
    },
    baby: {
      offlineSteps: ['闻气味，摸边缘；小零件用力拉，看是否易脱落。'],
      onlineSteps: ['差评重点搜“异味、脱落、划伤、不牢、宝宝”。'],
      antiPitfallRules: ['母婴入口类、食品类、功效类产品不要用普通小商品逻辑判断。'],
      sampleDecision: ['母婴安全小件宁可少卖，也不要上材质不明的货。'],
    },
    outdoor: {
      offlineSteps: ['金属件测承重和防锈；灯类测续航和防水结构。'],
      onlineSteps: ['差评搜“断、弯、进水、不亮、少件”。'],
      antiPitfallRules: ['涉及承重安全的大件先不做，先做低风险小件。'],
      sampleDecision: ['跨品类套装要逐件验，不只验主商品。'],
    },
    auto: {
      offlineSteps: ['塑胶件闻气味、晒热后看变形；号码牌测磁吸/滑盖。'],
      onlineSteps: ['差评搜“高温变形、掉、味道、尺寸不合”。'],
      antiPitfallRules: ['电子车品售后高，新店先做非电子小件。'],
      sampleDecision: ['夏季车内高温场景必须额外测试。'],
    },
    packaging: {
      offlineSteps: ['抽数数量，量宽度和厚度；胶带现场试粘。'],
      onlineSteps: ['差评重点搜“米数不足、不粘、薄、破、卡纸”。'],
      antiPitfallRules: ['包装耗材最容易虚标数量和厚度，必须抽数。'],
      sampleDecision: ['包装类可做复购，但首单必须核实数量足量。'],
    },
    party: {
      offlineSteps: ['看颜色、印刷和破损；灯串/气球类测漏气或点亮。'],
      onlineSteps: ['差评搜“少件、色差、破、漏气、不亮”。'],
      antiPitfallRules: ['节庆品季节性强，过季库存风险高。'],
      sampleDecision: ['节日前小批多款测图，不压大库存。'],
    },
    sports: {
      offlineSteps: ['弹力件拉伸 20 次；轴承/弹簧类反复使用看卡顿。'],
      onlineSteps: ['差评搜“断、卡、异味、承重不行”。'],
      antiPitfallRules: ['高承重器械不按小商品逻辑测款。'],
      sampleDecision: ['只先做轻运动小件，承重品必须额外测试。'],
    },
  };

  return rules[category] ?? common;
}

function buildProductSpecificOfflineChecks(product: ProductIdea): string[] {
  return [
    `现场只核 ${product.qualityChecklist.slice(0, 2).join('、')}，不合格就不拿样。`,
  ];
}

function buildProductSpecificOnlineChecks(product: ProductIdea): string[] {
  return [
    `差评重点对照：${product.avoidSignals.slice(0, 2).join('、')}。`,
  ];
}

function uniqueTake(values: string[], limit: number): string[] {
  return [...new Set(values.filter(Boolean))].slice(0, limit);
}

export function filterProducts(
  products: ProductIdea[],
  category: ProductCategory | 'all',
  searchText: string,
): ProductIdea[] {
  const text = searchText.trim().toLowerCase();
  return products.filter((product) => {
    const categoryMatched = category === 'all' || product.category === category;
    const textMatched =
      !text ||
      `${product.name} ${product.supplyBase} ${product.audience} ${product.pddQuery} ${product.offlineContacts
        .map((contact) => `${contact.name} ${contact.address}`)
        .join(' ')}`
        .toLowerCase()
        .includes(text);
    return categoryMatched && textMatched;
  });
}

export function buildFeedback(
  product: ProductIdea,
  budget: number,
  riskTolerance: number,
  mode: SellerMode = 'starter',
): string[] {
  const feedback: string[] = [];
  const score = scoreProduct(product, mode).score;

  if (mode === 'starter') {
    feedback.push('当前按新手测款排序：优先低售后、易质检、轻物流，适合先跑标题和评价。');
  } else if (mode === 'steady') {
    feedback.push('当前按稳健铺货排序：优先需求稳定、货源近、可持续补货的 SKU。');
  } else {
    feedback.push('当前按利润优先排序：优先毛利空间和差异化，但要额外压住售后风险。');
  }

  if (score >= 78) {
    feedback.push('建议进入首批测款池：供应链、拼多多低价心智和履约难度匹配度高。');
  } else if (score >= 66) {
    feedback.push('适合小批量测试：先验证点击率、转化率和差评关键词，再决定是否加单。');
  } else {
    feedback.push('暂不建议大批备货：先找更低售后或更轻量的替代 SKU。');
  }

  if (budget < product.sampleCostMax) {
    feedback.push('当前预算偏紧，建议只拿 3-5 个样品拍图，或改做一件代发验证。');
  }

  if (product.afterSalesRisk > riskTolerance) {
    feedback.push('售后风险超过你的容忍度，需要更严的质检、质保话术和备件方案。');
  }

  if (product.qualityControlEase >= 4 && product.logisticsEase >= 4) {
    feedback.push('质检和物流难度较低，适合新店先用来跑标题、主图和评价体系。');
  }

  return feedback.slice(0, 4);
}
