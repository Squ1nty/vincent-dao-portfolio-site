"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion, useScroll, useMotionValue } from "framer-motion";

// Evenly spaced along the path, ignoring real section heights entirely —
// purely decorative waypoints, not tied to any particular section.
const NODE_PROGRESS = [0.33, 0.66, 1.0];
const X_WAYPOINT_PATTERN_PERCENT = [50, 15, 85]; // cycled by waypoint index (0 = start)
const SIDEBAR_WIDTH = 140; // px — width of the path's lane
const PATH_INSET = 60; // px — keeps the path off the very top/bottom edge, room for endpoint art

type Point = { x: number; y: number };

export default function AdventurePath({ children }: { children: React.ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);

  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [pathD, setPathD] = useState("");
  const [nodePoints, setNodePoints] = useState<Point[]>([]);

  const pathLengthRef = useRef(0);
  const posRight = useMotionValue(0);
  const posY = useMotionValue(0);

  useEffect(() => {
    if (!containerRef.current) return;

    const measure = () => {
      const containerEl = containerRef.current!;
      const width = containerEl.offsetWidth;
      const height = containerEl.offsetHeight;
      setDimensions({ width, height });

      const travel = Math.max(height - 2 * PATH_INSET, 0);
      const points: Point[] = [
        { x: (X_WAYPOINT_PATTERN_PERCENT[0] / 100) * SIDEBAR_WIDTH, y: PATH_INSET },
        ...NODE_PROGRESS.map((progress, i) => ({
          x: (X_WAYPOINT_PATTERN_PERCENT[(i + 1) % X_WAYPOINT_PATTERN_PERCENT.length] / 100) * SIDEBAR_WIDTH,
          y: PATH_INSET + progress * travel,
        })),
      ];

      let d = `M ${points[0].x} ${points[0].y}`;
      for (let i = 1; i < points.length; i++) {
        const prev = points[i - 1];
        const curr = points[i];
        const midY = (prev.y + curr.y) / 2;
        d += ` C ${prev.x} ${midY}, ${curr.x} ${midY}, ${curr.x} ${curr.y}`;
      }
      setPathD(d);
      setNodePoints(points.slice(1));
    };

    measure();
    const resizeObserver = new ResizeObserver(measure);
    resizeObserver.observe(containerRef.current);
    return () => resizeObserver.disconnect();
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const updatePosition = useCallback(
    (progress: number) => {
      if (!pathRef.current || !pathLengthRef.current) return;
      const point = pathRef.current.getPointAtLength(progress * pathLengthRef.current);
      posRight.set(SIDEBAR_WIDTH - point.x);
      posY.set(point.y);
    },
    [posRight, posY]
  );

  // Recompute path length whenever the path geometry changes and reposition
  // the dot right away, rather than waiting for the next scroll tick
  // (avoids a stale first-paint position).
  useEffect(() => {
    if (!pathRef.current) return;
    pathLengthRef.current = pathRef.current.getTotalLength();
    updatePosition(scrollYProgress.get());
  }, [pathD, scrollYProgress, updatePosition]);

  useEffect(() => {
    return scrollYProgress.on("change", updatePosition);
  }, [scrollYProgress, updatePosition]);

  return (
    <div ref={containerRef} className="relative w-full">
      <svg
        width={SIDEBAR_WIDTH}
        height={dimensions.height}
        className="pointer-events-none absolute right-0 top-0 z-0"
      >
        <path
          ref={pathRef}
          d={pathD}
          fill="none"
          stroke="var(--path-color, #999)"
          strokeWidth={3}
          strokeDasharray="8 8"
        />
      </svg>

      {nodePoints.map((point, i) => (
        <div
          key={i}
          className="absolute z-40 h-4 w-4 rounded-full border-4 border-[var(--background)] bg-[var(--desktopNavBg)]"
          style={{ right: SIDEBAR_WIDTH - point.x, top: point.y, transform: "translate(50%, -50%)" }}
        />
      ))}

      <motion.div
        className="pointer-events-none absolute z-50 h-6 w-6 rounded-full bg-[var(--character-color,#ff5c5c)] sm:h-8 sm:w-8 md:h-9 md:w-9"
        style={{ right: posRight, top: posY, translateX: "50%", translateY: "-50%" }}
      />

      <div className="relative z-10">{children}</div>
    </div>
  );
}
