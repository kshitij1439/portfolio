// // import React, { useEffect, useRef, useCallback } from "react";

// // export default function FireSpark() {
// //   const canvasRef = useRef(null);
// //   const particles = useRef([]);
// //   const trail = useRef([]);
// //   const holding = useRef(false);
// //   const ctrlHeld = useRef(false);
// //   const mouse = useRef({ x: 0, y: 0 });

// //   const rand = (a, b) => a + Math.random() * (b - a);

// //   const spawn = useCallback((x, y) => {
// //     // Sharp fast sparks
// //     for (let i = 0; i < 5; i++) {
// //       const angle = rand(-Math.PI, Math.PI);
// //       const speed = rand(1.5, 5);
// //       const life = rand(20, 50);
// //       particles.current.push({
// //         type: "spark",
// //         x, y,
// //         vx: Math.cos(angle) * speed,
// //         vy: Math.sin(angle) * speed - rand(0.5, 2),
// //         life, maxLife: life,
// //         size: rand(0.8, 1.8),
// //         temp: rand(0.7, 1),
// //       });
// //     }

// //     // Tiny core glow — very small
// //     for (let i = 0; i < 2; i++) {
// //       const life = rand(6, 14);
// //       particles.current.push({
// //         type: "core",
// //         x: x + rand(-1, 1),
// //         y: y + rand(-1, 1),
// //         vx: rand(-0.3, 0.3),
// //         vy: rand(-0.5, -1.5),
// //         life, maxLife: life,
// //         size: rand(1.5, 3.5),
// //       });
// //     }

// //     // Subtle smoke — very faint
// //     for (let i = 0; i < 1; i++) {
// //       const life = rand(30, 55);
// //       particles.current.push({
// //         type: "smoke",
// //         x: x + rand(-1, 1),
// //         y,
// //         vx: rand(-0.2, 0.2),
// //         vy: rand(-0.4, -0.9),
// //         life, maxLife: life,
// //         size: rand(2, 4),
// //       });
// //     }

// //     // Trail dot — tight radius
// //     trail.current.push({
// //       x, y,
// //       life: 300,
// //       maxLife: 300,
// //     });
// //   }, []);

// //   useEffect(() => {
// //     const canvas = canvasRef.current;
// //     const ctx = canvas.getContext("2d");
// //     let raf;

// //     const resize = () => {
// //       canvas.width = window.innerWidth;
// //       canvas.height = window.innerHeight;
// //     };
// //     resize();
// //     window.addEventListener("resize", resize);

// //     const getTempColor = (temp, alpha) => {
// //       if (temp > 0.88) return `rgba(255,255,210,${alpha})`;  // white hot
// //       if (temp > 0.72) return `rgba(255,200,60,${alpha})`;   // yellow
// //       if (temp > 0.52) return `rgba(255,110,10,${alpha})`;   // orange
// //       if (temp > 0.32) return `rgba(220,40,0,${alpha})`;     // red orange
// //       return `rgba(150,10,0,${alpha})`;                       // deep red
// //     };

// //     const loop = () => {
// //       ctx.clearRect(0, 0, canvas.width, canvas.height);

// //       // ── Persistent trail — tight small glow ──
// //       for (let i = trail.current.length - 1; i >= 0; i--) {
// //         const t = trail.current[i];
// //         t.life--;
// //         if (t.life <= 0) { trail.current.splice(i, 1); continue; }

// //         const progress = t.life / t.maxLife;

// //         // Outer soft glow — very small radius
// //         const outerR = 6 + (1 - progress) * 4;
// //         const outerAlpha = progress * 0.18;
// //         const r = 220;
// //         const g = Math.round(progress > 0.4 ? (progress - 0.4) / 0.6 * 80 : 0);

// //         ctx.save();
// //         const outerGrad = ctx.createRadialGradient(t.x, t.y, 0, t.x, t.y, outerR);
// //         outerGrad.addColorStop(0, `rgba(${r},${g},0,${outerAlpha})`);
// //         outerGrad.addColorStop(1, `rgba(${r},0,0,0)`);
// //         ctx.fillStyle = outerGrad;
// //         ctx.beginPath();
// //         ctx.arc(t.x, t.y, outerR, 0, Math.PI * 2);
// //         ctx.fill();
// //         ctx.restore();

// //         // Inner hot dot — tiny
// //         if (progress > 0.1) {
// //           const innerR = Math.max(0.5, 2.5 * progress);
// //           ctx.save();
// //           ctx.globalAlpha = progress * 0.75;
// //           ctx.shadowColor = `rgb(255,${g},0)`;
// //           ctx.shadowBlur = 4;
// //           ctx.fillStyle = progress > 0.6
// //             ? `rgb(255,${Math.round(g * 1.5)},0)`
// //             : `rgb(180,10,0)`;
// //           ctx.beginPath();
// //           ctx.arc(t.x, t.y, innerR, 0, Math.PI * 2);
// //           ctx.fill();
// //           ctx.restore();
// //         }
// //       }

// //       // ── Spawn ──
// //       if (holding.current && ctrlHeld.current) {
// //         spawn(mouse.current.x, mouse.current.y);
// //       }

// //       // ── Particles ──
// //       for (let i = particles.current.length - 1; i >= 0; i--) {
// //         const p = particles.current[i];
// //         p.life--;
// //         if (p.life <= 0) { particles.current.splice(i, 1); continue; }

// //         const t = p.life / p.maxLife;

// //         // Smoke
// //         if (p.type === "smoke") {
// //           p.x += p.vx;
// //           p.y += p.vy;
// //           p.vx += rand(-0.02, 0.02);
// //           p.size += 0.08;
// //           ctx.save();
// //           ctx.globalAlpha = t * 0.07;
// //           ctx.fillStyle = `rgb(60,55,50)`;
// //           ctx.beginPath();
// //           ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
// //           ctx.fill();
// //           ctx.restore();
// //           continue;
// //         }

// //         // Core flash
// //         if (p.type === "core") {
// //           p.x += p.vx;
// //           p.y += p.vy;
// //           p.vy += 0.04;
// //           ctx.save();
// //           ctx.shadowColor = "rgba(255,180,30,1)";
// //           ctx.shadowBlur = 6;
// //           const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size);
// //           grad.addColorStop(0, `rgba(255,240,180,${t})`);
// //           grad.addColorStop(0.5, `rgba(255,120,10,${t * 0.7})`);
// //           grad.addColorStop(1, `rgba(200,40,0,0)`);
// //           ctx.fillStyle = grad;
// //           ctx.beginPath();
// //           ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
// //           ctx.fill();
// //           ctx.restore();
// //           continue;
// //         }

// //         // Spark physics
// //         p.vy += 0.18;
// //         p.vx *= 0.975;
// //         p.x += p.vx;
// //         p.y += p.vy;
// //         p.size *= 0.95;
// //         p.temp *= 0.96;

// //         const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
// //         const trailLen = Math.min(speed * 2, 10); // short tail
// //         const angle = Math.atan2(p.vy, p.vx);

// //         ctx.save();
// //         ctx.globalAlpha = t;
// //         ctx.shadowColor = getTempColor(p.temp, 1);
// //         ctx.shadowBlur = 3; // tight glow, not bloomy

// //         // Short elongated tail
// //         const grad = ctx.createLinearGradient(
// //           p.x - Math.cos(angle) * trailLen,
// //           p.y - Math.sin(angle) * trailLen,
// //           p.x, p.y
// //         );
// //         grad.addColorStop(0, getTempColor(p.temp * 0.3, 0));
// //         grad.addColorStop(1, getTempColor(p.temp, t * 0.9));

// //         ctx.strokeStyle = grad;
// //         ctx.lineWidth = Math.max(0.4, p.size * 0.7);
// //         ctx.lineCap = "round";
// //         ctx.beginPath();
// //         ctx.moveTo(
// //           p.x - Math.cos(angle) * trailLen,
// //           p.y - Math.sin(angle) * trailLen
// //         );
// //         ctx.lineTo(p.x, p.y);
// //         ctx.stroke();

// //         // Tiny bright tip dot
// //         ctx.globalAlpha = t * 0.95;
// //         ctx.fillStyle = getTempColor(p.temp, 1);
// //         ctx.shadowBlur = 2;
// //         ctx.beginPath();
// //         ctx.arc(p.x, p.y, Math.max(0.3, p.size * 0.5), 0, Math.PI * 2);
// //         ctx.fill();
// //         ctx.restore();
// //       }

// //       raf = requestAnimationFrame(loop);
// //     };
// //     raf = requestAnimationFrame(loop);

// //     const onKeyDown = (e) => {
// //       if (e.key === "Control") {
// //         ctrlHeld.current = true;
// //         document.body.style.userSelect = "none";
// //         document.body.style.cursor = "crosshair";
// //       }
// //     };
// //     const onKeyUp = (e) => {
// //       if (e.key === "Control") {
// //         ctrlHeld.current = false;
// //         holding.current = false;
// //         document.body.style.userSelect = "";
// //         document.body.style.cursor = "";
// //       }
// //     };
// //     const onDown = (e) => {
// //       if (!ctrlHeld.current) return;
// //       holding.current = true;
// //       mouse.current = { x: e.clientX, y: e.clientY };
// //     };
// //     const onMove = (e) => {
// //       mouse.current = { x: e.clientX, y: e.clientY };
// //     };
// //     const onUp = () => {
// //       holding.current = false;
// //     };

// //     window.addEventListener("keydown", onKeyDown);
// //     window.addEventListener("keyup", onKeyUp);
// //     window.addEventListener("mousedown", onDown);
// //     window.addEventListener("mousemove", onMove);
// //     window.addEventListener("mouseup", onUp);

// //     return () => {
// //       cancelAnimationFrame(raf);
// //       window.removeEventListener("resize", resize);
// //       window.removeEventListener("keydown", onKeyDown);
// //       window.removeEventListener("keyup", onKeyUp);
// //       window.removeEventListener("mousedown", onDown);
// //       window.removeEventListener("mousemove", onMove);
// //       window.removeEventListener("mouseup", onUp);
// //       document.body.style.userSelect = "";
// //       document.body.style.cursor = "";
// //     };
// //   }, [spawn]);

// //   return (
// //     <canvas
// //       ref={canvasRef}
// //       style={{
// //         position: "fixed",
// //         top: 0, left: 0,
// //         width: "100vw", height: "100vh",
// //         pointerEvents: "none",
// //         zIndex: 9999,
// //         background: "transparent",
// //       }}
// //     />
// //   );
// // }

// import React, { useEffect, useRef, useCallback } from "react";

// export default function FireSpark() {
//     const canvasRef = useRef(null);
//     const particles = useRef([]);
//     const trailPoints = useRef([]); // ordered line points
//     const holding = useRef(false);
//     const ctrlHeld = useRef(false);
//     const mouse = useRef({ x: 0, y: 0 });

//     const rand = (a, b) => a + Math.random() * (b - a);

//     const spawn = useCallback((x, y) => {
//         for (let i = 0; i < 5; i++) {
//             const angle = rand(-Math.PI, Math.PI);
//             const speed = rand(1.5, 5);
//             const life = rand(20, 50);
//             particles.current.push({
//                 type: "spark",
//                 x,
//                 y,
//                 vx: Math.cos(angle) * speed,
//                 vy: Math.sin(angle) * speed - rand(0.5, 2),
//                 life,
//                 maxLife: life,
//                 size: rand(0.8, 1.8),
//                 temp: rand(0.7, 1),
//             });
//         }

//         for (let i = 0; i < 2; i++) {
//             const life = rand(6, 14);
//             particles.current.push({
//                 type: "core",
//                 x: x + rand(-1, 1),
//                 y: y + rand(-1, 1),
//                 vx: rand(-0.3, 0.3),
//                 vy: rand(-0.5, -1.5),
//                 life,
//                 maxLife: life,
//                 size: rand(1.5, 3.5),
//             });
//         }

//         for (let i = 0; i < 1; i++) {
//             const life = rand(30, 55);
//             particles.current.push({
//                 type: "smoke",
//                 x: x + rand(-1, 1),
//                 y,
//                 vx: rand(-0.2, 0.2),
//                 vy: rand(-0.4, -0.9),
//                 life,
//                 maxLife: life,
//                 size: rand(2, 4),
//             });
//         }

//         // Add point to line trail
//         trailPoints.current.push({
//             x,
//             y,
//             life: 300, // 5 sec at 60fps
//             maxLife: 300,
//         });
//     }, []);

//     useEffect(() => {
//         const canvas = canvasRef.current;
//         const ctx = canvas.getContext("2d");
//         let raf;

//         const resize = () => {
//             canvas.width = window.innerWidth;
//             canvas.height = window.innerHeight;
//         };
//         resize();
//         window.addEventListener("resize", resize);

//         const getTempColor = (temp, alpha) => {
//             if (temp > 0.88) return `rgba(255,255,210,${alpha})`;
//             if (temp > 0.72) return `rgba(255,200,60,${alpha})`;
//             if (temp > 0.52) return `rgba(255,110,10,${alpha})`;
//             if (temp > 0.32) return `rgba(220,40,0,${alpha})`;
//             return `rgba(150,10,0,${alpha})`;
//         };

//         const loop = () => {
//             ctx.clearRect(0, 0, canvas.width, canvas.height);

//             // ── Draw trail as connected line segments ──
//             // Age all points first
//             for (let i = trailPoints.current.length - 1; i >= 0; i--) {
//                 trailPoints.current[i].life--;
//                 if (trailPoints.current[i].life <= 0) {
//                     trailPoints.current.splice(i, 1);
//                 }
//             }

//             // Draw segments between consecutive points
//             // Break line when there's a gap (mouse lifted and restarted)
//             for (let i = 1; i < trailPoints.current.length; i++) {
//                 const curr = trailPoints.current[i];
//                 const prev = trailPoints.current[i - 1];

//                 // If points are far apart, it's a new stroke — skip
//                 const dx = curr.x - prev.x;
//                 const dy = curr.y - prev.y;
//                 const dist = Math.sqrt(dx * dx + dy * dy);
//                 if (dist > 60) continue;

//                 const progress = curr.life / curr.maxLife;
//                 const g = Math.round(
//                     progress > 0.4 ? ((progress - 0.4) / 0.6) * 100 : 0
//                 );
//                 const alpha = progress * 0.9;

//                 // Outer glow line
//                 ctx.save();
//                 ctx.shadowColor = `rgb(255,${g},0)`;
//                 ctx.shadowBlur = 4;
//                 ctx.strokeStyle = `rgba(255,${g},0,${alpha * 0.4})`;
//                 ctx.lineWidth = 4;
//                 ctx.lineCap = "round";
//                 ctx.lineJoin = "round";
//                 ctx.beginPath();
//                 ctx.moveTo(prev.x, prev.y);
//                 ctx.lineTo(curr.x, curr.y);
//                 ctx.stroke();
//                 ctx.restore();

//                 // Inner hot core line
//                 ctx.save();
//                 ctx.shadowColor = `rgb(255,${Math.round(g * 1.5)},0)`;
//                 ctx.shadowBlur = 2;
//                 ctx.strokeStyle =
//                     progress > 0.55
//                         ? `rgba(255,${Math.round(g * 1.5)},20,${alpha})`
//                         : `rgba(200,20,0,${alpha * 0.7})`;
//                 ctx.lineWidth = 1.5;
//                 ctx.lineCap = "round";
//                 ctx.lineJoin = "round";
//                 ctx.beginPath();
//                 ctx.moveTo(prev.x, prev.y);
//                 ctx.lineTo(curr.x, curr.y);
//                 ctx.stroke();
//                 ctx.restore();
//             }

//             // ── Spawn ──
//             if (holding.current && ctrlHeld.current) {
//                 spawn(mouse.current.x, mouse.current.y);
//             }

//             // ── Particles ──
//             for (let i = particles.current.length - 1; i >= 0; i--) {
//                 const p = particles.current[i];
//                 p.life--;
//                 if (p.life <= 0) {
//                     particles.current.splice(i, 1);
//                     continue;
//                 }

//                 const t = p.life / p.maxLife;

//                 if (p.type === "smoke") {
//                     p.x += p.vx;
//                     p.y += p.vy;
//                     p.vx += rand(-0.02, 0.02);
//                     p.size += 0.08;
//                     ctx.save();
//                     ctx.globalAlpha = t * 0.07;
//                     ctx.fillStyle = `rgb(60,55,50)`;
//                     ctx.beginPath();
//                     ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
//                     ctx.fill();
//                     ctx.restore();
//                     continue;
//                 }

//                 if (p.type === "core") {
//                     p.x += p.vx;
//                     p.y += p.vy;
//                     p.vy += 0.04;
//                     ctx.save();
//                     ctx.shadowColor = "rgba(255,180,30,1)";
//                     ctx.shadowBlur = 6;
//                     const grad = ctx.createRadialGradient(
//                         p.x,
//                         p.y,
//                         0,
//                         p.x,
//                         p.y,
//                         p.size
//                     );
//                     grad.addColorStop(0, `rgba(255,240,180,${t})`);
//                     grad.addColorStop(0.5, `rgba(255,120,10,${t * 0.7})`);
//                     grad.addColorStop(1, `rgba(200,40,0,0)`);
//                     ctx.fillStyle = grad;
//                     ctx.beginPath();
//                     ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
//                     ctx.fill();
//                     ctx.restore();
//                     continue;
//                 }

//                 // Spark
//                 p.vy += 0.18;
//                 p.vx *= 0.975;
//                 p.x += p.vx;
//                 p.y += p.vy;
//                 p.size *= 0.95;
//                 p.temp *= 0.96;

//                 const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
//                 const trailLen = Math.min(speed * 2, 10);
//                 const angle = Math.atan2(p.vy, p.vx);

//                 ctx.save();
//                 ctx.globalAlpha = t;
//                 ctx.shadowColor = getTempColor(p.temp, 1);
//                 ctx.shadowBlur = 3;

//                 const grad = ctx.createLinearGradient(
//                     p.x - Math.cos(angle) * trailLen,
//                     p.y - Math.sin(angle) * trailLen,
//                     p.x,
//                     p.y
//                 );
//                 grad.addColorStop(0, getTempColor(p.temp * 0.3, 0));
//                 grad.addColorStop(1, getTempColor(p.temp, t * 0.9));

//                 ctx.strokeStyle = grad;
//                 ctx.lineWidth = Math.max(0.4, p.size * 0.7);
//                 ctx.lineCap = "round";
//                 ctx.beginPath();
//                 ctx.moveTo(
//                     p.x - Math.cos(angle) * trailLen,
//                     p.y - Math.sin(angle) * trailLen
//                 );
//                 ctx.lineTo(p.x, p.y);
//                 ctx.stroke();

//                 ctx.globalAlpha = t * 0.95;
//                 ctx.fillStyle = getTempColor(p.temp, 1);
//                 ctx.shadowBlur = 2;
//                 ctx.beginPath();
//                 ctx.arc(p.x, p.y, Math.max(0.3, p.size * 0.5), 0, Math.PI * 2);
//                 ctx.fill();
//                 ctx.restore();
//             }

//             raf = requestAnimationFrame(loop);
//         };
//         raf = requestAnimationFrame(loop);

//         const onKeyDown = (e) => {
//             if (e.key === "Control") {
//                 ctrlHeld.current = true;
//                 document.body.style.userSelect = "none";
//                 document.body.style.cursor = "crosshair";
//             }
//         };
//         const onKeyUp = (e) => {
//             if (e.key === "Control") {
//                 ctrlHeld.current = false;
//                 holding.current = false;
//                 document.body.style.userSelect = "";
//                 document.body.style.cursor = "";
//             }
//         };
//         const onDown = (e) => {
//             if (!ctrlHeld.current) return;
//             holding.current = true;
//             mouse.current = { x: e.clientX, y: e.clientY };
//         };
//         const onMove = (e) => {
//             mouse.current = { x: e.clientX, y: e.clientY };
//         };
//         const onUp = () => {
//             holding.current = false;
//         };

//         window.addEventListener("keydown", onKeyDown);
//         window.addEventListener("keyup", onKeyUp);
//         window.addEventListener("mousedown", onDown);
//         window.addEventListener("mousemove", onMove);
//         window.addEventListener("mouseup", onUp);

//         return () => {
//             cancelAnimationFrame(raf);
//             window.removeEventListener("resize", resize);
//             window.removeEventListener("keydown", onKeyDown);
//             window.removeEventListener("keyup", onKeyUp);
//             window.removeEventListener("mousedown", onDown);
//             window.removeEventListener("mousemove", onMove);
//             window.removeEventListener("mouseup", onUp);
//             document.body.style.userSelect = "";
//             document.body.style.cursor = "";
//         };
//     }, [spawn]);

//     return (
//         <canvas
//             ref={canvasRef}
//             style={{
//                 position: "fixed",
//                 top: 0,
//                 left: 0,
//                 width: "100vw",
//                 height: "100vh",
//                 pointerEvents: "none",
//                 zIndex: 9999,
//                 background: "transparent",
//             }}
//         />
//     );
// }


























import React, { useEffect, useRef, useCallback } from "react";

export default function FireSpark() {
  const canvasRef = useRef(null);
  const glowCanvasRef = useRef(null);
  const particles = useRef([]);
  const trailPoints = useRef([]);
  const holding = useRef(false);
  const ctrlHeld = useRef(false);
  const mouse = useRef({ x: 0, y: 0 });

  const rand = (a, b) => a + Math.random() * (b - a);

  const spawn = useCallback((x, y) => {
    // Main intense sparks
    for (let i = 0; i < 8; i++) {
      const angle = rand(-Math.PI, Math.PI);
      const speed = rand(2, 8);
      const life = rand(25, 55);
      particles.current.push({
        type: "spark",
        x, y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - rand(1, 3),
        life, maxLife: life,
        size: rand(1, 2.2),
        temp: rand(0.8, 1),
      });
    }

    // Bright white-hot core bursts
    for (let i = 0; i < 4; i++) {
      const life = rand(8, 18);
      particles.current.push({
        type: "core",
        x: x + rand(-2, 2),
        y: y + rand(-2, 2),
        vx: rand(-0.5, 0.5),
        vy: rand(-0.8, -2),
        life, maxLife: life,
        size: rand(2, 4),
      });
    }

    // Micro sparks — tiny fast ones
    for (let i = 0; i < 6; i++) {
      const angle = rand(-Math.PI, Math.PI);
      const speed = rand(3, 10);
      const life = rand(10, 25);
      particles.current.push({
        type: "micro",
        x, y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - rand(1, 4),
        life, maxLife: life,
        size: rand(0.4, 1),
        temp: 1,
      });
    }

    trailPoints.current.push({
      x, y,
      life: 300,
      maxLife: 300,
    });
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let raf;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    // Multi-layer glow painter
    const drawGlowCircle = (x, y, radius, color, alpha, blur) => {
      ctx.save();
      ctx.globalAlpha = alpha;
      ctx.shadowColor = color;
      ctx.shadowBlur = blur;
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    };

    const drawGlowLine = (x1, y1, x2, y2, color, width, alpha, blur) => {
      ctx.save();
      ctx.globalAlpha = alpha;
      ctx.shadowColor = color;
      ctx.shadowBlur = blur;
      ctx.strokeStyle = color;
      ctx.lineWidth = width;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.stroke();
      ctx.restore();
    };

    const getTempColor = (temp) => {
      if (temp > 0.88) return { r: 255, g: 255, b: 220 }; // white hot
      if (temp > 0.72) return { r: 255, g: 210, b: 60 };  // yellow
      if (temp > 0.52) return { r: 255, g: 120, b: 10 };  // orange
      if (temp > 0.32) return { r: 230, g: 50, b: 0 };    // red orange
      return { r: 160, g: 15, b: 0 };                      // deep red
    };

    const loop = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // ── Trail line ──
      for (let i = trailPoints.current.length - 1; i >= 0; i--) {
        trailPoints.current[i].life--;
        if (trailPoints.current[i].life <= 0) {
          trailPoints.current.splice(i, 1);
        }
      }

      for (let i = 1; i < trailPoints.current.length; i++) {
        const curr = trailPoints.current[i];
        const prev = trailPoints.current[i - 1];
        const dx = curr.x - prev.x;
        const dy = curr.y - prev.y;
        if (Math.sqrt(dx * dx + dy * dy) > 60) continue;

        const p = curr.life / curr.maxLife;
        const g = Math.round(p > 0.4 ? ((p - 0.4) / 0.6) * 100 : 0);

        // Layer 1: wide soft ambient glow
        drawGlowLine(prev.x, prev.y, curr.x, curr.y,
          `rgba(255,${g},0,${p * 0.25})`, 8, 1, 12);
        // Layer 2: medium glow
        drawGlowLine(prev.x, prev.y, curr.x, curr.y,
          `rgba(255,${g},0,${p * 0.5})`, 3, 1, 6);
        // Layer 3: hot core
        drawGlowLine(prev.x, prev.y, curr.x, curr.y,
          p > 0.5
            ? `rgba(255,${Math.round(g * 1.5)},30,${p * 0.95})`
            : `rgba(200,20,0,${p * 0.7})`,
          1.2, 1, 2);
      }

      // ── Spawn ──
      if (holding.current && ctrlHeld.current) {
        spawn(mouse.current.x, mouse.current.y);
      }

      // ── Particles ──
      for (let i = particles.current.length - 1; i >= 0; i--) {
        const p = particles.current[i];
        p.life--;
        if (p.life <= 0) { particles.current.splice(i, 1); continue; }

        const t = p.life / p.maxLife;

        // Core burst
        if (p.type === "core") {
          p.x += p.vx;
          p.y += p.vy;
          p.vy += 0.05;

          // 3 layers of glow for intense look
          drawGlowCircle(p.x, p.y, p.size * 3, `rgba(255,200,50,${t * 0.2})`, 1, 20);
          drawGlowCircle(p.x, p.y, p.size * 1.5, `rgba(255,160,20,${t * 0.6})`, 1, 10);
          drawGlowCircle(p.x, p.y, p.size * 0.6, `rgba(255,240,180,${t})`, 1, 4);
          continue;
        }

        // Micro spark
        if (p.type === "micro") {
          p.vy += 0.25;
          p.vx *= 0.97;
          p.x += p.vx;
          p.y += p.vy;

          const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
          const tLen = Math.min(speed * 1.8, 8);
          const angle = Math.atan2(p.vy, p.vx);

          // White hot micro sparks
          drawGlowLine(
            p.x - Math.cos(angle) * tLen,
            p.y - Math.sin(angle) * tLen,
            p.x, p.y,
            `rgba(255,255,200,${t * 0.9})`, 0.8, 1, 4
          );
          drawGlowCircle(p.x, p.y, 0.6, `rgba(255,255,255,${t})`, 1, 3);
          continue;
        }

        // Main spark
        p.vy += 0.2;
        p.vx *= 0.975;
        p.x += p.vx;
        p.y += p.vy;
        p.size *= 0.955;
        p.temp *= 0.965;

        const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
        const tLen = Math.min(speed * 2.2, 12);
        const angle = Math.atan2(p.vy, p.vx);
        const col = getTempColor(p.temp);
        const colStr = `rgb(${col.r},${col.g},${col.b})`;
        const colFade = `rgba(${col.r},${col.g},${col.b},0)`;

        // Layer 1: wide glow aura around spark
        ctx.save();
        ctx.globalAlpha = t * 0.35;
        ctx.shadowColor = colStr;
        ctx.shadowBlur = 18;
        ctx.strokeStyle = colStr;
        ctx.lineWidth = p.size * 3;
        ctx.lineCap = "round";
        ctx.beginPath();
        ctx.moveTo(
          p.x - Math.cos(angle) * tLen * 0.5,
          p.y - Math.sin(angle) * tLen * 0.5
        );
        ctx.lineTo(p.x, p.y);
        ctx.stroke();
        ctx.restore();

        // Layer 2: medium glow trail
        ctx.save();
        ctx.globalAlpha = t * 0.7;
        ctx.shadowColor = colStr;
        ctx.shadowBlur = 8;
        const grad2 = ctx.createLinearGradient(
          p.x - Math.cos(angle) * tLen,
          p.y - Math.sin(angle) * tLen,
          p.x, p.y
        );
        grad2.addColorStop(0, colFade);
        grad2.addColorStop(1, colStr);
        ctx.strokeStyle = grad2;
        ctx.lineWidth = Math.max(0.6, p.size * 0.9);
        ctx.lineCap = "round";
        ctx.beginPath();
        ctx.moveTo(
          p.x - Math.cos(angle) * tLen,
          p.y - Math.sin(angle) * tLen
        );
        ctx.lineTo(p.x, p.y);
        ctx.stroke();
        ctx.restore();

        // Layer 3: bright hot tip
        drawGlowCircle(p.x, p.y, p.size * 1.4,
          `rgba(${col.r},${col.g},${col.b},${t * 0.4})`, 1, 10);
        drawGlowCircle(p.x, p.y, p.size * 0.7,
          `rgba(255,255,200,${t * 0.9})`, 1, 5);
        drawGlowCircle(p.x, p.y, p.size * 0.3,
          `rgba(255,255,255,${t})`, 1, 2);
      }

      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    const onKeyDown = (e) => {
      if (e.key === "Control") {
        ctrlHeld.current = true;
        document.body.style.userSelect = "none";
        document.body.style.cursor = "crosshair";
      }
    };
    const onKeyUp = (e) => {
      if (e.key === "Control") {
        ctrlHeld.current = false;
        holding.current = false;
        document.body.style.userSelect = "";
        document.body.style.cursor = "";
      }
    };
    const onDown = (e) => {
      if (!ctrlHeld.current) return;
      holding.current = true;
      mouse.current = { x: e.clientX, y: e.clientY };
    };
    const onMove = (e) => {
      mouse.current = { x: e.clientX, y: e.clientY };
    };
    const onUp = () => {
      holding.current = false;
    };

    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup", onKeyUp);
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("keyup", onKeyUp);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
      document.body.style.userSelect = "";
      document.body.style.cursor = "";
    };
  }, [spawn]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        top: 0, left: 0,
        width: "100vw", height: "100vh",
        pointerEvents: "none",
        zIndex: 9999,
        background: "transparent",
      }}
    />
  );
}