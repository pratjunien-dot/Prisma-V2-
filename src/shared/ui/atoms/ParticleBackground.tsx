import { useEffect, useRef } from "react";
import { useThemeStore } from "../../../features/ui-theme/model/theme.store";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  pulse: number;
}

export const ParticleBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { theme } = useThemeStore();
  const particles = useRef<Particle[]>([]);
  const animationFrame = useRef<number>(0);

  // Get accent color from CSS variable
  const getAccentColor = () => {
    const style = getComputedStyle(document.documentElement);
    return style.getPropertyValue("--accent").trim() || "#00E0C8";
  };

  const initParticles = (width: number, height: number) => {
    const count = 80;
    particles.current = Array.from({ length: count }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.2,
      vy: (Math.random() - 0.5) * 0.2,
      size: Math.random() * 2 + 1,
      opacity: Math.random() * 0.5 + 0.1,
      pulse: Math.random() * Math.PI,
    }));
  };

  const draw = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    ctx.clearRect(0, 0, width, height);
    const accentColor = getAccentColor();

    particles.current.forEach((p) => {
      p.x += p.vx;
      p.y += p.vy;
      p.pulse += 0.02;

      // Wrap around
      if (p.x < 0) p.x = width;
      if (p.x > width) p.x = 0;
      if (p.y < 0) p.y = height;
      if (p.y > height) p.y = 0;

      const currentOpacity = p.opacity * (0.5 + Math.sin(p.pulse) * 0.5);

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fillStyle = accentColor;
      ctx.globalAlpha = currentOpacity;
      ctx.fill();

      // Subtle glow
      ctx.shadowBlur = 10;
      ctx.shadowColor = accentColor;
    });

    animationFrame.current = requestAnimationFrame(() => draw(ctx, width, height));
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles(canvas.width, canvas.height);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    draw(ctx, canvas.width, canvas.height);

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrame.current);
    };
  }, [theme]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 pointer-events-none opacity-40"
      style={{ mixBlendMode: "screen" }}
    />
  );
};
