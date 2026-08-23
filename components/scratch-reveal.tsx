"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { weddingData } from "@/lib/wedding-data";

interface ScratchCircleProps {
  value: string;
  label: string;
  onComplete: () => void;
}

function ScratchCircle({ value, label, onComplete }: ScratchCircleProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isRevealed, setIsRevealed] = useState(false);
  const isDrawing = useRef(false);
  const lastPoint = useRef<{ x: number; y: number } | null>(null);
  const hasTriggered = useRef(false);
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    drawScratchCover(ctx, canvas.width, canvas.height, dpr);
  }, []);

  const drawScratchCover = (
    ctx: CanvasRenderingContext2D,
    w: number,
    h: number,
    dpr: number
  ) => {
    ctx.save();
    ctx.beginPath();
    ctx.arc(w / 2, h / 2, Math.min(w, h) / 2, 0, Math.PI * 2);
    ctx.clip();

    // Metallic gold / taupe gradient
    const grad = ctx.createLinearGradient(0, 0, w, h);
    grad.addColorStop(0, "#c8b99a");
    grad.addColorStop(0.35, "#d4c8a8");
    grad.addColorStop(0.7, "#baa888");
    grad.addColorStop(1, "#c8bc9c");
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, w, h);

    // Subtle texture noise
    for (let i = 0; i < w * h * 0.08; i++) {
      ctx.fillStyle = `rgba(255, 255, 255, ${Math.random() * 0.055})`;
      ctx.fillRect(Math.random() * w, Math.random() * h, 1, 1);
    }

    // Specular sheen
    const sheen = ctx.createLinearGradient(0, h * 0.28, w, h * 0.72);
    sheen.addColorStop(0, "rgba(255, 255, 255, 0)");
    sheen.addColorStop(0.5, "rgba(255, 255, 255, 0.08)");
    sheen.addColorStop(1, "rgba(255, 255, 255, 0)");
    ctx.fillStyle = sheen;
    ctx.fillRect(0, 0, w, h);

    // scratch prompt label
    const fontSize = Math.max(11, Math.floor((h / dpr) * 0.065)) * dpr;
    ctx.fillStyle = "rgba(255, 255, 255, 0.95)";
    ctx.font = `italic ${fontSize}px sans-serif`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("scratch", w / 2, h / 2);
    ctx.restore();
  };

  const getPos = (clientX: number, clientY: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    return {
      x: clientX - rect.left,
      y: clientY - rect.top,
    };
  };

  const scratch = (x: number, y: number) => {
    const canvas = canvasRef.current;
    if (!canvas || hasTriggered.current) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const px = x * dpr;
    const py = y * dpr;
    const radius = 30 * dpr;

    ctx.globalCompositeOperation = "destination-out";
    ctx.beginPath();
    if (lastPoint.current) {
      ctx.moveTo(lastPoint.current.x * dpr, lastPoint.current.y * dpr);
      ctx.lineTo(px, py);
      ctx.lineWidth = radius * 2;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.stroke();
    }
    ctx.arc(px, py, radius, 0, Math.PI * 2);
    ctx.fill();

    lastPoint.current = { x, y };
    checkCompletion(canvas, ctx);
  };

  const checkCompletion = (canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) => {
    if (hasTriggered.current) return;
    try {
      const { data } = ctx.getImageData(0, 0, canvas.width, canvas.height);
      let transparent = 0;
      let total = 0;
      for (let i = 3; i < data.length; i += 32) {
        total++;
        if (data[i] < 128) transparent++;
      }

      if (total > 0 && transparent / total > 0.45) {
        hasTriggered.current = true;
        animateClear(canvas, ctx);
      }
    } catch {
      hasTriggered.current = true;
      setIsRevealed(true);
      onCompleteRef.current();
    }
  };

  const animateClear = (canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) => {
    let frame = 0;
    const clearStep = () => {
      frame++;
      ctx.globalCompositeOperation = "destination-out";
      ctx.globalAlpha = 0.18;
      ctx.fillStyle = "#000";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      if (frame < 20) {
        requestAnimationFrame(clearStep);
      } else {
        setIsRevealed(true);
        onCompleteRef.current();
      }
    };
    requestAnimationFrame(clearStep);
  };

  const stopDrawing = () => {
    isDrawing.current = false;
    lastPoint.current = null;
  };

  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col items-center gap-4"
    >
      <div
        className={`relative overflow-hidden rounded-full border border-border bg-background transition-all duration-700 select-none ${isRevealed ? "shadow-lift ring-2 ring-[#745f39]/20" : "shadow-soft"
          }`}
        style={{
          width: "clamp(96px, 20vw, 150px)",
          height: "clamp(96px, 20vw, 150px)",
        }}
      >
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <span
            className="font-serif italic text-foreground"
            style={{ fontSize: "clamp(2.2rem, 7.5vw, 4rem)" }}
          >
            {value}
          </span>
        </div>

        {!isRevealed && (
          <canvas
            ref={canvasRef}
            className="absolute inset-0 h-full w-full touch-none"
            style={{ cursor: "crosshair" }}
            onMouseDown={(e) => {
              isDrawing.current = true;
              const { x, y } = getPos(e.clientX, e.clientY);
              scratch(x, y);
            }}
            onMouseMove={(e) => {
              if (!isDrawing.current) return;
              const { x, y } = getPos(e.clientX, e.clientY);
              scratch(x, y);
            }}
            onMouseUp={stopDrawing}
            onMouseLeave={stopDrawing}
            onTouchStart={(e) => {
              isDrawing.current = true;
              const touch = e.touches[0];
              const { x, y } = getPos(touch.clientX, touch.clientY);
              scratch(x, y);
            }}
            onTouchMove={(e) => {
              if (!isDrawing.current) return;
              const touch = e.touches[0];
              const { x, y } = getPos(touch.clientX, touch.clientY);
              scratch(x, y);
            }}
            onTouchEnd={stopDrawing}
          />
        )}
      </div>
      <p className="text-[0.65rem] uppercase tracking-editorial text-[#7b6f66] font-medium">{label}</p>
    </motion.div>
  );
}

// Confetti shower canvas
function ConfettiCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight; // Full page height
    canvas.width = width;
    canvas.height = height;

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };
    window.addEventListener("resize", handleResize);

    const colors = ["#ccb89c", "#805f44", "#eedbc1", "#6a704c", "#5d250f", "#fdfaf4"];
    
    // Function to respawn particles
    const respawnParticle = () => ({
      x: Math.random() * width,
      y: -20 - Math.random() * 50,
      vx: (Math.random() - 0.5) * 2,
      vy: Math.random() * 2 + 1,
      rotation: Math.random() * Math.PI * 2,
      rotSpeed: (Math.random() - 0.5) * 0.08,
      size: Math.random() * 7 + 4,
      color: colors[Math.floor(Math.random() * colors.length)],
      opacity: Math.random() * 0.7 + 0.3,
    });

    let particles = Array.from({ length: 75 }, respawnParticle);

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.rotation += p.rotSpeed;

        // Respawn particle when it goes off screen
        if (p.y > height + 20) {
          particles[i] = respawnParticle();
        }

        ctx.save();
        ctx.globalAlpha = p.opacity;
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.6);
        ctx.restore();
      }

      requestAnimationFrame(render);
    };

    const animId = requestAnimationFrame(render);
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none z-50"
    />
  );
}

export function ScratchReveal() {
  const [completedCount, setCompletedCount] = useState(0);
  const isAllRevealed = completedCount >= 3;

  const handleComplete = useCallback(() => {
    setCompletedCount((prev) => prev + 1);
  }, []);

  return (
    <section
      id="date-reveal"
      className="scroll-mt-24 w-full px-6 py-36 text-center sm:py-48 lg:py-56 flex flex-col items-center justify-center"
    >
      <ConfettiCanvas />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        className="mx-auto w-full max-w-2xl flex flex-col items-center text-center"
      >
        <p className="text-[0.65rem] uppercase tracking-editorial text-[#7b6f66]">Reveal</p>
        <h2 className="mt-4 font-serif text-4xl italic sm:text-5xl lg:text-6xl text-[#2b2520]">
          Our date
        </h2>
        <div className="mt-8 flex items-center justify-center gap-5">
          <span className="h-px w-20 bg-[#745f39]/40" />
          <svg viewBox="0 0 12 12" className="h-2.5 w-2.5 text-[#745f39]/60" fill="currentColor" aria-hidden="true">
            <path d="M6 0L7.5 4.5L12 6L7.5 7.5L6 12L4.5 7.5L0 6L4.5 4.5Z" />
          </svg>
          <span className="h-px w-20 bg-[#745f39]/40" />
        </div>
      </motion.div>

      {/* Centered Scratch Cards Grid */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        className="mt-20 flex w-full items-end justify-center gap-6 sm:gap-12 lg:gap-16"
      >
        <ScratchCircle value={weddingData.eventDate.day} label="Day" onComplete={handleComplete} />
        <ScratchCircle value={weddingData.eventDate.month} label="Month" onComplete={handleComplete} />
        <ScratchCircle value={weddingData.eventDate.year} label="Year" onComplete={handleComplete} />
      </motion.div>

      {/* Date Revealed message */}
      <AnimatePresence>
        {isAllRevealed && (
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="mt-20 flex flex-col items-center text-center"
          >
            <p className="font-serif text-2xl italic sm:text-3xl text-[#18140b]">
              Date revealed
              <br />
              <span className="text-lg sm:text-xl text-[#7b6f66] mt-3 block font-sans not-italic font-light">
                Scroll down and let the fun begin.
              </span>
            </p>
            <div className="mx-auto mt-6 h-px w-16 bg-[#c4a0a8]/40" />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
