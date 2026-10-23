import { useId } from 'react';

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
  <g>
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

export const PIPELINE_DESCRIPTION =
  'Architecture of the Amazon API Data Platform. Amazon SP-API and Ads API data is ingested by a FastAPI service on Cloud Run, ' +
  'started by Cloud Scheduler and queued through Cloud Tasks. The data is stored in BigQuery and served by a second FastAPI service on Cloud Run ' +
  'to Obseron and Delos. Cloud Build builds the Docker images and deploys both Cloud Run services.';

interface PipelineDiagramProps {
  className?: string;
}

const PipelineDiagram = ({ className }: PipelineDiagramProps) => {
  const id = useId();
  const flowHead = `${id}-flow`;
  const deployHead = `${id}-deploy`;
  const titleId = `${id}-title`;

  const flow = { fill: 'none', stroke: FLOW, strokeWidth: 1.6, className: 'diagram-flow' } as const;
  const deploy = {
    fill: 'none',
    stroke: DEPLOY,
    strokeWidth: 1.3,
    strokeDasharray: '2 4',
    strokeLinejoin: 'round',
    strokeLinecap: 'round',
  } as const;

  return (
    <svg
      viewBox="0 0 700 345"
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
        x={140}
        y={20}
        width={420}
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
        <path d="M116 122 C 200 122, 220 160, 272 160" {...flow} markerEnd={`url(#${flowHead})`} />
        <path d="M116 202 C 200 202, 220 160, 272 160" {...flow} markerEnd={`url(#${flowHead})`} />
        <path d="M260 88 L286 88" {...flow} markerEnd={`url(#${flowHead})`} />
        <path d="M338 114 L338 144" {...flow} markerEnd={`url(#${flowHead})`} />
        <path d="M404 172 L442 172" {...flow} markerEnd={`url(#${flowHead})`} />
        <path d="M494 198 L494 236" {...flow} markerEnd={`url(#${flowHead})`} />
        <path d="M544 264 C 566 264, 566 232, 586 232" {...flow} markerEnd={`url(#${flowHead})`} />
        <path d="M544 264 C 566 264, 566 296, 586 296" {...flow} markerEnd={`url(#${flowHead})`} />

        <path d="M206 238 L206 190 L270 190" {...deploy} markerEnd={`url(#${deployHead})`} />
        <path d="M260 264 L442 264" {...deploy} markerEnd={`url(#${deployHead})`} />
      </g>
      <text x={349} y={257} textAnchor="middle" fontSize={10} fill={DEPLOY} className="font-mono">
        deploy
      </text>

      <Label x={12} y={82}>
        AMAZON
      </Label>
      <Node x={12} y={96} w={104} title="SP-API" sub="seller data" accent="#fbbf24" />
      <Node x={12} y={176} w={104} title="Ads API" sub="ad spend" accent="#fbbf24" />

      <Node x={152} y={62} w={108} title="Cloud Scheduler" sub="runs" accent="#a78bfa" />
      <Node x={288} y={62} w={100} title="Cloud Tasks" sub="queue" accent="#a78bfa" />
      <Node x={272} y={146} w={132} title="Cloud Run" sub="FastAPI · ingest" accent={FLOW} />
      <Node x={444} y={146} w={100} title="BigQuery" sub="warehouse" accent="#38bdf8" />
      <Node x={444} y={238} w={100} title="Cloud Run" sub="FastAPI · API" accent={FLOW} />
      <Node x={152} y={238} w={108} title="Cloud Build" sub="Docker CI/CD" accent={DEPLOY} />

      <Label x={588} y={196}>
        CONSUMERS
      </Label>
      <Node x={588} y={206} w={100} title="Obseron" sub="React app" accent="#34d399" />
      <Node x={588} y={270} w={100} title="Delos" sub="via MCP" accent="#34d399" />

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
