import { useEffect, useRef } from "react";

export function EmberParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };
    window.addEventListener("resize", resize);

    const PARTICLE_COUNT = 60;

    function makeParticle() {
      const baseSize = Math.random();
      return {
        x: Math.random() * width,
        y: height + Math.random() * 100,
        size: baseSize * 3 + 1, // 1–4px, varied
        startSize: 0,
        speedY: Math.random() * 0.8 + 0.3,
        wobble: Math.random() * Math.PI * 2, // phase for sine sway
        wobbleSpeed: Math.random() * 0.03 + 0.01,
        wobbleAmount: Math.random() * 0.8 + 0.3,
        life: 0,
        maxLife: Math.random() * 200 + 150, // frames before it fully cools/fades
        heat: Math.random() * 0.3 + 0.7, // how "hot"/bright it starts (affects color)
      };
    }

    const particles = Array.from({ length: PARTICLE_COUNT }, () => {
      const p = makeParticle();
      p.life = Math.random() * p.maxLife; // stagger start so they don't all reset together
      return p;
    });

    let frame: number;

    function draw() {
      ctx!.clearRect(0, 0, width, height);

      for (const p of particles) {
        p.life += 1;
        p.y -= p.speedY;
        p.wobble += p.wobbleSpeed;
        p.x += Math.sin(p.wobble) * p.wobbleAmount;

        const lifeRatio = p.life / p.maxLife; // 0 = just born, 1 = fully cooled
        const fade = Math.max(0, 1 - lifeRatio);
        const currentSize = p.size * (1 - lifeRatio * 0.6); // shrinks as it rises

        if (p.life >= p.maxLife || p.y < -20) {
          Object.assign(p, makeParticle());
          continue;
        }

        // Color shifts from hot white-yellow core to orange to deep red as it cools
        const heatNow = p.heat * fade;
        let r = 255;
        let g = Math.floor(120 + heatNow * 120); // 120–240
        let b = Math.floor(20 + heatNow * 60); // 20–80

        const gradient = ctx!.createRadialGradient(
          p.x, p.y, 0,
          p.x, p.y, currentSize * 5
        );
        gradient.addColorStop(0, `rgba(${r}, ${g}, ${b}, ${fade * 0.9})`);
        gradient.addColorStop(0.4, `rgba(255, 90, 20, ${fade * 0.5})`);
        gradient.addColorStop(1, "rgba(200, 30, 0, 0)");

        ctx!.fillStyle = gradient;
        ctx!.beginPath();
        ctx!.arc(p.x, p.y, Math.max(0.5, currentSize * 5), 0, Math.PI * 2);
        ctx!.fill();

        // tiny bright core for the "hot" look
        ctx!.beginPath();
        ctx!.fillStyle = `rgba(255, 230, 180, ${fade * 0.8})`;
        ctx!.arc(p.x, p.y, Math.max(0.3, currentSize * 0.6), 0, Math.PI * 2);
        ctx!.fill();
      }

      frame = requestAnimationFrame(draw);
    }

    draw();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        pointerEvents: "none",
        zIndex: 1,
        mixBlendMode: "screen",
      }}
    />
  );
}
