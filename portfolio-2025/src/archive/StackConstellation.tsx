import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { animate } from 'animejs/animation';
import { set, stagger } from 'animejs/utils';
import { prefersReducedMotion, useOnceInView } from '@/lib/motion';
import { relations, stack, stackById, usageLabel } from '@/data/stack';

/** Where each logo likes to sit, as a fraction of the box. Related tools are placed near each other. */
const HOME: Record<string, [number, number]> = {
  figma: [0.08, 0.24],
  react: [0.24, 0.4],
  tailwind: [0.28, 0.12],
  typescript: [0.12, 0.66],
  nextjs: [0.4, 0.64],
  vercel: [0.46, 0.2],
  node: [0.27, 0.8],
  python: [0.52, 0.78],
  fastapi: [0.66, 0.58],
  bigquery: [0.66, 0.28],
  gcp: [0.82, 0.14],
  cloudrun: [0.92, 0.42],
  docker: [0.84, 0.68],
};

/** The shared stack has grown past what this layout has positions for, so only draw the tools placed above. */
const placed = stack.filter((item) => item.id in HOME);

const SIZE = 56;
const REPEL = 120;

interface Body {
  id: string;
  x: number;
  y: number;
  vx: number;
  vy: number;
  phase: number;
}

/**
 * ARCHIVED, not rendered anywhere. The home page uses `views/home/StackPipeline`
 * (see design-log/2026-10-28-tech-stack-pipeline-decision.md). Kept inside src/
 * so it keeps type-checking and linting; import it where the pipeline is used
 * to bring it back.
 *
 * The stack as a small constellation. Logos drift around a home spot, ease away
 * from the pointer, and hovering one lights up what it is used with. Logos are
 * real buttons over a canvas that only draws the lines, so they stay focusable
 * and readable by screen readers.
 */
const StackConstellation = () => {
  const hostRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const nodeRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const activeRef = useRef<string | null>(null);
  const redrawRef = useRef<() => void>(() => undefined);
  const [active, setActive] = useState<string | null>(null);

  const neighbours = useMemo(() => {
    const map: Record<string, Set<string>> = {};
    for (const [a, b] of relations) {
      (map[a] ??= new Set()).add(b);
      (map[b] ??= new Set()).add(a);
    }
    return map;
  }, []);

  const choose = (id: string | null) => {
    activeRef.current = id;
    setActive(id);
    redrawRef.current();
  };

  useLayoutEffect(() => {
    const host = hostRef.current;
    if (!host || prefersReducedMotion()) return;
    set(host.querySelectorAll('[data-sc="logo"]'), { opacity: 0, scale: 0.6 });
    return () => {
      for (const el of host.querySelectorAll<HTMLElement>('[data-sc="logo"]')) {
        el.style.opacity = '';
        el.style.transform = '';
      }
    };
  }, []);

  useOnceInView(
    hostRef,
    (host) => {
      const logos = Array.from(host.querySelectorAll<HTMLElement>('[data-sc="logo"]'));
      const anim = animate(logos, {
        opacity: 1,
        scale: [0.6, 1],
        duration: 800,
        ease: 'outBack',
        delay: stagger(70),
        onComplete: () => {
          for (const el of logos) {
            el.style.opacity = '';
            el.style.transform = '';
          }
        },
      });
      return () => {
        anim.pause();
        for (const el of logos) {
          el.style.opacity = '';
          el.style.transform = '';
        }
      };
    },
    { margin: '0px', threshold: 0.25 },
  );

  useEffect(() => {
    const host = hostRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!host || !canvas || !ctx) return;

    const reduceMotion = prefersReducedMotion();
    const pointer = { x: -9999, y: -9999 };
    let width = 0;
    let height = 0;
    let frame = 0;
    let running = false;
    let bodies: Body[] = [];

    const place = (body: Body, t: number) => {
      const [fx, fy] = HOME[body.id];
      const drift = reduceMotion ? 0 : 9;
      return {
        tx: fx * width + Math.sin(t * 0.0007 + body.phase) * drift,
        ty: fy * height + Math.cos(t * 0.0006 + body.phase * 1.3) * drift,
      };
    };

    const byId = () => Object.fromEntries(bodies.map((b) => [b.id, b])) as Record<string, Body>;

    const draw = (t: number) => {
      ctx.clearRect(0, 0, width, height);
      const at = byId();
      const focus = activeRef.current;
      ctx.lineWidth = 1;
      for (const [a, b] of relations) {
        const from = at[a];
        const to = at[b];
        if (!from || !to) continue;
        const lit = focus !== null && (a === focus || b === focus);
        ctx.strokeStyle = lit
          ? 'rgba(244,114,182,0.85)'
          : focus !== null
            ? 'rgba(255,255,255,0.05)'
            : 'rgba(255,255,255,0.16)';
        ctx.lineWidth = lit ? 1.6 : 1;
        ctx.beginPath();
        ctx.moveTo(from.x, from.y);
        ctx.lineTo(to.x, to.y);
        ctx.stroke();

        if (lit && !reduceMotion) {
          const p = ((t * 0.0006) % 1 + (a === focus ? 0 : 0.5)) % 1;
          const start = a === focus ? from : to;
          const end = a === focus ? to : from;
          ctx.fillStyle = '#f9a8d4';
          ctx.beginPath();
          ctx.arc(start.x + (end.x - start.x) * p, start.y + (end.y - start.y) * p, 2.4, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    };

    const move = () => {
      for (const body of bodies) {
        const el = nodeRefs.current[body.id];
        if (el) el.style.transform = `translate3d(${body.x - SIZE / 2}px, ${body.y - SIZE / 2}px, 0)`;
      }
    };

    const step = (t: number) => {
      for (const body of bodies) {
        const { tx, ty } = place(body, t);
        body.vx += (tx - body.x) * 0.02;
        body.vy += (ty - body.y) * 0.02;

        const dx = body.x - pointer.x;
        const dy = body.y - pointer.y;
        const dist = Math.hypot(dx, dy);
        if (dist < REPEL && dist > 0.01) {
          const push = (1 - dist / REPEL) * 1.4;
          body.vx += (dx / dist) * push;
          body.vy += (dy / dist) * push;
        }

        body.vx *= 0.86;
        body.vy *= 0.86;
        body.x += body.vx;
        body.y += body.vy;
      }
      move();
      draw(t);
    };

    const resize = () => {
      const box = host.getBoundingClientRect();
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      width = box.width;
      height = box.height;
      canvas.width = Math.round(width * ratio);
      canvas.height = Math.round(height * ratio);
      ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
      bodies = placed.map((item, i) => {
        const [fx, fy] = HOME[item.id];
        return { id: item.id, x: fx * width, y: fy * height, vx: 0, vy: 0, phase: i * 1.7 };
      });
      move();
      draw(0);
    };

    redrawRef.current = () => {
      if (!running) draw(performance.now());
    };

    const tick = (t: number) => {
      step(t);
      frame = window.requestAnimationFrame(tick);
    };
    const start = () => {
      if (running || reduceMotion) return;
      running = true;
      frame = window.requestAnimationFrame(tick);
    };
    const stop = () => {
      running = false;
      window.cancelAnimationFrame(frame);
    };

    const onMove = (event: PointerEvent) => {
      const box = host.getBoundingClientRect();
      pointer.x = event.clientX - box.left;
      pointer.y = event.clientY - box.top;
    };
    const onLeave = () => {
      pointer.x = -9999;
      pointer.y = -9999;
    };

    const visibility = new IntersectionObserver(([entry]) => (entry.isIntersecting ? start() : stop()));
    const resizeObserver = new ResizeObserver(resize);

    resize();
    visibility.observe(host);
    resizeObserver.observe(host);
    host.addEventListener('pointermove', onMove);
    host.addEventListener('pointerleave', onLeave);

    return () => {
      stop();
      visibility.disconnect();
      resizeObserver.disconnect();
      host.removeEventListener('pointermove', onMove);
      host.removeEventListener('pointerleave', onLeave);
      redrawRef.current = () => undefined;
    };
  }, []);

  const item = active ? stackById[active] : null;
  const linked = active ? neighbours[active] : null;

  return (
    <div>
      <div
        ref={hostRef}
        role="group"
        aria-label="Tech stack constellation. Each logo is a button."
        className="relative h-[26rem] overflow-hidden rounded-2xl border border-line bg-surface/40 sm:h-[28rem]"
      >
        <canvas ref={canvasRef} aria-hidden="true" className="absolute inset-0 h-full w-full" />
        {placed.map((tool) => {
          const dim = active !== null && active !== tool.id && !linked?.has(tool.id);
          const on = active === tool.id;
          return (
            <button
              key={tool.id}
              ref={(el) => {
                nodeRefs.current[tool.id] = el;
              }}
              type="button"
              aria-label={`${tool.name}, ${usageLabel(tool)}`}
              aria-pressed={on}
              onPointerEnter={(e) => e.pointerType === 'mouse' && choose(tool.id)}
              onPointerLeave={(e) => e.pointerType === 'mouse' && choose(null)}
              onFocus={() => choose(tool.id)}
              onBlur={() => choose(null)}
              onClick={() => choose(on ? null : tool.id)}
              style={{ width: SIZE, height: SIZE, opacity: dim ? 0.3 : 1 }}
              className="absolute left-0 top-0 rounded-full outline-none transition-opacity duration-300 will-change-transform focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pink-300"
            >
              <span
                data-sc="logo"
                className="flex h-full w-full flex-col items-center justify-center rounded-full border bg-ink/80 backdrop-blur-sm transition-[border-color,box-shadow] duration-300"
                style={{
                  borderColor: on ? '#f472b6' : 'rgba(255,255,255,0.14)',
                  boxShadow: on ? '0 0 24px rgba(244,114,182,0.35)' : undefined,
                }}
              >
                <tool.icon size={24} color={tool.color} aria-hidden="true" />
              </span>
              <span
                aria-hidden="true"
                className="pointer-events-none absolute left-1/2 top-full mt-1 -translate-x-1/2 whitespace-nowrap font-mono text-[10px] text-muted"
              >
                {tool.name}
              </span>
            </button>
          );
        })}
      </div>

      <p className="mt-4 min-h-6 text-center font-mono text-xs text-muted" aria-live="polite">
        {item ? (
          <>
            <span style={{ color: item.color }}>{item.name}</span> · {usageLabel(item)}
          </>
        ) : (
          'move the cursor through it · hover or tap a logo'
        )}
      </p>
    </div>
  );
};

export default StackConstellation;
