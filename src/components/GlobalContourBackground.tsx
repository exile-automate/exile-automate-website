"use client";

import { useEffect, useRef } from "react";

export default function GlobalContourBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    // Detect capabilities
    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const isTouchDevice =
      typeof window !== "undefined" &&
      ("ontouchstart" in window ||
        navigator.maxTouchPoints > 0 ||
        window.innerWidth < 768);

    // Mouse coordinates in viewport space
    const mouse = {
      targetX: -9999,
      targetY: -9999,
      currentX: -9999,
      currentY: -9999,
      targetActive: false,
      currentIntensity: 0,
    };

    // Scroll state in document space
    const scroll = {
      targetY: typeof window !== "undefined" ? window.scrollY : 0,
      currentY: typeof window !== "undefined" ? window.scrollY : 0,
    };

    let width = 0;
    let height = 0;
    let animId: number | null = null;
    let isVisible = true;

    // Resize viewport canvas
    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;

      if (width === 0 || height === 0) return;

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);

      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
    };

    handleResize();
    window.addEventListener("resize", handleResize, { passive: true });

    // Global scroll listener
    const handleScroll = () => {
      scroll.targetY = window.scrollY || window.pageYOffset || 0;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });

    // Global pointer tracking across the whole window
    const handlePointerMove = (e: PointerEvent) => {
      if (isTouchDevice) return;
      mouse.targetX = e.clientX;
      mouse.targetY = e.clientY;
      mouse.targetActive = true;

      // Smooth initial jump
      if (mouse.currentX < -5000) {
        mouse.currentX = mouse.targetX;
        mouse.currentY = mouse.targetY;
      }
    };

    const handlePointerLeave = () => {
      mouse.targetActive = false;
    };

    if (!isTouchDevice) {
      window.addEventListener("pointermove", handlePointerMove, { passive: true });
      window.addEventListener("pointerleave", handlePointerLeave, { passive: true });
      window.addEventListener("blur", handlePointerLeave, { passive: true });
    }

    // Page Visibility API to pause animation when tab is inactive
    const handleVisibilityChange = () => {
      isVisible = !document.hidden;
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);

    // Configuration for vertical flowing field
    const lineSpacing = isTouchDevice ? 52 : 38;
    const yStep = isTouchDevice ? 22 : 14;
    const influenceRadius = 260;
    const influenceRadiusSq = influenceRadius * influenceRadius;
    const maxRepelX = 42;
    const maxRepelY = 22;

    // Render single frame
    const drawFrame = (time: number) => {
      if (width === 0 || height === 0) return;

      // Base pure white fill
      ctx.fillStyle = "#FFFFFF";
      ctx.fillRect(0, 0, width, height);

      // Lerp mouse coordinates and intensity
      if (!isTouchDevice) {
        mouse.currentX += (mouse.targetX - mouse.currentX) * 0.075;
        mouse.currentY += (mouse.targetY - mouse.currentY) * 0.075;

        if (mouse.targetActive) {
          mouse.currentIntensity += (1 - mouse.currentIntensity) * 0.06;
        } else {
          mouse.currentIntensity += (0 - mouse.currentIntensity) * 0.035;
        }
      }

      // Smooth scroll tracking
      scroll.currentY += (scroll.targetY - scroll.currentY) * 0.18;
      const scrollY = scroll.currentY;

      const hasMouseInteraction = mouse.currentIntensity > 0.001;
      const t = time * 0.00028;

      // Subtle Exile brand-green (#04B867) opacity levels organically varied between ~0.055 and 0.10 (average ~0.08)
      const GREEN_OPACITY_TIERS = [
        "rgba(4, 184, 103, 0.06)",
        "rgba(4, 184, 103, 0.075)",
        "rgba(4, 184, 103, 0.088)",
        "rgba(4, 184, 103, 0.098)",
      ];
      const lineTiers: { x: number; y: number }[][][] = [[], [], [], []];

      // Span lines horizontally beyond viewport edges
      const startX = -lineSpacing * 3;
      const endX = width + lineSpacing * 3;
      const totalSteps = Math.ceil((endX - startX) / lineSpacing);

      for (let i = 0; i <= totalSteps; i++) {
        // Subtle deterministic variation in base line spacing
        const xBase =
          startX +
          i * lineSpacing +
          Math.sin(i * 1.618) * (lineSpacing * 0.22) +
          Math.cos(i * 0.73) * (lineSpacing * 0.12);

        // Organic deterministic distribution of lines across subtle green opacity tiers
        const tier = Math.abs(Math.floor(Math.sin(i * 1.37) * 2 + 2)) % 4;
        const points: { x: number; y: number }[] = [];

        // Vertical path flowing TOP -> BOTTOM across the viewport
        for (let y = -yStep * 2; y <= height + yStep * 2; y += yStep) {
          // Document-space coordinate connects the field across scrolling
          const docY = y + scrollY;

          // Large-scale multi-frequency harmonic flow field
          const w1 = docY * 0.00042; // Macro wavelength ~ 15,000px
          const w2 = docY * 0.00115; // Meso wavelength ~ 5,500px
          const w3 = docY * 0.0026;  // Flow convergence wavelength ~ 2,400px
          const w4 = docY * 0.0058;  // Stream curvature wavelength ~ 1,080px

          const s1 = xBase * 0.00085;
          const s2 = xBase * 0.00175;
          const s3 = xBase * 0.0032;

          const lateralDisplacement =
            Math.sin(w1 + s1 + t * 0.65) * 58 +
            Math.cos(w2 - s2 + t * 0.45) * 32 +
            Math.sin(w3 + s3 - t * 0.3) * 18 +
            Math.cos(w4 * 0.75 + s1 * 1.4 + t * 0.25) * 9;

          let px = xBase + lateralDisplacement;
          let py = y;

          // Localized mouse repulsion / flexible field distortion
          if (hasMouseInteraction) {
            const dx = px - mouse.currentX;
            const dy = py - mouse.currentY;
            const distSq = dx * dx + dy * dy;

            if (distSq < influenceRadiusSq) {
              const dist = Math.sqrt(distSq);
              const q = 1 - dist / influenceRadius; // 0 to 1
              // Smooth Hermite blend curve: 3q^2 - 2q^3
              const factor = q * q * (3 - 2 * q) * mouse.currentIntensity;

              const nx = dx / (dist + 0.001);
              const ny = dy / (dist + 0.001);

              px += nx * maxRepelX * factor;
              py += ny * maxRepelY * factor;
            }
          }

          points.push({ x: px, y: py });
        }

        lineTiers[tier].push(points);
      }

      // Render smooth curves through points with quadratic midpoint interpolation
      const renderCurveGroup = (
        lines: { x: number; y: number }[][],
        strokeStyle: string,
        lineWidth: number
      ) => {
        ctx.beginPath();
        ctx.strokeStyle = strokeStyle;
        ctx.lineWidth = lineWidth;
        ctx.lineCap = "round";
        ctx.lineJoin = "round";

        for (let l = 0; l < lines.length; l++) {
          const pts = lines[l];
          if (pts.length < 2) continue;

          ctx.moveTo(pts[0].x, pts[0].y);
          for (let j = 1; j < pts.length - 1; j++) {
            const xc = (pts[j].x + pts[j + 1].x) * 0.5;
            const yc = (pts[j].y + pts[j + 1].y) * 0.5;
            ctx.quadraticCurveTo(pts[j].x, pts[j].y, xc, yc);
          }
          ctx.lineTo(pts[pts.length - 1].x, pts[pts.length - 1].y);
        }

        ctx.stroke();
      };

      // Render subtle Exile brand-green contour lines across organic opacity tiers
      for (let tIdx = 0; tIdx < GREEN_OPACITY_TIERS.length; tIdx++) {
        renderCurveGroup(lineTiers[tIdx], GREEN_OPACITY_TIERS[tIdx], 1.0);
      }
    };

    // If reduced motion is preferred, render single static frame at t = 0
    if (prefersReducedMotion) {
      drawFrame(0);
      return () => {
        window.removeEventListener("resize", handleResize);
        window.removeEventListener("scroll", handleScroll);
        document.removeEventListener("visibilitychange", handleVisibilityChange);
      };
    }

    // High performance animation loop
    const animate = (timestamp: number) => {
      animId = requestAnimationFrame(animate);
      if (isVisible) {
        drawFrame(timestamp);
      }
    };

    animId = requestAnimationFrame(animate);

    // Cleanup
    return () => {
      if (animId !== null) {
        cancelAnimationFrame(animId);
      }
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      if (!isTouchDevice) {
        window.removeEventListener("pointermove", handlePointerMove);
        window.removeEventListener("pointerleave", handlePointerLeave);
        window.removeEventListener("blur", handlePointerLeave);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-0"
      aria-hidden="true"
    />
  );
}
