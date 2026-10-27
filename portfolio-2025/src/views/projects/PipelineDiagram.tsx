import { useId, useLayoutEffect, useRef } from 'react';
import { createTimeline } from 'animejs/timeline';
import { createDrawable } from 'animejs/svg';
import { set, stagger } from 'animejs/utils';
import { prefersReducedMotion, useOnceInView } from '@/lib/motion';

const FLOW = '#f472b6';
const DEPLOY = '#67e8f9';

interface NodeProps {
  x: number;
  y: number;
  w: number;
  title: string;
  sub?: string;
  accent: string;
}

const NODE_H = 52;

const Node = ({ x, y, w, title, sub, accent }: NodeProps) => (
  <g data-pd="node">
    <rect x={x} y={y} width={w} height={NODE_H} rx={10} fill="#12121a" stroke="rgba(255,255,255,0.14)" />
    <rect x={x + 14} y={y} width={w - 28} height={2} rx={1} fill={accent} />
    <text
      x={x + w / 2}
      y={sub ? y + 24 : y + 31}
      textAnchor="middle"
      fontSize={12.5}
      fontWeight={600}
      className="fill-white"
    >
      {title}
    </text>
    {sub && (
      <text x={x + w / 2} y={y + 40} textAnchor="middle" fontSize={10} className="fill-muted font-mono">
        {sub}
      </text>
    )}
  </g>
);

const Label = ({ x, y, children }: { x: number; y: number; children: string }) => (
  <text x={x} y={y} fontSize={10} letterSpacing="0.14em" className="fill-muted font-mono">
    {children}
  </text>
);

interface EdgeProps {
  d: string;
  kind: 'flow' | 'deploy';
  head: string;
}

/** One connector. Flow lines carry the animated dash; deploy lines are a static dotted line. */
const Edge = ({ d, kind, head }: EdgeProps) =>
  kind === 'flow' ? (
    <path
      data-pd="edge"
      data-kind="flow"
      d={d}
      fill="none"
      stroke={FLOW}
      strokeWidth={1.6}
      className="diagram-flow"
      markerEnd={`url(#${head})`}
    />
  ) : (
    <path
      data-pd="edge"
      data-kind="deploy"
      d={d}
      fill="none"
      stroke={DEPLOY}
      strokeWidth={1.3}
      strokeDasharray="2 4"
      strokeLinejoin="round"
      strokeLinecap="round"
      markerEnd={`url(#${head})`}
    />
  );

/**
 * Puts a pipeline diagram back to its finished look. Safe to call at any time:
 * on completion, on unmount mid-animation, or when the animation never ran.
 */
function restore(svg: SVGSVGElement) {
  for (const el of svg.querySelectorAll<SVGElement>('[data-pd]')) {
    el.style.opacity = '';
    el.style.transform = '';
    el.style.markerEnd = '';
  }
  for (const el of svg.querySelectorAll<SVGElement>('[data-pd="edge"]')) {
    el.removeAttribute('pathLength');
    el.removeAttribute('stroke-dashoffset');
    if (el.dataset.kind === 'flow') {
      el.removeAttribute('stroke-dasharray');
      el.classList.add('diagram-flow');
    } else {
      el.setAttribute('stroke-dasharray', '2 4');
    }
  }
}

export const PIPELINE_DESCRIPTION =
  'Architecture of the Amazon API Data Platform. Cloud Scheduler starts jobs and Cloud Tasks queues them. One FastAPI service on Cloud Run ' +
  'ingests Amazon SP-API and Ads API data, writes it to BigQuery, and reads it back to serve Obseron through its API and Delos through MCP. ' +
  'Cloud Build builds the Docker image and deploys the service.';

interface PipelineDiagramProps {
  className?: string;
}

const PipelineDiagram = ({ className }: PipelineDiagramProps) => {
  const id = useId();
  const svgRef = useRef<SVGSVGElement>(null);
  const flowHead = `${id}-flow`;
  const deployHead = `${id}-deploy`;
  const titleId = `${id}-title`;

  // Hidden before first paint; the intro plays when the diagram scrolls into view.
  useLayoutEffect(() => {
    const svg = svgRef.current;
    if (!svg || prefersReducedMotion()) return;
    set(svg.querySelectorAll('[data-pd="box"], [data-pd="edge"]'), { opacity: 0 });
    set(svg.querySelectorAll('[data-pd="node"]'), { opacity: 0, y: 10 });
    return () => restore(svg);
  }, []);

  useOnceInView(
    svgRef,
    (el) => {
      const svg = el as SVGSVGElement;
      const q = (name: string) => Array.from(svg.querySelectorAll<SVGElement>(`[data-pd="${name}"]`));
      const edges = q('edge');

      // The dash animation and the draw-in both own the dash properties, so
      // hand them over for the draw and give them back afterwards.
      for (const edge of edges) {
        edge.classList.remove('diagram-flow');
        edge.removeAttribute('stroke-dasharray');
        edge.style.markerEnd = 'none';
      }
      const drawables = createDrawable(edges as unknown as SVGGeometryElement[]);

      const timeline = createTimeline({
        defaults: { ease: 'outExpo' },
        onComplete: () => restore(svg),
      })
        .add(q('box'), { opacity: 1, duration: 500 }, 0)
        .add(q('node'), { opacity: 1, y: [10, 0], duration: 700 }, stagger(85, { start: 150 }))
        .add(edges, { opacity: 1, duration: 80 }, stagger(70, { start: 520 }))
        .add(drawables, { draw: ['0 0', '0 1'], duration: 650, ease: 'inOutQuad' }, stagger(70, { start: 520 }));

      return () => {
        timeline.pause();
        restore(svg);
      };
    },
    { margin: '0px', threshold: 0.25 },
  );

  return (
    <svg
      ref={svgRef}
      viewBox="0 0 620 345"
      role="img"
      aria-labelledby={titleId}
      className={className}
      preserveAspectRatio="xMidYMid meet"
    >
      <title id={titleId}>{PIPELINE_DESCRIPTION}</title>
      <defs>
        <marker id={flowHead} viewBox="0 0 8 8" refX="7" refY="4" markerWidth="7" markerHeight="7" orient="auto">
          <path d="M0 0 L8 4 L0 8 z" fill={FLOW} />
        </marker>
        <marker id={deployHead} viewBox="0 0 8 8" refX="7" refY="4" markerWidth="6" markerHeight="6" orient="auto">
          <path d="M0 0 L8 4 L0 8 z" fill={DEPLOY} />
        </marker>
      </defs>

      {/* Google Cloud boundary */}
      <rect
        data-pd="box"
        x={140}
        y={20}
        width={300}
        height={290}
        rx={16}
        fill="rgba(255,255,255,0.025)"
        stroke="rgba(255,255,255,0.2)"
        strokeDasharray="5 5"
      />
      <circle cx={160} cy={38} r={3} fill="#4285F4" />
      <circle cx={169} cy={38} r={3} fill="#EA4335" />
      <circle cx={178} cy={38} r={3} fill="#FBBC05" />
      <circle cx={187} cy={38} r={3} fill="#34A853" />
      <Label x={200} y={42}>
        GOOGLE CLOUD
      </Label>

      {/* Connectors sit under the nodes */}
      <g>
        <Edge d="M116 122 C 200 122, 220 160, 272 160" kind="flow" head={flowHead} />
        <Edge d="M116 202 C 200 202, 220 160, 272 160" kind="flow" head={flowHead} />
        <Edge d="M260 88 L286 88" kind="flow" head={flowHead} />
        <Edge d="M338 114 L338 144" kind="flow" head={flowHead} />
        <Edge d="M318 198 L318 236" kind="flow" head={flowHead} />
        <Edge d="M358 238 L358 200" kind="flow" head={flowHead} />
        <Edge d="M404 172 C 450 172, 460 232, 506 232" kind="flow" head={flowHead} />
        <Edge d="M404 172 C 450 172, 460 296, 506 296" kind="flow" head={flowHead} />
        <Edge d="M206 238 L206 190 L270 190" kind="deploy" head={deployHead} />
      </g>
      <text x={214} y={218} fontSize={10} fill={DEPLOY} className="font-mono">
        deploy
      </text>

      <Label x={12} y={82}>
        AMAZON
      </Label>
      <Node x={12} y={96} w={104} title="SP-API" sub="seller data" accent="#fbbf24" />
      <Node x={12} y={176} w={104} title="Ads API" sub="ad spend" accent="#fbbf24" />

      <Node x={152} y={62} w={108} title="Cloud Scheduler" sub="runs" accent="#a78bfa" />
      <Node x={288} y={62} w={100} title="Cloud Tasks" sub="queue" accent="#a78bfa" />
      <Node x={272} y={146} w={132} title="Cloud Run" sub="FastAPI service" accent={FLOW} />
      <Node x={272} y={238} w={132} title="BigQuery" sub="warehouse" accent="#38bdf8" />
      <Node x={152} y={238} w={108} title="Cloud Build" sub="Docker builds" accent={DEPLOY} />

      <Label x={508} y={196}>
        CONSUMERS
      </Label>
      <Node x={508} y={206} w={100} title="Obseron" sub="React app" accent="#34d399" />
      <Node x={508} y={270} w={100} title="Delos" sub="via MCP" accent="#34d399" />

      {/* Legend */}
      <line x1={156} y1={330} x2={180} y2={330} stroke={FLOW} strokeWidth={1.6} strokeDasharray="5 5" />
      <text x={186} y={334} fontSize={10} className="fill-muted font-mono">
        data flow
      </text>
      <line x1={262} y1={330} x2={286} y2={330} stroke={DEPLOY} strokeWidth={1.3} strokeDasharray="2 4" strokeLinecap="round" />
      <text x={292} y={334} fontSize={10} className="fill-muted font-mono">
        deploy
      </text>
    </svg>
  );
};

export default PipelineDiagram;
