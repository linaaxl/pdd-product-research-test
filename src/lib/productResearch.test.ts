import { describe, expect, it } from 'vitest';
import {
  buildFeedback,
  buildClosedLoopStatus,
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
} from './productResearch';

describe('product research model', () => {
  it('keeps a broad Zhongshan-nearby product pool', () => {
    expect(productIdeas.length).toBeGreaterThanOrEqual(20);
    expect(Object.keys(categoryLabels).length).toBeGreaterThanOrEqual(18);
    expect(productIdeas.some((product) => product.supplyBase.includes('中山古镇'))).toBe(true);
    expect(productIdeas.some((product) => product.supplyBase.includes('中山小榄'))).toBe(true);
  });

  it('covers major small-goods categories beyond the original few', () => {
    const categories = new Set(productIdeas.map((product) => product.category));

    expect(categories.has('cleaning')).toBe(true);
    expect(categories.has('phone-accessory')).toBe(true);
    expect(categories.has('stationery')).toBe(true);
    expect(categories.has('beauty-tools')).toBe(true);
    expect(categories.has('baby')).toBe(true);
    expect(categories.has('auto')).toBe(true);
    expect(categories.has('packaging')).toBe(true);
  });

  it('ranks low-risk home hardware as a strong starter SKU', () => {
    const hooks = productIdeas.find((product) => product.id === 'no-drill-hooks');

    expect(hooks).toBeDefined();
    expect(scoreProduct(hooks!, 'starter').label).toBe('优先上架');
  });

  it('keeps higher after-sales items below low-risk accessories for starter sellers', () => {
    const fan = productIdeas.find((product) => product.id === 'usb-desk-fan')!;
    const hooks = productIdeas.find((product) => product.id === 'no-drill-hooks')!;

    expect(scoreProduct(hooks, 'starter').score).toBeGreaterThan(scoreProduct(fan, 'starter').score);
  });

  it('builds usable search links for Pinduoduo and wholesale sourcing', () => {
    expect(pddSearchUrl('人体感应小夜灯')).toContain('search_key=');
    expect(wholesaleSearchUrl('中山古镇 小夜灯')).toContain('1688.com');
    expect(mapSearchUrl('瑞丰灯配城')).toContain('amap.com');
  });

  it('provides offline sourcing contacts for every product from the Henglan center', () => {
    expect(sourcingCenter).toContain('横栏镇茂意雅苑');
    expect(productIdeas.every((product) => product.offlineContacts.length > 0)).toBe(true);
    expect(
      productIdeas.every((product) =>
        product.offlineContacts.every((contact) => contact.address && contact.phone),
      ),
    ).toBe(true);
  });

  it('filters by category and keyword', () => {
    const filtered = filterProducts(productIdeas, 'lighting', '太阳能');

    expect(filtered).toHaveLength(1);
    expect(filtered[0].id).toBe('solar-garden-light');
  });

  it('estimates a launch budget from selected products', () => {
    const selected = productIdeas.slice(0, 3);

    expect(estimateLaunchBudget(selected)).toBeGreaterThan(0);
  });

  it('returns dynamic risk and budget feedback', () => {
    const fan = productIdeas.find((product) => product.id === 'usb-desk-fan')!;
    const feedback = buildFeedback(fan, 200, 2).join('');

    expect(feedback).toContain('预算');
    expect(feedback).toContain('售后风险');
  });

  it('changes feedback copy by seller strategy', () => {
    const product = productIdeas.find((item) => item.id === 'no-drill-hooks')!;

    expect(buildFeedback(product, 1200, 2, 'starter').join('')).toContain('新手测款');
    expect(buildFeedback(product, 1200, 2, 'steady').join('')).toContain('稳健铺货');
    expect(buildFeedback(product, 1200, 2, 'margin').join('')).toContain('利润优先');
  });

  it('builds four closed-loop modules for every product', () => {
    for (const product of productIdeas) {
      const loop = buildClosedLoopStatus(product);

      expect(loop.sourceRecords.length).toBeGreaterThanOrEqual(4);
      expect(loop.priceUpdates).toHaveLength(4);
      expect(loop.qualityRecords.length).toBeGreaterThanOrEqual(4);
      expect(loop.salesFeedback).toHaveLength(4);
      expect(loop.sourceRecords.every((record) => record.url.startsWith('http'))).toBe(true);
      expect(product.qualityChecklist.length).toBeGreaterThanOrEqual(5);
      expect(product.avoidSignals.length).toBeGreaterThanOrEqual(3);
    }
  });

  it('builds detailed offline and online quality verification guidance', () => {
    for (const product of productIdeas) {
      const guide = buildQualityVerificationGuide(product);

      expect(guide.offlineSteps.length).toBeGreaterThanOrEqual(2);
      expect(guide.onlineSteps.length).toBeGreaterThanOrEqual(2);
      expect(guide.antiPitfallRules.length).toBeGreaterThanOrEqual(2);
      expect(guide.sampleDecision.length).toBeGreaterThanOrEqual(2);
      expect(guide.offlineSteps.length).toBeLessThanOrEqual(3);
      expect(guide.onlineSteps.length).toBeLessThanOrEqual(3);
      expect(guide.antiPitfallRules.length).toBeLessThanOrEqual(3);
      expect(guide.sampleDecision.length).toBeLessThanOrEqual(3);
      expect(guide.offlineSteps.join('')).not.toContain('尺子、电子秤、充电头');
    }
  });

  it('uses different offline checks for different product categories', () => {
    const light = productIdeas.find((product) => product.category === 'lighting')!;
    const apparel = productIdeas.find((product) => product.category === 'apparel')!;
    const hardware = productIdeas.find((product) => product.category === 'hardware')!;

    expect(buildQualityVerificationGuide(light).offlineSteps.join('')).toContain('点亮');
    expect(buildQualityVerificationGuide(apparel).offlineSteps.join('')).toContain('水洗');
    expect(buildQualityVerificationGuide(hardware).offlineSteps.join('')).toContain('承重');
  });
});
