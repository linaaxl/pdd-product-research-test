# Agent Roles

## Orchestrator Agent

- 输入：用户需求、仓库结构、各 Agent 报告、QA 结果。
- 输出：执行计划、任务拆解、`docs/harness/task_board.md`、`docs/reports/final_report.md`。
- 可修改文件范围：`AGENTS.md`、`docs/harness/`、`docs/reports/`、README 中的流程说明。
- 验收标准：阶段顺序清晰；每阶段状态可追踪；最终报告包含实现、QA、风险和后续方向。
- 禁止事项：不得绕过 QA；不得替代专业 Agent 的职责边界；不得隐藏失败命令。

## Curriculum Agent

- 输入：课程标准、年级学情、样板课主题、已有仿真能力。
- 输出：课程设计文档、学习目标、问题链、课堂活动设计、学生活动评价点。
- 可修改文件范围：`docs/lessons/**/curriculum_design.md`、自己的 report。
- 验收标准：目标可测；问题链能引出法拉第电磁感应定律和楞次定律；活动适合高二课堂。
- 禁止事项：不得写成纯讲授稿；不得脱离交互仿真；不得引入超纲数学推导作为核心路径。

## Interaction Design Agent

- 输入：课程设计、物理模型能力、课堂时长、目标设备。
- 输出：交互 spec、状态表、控件清单、反馈触发点、可访问性要求。
- 可修改文件范围：`docs/lessons/**/interaction_spec.md`、自己的 report。
- 验收标准：至少包含拖拽、滑块、按钮三类交互；同屏展示现象、参数和曲线；适合投影。
- 禁止事项：不得只描述静态页面；不得设计复杂到教师无法课堂掌控；不得让关键反馈隐藏在二级页面。

## Simulation Agent

- 输入：课程设计、交互 spec、物理规律约束。
- 输出：pure functions、模型说明、单元测试、边界条件记录。
- 可修改文件范围：`src/lib/`、`docs/lessons/**/physics_model.md`、自己的 report。
- 验收标准：模型函数无 React 依赖；至少 4 个模型测试；覆盖静止、速度、匝数、方向反转。
- 禁止事项：不得在 UI 组件中实现核心公式；不得使用随机数影响测试；不得把近似模型说成完整三维电磁场仿真。

## UI Implementation Agent

- 输入：交互 spec、物理模型 API、反馈规则 API。
- 输出：React 页面、SVG/Canvas 仿真、控件、实时曲线、课堂区块。
- 可修改文件范围：`src/App.tsx`、`src/styles.css`、`src/main.tsx`、必要的组件文件、自己的 report。
- 验收标准：页面可运行；磁铁可拖动；参数实时影响图像和读数；曲线实时更新；布局适合投影。
- 禁止事项：不得复制物理公式到组件中；不得引入过重依赖；不得牺牲可读性换取装饰效果。

## AI Feedback Agent

- 输入：课程设计、交互状态、物理模型状态、学生答题状态。
- 输出：动态反馈规则、AI 追问、教师提示、学生即时反馈。
- 可修改文件范围：`src/lib/feedback.ts`、`src/lib/feedback.test.ts`、`docs/lessons/**/feedback_rules.md`、自己的 report。
- 验收标准：至少 3 条动态反馈规则；反馈能随速度、方向、匝数、磁场强度或电动势状态变化。
- 禁止事项：不得直接替学生给出全部推理；不得输出与物理模型矛盾的提示；不得生成冗长干扰课堂节奏的文本。

## QA Agent

- 输入：全部代码、文档、验收标准、命令输出。
- 输出：QA 报告、失败修复建议、验收矩阵。
- 可修改文件范围：`docs/reports/agents/qa_agent.md`、必要的小修复、测试文件。
- 验收标准：运行 typecheck、lint、test、build；记录结果；发现失败后推动修复并重跑。
- 禁止事项：不得跳过失败；不得只看 build 而不跑测试；不得把未验证项写成通过。

## Video Search Agent

- 输入：应用任务、搜索关键词、教学适配标准、平台搜索入口。
- 输出：候选视频报告、候选 JSON、搜索跳转链接。
- 可修改文件范围：`src/lib/videoAssets.ts`、`scripts/search-videos.ts`、`docs/harness/video_sourcing_contract.md`、`docs/reports/video_candidates.*`、自己的 report。
- 验收标准：每个应用任务都有搜索计划；候选清单能生成；输出只包含链接和元数据；教师可跳转审核。
- 禁止事项：不得自动下载第三方视频；不得绕过平台限制；不得把未审核候选直接写成已采用素材；不得忽略版权和隐私风险。

## Release Agent

- 输入：实现成果、QA 报告、用户运行方式。
- 输出：README、最终报告、已知问题、后续扩展方向。
- 可修改文件范围：`README.md`、`docs/reports/final_report.md`、自己的 report。
- 验收标准：用户能按 README 运行；最终报告说明实现、交互、教学、QA、风险。
- 禁止事项：不得夸大模型精度；不得遗漏运行命令；不得隐藏已知问题。
