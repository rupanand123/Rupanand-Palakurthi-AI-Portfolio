import { useEffect, useRef } from "react";

interface Star {
  x: number;
  y: number;
  z: number;
  size: number;
  color: string;
}

export default function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Track state
    const stars: Star[] = [];
    const numStars = 100;
    const speed = 0.6;
    let mouse = { x: -1000, y: -1000, active: false, radius: 110 };

    // Initialize stars
    for (let i = 0; i < numStars; i++) {
      stars.push({
        x: Math.random() * width,
        y: Math.random() * height,
        z: Math.random() * width, // depth
        size: Math.random() * 1.5 + 0.5,
        color:
          Math.random() > 0.6
            ? "rgba(6, 182, 212, " + (Math.random() * 0.4 + 0.2) + ")" // cyan
            : Math.random() > 0.5
            ? "rgba(139, 92, 246, " + (Math.random() * 0.4 + 0.2) + ")" // violet
            : "rgba(255, 255, 255, " + (Math.random() * 0.3 + 0.1) + ")", // white
      });
    }

    // Handles container scaling
    const resizeObserver = new ResizeObserver((entries) => {
      for (let entry of entries) {
        const { width: entryWidth, height: entryHeight } = entry.contentRect;
        width = canvas.width = entryWidth || window.innerWidth;
        height = canvas.height = entryHeight || window.innerHeight;
      }
    });

    resizeObserver.observe(canvas.parentElement || document.body);

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
      mouse.active = true;
    };

    const handleMouseLeave = () => {
      mouse.active = false;
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);

    // Frame Loop
    const draw = () => {
      ctx.fillStyle = "rgba(2, 6, 23, 0.12)"; // trail effect (deep space black-navy)
      ctx.fillRect(0, 0, width, height);

      // Render cosmic background mesh grid
      ctx.strokeStyle = "rgba(6, 182, 212, 0.015)";
      ctx.lineWidth = 1;
      const gridSize = 80;
      for (let x = 0; x < width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Draw subtle interactive circle around the cursor
      if (mouse.active) {
        ctx.beginPath();
        const grad = ctx.createRadialGradient(
          mouse.x,
          mouse.y,
          0,
          mouse.x,
          mouse.y,
          mouse.radius
        );
        grad.addColorStop(0, "rgba(6, 182, 212, 0.05)");
        grad.addColorStop(1, "rgba(6, 182, 212, 0)");
        ctx.fillStyle = grad;
        ctx.arc(mouse.x, mouse.y, mouse.radius, 0, Math.PI * 2);
        ctx.fill();

        // Neon dot
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, 2, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(6, 182, 212, 0.8)";
        ctx.shadowColor = "rgba(6, 182, 212, 0.8)";
        ctx.shadowBlur = 8;
        ctx.fill();
        ctx.shadowBlur = 0; // reset
      }

      // Update & Draw stars
      for (let i = 0; i < numStars; i++) {
        const s = stars[i];

        // Deep 3D star projection scrolling
        s.z -= speed;
        if (s.z <= 0) {
          s.z = width;
          s.x = Math.random() * width;
          s.y = Math.random() * height;
        }

        // Project coordinate with depth factor
        const k = 120 / s.z;
        let px = (s.x - width / 2) * k + width / 2;
        let py = (s.y - height / 2) * k + height / 2;

        // Mouse deflection effect
        if (mouse.active) {
          const dx = px - mouse.x;
          const dy = py - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < mouse.radius) {
            const force = (mouse.radius - dist) / mouse.radius;
            const angle = Math.atan2(dy, dx);
            px += Math.cos(angle) * force * 15;
            py += Math.sin(angle) * force * 15;
          }
        }

        // Loop check wrapping
        if (px < 0 || px > width || py < 0 || py > height) {
          px = Math.random() * width;
          py = Math.random() * height;
          s.z = width;
        }

        // Size adapts slightly
        const currentSize = s.size * (1 - s.z / width) * 2.5 + 0.2;

        ctx.beginPath();
        ctx.arc(px, py, Math.max(0.3, currentSize), 0, Math.PI * 2);
        ctx.fillStyle = s.color;
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      id="cosmic-canvas"
      className="fixed inset-0 pointer-events-none z-0 block bg-[#020617]"
    />
  );
}
