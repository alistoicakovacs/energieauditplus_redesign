import { Children, cloneElement, isValidElement, useEffect, useId, useRef } from 'react';
import usePrefersReducedMotion from '../../lib/usePrefersReducedMotion.js';
import styles from './EcoLineDraw.module.css';

/**
 * EcoLineDraw — anime.js v4 SVG line-draw of the signature eco-gradient
 * (blue-700 → green-700) for Ablauf steppers and section dividers
 * (plan §7.4b). Triggered once via IntersectionObserver when scrolled
 * into view; off-screen it does zero work (plan §7.6).
 *
 * Pass either a `d` path string or one/more `<path>` children (each child
 * gets the gradient stroke injected). Gradient stop colors come from CSS
 * `stop-color: var(--…)` classes in the module — no hex outside tokens.css.
 *
 * anime.js is dynamically imported inside the effect, so it stays out of the
 * SSR bundle and out of chunks that never draw a line.
 *
 * SSG/reduced motion: the plain SVG renders fully drawn (final state) —
 * nothing is hidden until the client decides to animate.
 *
 * @param {object} props
 * @param {string} [props.d] Path data (alternative to children).
 * @param {string} [props.viewBox='0 0 600 60']
 * @param {number} [props.strokeWidth=3]
 * @param {number} [props.duration=900] Milliseconds (anime.js).
 * @param {number} [props.delay=0] Milliseconds before drawing starts.
 * @param {number} [props.amount=0.3] IntersectionObserver threshold.
 * @param {string} [props.className]
 * @param {import('react').ReactNode} [props.children] `<path>` elements.
 */
export default function EcoLineDraw({
  d,
  viewBox = '0 0 600 60',
  strokeWidth = 3,
  duration = 900,
  delay = 0,
  amount = 0.3,
  className,
  children,
  ...rest
}) {
  const svgRef = useRef(null);
  const reduced = usePrefersReducedMotion();
  // useId emits ":r0:" — strip the colons, they are invalid inside url(#…).
  const gradId = `ecoline-${useId().replace(/:/g, '')}`;

  useEffect(() => {
    if (reduced) return undefined; // final state is the default markup

    const svgEl = svgRef.current;
    if (!svgEl) return undefined;

    let disposed = false;
    let observer;
    let animation;
    let drawables;
    let utilsRef;

    (async () => {
      const { animate, svg, utils, stagger, cubicBezier } = await import('animejs');
      if (disposed) return;
      utilsRef = utils;

      const paths = Array.from(svgEl.querySelectorAll('path'));
      if (paths.length === 0) return;

      drawables = svg.createDrawable(paths);
      utils.set(drawables, { draw: '0 0' }); // hide until in view

      observer = new IntersectionObserver(
        (entries) => {
          if (!entries.some((entry) => entry.isIntersecting)) return;
          observer.disconnect();
          animation = animate(drawables, {
            draw: '0 1',
            duration,
            // --ease-out (tokens.css)
            ease: cubicBezier(0.16, 1, 0.3, 1),
            delay: paths.length > 1 ? stagger(120, { start: delay }) : delay,
          });
        },
        { threshold: amount }
      );
      observer.observe(svgEl);
    })();

    return () => {
      disposed = true;
      observer?.disconnect();
      animation?.cancel();
      // Restore the fully-drawn state (e.g. when reduce is toggled on live).
      if (drawables && utilsRef) utilsRef.set(drawables, { draw: '0 1' });
    };
  }, [reduced, duration, delay, amount]);

  const stroke = `url(#${gradId})`;
  // userSpaceOnUse: objectBoundingBox gradients are undefined on zero-height
  // (perfectly horizontal) paths — anchor the gradient to the viewBox width.
  const vbWidth = Number(viewBox.trim().split(/[\s,]+/)[2]) || 100;

  const classes = [styles.svg, className].filter(Boolean).join(' ');

  return (
    <svg
      ref={svgRef}
      viewBox={viewBox}
      fill="none"
      aria-hidden="true"
      focusable="false"
      className={classes}
      {...rest}
    >
      <defs>
        <linearGradient
          id={gradId}
          gradientUnits="userSpaceOnUse"
          x1="0"
          y1="0"
          x2={vbWidth}
          y2="0"
        >
          <stop offset="0" className={styles.stopStart} />
          <stop offset="1" className={styles.stopEnd} />
        </linearGradient>
      </defs>
      {d ? (
        <path d={d} stroke={stroke} strokeWidth={strokeWidth} strokeLinecap="round" />
      ) : (
        Children.map(children, (child) =>
          isValidElement(child)
            ? cloneElement(child, {
                stroke: child.props.stroke ?? stroke,
                strokeWidth: child.props.strokeWidth ?? strokeWidth,
                strokeLinecap: child.props.strokeLinecap ?? 'round',
              })
            : child
        )
      )}
    </svg>
  );
}
