import React, { useEffect, useRef } from 'react';

export default function SpaceBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const stars = Array.from({ length: 100 }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      radius: Math.random() * 1.2,
      opacity: Math.random() * 0.7 + 0.3,
    }));

    const satellites = [
      { cx: 0.2, cy: 0.3, rx: 180, ry: 60, angle: 0, speed: 0.004, size: 3, color: '#38bdf8' },
      { cx: 0.7, cy: 0.4, rx: 260, ry: 90, angle: Math.PI / 3, speed: 0.002, size: 4, color: '#22c55e' },
      { cx: 0.4, cy: 0.8, rx: 220, ry: 50, angle: Math.PI * 1.2, speed: -0.003, size: 3, color: '#a855f7' }
    ];

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      stars.forEach(star => {
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`;
        ctx.fill();
      });
      satellites.forEach(sat => {
        sat.angle += sat.speed;
        const centerX = sat.cx * canvas.width;
        const centerY = sat.cy * canvas.height;
        const x = centerX + sat.rx * Math.cos(sat.angle);
        const y = centerY + sat.ry * Math.sin(sat.angle);
        ctx.beginPath();
        ctx.arc(x, y, sat.size * 3, 0, Math.PI * 2);
        ctx.fillStyle = sat.color + '15'; 
        ctx.fill();
        ctx.beginPath();
        ctx.arc(x, y, sat.size, 0, Math.PI * 2);
        ctx.fillStyle = sat.color;
        ctx.fill();
      });
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} style={canvasStyles} />;
}

const canvasStyles = {
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100vw',
  height: '100vh',
  zIndex: -1, 
  pointerEvents: 'none',
  backgroundColor: '#050507' // Solid deep space black, no tint
};