// Pure SVG habit loop: cue → routine → reward → (back to cue).
// Server component — no client JS needed.
export function HabitLoopDiagram() {
  return (
    <svg
      viewBox="0 0 600 320"
      role="img"
      aria-label="Цикл привычки: сигнал, действие, награда"
      className="w-full text-zinc-700 dark:text-zinc-300"
    >
      <defs>
        <marker
          id="arrow"
          viewBox="0 0 10 10"
          refX="8"
          refY="5"
          markerWidth="6"
          markerHeight="6"
          orient="auto-start-reverse"
        >
          <path d="M0,0 L10,5 L0,10 z" fill="currentColor" />
        </marker>
      </defs>

      {/* Three circles */}
      {[
        { cx: 100, cy: 160, label: "Сигнал",  sub: "Cue" },
        { cx: 300, cy: 80,  label: "Действие", sub: "Routine" },
        { cx: 500, cy: 160, label: "Награда", sub: "Reward" },
      ].map((node) => (
        <g key={node.label}>
          <circle
            cx={node.cx}
            cy={node.cy}
            r="58"
            className="fill-emerald-50 stroke-emerald-600 dark:fill-emerald-400/10 dark:stroke-emerald-400"
            strokeWidth="2"
          />
          <text
            x={node.cx}
            y={node.cy - 4}
            textAnchor="middle"
            className="fill-current text-base font-semibold"
          >
            {node.label}
          </text>
          <text
            x={node.cx}
            y={node.cy + 16}
            textAnchor="middle"
            className="fill-zinc-500 text-xs"
          >
            {node.sub}
          </text>
        </g>
      ))}

      {/* Arcs between nodes */}
      <path
        d="M 155 140 Q 200 70 245 75"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        markerEnd="url(#arrow)"
      />
      <path
        d="M 355 75 Q 400 70 445 140"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        markerEnd="url(#arrow)"
      />
      <path
        d="M 470 215 Q 300 300 130 215"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeDasharray="4 4"
        markerEnd="url(#arrow)"
      />
      <text x="300" y="280" textAnchor="middle" className="fill-zinc-500 text-xs">
        повторение → закрепление
      </text>
    </svg>
  );
}
