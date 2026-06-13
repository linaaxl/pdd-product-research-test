import { mkdir, writeFile } from 'node:fs/promises';
import { networkInterfaces } from 'node:os';
import { dirname, resolve } from 'node:path';

interface LinkEntry {
  audience: string;
  useCase: string;
  command: string;
  url: string;
  note: string;
}

const devPort = Number(process.env.VITE_PORT ?? 5173);
const previewPort = Number(process.env.VITE_PREVIEW_PORT ?? 4173);
const outputPath = resolve('docs/reports/access_links.md');
const lanIps = getLanIps();

const entries: LinkEntry[] = [
  {
    audience: 'Codex / 开发 Agent',
    useCase: '代码修改、热更新调试、自动化检查前的快速预览',
    command: 'npm run dev:local',
    url: `http://127.0.0.1:${devPort}/`,
    note: '只保证当前开发机器可访问，最适合开发调试，不适合发给老师。',
  },
  {
    audience: '项目负责人 / 本机预览',
    useCase: '你在同一台电脑上体验最新版本',
    command: 'npm run dev:local',
    url: `http://localhost:${devPort}/`,
    note: '本机友好；如果终端关闭或 dev server 停止，链接会失效。',
  },
  {
    audience: '高中物理老师 / 同教室共创评审',
    useCase: '老师用自己的电脑、平板或教室大屏在同一局域网访问',
    command: 'npm run dev:share',
    url: lanIps.length > 0 ? `http://${lanIps[0]}:${devPort}/` : `http://<本机局域网 IP>:${devPort}/`,
    note: '需要设备在同一 Wi-Fi/局域网，且 Windows 防火墙允许 Node/Vite 入站访问。',
  },
  {
    audience: '高中物理老师 / 稳定评审版',
    useCase: '先构建再预览，减少热更新和开发态变化对老师评审的干扰',
    command: 'npm run build && npm run preview:share',
    url:
      lanIps.length > 0
        ? `http://${lanIps[0]}:${previewPort}/`
        : `http://<本机局域网 IP>:${previewPort}/`,
    note: '更接近正式发布版本；仍然受同一局域网和防火墙限制。',
  },
];

const markdown = renderMarkdown(entries, lanIps);

await mkdir(dirname(outputPath), { recursive: true });
await writeFile(outputPath, markdown, 'utf8');

console.log(markdown);
console.log(`\n已写入：${outputPath}`);

function getLanIps(): string[] {
  return Object.values(networkInterfaces())
    .flatMap((items) => items ?? [])
    .filter((item) => item.family === 'IPv4' && !item.internal)
    .map((item) => item.address)
    .filter((address) => !address.startsWith('169.254.'));
}

function renderMarkdown(linkEntries: LinkEntry[], ips: string[]): string {
  const lines = [
    '# 课件访问链接说明',
    '',
    '这份说明用于区分开发调试、本机预览和高中物理老师共创评审三种访问方式，避免把只在本机可用的 `127.0.0.1` 链接发给外部评审者。',
    '',
    '## 推荐结论',
    '',
    '- Codex/开发调试：使用 `npm run dev:local` 和 `http://127.0.0.1:5173/`。',
    '- 你本机预览：使用 `npm run dev:local` 和 `http://localhost:5173/`。',
    '- 老师共创评审：优先使用 `npm run build && npm run preview:share` 后生成的局域网链接。',
    '- 正式交付：把 `dist/` 部署到学校服务器或云端静态站点，不依赖本机开发服务。',
    '',
    '## 当前可用入口',
    '',
    '| 对象 | 使用场景 | 启动命令 | 推荐链接 | 注意事项 |',
    '| --- | --- | --- | --- | --- |',
  ];

  for (const entry of linkEntries) {
    lines.push(
      `| ${entry.audience} | ${entry.useCase} | \`${entry.command}\` | ${entry.url} | ${entry.note} |`,
    );
  }

  lines.push('', '## 本机检测到的局域网 IP', '');
  if (ips.length === 0) {
    lines.push('- 未检测到可用局域网 IPv4。可检查 Wi-Fi/网线连接，或手动运行 `ipconfig` 查看 IPv4 地址。');
  } else {
    for (const ip of ips) {
      lines.push(`- ${ip}`);
    }
  }

  lines.push(
    '',
    '## 给高中物理老师的最简说明',
    '',
    '老师只需要打开“老师共创评审”链接，不需要安装 Node、不需要运行命令。若打不开，通常是以下原因：',
    '',
    '- 开发电脑没有运行 `npm run dev:share` 或 `npm run preview:share`。',
    '- 老师设备和开发电脑不在同一个局域网。',
    '- Windows 防火墙拦截了 Node/Vite。',
    '- 使用了 `127.0.0.1` 链接；这个地址只代表老师自己的设备，不代表开发电脑。',
    '',
    '## 共创反馈建议',
    '',
    '发给老师的链接旁边应同时附上反馈问题：生活情境是否贴近学生、视频是否能激发兴趣、AI 追问是否像真实课堂、仿真操作是否顺手、任务难度是否适合高二学生。',
    '',
  );

  return `${lines.join('\n')}\n`;
}
