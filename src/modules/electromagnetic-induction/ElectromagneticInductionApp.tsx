import { PointerEvent, useEffect, useMemo, useState } from 'react';
import { buildParameterFeedback, buildTeacherPrompts, missions, studentQuestions } from './lib/feedback';
import type { MissionId } from './lib/feedback';
import { calculateInductionState, clamp } from './lib/induction';

interface ElectromagneticInductionAppProps {
  onBack: () => void;
}

interface DataPoint {
  time: number;
  flux: number;
  emf: number;
}

const MIN_POSITION = -180;
const MAX_POSITION = 180;
const SCENE_WIDTH = 720;
const SCENE_HEIGHT = 260;

export default function ElectromagneticInductionApp({ onBack }: ElectromagneticInductionAppProps) {
  const [position, setPosition] = useState(-150);
  const [speed, setSpeed] = useState(1.2);
  const [turns, setTurns] = useState(90);
  const [fieldStrength, setFieldStrength] = useState(1.2);
  const [reverse, setReverse] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [missionId, setMissionId] = useState<MissionId>('generator');
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [lastFeedback, setLastFeedback] = useState('先选择一个生活任务，再拖动磁铁穿过线圈。');
  const [series, setSeries] = useState<DataPoint[]>([]);

  const velocity = playing ? speed * (reverse ? -1 : 1) : 0;
  const state = useMemo(
    () => calculateInductionState({ position, velocity, turns, fieldStrength }),
    [fieldStrength, position, turns, velocity],
  );
  const activeMission = missions.find((mission) => mission.id === missionId) ?? missions[0];
  const teacherPrompts = buildTeacherPrompts(state, speed, turns, reverse);
  const brightness = clamp(Math.abs(state.emf) / 2.5, 0, 1);

  useEffect(() => {
    if (!playing || dragging) return undefined;

    const timer = window.setInterval(() => {
      setPosition((current) => {
        const next = current + velocity * 6;
        if (next > MAX_POSITION) return MIN_POSITION;
        if (next < MIN_POSITION) return MAX_POSITION;
        return next;
      });
    }, 80);

    return () => window.clearInterval(timer);
  }, [dragging, playing, velocity]);

  useEffect(() => {
    setSeries((current) => {
      const next = [
        ...current,
        {
          time: current.length,
          flux: state.flux,
          emf: state.emf,
        },
      ];
      return next.slice(-70);
    });
  }, [state.emf, state.flux]);

  const updatePositionFromPointer = (event: PointerEvent<SVGSVGElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const ratio = clamp((event.clientX - rect.left) / rect.width, 0, 1);
    const nextPosition = MIN_POSITION + ratio * (MAX_POSITION - MIN_POSITION);
    setPosition(Math.round(nextPosition));
    setPlaying(false);
    setLastFeedback('你正在手动拖动磁铁：观察磁通量曲线斜率和电流方向如何变化。');
  };

  const handleParamChange = (name: string, value: number) => {
    if (name === 'speed') setSpeed(value);
    if (name === 'turns') setTurns(value);
    if (name === 'field') setFieldStrength(value);
    setLastFeedback(buildParameterFeedback(name, value));
  };

  return (
    <main className="physics-shell">
      <header className="module-header">
        <button type="button" onClick={onBack}>
          返回入口
        </button>
        <div>
          <p className="eyebrow">高中物理 AI 互动课件</p>
          <h1>电磁感应：磁铁穿过线圈</h1>
          <p className="lead">拖动磁铁、调节速度和匝数，实时观察 Φ-t、e-t 曲线与感应电流方向。</p>
        </div>
      </header>

      <section className="physics-hook">
        <div>
          <p className="eyebrow">为什么值得学</p>
          <h2>{activeMission.title}</h2>
          <p>{activeMission.hook}</p>
          <strong>任务目标：{activeMission.target}</strong>
        </div>
        <div className="video-source-card">
          <span className="video-source-label">最高相关推荐</span>
          <a className="primary-video-link" href={activeMission.recommendedVideo} target="_blank" rel="noreferrer">
            打开生活视频
          </a>
          <details className="candidate-links">
            <summary>候选链接</summary>
            <div className="candidate-link-grid">
              {activeMission.candidateLinks.map((link) => (
                <a href={link.url} target="_blank" rel="noreferrer" key={link.url}>
                  <strong>{link.label}</strong>
                  <span>用于教师人工判断课堂适配度。</span>
                </a>
              ))}
            </div>
          </details>
        </div>
      </section>

      <section className="mission-tabs" aria-label="应用任务">
        {missions.map((mission) => (
          <button
            type="button"
            key={mission.id}
            className={missionId === mission.id ? 'active' : ''}
            onClick={() => {
              setMissionId(mission.id);
              setLastFeedback(`已切换到应用任务：${mission.title}`);
            }}
          >
            {mission.title}
          </button>
        ))}
      </section>

      <section className="physics-grid">
        <div className="simulation-panel">
          <div className="section-heading">
            <div>
              <p className="eyebrow">PhET 式仿真</p>
              <h2>拖动磁铁穿过线圈</h2>
            </div>
            <div className="sim-actions">
              <button type="button" onClick={() => setPlaying((current) => !current)}>
                {playing ? '暂停' : '播放'}
              </button>
              <button
                type="button"
                onClick={() => {
                  setPosition(-150);
                  setSeries([]);
                  setPlaying(false);
                }}
              >
                复位
              </button>
            </div>
          </div>
          <SimulationSvg
            brightness={brightness}
            currentDirection={state.currentDirection}
            fieldStrength={fieldStrength}
            position={position}
            onPointerDown={(event) => {
              setDragging(true);
              updatePositionFromPointer(event);
            }}
            onPointerMove={(event) => {
              if (dragging) updatePositionFromPointer(event);
            }}
            onPointerUp={() => setDragging(false)}
          />
        </div>

        <aside className="control-panel physics-controls">
          <Slider label="磁铁位置" value={position} min={MIN_POSITION} max={MAX_POSITION} step={1} unit="px" onChange={setPosition} />
          <Slider label="运动速度" value={speed} min={0} max={2.4} step={0.1} unit="m/s" onChange={(value) => handleParamChange('speed', value)} />
          <Slider label="线圈匝数" value={turns} min={20} max={180} step={10} unit="匝" onChange={(value) => handleParamChange('turns', value)} />
          <Slider label="磁场强度" value={fieldStrength} min={0.4} max={2.2} step={0.1} unit="T" onChange={(value) => handleParamChange('field', value)} />
          <label className="toggle-row">
            <input
              type="checkbox"
              checked={reverse}
              onChange={(event) => {
                setReverse(event.target.checked);
                setLastFeedback('运动方向已反向：请观察感应电流方向是否同步翻转。');
              }}
            />
            是否反向运动
          </label>
          <div className="data-card">
            <span>磁通量 Φ：{state.flux.toFixed(3)} Wb</span>
            <span>变化率 dΦ/dt：{state.fluxRate.toFixed(3)} Wb/s</span>
            <span>感应电动势 e：{state.emf.toFixed(3)} V</span>
            <strong>电流方向：{directionText(state.currentDirection)}</strong>
          </div>
        </aside>
      </section>

      <section className="chart-grid">
        <Chart title="Φ-t 曲线" points={series.map((point) => point.flux)} color="#2563eb" />
        <Chart title="e-t 曲线" points={series.map((point) => point.emf)} color="#dc2626" />
      </section>

      <section className="learning-grid">
        <div className="prompt-panel">
          <p className="eyebrow">OpenMAIC 式多角色追问</p>
          <h2>AI 教师提示</h2>
          <p>{lastFeedback}</p>
          {teacherPrompts.map((prompt) => (
            <blockquote key={prompt}>{prompt}</blockquote>
          ))}
          <p>{state.lenzExplanation}</p>
        </div>

        <div className="question-panel">
          <p className="eyebrow">学生预测题</p>
          <h2>先预测，再验证</h2>
          {studentQuestions.map((question, index) => (
            <article className="mini-question" key={question.prompt}>
              <strong>{question.prompt}</strong>
              <div className="option-row">
                {question.options.map((option, optionIndex) => (
                  <button
                    type="button"
                    className={answers[index] === optionIndex ? 'selected' : ''}
                    key={option}
                    onClick={() => setAnswers((current) => ({ ...current, [index]: optionIndex }))}
                  >
                    {option}
                  </button>
                ))}
              </div>
              {answers[index] !== undefined && (
                <p className={answers[index] === question.answer ? 'correct' : 'incorrect'}>
                  {answers[index] === question.answer ? '判断正确。' : '再想一想。'}
                  {question.feedback}
                </p>
              )}
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}

function SimulationSvg({
  brightness,
  currentDirection,
  fieldStrength,
  position,
  onPointerDown,
  onPointerMove,
  onPointerUp,
}: {
  brightness: number;
  currentDirection: string;
  fieldStrength: number;
  position: number;
  onPointerDown: (event: PointerEvent<SVGSVGElement>) => void;
  onPointerMove: (event: PointerEvent<SVGSVGElement>) => void;
  onPointerUp: () => void;
}) {
  const magnetX = 360 + position;
  const arrow = currentDirection === 'clockwise' ? '顺时针' : currentDirection === 'counterclockwise' ? '逆时针' : '无明显电流';

  return (
    <svg
      className="induction-scene"
      viewBox={`0 0 ${SCENE_WIDTH} ${SCENE_HEIGHT}`}
      role="img"
      aria-label="磁铁穿过线圈仿真"
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerLeave={onPointerUp}
    >
      <rect x="0" y="0" width={SCENE_WIDTH} height={SCENE_HEIGHT} rx="8" fill="#f8fafc" />
      {[0, 1, 2, 3, 4].map((item) => (
        <path
          key={item}
          d={`M ${120 + item * 94} 44 C ${210 + item * 94} 92, ${210 + item * 94} 166, ${120 + item * 94} 216`}
          fill="none"
          stroke="#93c5fd"
          strokeWidth={1 + fieldStrength}
          opacity="0.55"
        />
      ))}
      <g transform="translate(324 58)">
        {[0, 1, 2, 3, 4, 5].map((item) => (
          <ellipse key={item} cx="36" cy="72" rx={36 + item * 7} ry="70" fill="none" stroke="#b45309" strokeWidth="4" />
        ))}
        <text x="5" y="160" className="scene-label">
          线圈
        </text>
      </g>
      <g transform={`translate(${magnetX - 62} 98)`}>
        <rect x="0" y="0" width="124" height="48" rx="8" fill="#e5e7eb" stroke="#172033" strokeWidth="2" />
        <rect x="0" y="0" width="62" height="48" rx="8" fill="#dc2626" />
        <rect x="62" y="0" width="62" height="48" rx="8" fill="#2563eb" />
        <text x="25" y="31" className="magnet-text">
          N
        </text>
        <text x="88" y="31" className="magnet-text">
          S
        </text>
      </g>
      <circle cx="610" cy="76" r="26" fill="#facc15" opacity={0.25 + brightness * 0.75} />
      <path d="M 560 76 L 584 76 M 636 76 L 668 76" stroke="#172033" strokeWidth="4" strokeLinecap="round" />
      <text x="558" y="128" className="scene-label">
        灯泡亮度 {(brightness * 100).toFixed(0)}%
      </text>
      <path
        d="M 300 54 C 262 112, 262 152, 300 210"
        fill="none"
        stroke={currentDirection === 'none' ? '#94a3b8' : '#16a34a'}
        strokeWidth="5"
        strokeLinecap="round"
        markerEnd="url(#arrow)"
      />
      <defs>
        <marker id="arrow" markerWidth="8" markerHeight="8" refX="5" refY="3" orient="auto">
          <path d="M0,0 L0,6 L6,3 z" fill="#16a34a" />
        </marker>
      </defs>
      <text x="22" y="34" className="scene-title">
        拖动磁铁，观察磁通量变化和感应电流方向
      </text>
      <text x="254" y="236" className="scene-label">
        感应电流：{arrow}
      </text>
    </svg>
  );
}

function Chart({ title, points, color }: { title: string; points: number[]; color: string }) {
  const width = 520;
  const height = 180;
  const max = Math.max(0.5, ...points.map((point) => Math.abs(point)));
  const path = points
    .map((point, index) => {
      const x = points.length <= 1 ? 0 : (index / (points.length - 1)) * (width - 40) + 20;
      const y = height / 2 - (point / max) * 68;
      return `${index === 0 ? 'M' : 'L'} ${x.toFixed(1)} ${y.toFixed(1)}`;
    })
    .join(' ');

  return (
    <div className="chart-card">
      <h2>{title}</h2>
      <svg viewBox={`0 0 ${width} ${height}`} role="img" aria-label={title}>
        <line x1="20" y1={height / 2} x2={width - 20} y2={height / 2} stroke="#cbd5e1" />
        <path d={path} fill="none" stroke={color} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  );
}

function Slider({
  label,
  value,
  min,
  max,
  step,
  unit,
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  unit: string;
  onChange: (value: number) => void;
}) {
  return (
    <label className="slider-row">
      <span>
        {label}
        <strong>
          {Number.isInteger(value) ? value : value.toFixed(1)} {unit}
        </strong>
      </span>
      <input type="range" min={min} max={max} step={step} value={value} onChange={(event) => onChange(Number(event.target.value))} />
    </label>
  );
}

function directionText(direction: string): string {
  if (direction === 'clockwise') return '顺时针';
  if (direction === 'counterclockwise') return '逆时针';
  return '无明显电流';
}
