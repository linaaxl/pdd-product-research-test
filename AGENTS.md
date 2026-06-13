# 高中物理 AI 交互课件多 Agent 开发框架

本仓库采用 Harness Orchestrator 模式开发高中物理 AI 交互课件。所有 Agent 都必须围绕同一目标工作：产出可运行、可验证、适合课堂投影和学生探究的交互课件。

## 全局原则

- 技术栈固定为 Vite + React + TypeScript。
- 物理模型必须是 pure functions，放在 `src/lib/`。
- UI 与物理逻辑分离，React 组件不得内联核心物理公式。
- 不允许只写静态页面，必须包含真实拖拽、滑块或按钮交互。
- 每节样板课必须至少包含 3 个学生互动问题、3 条动态反馈规则、4 个物理模型单元测试。
- 每个 Agent 完成阶段性工作后，必须在 `docs/reports/agents/` 生成或更新自己的 report。
- 每个阶段完成后，Orchestrator 必须更新 `docs/harness/task_board.md`。
- 发布前必须运行并通过：
  - `npm run typecheck`
  - `npm run lint`
  - `npm run test`
  - `npm run build`

## Agent 列表

- Orchestrator Agent：统筹计划、阶段推进、任务看板、最终报告。
- Curriculum Agent：课程目标、学情、教学流程、问题链设计。
- Interaction Design Agent：课堂交互流程、组件状态、学生操作路径。
- Simulation Agent：物理模型、公式、边界条件、单元测试。
- UI Implementation Agent：React 页面、SVG/Canvas 仿真、响应式展示。
- AI Feedback Agent：动态反馈规则、AI 追问、教师提示、学生即时反馈。
- Video Search Agent：根据应用任务自动生成候选视频链接和教师审核报告，不下载第三方视频。
- QA Agent：类型检查、lint、测试、构建、验收矩阵。
- Release Agent：README、最终报告、运行说明、已知问题。

详细职责见 `docs/harness/agent_roles.md`。
