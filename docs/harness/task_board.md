# Harness Task Board

更新时间：2026-05-24

## 阶段状态

| 阶段 | 负责 Agent | 状态 | 产物 |
| --- | --- | --- | --- |
| 0. 需求改版确认 | Orchestrator Agent | 完成 | 明确从物理课件改为中山小商品电商选品平台 |
| 1. 商品调研与数据建模 | Curriculum Agent / Simulation Agent | 完成 | `src/lib/productResearch.ts` |
| 2. 交互设计 | Interaction Design Agent | 完成 | 品类筛选、策略切换、预算滑块、测款池、互动题 |
| 3. UI 实现 | UI Implementation Agent | 完成 | `src/App.tsx`、`src/styles.css` |
| 4. 动态反馈规则 | AI Feedback Agent | 完成 | `buildFeedback`、3 道卖家训练题 |
| 5. QA 自检 | QA Agent | 完成 | `npm run typecheck`、`npm run lint`、`npm run test`、`npm run build` |
| 6. 发布说明 | Release Agent | 完成 | `README.md` |
| 7. 共创访问方式 | Release Agent | 完成 | `scripts/print-access-links.ts`、`docs/harness/local_access_contract.md`、`docs/reports/access_links.md` |
| 8. 多模块入口恢复 | Orchestrator Agent / UI Implementation Agent | 完成 | `src/App.tsx`、`src/modules/electromagnetic-induction/`、`src/modules/product-research/` |
| 9. 商家经营闭环模块 | Orchestrator Agent / QA Agent | 完成 | 数据来源记录、价格更新、质检记录、销售反馈 |
| 10. 品类扩展与质量判断强化 | Product Research Agent / UI Implementation Agent | 完成 | 18 个小商品品类、20+ SKU、折叠式闭环追踪、质量判断建议 |
| 11. 精准验货建议去模板化 | Product Research Agent / QA Agent | 完成 | 按品类输出线下/线上验货建议，每块最多 3 条 |

## 当前发现

- 中山周边适合优先切入的轻小件方向：古镇灯饰小件、小榄五金配件、收纳家居、厨房日用、宠物清洁耗材。
- 小家电和服装有供应链优势，但售后、认证、尺码和退货风险高于五金/收纳类，适合在新店跑通后扩大。
- 单个拼多多商品链接变化快，平台采用关键词搜索入口和质量检查清单，避免把临时链接当成固定货源。

## 下一步

- 四项发布检查已通过。
- 已增加三类访问入口：开发调试、本机预览、教师局域网共创评审，避免把 `127.0.0.1` 误发给老师。
- 已将根页面改为模块选择入口，电磁感应课件和中山小商品选品平台不再互相覆盖。
- 已补齐四个商家闭环模块：数据来源记录、价格更新、质检记录、销售反馈。
- 已将闭环追踪改为摘要 + 展开详情，减少页面噪音。
- 已扩展为更完整的小商品品类框架，并强化每个 SKU 的质量好坏判断。
- 已去除通用工具模板，改为灯饰、五金、小家电、服装、包装、车品等品类各自的验货建议。
- 后续可接入真实店铺授权数据、点击率、转化率、退款率和差评词，动态修正评分权重。
