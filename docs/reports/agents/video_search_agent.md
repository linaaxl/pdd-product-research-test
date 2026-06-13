# Video Search Agent Report

## 输入

- 4 个应用任务：发电机、无线充电、摇一摇手电筒、测速传感器。
- 搜索关键词与教师审核标准。
- 用户要求：可网页跳转播放，不需要下载。

## 输出

- `docs/harness/video_sourcing_contract.md`
- `scripts/search-videos.ts`
- `src/lib/videoAssets.ts`
- `docs/reports/video_candidates.json`
- `docs/reports/video_candidates.md`

## 实现结果

- 每个任务都有 B 站搜索链接和网页搜索链接。
- 页面在真实视频素材缺失时显示搜索跳转入口。
- `npm run search:videos` 会生成候选视频报告，供教师审核。
- 脚本只生成链接和元数据，不下载视频。

## 验收结论

满足“自动搜索候选 + 教师审核 + 网页跳转播放”的轻量方案。

## 风险

- B 站公开搜索接口可能变动或限流，脚本已保留搜索页跳转作为 fallback。
- 第三方视频版权和课堂展示权限仍需教师或发布方确认。
