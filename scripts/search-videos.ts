import { mkdir, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';

interface VideoSearchPlan {
  missionId: string;
  primaryQuery: string;
  searchQueries: string[];
  recommended: VideoLink;
  candidates: VideoLink[];
  bilibiliSearchUrl: string;
  webSearchUrl: string;
  teacherReviewCriteria: string[];
}

interface VideoLink {
  title: string;
  url: string;
  source: string;
  reason: string;
}

interface Candidate {
  missionId: string;
  query: string;
  title: string;
  author: string;
  url: string;
  coverUrl: string;
  duration: string;
  source: string;
  reason: string;
  curated: boolean;
}

interface BilibiliSearchItem {
  title?: string;
  bvid?: string;
  arcurl?: string;
  author?: string;
  duration?: string;
  pic?: string;
  description?: string;
}

interface BilibiliSearchResponse {
  code?: number;
  data?: {
    result?: BilibiliSearchItem[];
  };
}

const outputJson = resolve('docs/reports/video_candidates.json');
const outputMd = resolve('docs/reports/video_candidates.md');
const videoSearchPlans: VideoSearchPlan[] = [
  {
    missionId: 'generator',
    primaryQuery: '夜晚 骑自行车 车灯 越快越亮 发电机',
    searchQueries: ['夜晚骑自行车 车灯 越快越亮', '自行车 发电灯 原理 磁铁 线圈', '手摇发电机 灯泡 变亮'],
    recommended: {
      title: '不用电源的自行车灯，依靠轮胎的转动发电',
      url: 'https://www.bilibili.com/video/av31622537',
      source: 'Bilibili',
      reason: '最贴近“骑得越快车灯越亮”的生活问题，可直接引出速度影响磁通量变化率。',
    },
    candidates: [
      {
        title: '电磁铁发电',
        url: 'https://www.bilibili.com/video/av66744786',
        source: 'Bilibili',
        reason: '适合补充发电机与电磁感应装置解释。',
      },
      {
        title: '手摇发电机 灯泡变亮搜索候选',
        url: buildBilibiliSearchUrl('手摇发电机 灯泡 变亮'),
        source: 'Bilibili Search',
        reason: '用于教师继续筛选更短、更生活化的课堂片段。',
      },
    ],
    bilibiliSearchUrl: buildBilibiliSearchUrl('夜晚 骑自行车 车灯 越快越亮 发电机'),
    webSearchUrl: buildWebSearchUrl('夜晚 骑自行车 车灯 越快越亮 发电机'),
    teacherReviewCriteria: ['能看出车灯亮度变化', '画面中干扰元素少', '适合引出速度影响感应电动势'],
  },
  {
    missionId: 'wireless-charging',
    primaryQuery: '手机 无线充电 放上充电板 电量上升',
    searchQueries: ['手机 无线充电 电量 上升', '无线充电 原理 线圈 磁场', '手机放上无线充电板 充电动画'],
    recommended: {
      title: '无线充电到底是什么原理？',
      url: 'https://www.bilibili.com/video/av760542824',
      source: 'Bilibili',
      reason: '能从手机无线充电这个熟悉场景过渡到“为什么需要变化磁场”。',
    },
    candidates: [
      {
        title: '无线充电线圈拆解片段',
        url: 'https://www.bilibili.com/video/av457683565',
        source: 'Bilibili',
        reason: '可看到手机内部无线充电线圈，适合解释线圈结构。',
      },
      {
        title: '无线充电原理/磁耦合谐振式无线电能传输',
        url: 'https://www.bilibili.com/video/av113769573256985',
        source: 'Bilibili',
        reason: '内容更完整，但偏长，适合教师截取或课后拓展。',
      },
    ],
    bilibiliSearchUrl: buildBilibiliSearchUrl('手机 无线充电 放上充电板 电量上升'),
    webSearchUrl: buildWebSearchUrl('手机 无线充电 放上充电板 电量上升'),
    teacherReviewCriteria: ['能明确看到无线充电动作', '无明显品牌广告', '适合追问为什么需要变化磁场'],
  },
  {
    missionId: 'shake-light',
    primaryQuery: '摇一摇手电筒 发电 原理 磁铁 线圈',
    searchQueries: ['摇一摇手电筒 发电 原理', '手摇手电筒 磁铁 线圈 发电', '停电 手电筒 摇一摇 变亮'],
    recommended: {
      title: '摇一摇就能亮的手电筒',
      url: 'https://www.bilibili.com/video/av8232111',
      source: 'Bilibili',
      reason: '与“停电/露营时摇手电”任务高度贴合，能直接看到运动产生电的现象。',
    },
    candidates: [
      {
        title: '手电筒点亮',
        url: 'https://www.bilibili.com/video/av114715355254313',
        source: 'Bilibili',
        reason: '可作为短视频候选，需教师确认是否包含摇动发电过程。',
      },
      {
        title: '手摇手电筒 磁铁 线圈 发电搜索候选',
        url: buildBilibiliSearchUrl('手摇手电筒 磁铁 线圈 发电'),
        source: 'Bilibili Search',
        reason: '用于继续寻找更清晰的内部结构视频。',
      },
    ],
    bilibiliSearchUrl: buildBilibiliSearchUrl('摇一摇手电筒 发电 原理 磁铁 线圈'),
    webSearchUrl: buildWebSearchUrl('摇一摇手电筒 发电 原理 磁铁 线圈'),
    teacherReviewCriteria: ['能展示摇动后变亮', '最好有手电筒内部结构片段', '适合解释运动方向反复变化'],
  },
  {
    missionId: 'speed-sensor',
    primaryQuery: '电动车 轮速传感器 磁铁 线圈 脉冲',
    searchQueries: ['电动车 轮速传感器 磁铁', '自行车码表 磁铁 传感器 原理', '轮速传感器 脉冲 信号'],
    recommended: {
      title: '霍尔效应位置检测简介',
      url: 'https://www.ti.com.cn/zh-cn/video/6033234515001',
      source: 'TI 官方视频',
      reason: '直接展示磁体与传感器的位置检测原理，可迁移到轮速/测速脉冲场景。',
    },
    candidates: [
      {
        title: '霍尔传感器测转速原理',
        url: 'https://www.dzkfw.com.cn/Article/ShowArticle.asp?ArticleID=4261',
        source: '电子工程网页',
        reason: '包含磁钢转动、霍尔器件输出脉冲的文字和示意说明。',
      },
      {
        title: '自行车码表磁铁传感器说明',
        url: 'https://cateye.com/intl/support/manual/data/doc/CC-VT210W_SC%20v2.pdf',
        source: 'CatEye 官方说明',
        reason: '可解释车轮磁铁与速度感应器的真实安装方式。',
      },
      {
        title: '电动车轮速传感器 B站搜索候选',
        url: buildBilibiliSearchUrl('电动车 轮速传感器 磁铁 脉冲'),
        source: 'Bilibili Search',
        reason: '当前未找到稳定高相关直达 B 站视频，保留人工筛选入口。',
      },
    ],
    bilibiliSearchUrl: buildBilibiliSearchUrl('电动车 轮速传感器 磁铁 线圈 脉冲'),
    webSearchUrl: buildWebSearchUrl('电动车 轮速传感器 磁铁 线圈 脉冲'),
    teacherReviewCriteria: ['能看到轮子或磁体经过传感器', '能引出电脉冲', '无车牌或可识别人脸'],
  },
];

async function main() {
  const allCandidates: Candidate[] = [];

  for (const plan of videoSearchPlans) {
    allCandidates.push(toCandidate(plan.missionId, plan.primaryQuery, plan.recommended, true));
    allCandidates.push(
      ...plan.candidates.map((candidate) => toCandidate(plan.missionId, plan.primaryQuery, candidate, true)),
    );

    for (const query of plan.searchQueries.slice(0, 2)) {
      const candidates = await searchBilibili(plan.missionId, query);
      allCandidates.push(...candidates.slice(0, 4));
    }

    if (!allCandidates.some((candidate) => candidate.missionId === plan.missionId)) {
      allCandidates.push({
        missionId: plan.missionId,
        query: plan.primaryQuery,
        title: '打开 B 站搜索页人工筛选',
        author: 'Bilibili Search',
        url: plan.bilibiliSearchUrl,
        coverUrl: '',
        duration: '',
        source: 'bilibili-search-page',
        reason: '自动接口不可用时保留搜索页跳转，教师可直接审核候选。',
        curated: false,
      });
    }
  }

  await mkdir(dirname(outputJson), { recursive: true });
  await writeFile(outputJson, `${JSON.stringify(allCandidates, null, 2)}\n`, 'utf8');
  await writeFile(outputMd, renderMarkdown(allCandidates), 'utf8');

  console.log(`Wrote ${allCandidates.length} candidates to ${outputJson}`);
  console.log(`Wrote review report to ${outputMd}`);
}

async function searchBilibili(missionId: string, query: string): Promise<Candidate[]> {
  const apiUrl = new URL('https://api.bilibili.com/x/web-interface/search/type');
  apiUrl.searchParams.set('search_type', 'video');
  apiUrl.searchParams.set('keyword', query);
  apiUrl.searchParams.set('page', '1');

  try {
    const response = await fetch(apiUrl, {
      headers: {
        accept: 'application/json',
        'user-agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/125 Safari/537.36',
      },
    });

    if (!response.ok) {
      return [];
    }

    const payload = (await response.json()) as BilibiliSearchResponse;
    const items = payload.data?.result ?? [];
    return items
      .filter((item) => item.bvid || item.arcurl)
      .slice(0, 8)
      .map((item) => ({
        missionId,
        query,
        title: stripHtml(item.title ?? '未命名视频'),
        author: stripHtml(item.author ?? '未知 UP 主'),
        url: item.arcurl || `https://www.bilibili.com/video/${item.bvid}`,
        coverUrl: normalizeCoverUrl(item.pic ?? ''),
        duration: item.duration ?? '',
        source: 'bilibili-public-search',
        reason: buildReason(query, item),
        curated: false,
      }));
  } catch {
    return [];
  }
}

function toCandidate(missionId: string, query: string, link: VideoLink, curated: boolean): Candidate {
  return {
    missionId,
    query,
    title: link.title,
    author: link.source,
    url: link.url,
    coverUrl: '',
    duration: '',
    source: link.source,
    reason: link.reason,
    curated,
  };
}

function buildReason(query: string, item: BilibiliSearchItem): string {
  const text = `${stripHtml(item.title ?? '')} ${stripHtml(item.description ?? '')}`;
  const matchedWords = query
    .split(/\s+/)
    .filter((word) => word.length >= 2)
    .filter((word) => text.includes(word));
  return matchedWords.length > 0
    ? `标题或简介命中关键词：${matchedWords.slice(0, 5).join('、')}`
    : '来自任务关键词搜索结果，需要教师进一步审核教学适配度。';
}

function renderMarkdown(candidates: Candidate[]): string {
  const lines = ['# Video Candidates', '', '本报告由 `npm run search:videos` 生成。候选仅供教师审核，不代表已授权使用。', ''];

  for (const plan of videoSearchPlans) {
    lines.push(`## ${plan.missionId}`, '');
    lines.push(`- Primary query: ${plan.primaryQuery}`);
    lines.push(`- Bilibili search: ${plan.bilibiliSearchUrl}`);
    lines.push(`- Web search: ${plan.webSearchUrl}`);
    lines.push(`- Recommended direct jump: [${plan.recommended.title}](${plan.recommended.url})`);
    lines.push(`  - Source: ${plan.recommended.source}`);
    lines.push(`  - Reason: ${plan.recommended.reason}`);
    lines.push('- Review criteria:');
    for (const item of plan.teacherReviewCriteria) {
      lines.push(`  - ${item}`);
    }
    lines.push('');

    const missionCandidates = candidates.filter((candidate) => candidate.missionId === plan.missionId);
    if (missionCandidates.length === 0) {
      lines.push('No candidates found. Use the search links above.', '');
      continue;
    }

    for (const [index, candidate] of missionCandidates.entries()) {
      const label = candidate.curated ? '精选' : '自动搜索';
      lines.push(`${index + 1}. [${candidate.title}](${candidate.url})`);
      lines.push(`   - Type: ${label}`);
      lines.push(`   - Author: ${candidate.author}`);
      lines.push(`   - Query: ${candidate.query}`);
      lines.push(`   - Duration: ${candidate.duration || 'unknown'}`);
      lines.push(`   - Reason: ${candidate.reason}`);
    }
    lines.push('');
  }

  return `${lines.join('\n')}\n`;
}

function stripHtml(value: string): string {
  return value.replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
}

function normalizeCoverUrl(value: string): string {
  if (!value) return '';
  if (value.startsWith('//')) return `https:${value}`;
  return value;
}

function buildBilibiliSearchUrl(query: string): string {
  return `https://search.bilibili.com/all?keyword=${encodeURIComponent(query)}`;
}

function buildWebSearchUrl(query: string): string {
  return `https://www.bing.com/search?q=${encodeURIComponent(`${query} 视频`)}`;
}

await main();
