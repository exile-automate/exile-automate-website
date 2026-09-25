"use client";

import { useEffect, useRef, useState } from "react";

interface Dot {
  x: number;
  y: number;
  cx: number;
  cy: number;
  isLogo: boolean;
}

export default function PixelLogoCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const mouseRef = useRef<{ x: number; y: number }>({ x: -999, y: -999 });
  const dotsRef = useRef<Dot[]>([]);
  const animRef = useRef<number | null>(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    canvas.width = 480;
    canvas.height = 480;

    // Create offscreen canvas to sample the image
    const offscreen = document.createElement("canvas");
    offscreen.width = 480;
    offscreen.height = 480;
    const offCtx = offscreen.getContext("2d");
    if (!offCtx) return;

    const img = new window.Image();
    img.crossOrigin = "anonymous";
    img.src = "/xi-logo-green.png";

    img.onload = () => {
      // Center and scale image to fill most of the offscreen canvas
      const padding = 60;
      offCtx.drawImage(img, padding, padding, 480 - padding * 2, 480 - padding * 2);
      const imageData = offCtx.getImageData(0, 0, 480, 480);
      const pixels = imageData.data;

      const dotSpacing = 5; // Denser grid (every 5px)
      const dots: Dot[] = [];

      for (let y = 0; y < 480; y += dotSpacing) {
        for (let x = 0; x < 480; x += dotSpacing) {
          const index = (y * 480 + x) * 4;
          const alpha = pixels[index + 3];
          const isLogo = alpha > 30;
          dots.push({
            x,
            y,
            cx: x,
            cy: y,
            isLogo,
          });
        }
      }

      dotsRef.current = dots;

      const animate = () => {
        ctx.clearRect(0, 0, 480, 480);
        // Sped up wave time progression
        const time = Date.now() * 0.003;
        const mx = mouseRef.current.x;
        const my = mouseRef.current.y;

        dots.forEach(dot => {
          // Wave idle animation (6px amplitude)
          const wave = Math.sin(time + dot.x * 0.04 + dot.y * 0.04);
          const targetX = dot.x + wave * 6;
          const targetY = dot.y + wave * 6;

          // Mouse repulsion (120px radius, 50 force)
          const dx = dot.cx - mx;
          const dy = dot.cy - my;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const repelRadius = 120;

          if (dist < repelRadius && dist > 0) {
            const force = ((repelRadius - dist) / repelRadius) * 50;
            dot.cx += (dx / dist) * force * 0.3;
            dot.cy += (dy / dist) * force * 0.3;
          }

          // Spring back to base+wave
          dot.cx += (targetX - dot.cx) * 0.12;
          dot.cy += (targetY - dot.cy) * 0.12;

          // Draw dot
          // High contrast: Logo: 0.85-1.0 (0.925 + sin*0.075), Background: 0.06
          const opacity = dot.isLogo
            ? 0.925 + Math.sin(time + dot.x * 0.05) * 0.075
            : 0.06;

          ctx.beginPath();
          ctx.arc(dot.cx, dot.cy, 2, 0, Math.PI * 2); // Tiny dots (radius 2px)
          ctx.fillStyle = `rgba(4, 184, 103, ${opacity})`;
          ctx.fill();
        });

        animRef.current = requestAnimationFrame(animate);
      };

      animate();
    };

    img.onerror = (e) => {
      console.error("Logo image failed to load:", e);
    };

    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // 1. Repel coordinates calculation
    const rect = canvas.getBoundingClientRect();
    mouseRef.current = {
      x: ((e.clientX - rect.left) / rect.width) * canvas.width,
      y: ((e.clientY - rect.top) / rect.height) * canvas.height,
    };

    // 2. 3D perspective tilt calculations
    const container = containerRef.current;
    if (!container) return;
    const containerRect = container.getBoundingClientRect();
    const x = e.clientX - containerRect.left;
    const y = e.clientY - containerRect.top;
    
    const cx = containerRect.width / 2;
    const cy = containerRect.height / 2;
    
    const dx = x - cx;
    const dy = y - cy;
    
    const maxTilt = 12; // 12 degrees max tilt
    const rotateX = -(dy / cy) * maxTilt;
    const rotateY = (dx / cx) * maxTilt;
    
    container.style.setProperty("--rotate-x", `${rotateX}deg`);
    container.style.setProperty("--rotate-y", `${rotateY}deg`);
    container.style.setProperty("--scale", "1.03");
    
    // Deepen box shadow dynamically based on tilt distance from center
    const tiltAmount = Math.sqrt(rotateX * rotateX + rotateY * rotateY) / maxTilt;
    const shadowBlur = 35 + tiltAmount * 15;
    const shadowSpread = -5 + tiltAmount * -2;
    const shadowAlpha = 0.05 + tiltAmount * 0.05;
    container.style.setProperty(
      "--box-shadow",
      `0 ${10 + tiltAmount * 10}px ${shadowBlur}px ${shadowSpread}px rgba(0,0,0,${shadowAlpha}), 0 0 40px rgba(4, 184, 103, 0.25)`
    );
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
    const container = containerRef.current;
    if (!container) return;
    container.style.transition = "transform 0.1s ease-out, box-shadow 0.2s ease-out";
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    const container = containerRef.current;
    if (!container) return;
    
    // Reset back to standard flat layout
    container.style.setProperty("--rotate-x", "0deg");
    container.style.setProperty("--rotate-y", "0deg");
    container.style.setProperty("--scale", "1");
    container.style.setProperty("--box-shadow", "0 10px 35px -5px rgba(0,0,0,0.05), 0 0 30px rgba(4, 184, 103, 0.1)");
    
    // Smooth transition when returning to rest position
    container.style.transition = "transform 0.3s ease-out, box-shadow 0.3s ease-out";
    
    mouseRef.current = { x: -999, y: -999 };
  };

  return (
    <div
      ref={containerRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`relative flex items-center justify-center rounded-2xl bg-white overflow-hidden group border border-[rgba(10,31,20,0.08)] ${
        !isHovered ? "card-glow-pulse" : ""
      }`}
      style={{
        width: 480,
        height: 480,
        transform: "perspective(1000px) rotateX(var(--rotate-x, 0deg)) rotateY(var(--rotate-y, 0deg)) scale3d(var(--scale, 1), var(--scale, 1), var(--scale, 1))",
        boxShadow: "var(--box-shadow, 0 10px 35px -5px rgba(10,31,20,0.04), 0 0 30px rgba(4, 184, 103, 0.08))",
        transition: "transform 0.3s ease-out, box-shadow 0.3s ease-out",
      }}
    >
      {/* Pulse Keyframes stylesheet injecting once per mount */}
      <style>{`
        @keyframes greenGlowPulse {
          0% {
            box-shadow: 0 10px 35px -5px rgba(0,0,0,0.05), 0 0 30px rgba(4, 184, 103, 0.1);
          }
          50% {
            box-shadow: 0 10px 35px -5px rgba(0,0,0,0.05), 0 0 45px rgba(4, 184, 103, 0.3);
          }
          100% {
            box-shadow: 0 10px 35px -5px rgba(0,0,0,0.05), 0 0 30px rgba(4, 184, 103, 0.1);
          }
        }
        .card-glow-pulse {
          animation: greenGlowPulse 2.5s infinite ease-in-out;
        }
      `}</style>

      <canvas
        ref={canvasRef}
        onMouseMove={handleMouseMove}
        style={{ width: "100%", height: "100%" }}
        className="block cursor-crosshair"
      />
    </div>
  );
}
