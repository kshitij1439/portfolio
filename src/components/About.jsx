import React, { useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { Terminal, Cpu } from "lucide-react";
import * as THREE from "three";

// ─── Hybrid: MetallicDust movement + FireSpark point rendering ───────────────
const COUNT = 160;

const FireDustSparks = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    if (!mountRef.current) return;

    const scene  = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: false });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);
    mountRef.current.appendChild(renderer.domElement);

    // ── Per-particle data (MetallicDust style) ──
    const positions     = new Float32Array(COUNT * 3);
    const colors        = new Float32Array(COUNT * 4);
    const flowVelX      = new Float32Array(COUNT);
    const flowVelY      = new Float32Array(COUNT);
    const flowVelZ      = new Float32Array(COUNT);
    const turbX         = new Float32Array(COUNT);
    const turbY         = new Float32Array(COUNT);
    const turbZ         = new Float32Array(COUNT);
    const turbPhase     = new Float32Array(COUNT);
    const swayAmp       = new Float32Array(COUNT);
    const swayFreq      = new Float32Array(COUNT);
    const pulseSpeed    = new Float32Array(COUNT);
    const pulseOffset   = new Float32Array(COUNT);
    const baseOpacity   = new Float32Array(COUNT);

    for (let i = 0; i < COUNT; i++) {
      // Spread across screen like MetallicDust
      positions[i*3]   = (Math.random() - 0.5) * 15;
      positions[i*3+1] = (Math.random() - 0.5) * 12;
      positions[i*3+2] = (Math.random() - 0.5) * 6;

      // Flow velocity (MetallicDust values)
      flowVelX[i] = (Math.random() - 0.5) * 0.015;
      flowVelY[i] = (Math.random() - 0.5) * 0.010;
      flowVelZ[i] = (Math.random() - 0.5) * 0.008;

      // Turbulence
      turbX[i]     = Math.random() * 0.02;
      turbY[i]     = Math.random() * 0.02;
      turbZ[i]     = Math.random() * 0.015;
      turbPhase[i] = Math.random() * Math.PI * 2;

      // Sway
      swayAmp[i]  = 0.2 + Math.random() * 0.4;
      swayFreq[i] = 0.3 + Math.random() * 0.7;

      // Pulse / opacity
      pulseSpeed[i]  = 0.5 + Math.random() * 1.0;
      pulseOffset[i] = Math.random() * Math.PI * 2;
      baseOpacity[i] = 0.5 + Math.random() * 0.5;

      // Initial colour — white-hot to orange (assigned per particle, drifts over time)
      colors[i*4]   = 1.0;
      colors[i*4+1] = 0.6 + Math.random() * 0.4;
      colors[i*4+2] = Math.random() * 0.3;
      colors[i*4+3] = baseOpacity[i];
    }

    const geo     = new THREE.BufferGeometry();
    const posAttr = new THREE.BufferAttribute(positions, 3); posAttr.setUsage(THREE.DynamicDrawUsage);
    const colAttr = new THREE.BufferAttribute(colors,    4); colAttr.setUsage(THREE.DynamicDrawUsage);
    geo.setAttribute("position", posAttr);
    geo.setAttribute("color",    colAttr);

    const mat = new THREE.PointsMaterial({
      size: 0.025,
      vertexColors: true,
      transparent: true,
      depthWrite: false,
      sizeAttenuation: true,
      blending: THREE.AdditiveBlending,
    });

    scene.add(new THREE.Points(geo, mat));

    // Mouse tracking (MetallicDust style)
    const mouse = { x: 0, y: 0, active: false };
    const onMouseMove = (e) => {
      mouse.x = (e.clientX / window.innerWidth)  *  2 - 1;
      mouse.y = (e.clientY / window.innerHeight) * -2 + 1;
      mouse.active = true;
    };
    const onMouseLeave = () => { mouse.active = false; };
    window.addEventListener("mousemove",  onMouseMove);
    window.addEventListener("mouseleave", onMouseLeave);
    document.addEventListener("mouseleave", onMouseLeave);

    const clock = new THREE.Clock();
    const BOUNDS = { x: 8, y: 7, z: 4 };
    let raf;

    const animate = () => {
      raf = requestAnimationFrame(animate);
      const t   = clock.getElapsedTime();
      const arr = posAttr.array;
      const col = colAttr.array;

      const mx = mouse.x * 5;
      const my = mouse.y * 4;

      for (let i = 0; i < COUNT; i++) {
        const f = swayFreq[i];
        const ph = turbPhase[i];

        // 1. Turbulent flow (MetallicDust)
        const tx = Math.sin(t * f       + ph) * turbX[i];
        const ty = Math.cos(t * f * 1.3 + ph) * turbY[i];
        const tz = Math.sin(t * f * 0.8 + ph) * turbZ[i];

        arr[i*3]   += flowVelX[i] + tx;
        arr[i*3+1] += flowVelY[i] + ty;
        arr[i*3+2] += flowVelZ[i] + tz;

        // 2. Sway (MetallicDust)
        arr[i*3]   += Math.sin(t * f + i) * swayAmp[i] * 0.01;
        arr[i*3+1] += Math.cos(t * f * 0.7 + i) * swayAmp[i] * 0.01;

        // 3. Wrap-around (MetallicDust infinite loop)
        if (arr[i*3]   >  BOUNDS.x) arr[i*3]   = -BOUNDS.x;
        if (arr[i*3]   < -BOUNDS.x) arr[i*3]   =  BOUNDS.x;
        if (arr[i*3+1] >  BOUNDS.y) arr[i*3+1] = -BOUNDS.y;
        if (arr[i*3+1] < -BOUNDS.y) arr[i*3+1] =  BOUNDS.y;
        if (arr[i*3+2] >  BOUNDS.z) arr[i*3+2] = -BOUNDS.z;
        if (arr[i*3+2] < -BOUNDS.z) arr[i*3+2] =  BOUNDS.z;

        // 4. Mouse push/pull (MetallicDust)
        if (mouse.active) {
          const dx   = arr[i*3]   - mx;
          const dy   = arr[i*3+1] - my;
          const dist = Math.sqrt(dx*dx + dy*dy);
          if (dist < 4) {
            const force = (1 - dist / 4) * 0.02;
            if (dist < 1.5) {
              arr[i*3]   += (dx / dist) * force * 2;
              arr[i*3+1] += (dy / dist) * force * 2;
            } else {
              arr[i*3]   -= (dx / dist) * force * 0.5;
              arr[i*3+1] -= (dy / dist) * force * 0.5;
            }
          }
        }

        // 5. FireSpark colour: opacity pulses, colour stays orange-red
        const opPulse = Math.sin(t * pulseSpeed[i] + pulseOffset[i]) * 0.3;
        const alpha   = Math.max(0.15, Math.min(1, baseOpacity[i] + opPulse));

        // Shimmer: occasionally flash white-hot
        const shimmer = Math.sin(t * 2.5 + i * 0.5);
        const g = shimmer > 0.6
          ? 0.7 + shimmer * 0.3          // flash toward yellow-white
          : 0.2 + Math.random() * 0.15;  // settle to deep orange-red

        col[i*4]   = 1.0   * alpha;
        col[i*4+1] = g     * alpha;
        col[i*4+2] = 0.0;
        col[i*4+3] = alpha;
      }

      posAttr.needsUpdate = true;
      colAttr.needsUpdate = true;
      renderer.render(scene, camera);
    };

    animate();

    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove",  onMouseMove);
      window.removeEventListener("mouseleave", onMouseLeave);
      document.removeEventListener("mouseleave", onMouseLeave);
      window.removeEventListener("resize", onResize);
      geo.dispose();
      mat.dispose();
      if (mountRef.current && renderer.domElement)
        mountRef.current.removeChild(renderer.domElement);
      renderer.dispose();
    };
  }, []);

  return <div ref={mountRef} className="fixed inset-0 pointer-events-none z-[1]" />;
};

// ─── Background ──────────────────────────────────────────────────────────────
const BackgroundEffects = () => (
  <div className="fixed inset-0 pointer-events-none overflow-hidden bg-black z-0">
    <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:28px_28px]" />
    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] rounded-full bg-orange-900/10 blur-[120px]" />
  </div>
);

// ─── About ───────────────────────────────────────────────────────────────────
const About = () => {
  const ref      = useRef(null);
  const isInView = useInView(ref, { once: true });

  const container = {
    hidden:  { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2, delayChildren: 0.3 } },
  };
  const item = {
    hidden:  { y: 20, opacity: 0 },
    visible: { y: 0,  opacity: 1, transition: { type: "spring", stiffness: 100 } },
  };

  return (
    <section
      id="hero"
      ref={ref}
      className="min-h-screen flex items-center justify-center relative overflow-hidden text-white font-sans selection:bg-orange-500/30"
    >
      <BackgroundEffects />
      <FireDustSparks />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <motion.div
          variants={container}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="text-center lg:text-left lg:flex lg:items-center lg:justify-between"
        >
          <div className="lg:w-2/3">
            <motion.div
              variants={item}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 mb-6"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500" />
              </span>
              <span className="text-xs font-mono text-white/40 tracking-widest">SYSTEM ONLINE</span>
            </motion.div>

            <motion.h1 variants={item} className="text-5xl md:text-7xl font-bold tracking-tight mb-6">
              <span className="block text-white/45 text-2xl md:text-3xl font-mono mb-2 tracking-widest">
                Hello_World, I am
              </span>
              <span className="bg-gradient-to-r from-orange-400 via-red-300 to-white bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(251,146,60,0.25)]">
                Kshitij
              </span>
            </motion.h1>

            <motion.div
              variants={item}
              className="h-px w-32 bg-gradient-to-r from-orange-500 to-transparent mb-8 mx-auto lg:mx-0"
            />

            <motion.p
              variants={item}
              className="text-lg md:text-xl text-white/35 mb-10 max-w-2xl mx-auto lg:mx-0 font-light leading-relaxed"
            >
              <span className="text-orange-400 font-mono">&lt;Developer /&gt;</span>{" "}
              focusing on MERN Stack architecture and intuitive Frontend Design.
              I compile complex requirements into executable, elegant solutions.
            </motion.p>

            <motion.div variants={item} className="flex flex-wrap gap-4 justify-center lg:justify-start">
              <motion.a
                href="#contact"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group relative px-8 py-3 bg-white text-black font-semibold rounded-lg overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-red-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <span className="relative flex items-center gap-2">
                  <Terminal className="w-4 h-4" />
                  Initialize Contact
                </span>
              </motion.a>

              <motion.a
                href="#projects"
                whileHover={{ scale: 1.05, backgroundColor: "rgba(251,146,60,0.06)" }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 border border-white/10 text-white/50 rounded-lg font-mono text-sm flex items-center gap-2 hover:border-orange-500/40 transition-colors"
              >
                <Cpu className="w-4 h-4" />
                PROJECTS
              </motion.a>
            </motion.div>
          </div>

          <div className="hidden lg:block lg:w-1/3">
            <motion.div
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5, duration: 1 }}
              className="relative"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-orange-700/15 to-red-900/10 blur-[60px]" />
              <div className="relative border border-white/6 bg-white/[0.02] backdrop-blur-xl p-6 rounded-2xl">
                <div className="flex gap-2 mb-4">
                  <div className="w-3 h-3 rounded-full bg-white/8" />
                  <div className="w-3 h-3 rounded-full bg-white/8" />
                  <div className="w-3 h-3 rounded-full bg-white/8" />
                </div>
                <div className="space-y-2 font-mono text-xs text-white/45">
                  <p><span className="text-orange-400">const</span>{" "}
                    <span className="text-white/50">developer</span> ={" "}
                    <span className="text-white/30">{"{"}</span>
                  </p>
                  <p className="pl-4">name: <span className="text-orange-300/70">"Kshitij"</span>,</p>
                  <p className="pl-4">role: <span className="text-orange-300/70">"Full Stack"</span>,</p>
                  <p className="pl-4">status: <span className="text-orange-300/70">"Ready to work"</span></p>
                  <p><span className="text-white/30">{"}"}</span>;</p>
                  <p className="animate-pulse text-orange-500">_</p>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;