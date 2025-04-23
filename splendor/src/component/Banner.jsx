import React, { useEffect, useRef } from 'react';

const Banner = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const distance = (a, b) => Math.hypot(a.x - b.x, a.y - b.y);

    const createBall = (r, color) => {
      const angle = Math.random() * Math.PI * 2;
      const spread = 150;
      return {
        x: canvas.width / 2 + Math.cos(angle) * spread,
        y: canvas.height / 2 + Math.sin(angle) * spread,
        vx: (Math.random() - 0.5) * 0.6, 
        vy: (Math.random() - 0.5) * 0.6,
        
        r,
        baseColor: color,
        depth: Math.random() * 0.8 + 0.2,
        targetDepth: Math.random(),
        depthDirection: Math.random() < 0.5 ? -1 : 1,
        opacity: 0.3 + Math.random() * 0.5,
      };
    };

    const balls = [
      createBall(30, '#8B0000'),
      createBall(50, '#061829'),
      createBall(70, '#FFD700'),
    ];

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const bg = ctx.createLinearGradient(0, 0, 0, canvas.height);
      bg.addColorStop(0, '#0a192fb3');
      bg.addColorStop(1, '#0a192fe6');
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      balls.forEach((ball, i) => {
        ball.depth += ball.depthDirection * 0.001;
        if (ball.depth >= 1 || ball.depth <= 0.2) {
          ball.depthDirection *= -1;
          ball.depth = Math.max(0.2, Math.min(ball.depth, 1));
        }

        ball.x += ball.vx;
        ball.y += ball.vy;


        
        

        if (ball.x - ball.r < 0 || ball.x + ball.r > canvas.width) ball.vx *= -1;
        if (ball.y - ball.r < 0 || ball.y + ball.r > canvas.height) ball.vy *= -1;

        for (let j = i + 1; j < balls.length; j++) {
          const other = balls[j];
          const dx = ball.x - other.x;
          const dy = ball.y - other.y;
          const dist = Math.hypot(dx, dy);
          const minDist = ball.r * ball.depth + other.r * other.depth;

          if (dist < minDist) {
            const angle = Math.atan2(dy, dx);
            const targetX = other.x + Math.cos(angle) * minDist;
            const targetY = other.y + Math.sin(angle) * minDist;
            const ax = (targetX - ball.x) * 0.05;
            const ay = (targetY - ball.y) * 0.05;

            ball.vx -= ax;
            ball.vy -= ay;
            other.vx += ax;
            other.vy += ay;
          }
        }
      });

      balls.forEach(ball => {
        const size = ball.r * ball.depth;
        const blur = (1 - ball.depth) * 40;

        const grad = ctx.createRadialGradient(
          ball.x - size / 4, ball.y - size / 4, size * 0.1,
          ball.x, ball.y, size
        );
        grad.addColorStop(0, 'white');
        grad.addColorStop(0.2, ball.baseColor);
        grad.addColorStop(1, 'black');

        ctx.beginPath();
        ctx.fillStyle = grad;
        ctx.globalAlpha = ball.opacity * ball.depth;
        ctx.shadowColor = 'white';
        ctx.shadowBlur = blur;
        ctx.arc(ball.x, ball.y, size, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1;
        ctx.shadowBlur = 0;
      });

      requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return (
<div className="relative w-full h-screen overflow-hidden">
  <canvas ref={canvasRef} className="w-full h-full block" />

  <div className="absolute inset-0 flex flex-col items-center justify-center z-10 text-center px-4">
    <ul className="flex flex-wrap justify-center gap-2 text-white p-2 rounded-2xl shadow-sm shadow-orange-300 items-center">
      <li className="px-3 py-1 cursor-pointer text-sm sm:text-base">Finance</li>
      <li className="flex items-center gap-1 px-3 py-1 cursor-pointer text-sm sm:text-base">
        <span className="w-2 h-2 rounded-full bg-orange-300"></span> Business
      </li>
      <li className="flex items-center gap-1 px-3 py-1 cursor-pointer text-sm sm:text-base">
        <span className="w-2 h-2 rounded-full bg-orange-300"></span> Crypto
      </li>
    </ul>

    <h1
      className="text-[2.5rem] sm:text-[4rem] font-bold"
      style={{
        fontFamily: "'Playfair Display', serif",
        color: '#FFD700',
        textShadow: '0 0 15px rgba(255, 215, 0, 0.6)',
      }}
    >
      Austin Splendour
    </h1>

    <p
      className="mt-4 text-base sm:text-lg md:text-xl max-w-[90%] sm:max-w-[700px] leading-relaxed"
      style={{
        fontFamily: "'Playfair Display', serif",
        color: '#ffffff',
        textShadow: '0 0 10px rgba(255,255,255,0.1)',
      }}
    >
      Visionary expertise bridging traditional finance with emerging technologies. Transforming the future of business through strategic innovation.
    </p>

    <div className="relative mt-6 flex flex-col sm:flex-row gap-4 sm:gap-6 items-center">
      <button className="btn-fancy bg-gradient-to-br cursor-pointer from-yellow-400 to-orange-400 text-[#061829] w-full sm:w-auto">
        Learn More
        <span className="particles" />
      </button>

      <button className="btn-fancy border-2 cursor-pointer border-yellow-400 text-yellow-400 bg-transparent hover:bg-yellow-400 hover:text-[#061829] transition w-full sm:w-auto">
        Get in Touch
        <span className="particles" />
      </button>
    </div>
  </div>
</div>


  );
};

export default Banner;
