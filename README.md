# 本地多模块开发入口

这是一个使用 Vite + React + TypeScript 开发的本地多模块原型仓库。根页面不再直接绑定单一业务，而是提供入口选择，避免后续开发任务覆盖之前内容。

当前入口：

- 高中物理：电磁感应课件
- 中山小商品选品平台

## 运行方式

```bash
npm install
npm run links
npm run dev:local
```

本机预览打开 `http://localhost:5173/`。不要把 `127.0.0.1` 链接发给其他设备，它只在当前电脑有效。

也可以直接使用 hash 打开模块：

```text
http://localhost:5173/#electromagnetic-induction
http://localhost:5173/#product-research
```

## 共创评审链接

开发、项目负责人和高中物理老师使用不同链接：

```bash
npm run links          # 生成并打印访问说明
npm run dev:local      # Codex/本机开发
npm run dev:share      # 同一局域网临时共创
npm run build
npm run preview:share  # 更稳定的构建版共创
```

运行 `npm run links` 后会生成：

```text
docs/reports/access_links.md
```

面向老师时，优先发送 `preview:share` 对应的局域网链接，或把 `dist/` 部署到学校服务器/云端后发送正式 Web 链接。

## 常用命令

```bash
npm run typecheck
npm run lint
npm run test
npm run build
npm run links
```

## 功能概览

### 高中物理：电磁感应课件

- 应用任务入口：发电机、无线充电、摇一摇手电筒、测速传感器。
- SVG 交互仿真：拖动磁铁穿过线圈，观察线圈、磁场、灯泡亮度和电流方向。
- 参数控制：磁铁位置、运动速度、线圈匝数、磁场强度、是否反向运动。
- 实时图像：Φ-t 曲线和 e-t 曲线。
- AI 教师提示：根据速度、匝数、反向运动和电动势变化动态生成追问。
- 学生预测题：3 道即时反馈题。
- 视频入口：每个应用任务提供最高相关推荐和候选链接。

### 中山小商品选品平台

- 选品评分：按需求热度、供应链匹配、拼多多适配、物流难度、质检难度、利润和售后风险综合打分。
- 互动筛选：支持品类、关键词、经营策略、预算和售后容忍度筛选。
- 货源入口：为每个 SKU 提供拼多多售卖搜索和 1688 货源搜索入口。
- 质量判断：列出每类商品的质检重点和避坑信号。
- 测款预算：可把商品加入测款池，实时估算首批拿样/测款预算。
- 卖家训练题：包含 3 道互动判断题和即时反馈，帮助新手建立选品判断。

## 项目结构

```text
src/
  App.tsx                    # 多模块入口选择
  styles.css                 # 页面样式
  modules/
    electromagnetic-induction/
      ElectromagneticInductionApp.tsx
      lib/
        induction.ts
        feedback.ts
        induction.test.ts
    product-research/
      ProductResearchApp.tsx
  lib/
    productResearch.ts       # 选品数据、评分模型、反馈规则
    productResearch.test.ts  # 模型单元测试
docs/
  harness/task_board.md      # Harness 阶段看板
  reports/agents/            # Agent 阶段报告
```

## 使用边界

电磁感应课件使用课堂可视化近似模型，不是完整三维电磁场仿真。第三方视频只做网页跳转和教师审核入口，不下载、不搬运。

选品平台提供的是调研参考和搜索入口，不保证某个单品链接长期有效。拼多多商品链接、价格和商家资质会持续变化，正式上架前必须拿样、验货、核实资质、确认发货时效和售后责任。
