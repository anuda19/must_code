// Renders a fixed illustrative skill-gap radar (Data Structures, System Design,
// Algorithms, Communication, Debugging, Concurrency) with current vs. target scores.
// Static/server-rendered — no client JS needed for a display graphic.

const AXES = [
  { label: "Data structures", current: 0.8, target: 0.9 },
  { label: "System design", current: 0.35, target: 0.85 },
  { label: "Algorithms", current: 0.7, target: 0.9 },
  { label: "Communication", current: 0.55, target: 0.8 },
  { label: "Debugging", current: 0.75, target: 0.85 },
  { label: "Concurrency", current: 0.3, target: 0.75 },
];

const SIZE = 340;
const CENTER = SIZE / 2;
const RADIUS = 118;

function pointFor(index: number, value: number) {
  const angle = (Math.PI * 2 * index) / AXES.length - Math.PI / 2;
  const r = RADIUS * value;
  return {
    x: CENTER + r * Math.cos(angle),
    y: CENTER + r * Math.sin(angle),
  };
}

function polygonPoints(values: number[]) {
  return values
    .map((v, i) => {
      const p = pointFor(i, v);
      return `${p.x},${p.y}`;
    })
    .join(" ");
}

export default function SkillRadar() {
  const currentValues = AXES.map((a) => a.current);
  const targetValues = AXES.map((a) => a.target);

  return (
    <svg
      viewBox={`0 0 ${SIZE} ${SIZE + 40}`}
      width={SIZE}
      role="img"
      aria-labelledby="radarTitle"
    >
      <title id="radarTitle">
        Example skill-gap radar comparing current skills to the target role
      </title>

      {/* grid rings */}
      {[0.25, 0.5, 0.75, 1].map((ring) => (
        <polygon
          key={ring}
          points={polygonPoints(AXES.map(() => ring))}
          fill="none"
          stroke="#232838"
          strokeWidth={1}
        />
      ))}

      {/* axis lines */}
      {AXES.map((_, i) => {
        const p = pointFor(i, 1);
        return (
          <line
            key={i}
            x1={CENTER}
            y1={CENTER}
            x2={p.x}
            y2={p.y}
            stroke="#232838"
            strokeWidth={1}
          />
        );
      })}

      {/* target (role requirement) */}
      <polygon
        points={polygonPoints(targetValues)}
        fill="rgba(91,140,255,0.08)"
        stroke="#5B8CFF"
        strokeDasharray="4 4"
        strokeWidth={1.5}
      />

      {/* current skill */}
      <polygon
        points={polygonPoints(currentValues)}
        fill="rgba(52,211,153,0.16)"
        stroke="#34D399"
        strokeWidth={2}
      />

      {/* axis labels */}
      {AXES.map((axis, i) => {
        const labelPoint = pointFor(i, 1.32);
        return (
          <text
            key={axis.label}
            x={labelPoint.x}
            y={labelPoint.y}
            textAnchor="middle"
            dominantBaseline="middle"
            fontSize="10.5"
            fill="#8891A5"
            fontFamily="var(--font-manrope), sans-serif"
          >
            {axis.label}
          </text>
        );
      })}

      {/* legend */}
      <g transform={`translate(${CENTER - 92}, ${SIZE + 14})`}>
        <rect width="10" height="10" fill="#34D399" rx="2" />
        <text x="16" y="9" fontSize="11" fill="#8891A5">
          Your current level
        </text>
        <rect x="140" width="10" height="10" fill="none" stroke="#5B8CFF" rx="2" />
        <text x="156" y="9" fontSize="11" fill="#8891A5">
          Target role
        </text>
      </g>
    </svg>
  );
}