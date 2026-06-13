import type { InductionState } from './induction';

export type MissionId = 'generator' | 'wireless-charging' | 'shake-light' | 'speed-sensor';

export interface Mission {
  id: MissionId;
  title: string;
  hook: string;
  target: string;
  recommendedVideo: string;
  candidateLinks: { label: string; url: string }[];
}

export const missions: Mission[] = [
  {
    id: 'generator',
    title: '夜晚骑车：为什么骑快了车灯更亮？',
    hook: '从自行车发电灯进入：速度变化会怎样改变感应电动势？',
    target: '调到较高速度和较多匝数，让灯泡亮度达到 80%。',
    recommendedVideo: 'https://www.bilibili.com/video/av31622537',
    candidateLinks: [
      { label: '电磁铁发电', url: 'https://www.bilibili.com/video/av66744786' },
      { label: 'B站继续搜索', url: 'https://search.bilibili.com/all?keyword=自行车%20发电灯%20原理%20磁铁%20线圈' },
    ],
  },
  {
    id: 'wireless-charging',
    title: '手机无线充电：为什么放上去才开始充？',
    hook: '手机和充电板都没有裸露导线，能量却能传过去。',
    target: '先观察静止 e≈0，再让磁通量变化并获得明显电动势。',
    recommendedVideo: 'https://www.bilibili.com/video/av760542824',
    candidateLinks: [
      { label: '无线充电线圈拆解', url: 'https://www.bilibili.com/video/av457683565' },
      { label: '无线充电原理候选', url: 'https://www.bilibili.com/video/av113769573256985' },
    ],
  },
  {
    id: 'shake-light',
    title: '停电露营：摇一摇手电为什么会亮？',
    hook: '没有电池也能亮，关键是磁铁在线圈中反复运动。',
    target: '让电流方向至少翻转 2 次，并解释为什么会翻转。',
    recommendedVideo: 'https://www.bilibili.com/video/av8232111',
    candidateLinks: [
      { label: '手电筒点亮候选', url: 'https://www.bilibili.com/video/av114715355254313' },
      { label: 'B站继续搜索', url: 'https://search.bilibili.com/all?keyword=摇一摇手电筒%20发电%20原理' },
    ],
  },
  {
    id: 'speed-sensor',
    title: '校门口测速：车轮转动怎样变成电脉冲？',
    hook: '传感器不需要一直供电测距离，而是抓住磁通量变化的瞬间。',
    target: '让线圈输出 3 次以上脉冲，并观察速度越快脉冲越明显。',
    recommendedVideo: 'https://www.ti.com.cn/zh-cn/video/6033234515001',
    candidateLinks: [
      { label: '霍尔测速说明', url: 'https://www.dzkfw.com.cn/Article/ShowArticle.asp?ArticleID=4261' },
      { label: 'B站继续搜索', url: 'https://search.bilibili.com/all?keyword=轮速传感器%20磁铁%20脉冲' },
    ],
  },
];

export const studentQuestions = [
  {
    prompt: '磁铁停在线圈旁边不动时，感应电动势会怎样？',
    options: ['接近 0', '一直增大', '方向不断反转'],
    answer: 0,
    feedback: '关键不是有没有磁场，而是穿过线圈的磁通量是否变化。',
  },
  {
    prompt: '只把磁铁运动速度调大，e-t 曲线通常会怎样？',
    options: ['峰值变大', '完全不变', '变成水平线'],
    answer: 0,
    feedback: '速度越大，磁通量变化率越大，感应电动势越大。',
  },
  {
    prompt: '运动方向反过来时，感应电流方向为什么会反过来？',
    options: ['磁通量变化率变号', '线圈电阻消失', '磁铁没有磁场了'],
    answer: 0,
    feedback: '运动方向改变会让 dΦ/dt 变号，楞次定律给出的阻碍方向也随之反向。',
  },
];

export function buildTeacherPrompts(state: InductionState, speed: number, turns: number, reverse: boolean): string[] {
  const prompts = [
    Math.abs(state.emf) < 0.05
      ? '追问：现在有磁场，为什么感应电动势仍接近 0？请看磁通量是否变化。'
      : `追问：当前 e≈${state.emf.toFixed(2)} V，哪一个参数让 dΦ/dt 变大了？`,
  ];

  if (speed > 1.5) prompts.push('教师提示：把速度减半，再比较 e-t 峰值是否同步下降。');
  if (turns >= 120) prompts.push('教师提示：匝数增加后，法拉第定律中的 N 如何放大总电动势？');
  if (reverse) prompts.push('教师提示：反向运动后电流方向翻转，用楞次定律说出“阻碍谁”。');

  return prompts;
}

export function buildParameterFeedback(parameter: string, value: number): string {
  if (parameter === 'speed' && value === 0) return '速度为 0：磁通量不变，感应电动势应接近 0。';
  if (parameter === 'speed') return '速度改变：请观察 e-t 曲线峰值是否随磁通量变化率改变。';
  if (parameter === 'turns') return '匝数改变：总感应电动势会按线圈匝数放大或缩小。';
  if (parameter === 'field') return '磁场强度改变：同样运动下，磁通量变化会更明显。';
  return '参数已改变：请先预测，再观察曲线和电流方向。';
}
