import React, { useEffect, useRef } from 'react';

export interface ParticleFieldProps {
  particleCount?: number;
  color?: string;
  speed?: number;
}

export const ParticleField: React.FC<ParticleFieldProps> = ({
  particleCount = 100,
  color = '#00FF66',
  speed = 0.5,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Array<{ x: number; y: number; vx: number; vy: number }>>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    // Initialize particles
    particlesRef.current = Array.from({ length: particleCount }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * speed,
      vy: (Math.random() - 0.5) * speed,
    }));

    let animationId: number;

    const animate = () => {
      ctx.fillStyle = 'rgba(2, 3, 5, 0.2)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = color;
      for (const particle of particlesRef.current) {
        particle.x += particle.vx;
        particle.y += particle.vy;

        // Wrap around
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;

        ctx.fillRect(particle.x, particle.y, 2, 2);
      }

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => cancelAnimationFrame(animationId);
  }, [particleCount, color, speed]);

  return <canvas ref={canvasRef} className="w-full h-full" style={{ display: 'block' }} />;
};
