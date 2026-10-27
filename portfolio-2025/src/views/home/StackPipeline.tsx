import { useId, useLayoutEffect, useRef, useState } from 'react';
import { animate } from 'animejs/animation';
import { set, stagger } from 'animejs/utils';
import { prefersReducedMotion, useOnceInView } from '@/lib/motion';
import { stackById, usageLabel } from '@/data/stack';

const FLOW = '#f472b6';
const NODE_W = 128;
const NODE_H = 56;
const CHIP_H = 22;
const CHIP_GAP = 8;
const ROW_GAP = 8;

/** Y of the Google Cloud box and of the nodes inside it. */
const CLOUD_Y = 214;
const CLOUD_H = 168;
const BOTTOM_Y = CLOUD_Y + 38;

const STRIP_H = 44;
const RAILWAY_Y = CLOUD_Y + CLOUD_H + 20;
const BAND_Y = RAILWAY_Y + STRIP_H + 20;
const VIEW_H = BAND_Y + STRIP_H + 20;

interface MainNode {
  id: string;
  x: number;
  y: number;
  role: string;
  /** Supporting tools shown as chips underneath. */
  chips: string[];
  /** Center the chips under the node, or start them at the node's left edge. */
  align?: 'center' | 'start';
  /** Chips wrap to a new row past this width, so they stay under their own node. */
  maxRow?: number;
}

const nodes: MainNode[] = [
  { id: 'figma', x: 40, y: 30, role: 'design', chips: [] },
  {
    id: 'react',
    x: 316,
    y: 30,
    role: 'interface',
    chips: ['typescript', 'tailwind', 'shadcn', 'zustand', 'vite', 'nextjs', 'astro'],
    maxRow: 400,
  },
  { id: 'vercel', x: 592, y: 30, role: 'ships the UI', chips: [] },
  // The request path on Google Cloud: Cloud Run hosts the API, FastAPI serves it, BigQuery holds the data.
  { id: 'cloudrun', x: 40, y: BOTTOM_Y, role: 'hosts the API', chips: ['docker', 'cloudbuild'], align: 'start', maxRow: 215 },
  {
    id: 'fastapi',
    x: 316,
    y: BOTTOM_Y,
    role: 'API',
    chips: ['python', 'pydantic', 'rest', 'cloudtasks'],
    maxRow: 300,
  },
  { id: 'bigquery', x: 592, y: BOTTOM_Y, role: 'data', chips: [] },
];

interface Strip {
  label: string;
  x: number;
  y: number;
  w: number;
  chips: string[];
}

/** Separate stacks drawn as strips, because they are not part of the Google Cloud request path. */
const strips: Strip[] = [
  { label: 'RAILWAY', x: 20, y: RAILWAY_Y, w: 720, chips: ['express', 'node', 'mongodb', 'socketio', 'jwt'] },
  { label: 'AI', x: 20, y: BAND_Y, w: 300, chips: ['claude', 'vertexai', 'mcp'] },
  { label: 'DEV TOOLS', x: 340, y: BAND_Y, w: 400, chips: ['cursor', 'postman', 'vitepress'] },
];

const midY = BOTTOM_Y + NODE_H / 2;

const edges = [
  'M168 58 L314 58',
  'M444 58 L590 58',
  `M656 88 L656 ${CLOUD_Y - 26} L104 ${CLOUD_Y - 26} L104 ${BOTTOM_Y - 2}`,
  `M168 ${midY} L314 ${midY}`,
  `M444 ${midY} L590 ${midY}`,
];

const chipWidth = (name: string) => Math.round(36 + name.length * 6.3);
/** Width of a strip label set in 10px mono with wide tracking. */
const labelWidth = (label: string) => Math.round(label.length * 7.4);

interface PlacedChip {
  id: string;
  x: number;
  y: number;
  w: number;
}

/** Lay chips out in rows that wrap at `maxRow`, either centered on `anchorX` or starting at it. */
function layoutChips(
  ids: string[],
  anchorX: number,
  top: number,
  align: 'center' | 'start',
  maxRow: number,
): PlacedChip[] {
  const rows: { id: string; w: number }[][] = [[]];
  let rowWidth = 0;
  for (const id of ids) {
    const w = chipWidth(stackById[id].name);
    const row = rows[rows.length - 1];
    const next = rowWidth + (row.length ? CHIP_GAP : 0) + w;
    if (row.length && next > maxRow) {
      rows.push([{ id, w }]);
      rowWidth = w;
    } else {
      row.push({ id, w });
      rowWidth = next;
    }
  }

  const placed: PlacedChip[] = [];
  rows.forEach((row, r) => {
    const total = row.reduce((sum, chip) => sum + chip.w, 0) + CHIP_GAP * (row.length - 1);
    let cursor = align === 'center' ? anchorX - total / 2 : anchorX;
    for (const chip of row) {
      placed.push({ id: chip.id, x: cursor, y: top + r * (CHIP_H + ROW_GAP), w: chip.w });
      cursor += chip.w + CHIP_GAP;
    }
  });
  return placed;
}

interface ChipsProps {
  chips: PlacedChip[];
  active: string | null;
  onActive: (id: string | null) => void;
}

const Chips = ({ chips, active, onActive }: ChipsProps) => (
  <>
    {chips.map(({ id, x, y, w }) => {
      const item = stackById[id];
      const on = active === id;
      const note = item.note ? `${item.note}, ` : '';
      return (
        <g
          key={id}
          data-sp="chip"
          tabIndex={0}
          role="button"
          aria-label={`${item.name}, ${note}${usageLabel(item)}`}
          className="cursor-pointer outline-none"
          onPointerEnter={() => onActive(id)}
          onPointerLeave={() => onActive(null)}
          onFocus={() => onActive(id)}
          onBlur={() => onActive(null)}
          onClick={() => onActive(on ? null : id)}
        >
          <rect
            x={x}
            y={y}
            width={w}
            height={CHIP_H}
            rx={CHIP_H / 2}
            fill={on ? 'rgba(236,72,153,0.16)' : '#12121a'}
            stroke={on ? FLOW : 'rgba(255,255,255,0.14)'}
          />
          <item.icon x={x + 9} y={y + 5} size={12} color={item.color} aria-hidden="true" />
          <text x={x + 26} y={y + 15} fontSize={10.5} className="fill-white font-mono">
            {item.name}
          </text>
        </g>
      );
    })}
  </>
);

const placedStrips = strips.map((strip) => ({
  ...strip,
  chipsPlaced: layoutChips(
    strip.chips,
    strip.x + 20 + labelWidth(strip.label) + 16,
    strip.y + (STRIP_H - CHIP_H) / 2,
    'start',
    strip.w,
  ),
}));

/**
 * The stack drawn as a pipeline from idea to production, in the same visual
 * language as the Amazon platform diagram. Hover or focus a tool to see what it
 * is for and how many case studies use it (counted from the project data).
 */
const StackPipeline = () => {
  const id = useId();
  const head = `${id}-head`;
  const svgRef = useRef<SVGSVGElement>(null);
  const [active, setActive] = useState<string | null>(null);
  const item = active ? stackById[active] : null;

  useLayoutEffect(() => {
    const svg = svgRef.current;
    if (!svg || prefersReducedMotion()) return;
    set(svg.querySelectorAll('[data-sp="node"], [data-sp="chip"]'), { opacity: 0, y: 10 });
    set(svg.querySelectorAll('[data-sp="edge"], [data-sp="box"]'), { opacity: 0 });
    return () => {
      for (const el of svg.querySelectorAll<SVGElement>('[data-sp]')) {
        el.style.opacity = '';
        el.style.transform = '';
      }
    };
  }, []);

  useOnceInView(
    svgRef,
    (el) => {
      const q = (name: string) => Array.from(el.querySelectorAll<SVGElement>(`[data-sp="${name}"]`));
      const clear = () => {
        for (const e of el.querySelectorAll<SVGElement>('[data-sp]')) {
          e.style.opacity = '';
          e.style.transform = '';
        }
      };
      const run = (targets: SVGElement[], params: Parameters<typeof animate>[1]) =>
        animate(targets, { ease: 'outExpo', ...params });

      const anims = [
        run(q('box'), { opacity: 1, duration: 600 }),
        run(q('node'), { opacity: 1, y: [10, 0], duration: 700, delay: stagger(110, { start: 120 }) }),
        run(q('edge'), { opacity: 1, duration: 500, delay: stagger(140, { start: 500 }) }),
        run(q('chip'), {
          opacity: 1,
          y: [10, 0],
          duration: 600,
          delay: stagger(45, { start: 700 }),
          onComplete: clear,
        }),
      ];
      return () => {
        for (const anim of anims) anim.pause();
        clear();
      };
    },
    { margin: '0px', threshold: 0.25 },
  );

  return (
    <div>
      <div className="overflow-x-auto">
        <svg
          ref={svgRef}
          viewBox={`0 0 760 ${VIEW_H}`}
          role="group"
          aria-label="Tech stack as a pipeline: Figma, React and Vercel for the interface, with React's supporting tools; Cloud Run, FastAPI and BigQuery on Google Cloud for the platform; then strips for the Railway stack, AI tools, and dev tools."
          className="mx-auto h-auto w-full min-w-[40rem] max-w-4xl"
        >
          <defs>
            <marker id={head} viewBox="0 0 8 8" refX="7" refY="4" markerWidth="7" markerHeight="7" orient="auto">
              <path d="M0 0 L8 4 L0 8 z" fill={FLOW} />
            </marker>
          </defs>

          <g data-sp="box">
            <rect
              x={20}
              y={CLOUD_Y}
              width={720}
              height={CLOUD_H}
              rx={16}
              fill="rgba(255,255,255,0.025)"
              stroke="rgba(255,255,255,0.2)"
              strokeDasharray="5 5"
            />
            <circle cx={40} cy={CLOUD_Y + 18} r={3} fill="#4285F4" />
            <circle cx={49} cy={CLOUD_Y + 18} r={3} fill="#EA4335" />
            <circle cx={58} cy={CLOUD_Y + 18} r={3} fill="#FBBC05" />
            <circle cx={67} cy={CLOUD_Y + 18} r={3} fill="#34A853" />
            <text x={80} y={CLOUD_Y + 22} fontSize={10} letterSpacing="0.14em" className="fill-muted font-mono">
              GOOGLE CLOUD
            </text>
          </g>

          {placedStrips.map((strip) => (
            <g key={strip.label} data-sp="box">
              <rect
                x={strip.x}
                y={strip.y}
                width={strip.w}
                height={STRIP_H}
                rx={14}
                fill="rgba(255,255,255,0.025)"
                stroke="rgba(255,255,255,0.2)"
                strokeDasharray="5 5"
              />
              <text
                x={strip.x + 20}
                y={strip.y + 26}
                fontSize={10}
                letterSpacing="0.14em"
                className="fill-muted font-mono"
              >
                {strip.label}
              </text>
            </g>
          ))}

          {edges.map((d) => (
            <path
              key={d}
              data-sp="edge"
              d={d}
              fill="none"
              stroke={FLOW}
              strokeWidth={1.6}
              strokeLinejoin="round"
              className="diagram-flow"
              markerEnd={`url(#${head})`}
            />
          ))}
          <text x={380} y={CLOUD_Y - 34} textAnchor="middle" fontSize={10} className="fill-muted font-mono">
            REST API · MCP calls
          </text>

          {nodes.map((node) => {
            const tool = stackById[node.id];
            const on = active === node.id;
            const chips = layoutChips(
              node.chips,
              node.align === 'start' ? node.x : node.x + NODE_W / 2,
              node.y + NODE_H + 10,
              node.align ?? 'center',
              node.maxRow ?? 270,
            );
            return (
              <g key={node.id}>
                <g
                  data-sp="node"
                  tabIndex={0}
                  role="button"
                  aria-label={`${tool.name}, ${node.role}, ${usageLabel(tool)}`}
                  className="cursor-pointer outline-none"
                  onPointerEnter={() => setActive(node.id)}
                  onPointerLeave={() => setActive(null)}
                  onFocus={() => setActive(node.id)}
                  onBlur={() => setActive(null)}
                  onClick={() => setActive(on ? null : node.id)}
                >
                  <rect
                    x={node.x}
                    y={node.y}
                    width={NODE_W}
                    height={NODE_H}
                    rx={10}
                    fill={on ? 'rgba(236,72,153,0.12)' : '#12121a'}
                    stroke={on ? FLOW : 'rgba(255,255,255,0.14)'}
                    strokeWidth={on ? 1.5 : 1}
                  />
                  <rect x={node.x + 14} y={node.y} width={NODE_W - 28} height={2} rx={1} fill={tool.color} />
                  <tool.icon x={node.x + 14} y={node.y + 15} size={26} color={tool.color} aria-hidden="true" />
                  <text x={node.x + 50} y={node.y + 28} fontSize={13} fontWeight={600} className="fill-white">
                    {tool.name}
                  </text>
                  <text x={node.x + 50} y={node.y + 43} fontSize={10} className="fill-muted font-mono">
                    {node.role}
                  </text>
                </g>
                <Chips chips={chips} active={active} onActive={setActive} />
              </g>
            );
          })}

          {placedStrips.map((strip) => (
            <Chips key={strip.label} chips={strip.chipsPlaced} active={active} onActive={setActive} />
          ))}
        </svg>
      </div>

      <p className="mt-3 text-center font-mono text-xs text-pink-300/80 min-[680px]:hidden">
        swipe sideways for the full pipeline
      </p>

      <p className="mt-4 min-h-6 text-center font-mono text-xs text-muted" aria-live="polite">
        {item ? (
          <>
            <span style={{ color: item.color }}>{item.name}</span>
            {item.note ? ` · ${item.note}` : ''} · {usageLabel(item)}
          </>
        ) : (
          'hover or tap a tool'
        )}
      </p>
    </div>
  );
};

export default StackPipeline;
