import { useState, useEffect, useRef, FormEvent } from "react";
import { 
  Github, 
  Linkedin, 
  Mail, 
  Phone, 
  Cpu, 
  Layers, 
  ArrowRight, 
  FileText, 
  Terminal, 
  Volume2, 
  VolumeX, 
  Radio, 
  Lock, 
  Unlock, 
  CheckCircle,
  HelpCircle,
  Clock,
  ExternalLink,
  ChevronRight
} from "lucide-react";
import ParticleBackground from "./components/ParticleBackground";
import SkillsGrid from "./components/SkillsGrid";
import ProjectSimulator from "./components/ProjectSimulator";
import TimelineAndCerts from "./components/TimelineAndCerts";
import JarvisConsole from "./components/JarvisConsole";

// Local audio synth oscillator helpers for sci-fi hover / validate beep response
const playSynthBeep = (freq = 900, dur = 0.08, type: OscillatorType = "sine") => {
  try {
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContextClass) return;
    const ctx = new AudioContextClass();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = type;
    osc.frequency.setValueAtTime(freq, ctx.currentTime);
    gain.gain.setValueAtTime(0.03, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + dur);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + dur);
  } catch (err) {}
};

export default function App() {
  // System Security Access Authorized states
  const [isAuthorized, setIsAuthorized] = useState<boolean>(false);
  const [isAuthorizing, setIsAuthorizing] = useState<boolean>(false);
  const [currentTimeStr, setCurrentTimeStr] = useState<string>("15:16:25 UTC");

  // Typewriter effect states for the 4 roles
  const roles = ["AI Developer", "ML Engineer", "Full Stack Builder", "Smart Automation Expert"];
  const [roleIndex, setRoleIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  // Sound settings
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);

  // Minimal contact form states
  const [senderName, setSenderName] = useState<string>("");
  const [senderEmail, setSenderEmail] = useState<string>("");
  const [senderMessage, setSenderMessage] = useState<string>("");
  const [isSendingMsg, setIsSendingMsg] = useState<boolean>(false);
  const [msgSuccess, setMsgSuccess] = useState<boolean>(false);

  // System status parameters
  const systemUptime = useRef<string>(Math.floor(Math.random() * 40 + 12) + "h " + Math.floor(Math.random() * 60) + "m");

  // Set real track time indicator
  useEffect(() => {
    const interval = setInterval(() => {
      const d = new Date();
      setCurrentTimeStr(d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false }) + " IST");
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Cyber typewriting cycle sequence
  useEffect(() => {
    let timer: NodeJS.Timeout;
    const fullText = roles[roleIndex];

    if (isDeleting) {
      timer = setTimeout(() => {
        setCurrentText((prev) => prev.slice(0, -1));
      }, 35);
    } else {
      timer = setTimeout(() => {
        setCurrentText((prev) => fullText.slice(0, prev.length + 1));
      }, 70);
    }

    if (!isDeleting && currentText === fullText) {
      timer = setTimeout(() => setIsDeleting(true), 2500); // Wait on completed word
    } else if (isDeleting && currentText === "") {
      setIsDeleting(false);
      setRoleIndex((idx) => (idx + 1) % roles.length);
    }

    return () => clearTimeout(timer);
  }, [currentText, isDeleting, roleIndex]);

  // Audio beep wrapper
  const triggerAppBeep = (freq = 800, dur = 0.08) => {
    if (soundEnabled) playSynthBeep(freq, dur);
  };

  // Secure OS Access validation trigger
  const handleAuthorizeAccess = () => {
    triggerAppBeep(1200, 0.08);
    setIsAuthorizing(true);
    
    setTimeout(() => {
      triggerAppBeep(1500, 0.15);
      setIsAuthorized(true);
      setIsAuthorizing(false);
    }, 1200);
  };

  // Submit Contact Form Handler
  const handleContactSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!senderName.trim() || !senderEmail.trim() || !senderMessage.trim()) return;

    triggerAppBeep(900, 0.06);
    setIsSendingMsg(true);

    // Simulate 303 quantum relay routing
    setTimeout(() => {
      triggerAppBeep(1800, 0.25);
      setIsSendingMsg(false);
      setMsgSuccess(true);
      setSenderMessage("");
    }, 1500);
  };

  return (
    <div className="min-h-screen text-slate-100 font-sans relative select-none selection:bg-cyan-500 selection:text-black">
      
      {/* Interactive Cosmos Canvas Stars Background */}
      <ParticleBackground />

      {/* Futuristic identity gatekeeper biometric overlay */}
      {!isAuthorized && (
        <div className="fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-[#020617] p-6 text-center overflow-hidden">
          
          {/* Glowing laser grids */}
          <div className="absolute inset-0 bg-grid-shift opacity-5 pointer-events-none" />

          <div className="max-w-md w-full glass-panel-cyan p-8 rounded-3xl border border-cyan-500/50 shadow-[0_0_50px_rgba(6,182,212,0.3)] relative">
            <span className="text-[10px] text-cyan-400 font-mono tracking-[0.3em] block mb-2 uppercase animate-pulse">
              INTELLIGENCE SECURED SYSTEMS GATEWAY
            </span>
            <h1 className="text-3xl font-extrabold text-white font-display mb-2 uppercase tracking-tight">
              JARVIS <span className="text-cyan-400 font-black">OS // v2.35</span>
            </h1>
            <p className="text-xs text-slate-400 font-mono mb-8 leading-relaxed uppercase">
              DEPUTED TO DEVELOPER: RUPANAND PALAKURTHI<br />
              COORDINATES: AP, INDIA // 16.18° N, 81.13° E
            </p>

            {/* Glowing biometric authorization touch circle */}
            <div className="flex justify-center mb-8 relative">
              <div
                onClick={handleAuthorizeAccess}
                className="w-28 h-28 rounded-full border-2 border-cyan-500/50 flex flex-col items-center justify-center cursor-pointer hover:border-cyan-400 group relative transition-all duration-300 transform hover:scale-105"
                style={{
                  boxShadow: "0 0 25px rgba(6, 182, 212, 0.15), inset 0 0 15px rgba(6, 182, 212, 0.1)"
                }}
              >
                {/* Fingerprint indicator layout or loading spin */}
                {isAuthorizing ? (
                  <div className="w-20 h-20 rounded-full border-2 border-dashed border-cyan-400 animate-spin flex items-center justify-center" />
                ) : (
                  <div className="flex flex-col items-center justify-center space-y-1.5 z-10">
                    <Lock className="w-8 h-8 text-cyan-400 group-hover:text-white transition-all group-hover:animate-bounce" />
                    <span className="text-[9px] font-mono tracking-wider font-bold text-cyan-500 group-hover:text-white uppercase">
                      AUTHORIZE
                    </span>
                  </div>
                )}

                {/* Outer pulsate rings */}
                <span className="absolute inset-0 rounded-full border border-cyan-500/30 animate-ping opacity-45" />
              </div>
            </div>

            <p className="text-slate-500 font-mono text-[10px] uppercase leading-relaxed mb-4">
              {isAuthorizing 
                ? "AUTHENTICATING TELEMETRY CORDS..." 
                : "TAP CORE SENSOR OR INTERACT TO INITIALIZE IMPRESSION KERNEL"
              }
            </p>

            <div className="flex justify-center gap-1.5 text-[8px] font-mono text-slate-600 border-t border-slate-900 pt-4">
              <span>SECURITY LOGS : ACTIVE</span>
              <span>•</span>
              <span>LOCAL TIME : {currentTimeStr}</span>
            </div>
          </div>
        </div>
      )}

      {/* FLOATING TOP CYLINDER NAVIGATION BAR DECK */}
      <header className="fixed top-5 left-1/2 -translate-x-1/2 w-[90%] max-w-5xl z-50 transition-all">
        <div className="glass-panel rounded-full py-3 px-6 md:px-8 border border-cyan-500/10 flex items-center justify-between shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
          
          {/* Logo brand */}
          <a
            href="#"
            onClick={() => triggerAppBeep(900, 0.06)}
            className="flex items-center gap-2 group cursor-pointer"
          >
            <div className="w-8 h-8 rounded-full bg-cyan-950/80 border border-cyan-500/30 flex items-center justify-center">
              <Cpu className="w-4 h-4 text-cyan-400 animate-spin-slow group-hover:text-white transition-all" />
            </div>
            <span className="font-display font-black text-sm tracking-widest text-white uppercase group-hover:text-cyan-400 transition-all">
              RUPANAND<span className="text-cyan-400 font-extrabold">.P</span>
            </span>
          </a>

          {/* Desktop Nav Actions */}
          <nav className="hidden md:flex items-center gap-6 text-xs text-slate-400 font-mono uppercase tracking-wider">
            <a href="#about" onClick={() => triggerAppBeep(800, 0.05)} className="hover:text-cyan-400 transition-colors">About</a>
            <a href="#skills" onClick={() => triggerAppBeep(800, 0.05)} className="hover:text-cyan-400 transition-colors">Neural Grid</a>
            <a href="#projects" onClick={() => triggerAppBeep(800, 0.05)} className="hover:text-cyan-400 transition-colors">Sandbox</a>
            <a href="#experience" onClick={() => triggerAppBeep(800, 0.05)} className="hover:text-cyan-400 transition-colors">Timeline</a>
          </nav>

          {/* Right actions: sound control + CTA */}
          <div className="flex items-center gap-4">
            
            {/* Audio switch helper */}
            <button
              onClick={() => {
                setSoundEnabled(!soundEnabled);
                if(!soundEnabled) playSynthBeep(1200, 0.05);
              }}
              className="p-1.5 rounded-full hover:bg-slate-900 transition-colors text-slate-400 hover:text-cyan-400 cursor-pointer"
              title={soundEnabled ? "Mute cyber feedback" : "Enable cyber feedback"}
            >
              {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4 text-red-400" />}
            </button>

            <a
              href="#contact"
              onClick={() => triggerAppBeep(1100, 0.07)}
              className="px-4 py-1.5 text-[11px] font-mono font-bold tracking-wider rounded-full bg-cyan-400 text-[#020617] hover:bg-white hover:shadow-[0_0_15px_rgba(6,182,212,0.8)] transition-all cursor-pointer border-none uppercase"
            >
              COMMAND PORTAL
            </a>
          </div>

        </div>
      </header>

      {/* 2035 HUD OUTER METRIC SHUTTERS (ONLY ACCENTS - NO SHIELD SLOP) */}
      <div className="hidden xl:block fixed left-6 top-1/2 -translate-y-1/2 text-[10px] font-mono text-slate-600/60 z-40 writing-mode-vertical uppercase space-y-4">
        <div>SYSTEM STATUS: ACTIVE [{(systemUptime.current)}]</div>
        <div className="border-t border-slate-900 pt-2">CORE LATENCY: 9ms (OK)</div>
      </div>
      <div className="hidden xl:block fixed right-6 top-1/2 -translate-y-1/2 text-[10px] font-mono text-slate-600/60 z-40 writing-mode-vertical uppercase space-y-4 text-right">
        <div>LOCAL TIME: {currentTimeStr}</div>
        <div className="border-t border-slate-900 pt-2">LOC: Machilipatnam, AP, India</div>
      </div>

      {/* CORE FRAME LAYOUT PANELS */}
      <main className="relative z-10 pt-24">

        {/* HERO SECTION DECK */}
        <section id="hero" className="min-h-[85vh] flex items-center pt-10 pb-20 relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center w-full">
            
            {/* COLUMN 1: INTRO TEXT & CYBER PORTRAIT */}
            <div className="lg:col-span-7 space-y-6">
              
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/40 border border-cyan-500/20 text-xs text-cyan-400 font-mono tracking-wider animate-pulse uppercase">
                <Radio className="w-3.5 h-3.5 text-cyan-400 animate-ping" /> TELEMETRY SIGNAL SECURED
              </div>

              <div className="space-y-2">
                <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-white font-display uppercase leading-none">
                  RUPANAND <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-400 to-violet-500 glow-cyan">PALAKURTHI</span>
                </h1>
                
                {/* CYBER TYPEWRITING SECTOR RECRUIT */}
                <div className="h-10 flex items-center">
                  <span className="text-xs md:text-sm font-mono text-cyan-400 uppercase tracking-[0.2em] mr-2">
                    CORE CLASS:
                  </span>
                  <p className="text-lg md:text-2xl font-mono text-white tracking-wide font-black uppercase text-shadow-cyan flex items-center">
                    {currentText}
                    <span className="w-2 h-6 bg-cyan-400 ml-1 inline-block animate-[pulse_1s_infinite]" />
                  </p>
                </div>
              </div>

              <p className="text-slate-400 max-w-xl text-sm md:text-base leading-relaxed">
                Aiming the future of software with deep integrations of artificial intelligence, supervised classifier nodes, and interactive cloud automation matrices. B.Tech AIML developer from Andhra Pradesh, India.
              </p>

              {/* Action buttons */}
              <div className="flex flex-wrap gap-4 pt-4">
                <a
                  href="#contact"
                  onClick={() => triggerAppBeep(1100, 0.08)}
                  className="px-6 py-3 rounded-xl font-mono text-xs font-black tracking-wider bg-cyan-400 text-slate-950 hover:bg-white shadow-[0_0_15px_rgba(6,182,212,0.4)] hover:shadow-[0_0_25px_rgba(6,182,212,0.7)] hover:scale-105 transition-all text-center flex items-center justify-center gap-2"
                >
                  INITIALIZE DIALOGUE CONNECT <ArrowRight className="w-4 h-4" />
                </a>

                <a
                  href="#projects"
                  onClick={() => triggerAppBeep(900, 0.05)}
                  className="px-6 py-3 rounded-xl font-mono text-xs font-bold tracking-wider bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-cyan-400 transition-all text-center flex items-center justify-center"
                >
                  DECODE PROJECTS MATRIX
                </a>
              </div>

              {/* Technical indicators in footer column */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-8 max-w-lg border-t border-slate-900 font-mono">
                <div>
                  <span className="text-[10px] text-slate-500 uppercase block">INTELLIGENCE AGENT</span>
                  <span className="text-cyan-400 text-xs font-bold uppercase mt-1 block">JARVIS v2.35</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 uppercase block">CORE GPA INDEX</span>
                  <span className="text-white text-xs font-bold mt-1 block">7.59 / 10.0</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 uppercase block">SYSTEM FILES LOADED</span>
                  <span className="text-white text-xs font-bold mt-1 block">5 PRO TOOLS ACT</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 uppercase block">CYBER CLASSIFIERS</span>
                  <span className="text-emerald-400 text-xs font-bold mt-1 block">ACTIVE DEPLOY</span>
                </div>
              </div>

            </div>

            {/* COLUMN 2: NESTED rotating concentrated reactor gyroscope */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative w-72 h-72 md:w-96 md:h-96 flex items-center justify-center animate-float-shape">
                {/* Orbit concentric grids */}
                <div className="absolute inset-0 rounded-full border border-dashed border-cyan-500/20 animate-[spin_25s_linear_infinite]" />
                <div className="absolute inset-6 rounded-full border border-cyan-500/30 shadow-[0_0_20px_rgba(6,182,212,0.1)] animate-[spin_16s_linear_infinite_reverse]" />
                <div className="absolute inset-14 rounded-full border border-violet-500/25 animate-[spin_11s_linear_infinite]" />
                <div className="absolute inset-24 rounded-full border-2 border-dashed border-violet-500/40 animate-[spin_6s_linear_infinite_reverse]" />
                
                {/* Floating internal core */}
                <div className="absolute inset-32 rounded-full bg-slate-950 border-2 border-cyan-400 flex flex-col items-center justify-center shadow-[0_0_35px_rgba(6,182,212,0.55),inset_0_0_15px_rgba(6,182,212,0.2)] animate-pulse">
                  <div className="relative flex items-center justify-center">
                    <span className="w-16 h-16 rounded-full absolute bg-cyan-400/5 filter blur-md animate-ping" />
                    <Cpu className="w-10 h-10 text-cyan-450 text-cyan-400 z-10" />
                  </div>
                  <span className="text-[8px] font-mono font-bold tracking-[0.25em] text-cyan-550 text-cyan-300 mt-1 uppercase">
                    SYS_CORE
                  </span>
                </div>

                {/* Satellite small orbs rotating in orbits */}
                <div 
                  className="absolute w-4 h-4 rounded-full bg-cyan-400 border border-white filter drop-shadow-[0_0_6px_rgba(6,182,212,0.8)]"
                  style={{
                    transform: "rotate(45deg) translate(144px) rotate(-45deg)",
                    animation: "spin 12s linear infinite"
                  }}
                />
                <div 
                  className="absolute w-3.5 h-3.5 rounded-full bg-violet-400 filter drop-shadow-[0_0_6px_rgba(139,92,246,0.8)]"
                  style={{
                    transform: "rotate(200deg) translate(114px) rotate(-200deg)",
                    animation: "spin 8s linear infinite reverse"
                  }}
                />
              </div>
            </div>

          </div>
        </section>

        {/* ABOUT PROFILE SECTION */}
        <section id="about" className="py-24 relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* COLUMN 1: Visual holographic binary rainfall rain effect */}
            <div className="lg:col-span-4 h-72 md:h-96 rounded-2xl overflow-hidden relative border border-cyan-500/10 shadow-[inner_0_0_10px_purple]">
              {/* Falling Code rain simulator overlay */}
              <div 
                className="absolute inset-0 bg-slate-950/90 flex justify-around p-3 overflow-hidden select-none font-mono text-[10px] text-cyan-500/25 leading-none"
              >
                {[...Array(12)].map((_, colIdx) => {
                  const itemsCount = 20;
                  const speedFactor = 6 + (colIdx % 4) * 2;
                  
                  return (
                    <div 
                      key={colIdx} 
                      className="flex flex-col gap-1 items-center"
                      style={{
                        animation: `grid-spin ${speedFactor}s linear infinite`,
                        opacity: 0.3 + (colIdx % 3) * 0.2
                      }}
                    >
                      {[...Array(itemsCount)].map((_, rowIdx) => (
                        <span key={rowIdx} className={rowIdx === 0 ? "text-cyan-400 scale-125 font-bold" : ""}>
                          {(rowIdx + colIdx) % 2 === 0 ? "1" : "0"}
                        </span>
                      ))}
                    </div>
                  );
                })}
              </div>

              {/* Inside floating holographic console overlay */}
              <div className="absolute inset-0 flex flex-col justify-space hover:bg-slate-950/20 transition-all p-6 backdrop-blur-[1px]">
                <div className="flex justify-between items-start font-mono text-[9px] text-slate-500">
                  <span>HOLO_SPECT_033</span>
                  <span>INDEX: RUP</span>
                </div>

                <div className="my-auto space-y-4 text-center">
                  <div className="inline-flex py-1 px-3 border border-cyan-500/30 rounded-lg bg-slate-950 text-cyan-400 font-mono text-xs shadow-[0_0_10px_rgba(6,182,212,0.2)] animate-pulse">
                    DIAGNOSTICS ONLINE
                  </div>
                  <p className="text-xs font-mono text-slate-300 leading-normal bg-slate-950/80 p-3 rounded-lg border border-slate-900">
                    "AI is not a system layer to be appended; it is the absolute logic core from which the architecture arises."
                  </p>
                </div>

                <div className="flex justify-between items-end font-mono text-[9px] text-slate-500">
                  <span>SYSTEM_STATION_300</span>
                  <span>100% OPERABLE</span>
                </div>
              </div>
            </div>

            {/* COLUMN 2: The elegant Bio glass block */}
            <div className="lg:col-span-8 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/40 border border-cyan-500/20 text-xs text-cyan-400 font-mono tracking-wider">
                <FileText className="w-3.5 h-3.5" /> DECRYPTED INDEX BIO
              </div>
              
              <h2 className="text-3xl md:text-5xl font-extrabold text-white font-display tracking-wide uppercase">
                Deciphering <span className="text-cyan-400 font-black glow-cyan">Our Architecture</span>
              </h2>

              <div className="glass-panel p-6 md:p-8 rounded-2xl border-cyan-500/10 leading-relaxed text-slate-300 text-sm md:text-base space-y-4">
                <p>
                  I am <strong className="text-white">Rupanand Palakurthi</strong>, an AI & Machine Learning student and full-stack engineer from India who develops intelligent applications, predictive ML services, and smart automated workflows. 
                </p>
                <p>
                  Having dedicated core training to Artificial Intelligence & Machine Learning at Seshadri Rao Gudlavalleru Engineering College, my engineering focus spans standard web engines (HTML5/CSS/React), structural backends (FastAPI/Flask/Node.js), and scientific data models using Python.
                </p>
                <p>
                  I approach development as the craft of building scalable web portals and wrapping ML models directly in performant interfaces so they translate complex predictive telemetry into robust, elegant human answers. Let's design the next paradigm together.
                </p>
              </div>

              {/* Short action badge rows */}
              <div className="flex gap-3 flex-wrap text-xs font-mono">
                <div className="px-3 py-1.5 bg-slate-950 border border-slate-900 rounded-lg flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-cyan-400" /> Supervised ML Algorithms
                </div>
                <div className="px-3 py-1.5 bg-slate-950 border border-slate-900 rounded-lg flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-violet-400" /> Precision Predictive Analytics
                </div>
                <div className="px-3 py-1.5 bg-slate-950 border border-slate-900 rounded-lg flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400" /> Automation Webhooks & Web
                </div>
              </div>

            </div>

          </div>
        </section>

        {/* CORE INTERACTIVE PROJECTS SANDBOX SIMULATOR MODULE */}
        <ProjectSimulator />

        {/* RECRUIT TECH SKILLS RADIAL / HEX GRID MODULE */}
        <SkillsGrid />

        {/* EXPERIENCE TIMELINE & CERTIFICATIONS BADGE PANEL */}
        <TimelineAndCerts />

        {/* CHAT WITH JARVIS AI INTERFACE CONSOLE DECK */}
        <section className="py-24 relative overflow-hidden bg-slate-950/30">
          <div className="max-w-4xl mx-auto px-6 relative z-10 space-y-8">
            <div className="text-center space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/40 border border-cyan-500/20 text-xs text-cyan-400 font-mono tracking-wider animate-pulse uppercase">
                <Terminal className="w-3.5 h-3.5" /> INTERACTIVE TELEPORT LOGS
              </div>
              <h2 className="text-3xl md:text-4xl font-extrabold text-white font-display uppercase">
                COMMUNICATE CODE WITH <span className="text-cyan-400 glow-cyan">J.A.R.V.I.S.</span>
              </h2>
              <p className="text-slate-400 text-xs md:text-sm max-w-xl mx-auto leading-relaxed">
                Connect directly to my 2035 representation model to query resume highlights, code databases, or request contact links dynamically.
              </p>
            </div>

            {/* Simulated AI Console */}
            <JarvisConsole />
          </div>
        </section>

        {/* MINIMAL CONTACT TRANSMISSION FLOWPORT */}
        <section id="contact" className="py-24 relative overflow-hidden">
          {/* Subtle lighting overlay */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-cyan-950/15 rounded-full filter blur-[150px] pointer-events-none" />

          <div className="max-w-4xl mx-auto px-6 relative z-10">
            <div className="glass-panel-cyan rounded-3xl overflow-hidden border border-cyan-500/15 shadow-[0_20px_45px_rgba(0,0,0,0.5)] grid grid-cols-1 md:grid-cols-12 items-stretch">
              
              {/* SIDE ADVICE COLUMN: Social links & identifiers */}
              <div className="md:col-span-5 bg-slate-950/80 p-8 flex flex-col justify-between border-r border-cyan-500/15 relative">
                
                {/* Visual mesh */}
                <div className="space-y-6">
                  <div>
                    <span className="text-[10px] text-cyan-400 font-mono tracking-widest uppercase block mb-1">
                      PORTAL DIRECT COORDS
                    </span>
                    <h3 className="text-xl font-bold font-display text-white tracking-wide uppercase">
                      LET'S SYNC SYSTEM CORES
                    </h3>
                  </div>

                  <p className="text-xs md:text-sm text-slate-400 leading-relaxed font-mono">
                    If you prefer direct relays, bypass the secure console submission deck and summon Rupanand directly across these secure wave indices.
                  </p>

                  <div className="space-y-4 font-mono text-xs text-slate-300">
                    <a 
                      href="mailto:rupanandpalakurthi@gmail.com" 
                      onClick={() => triggerAppBeep(1100, 0.05)}
                      className="flex items-center gap-3 hover:text-cyan-400 transition-colors"
                    >
                      <Mail className="w-4.5 h-4.5 text-cyan-400" />
                      <span>rupanandpalakurthi@gmail.com</span>
                    </a>
                    
                    <a 
                      href="tel:+917095052818" 
                      onClick={() => triggerAppBeep(1100, 0.05)}
                      className="flex items-center gap-3 hover:text-cyan-400 transition-colors"
                    >
                      <Phone className="w-4.5 h-4.5 text-cyan-400" />
                      <span>+91 7095052818</span>
                    </a>

                    <div className="flex items-center gap-3">
                      <Radio className="w-4.5 h-4.5 text-emerald-400 animate-pulse" />
                      <span className="text-emerald-400 font-bold">Open to Remote / Internships</span>
                    </div>
                  </div>
                </div>

                {/* Social Badges Grid */}
                <div className="pt-8 border-t border-slate-900/80 space-y-4">
                  <span className="text-[10px] text-slate-500 font-mono uppercase tracking-wider block">
                    CONNECTED COGNITIVE RELAYS
                  </span>
                  
                  <div className="flex gap-3">
                    <a
                      href="https://linkedin.com/in/rupanandpalakurthi"
                      target="_blank"
                      rel="noreferrer"
                      onClick={() => triggerAppBeep(1200, 0.06)}
                      className="p-3 bg-slate-900 text-slate-300 hover:text-cyan-400 border border-slate-800 rounded-xl transition-all hover:scale-105"
                      title="LinkedIn Teleport"
                    >
                      <Linkedin className="w-5 h-5" />
                    </a>

                    <a
                      href="https://github.com/rupanandpalakurthi"
                      target="_blank"
                      rel="noreferrer"
                      onClick={() => triggerAppBeep(1200, 0.06)}
                      className="p-3 bg-slate-900 text-slate-300 hover:text-cyan-400 border border-slate-800 rounded-xl transition-all hover:scale-105"
                      title="GitHub Repository"
                    >
                      <Github className="w-5 h-5" />
                    </a>

                    <a
                      href="https://rupanandpalakurthi.com"
                      target="_blank"
                      rel="noreferrer"
                      onClick={() => triggerAppBeep(1200, 0.06)}
                      className="p-3 bg-slate-900 text-slate-300 hover:text-cyan-400 border border-slate-800 rounded-xl transition-all hover:scale-105"
                      title="Self Referential Domain"
                    >
                      <FileText className="w-5 h-5" />
                    </a>
                  </div>
                </div>

              </div>

              {/* FLOATING CONTACT FORM COLUMN */}
              <div className="md:col-span-7 p-8 flex flex-col justify-between">
                <div>
                  <span className="text-xs text-slate-500 font-mono tracking-widest block uppercase mb-3">
                    TRANSMISSION CORE
                  </span>

                  {msgSuccess ? (
                    <div className="p-6 bg-cyan-950/20 border border-cyan-500/30 rounded-2xl text-center space-y-4 animate-fade-in my-8 font-mono">
                      <CheckCircle className="w-12 h-12 text-cyan-400 mx-auto animate-bounce" />
                      <div className="text-sm font-bold text-cyan-400">TRANSMISSION RELAY ACTIVE!</div>
                      <p className="text-xs text-slate-300 leading-relaxed">
                        Your frequency signal has been processed and written to the secure Rupanand Palakurthi intelligence log portfolio. Connection protocol will commence on email coordinates.
                      </p>
                      <button
                        onClick={() => {
                          triggerAppBeep(900, 0.05);
                          setMsgSuccess(false);
                          setSenderName("");
                          setSenderEmail("");
                        }}
                        className="text-xs bg-slate-900 hover:bg-slate-800 px-4 py-1.5 rounded-lg text-slate-300 hover:text-cyan-400 cursor-pointer border border-slate-800"
                      >
                        DISPATCH NEW TRANSMISSION
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleContactSubmit} className="space-y-4">
                      <div>
                        <label className="text-[10px] text-slate-400 font-mono uppercase block mb-1">
                          SENDER CALL SIGN (NAME):
                        </label>
                        <input
                          type="text"
                          required
                          value={senderName}
                          onChange={(e) => setSenderName(e.target.value)}
                          onFocus={() => triggerAppBeep(850, 0.04)}
                          className="w-full text-xs font-mono bg-slate-900 border-glow-cyan p-3 rounded-lg text-white focus:outline-none focus:ring-0"
                          placeholder="Identify sender..."
                        />
                      </div>

                      <div>
                        <label className="text-[10px] text-slate-400 font-mono uppercase block mb-1">
                          RESPONSE FREQUENCY (EMAIL address):
                        </label>
                        <input
                          type="email"
                          required
                          value={senderEmail}
                          onChange={(e) => setSenderEmail(e.target.value)}
                          onFocus={() => triggerAppBeep(850, 0.04)}
                          className="w-full text-xs font-mono bg-slate-900 border-glow-cyan p-3 rounded-lg text-white focus:outline-none focus:ring-0"
                          placeholder="frequency@domain.xyz"
                        />
                      </div>

                      <div>
                        <label className="text-[10px] text-slate-400 font-mono uppercase block mb-1">
                          TRANSFERRED MSG DATA:
                        </label>
                        <textarea
                          required
                          rows={4}
                          value={senderMessage}
                          onChange={(e) => setSenderMessage(e.target.value)}
                          onFocus={() => triggerAppBeep(850, 0.04)}
                          className="w-full text-xs font-mono bg-slate-900 border-glow-cyan p-3 rounded-lg text-white focus:outline-none focus:ring-0"
                          placeholder="Transcribe signal contents..."
                        />
                      </div>

                      <button
                        type="submit"
                        disabled={isSendingMsg}
                        className="w-full py-3 rounded-lg font-mono font-bold tracking-widest text-xs bg-cyan-400 text-slate-950 flex items-center justify-center gap-2 hover:bg-white cursor-pointer shadow-[0_0_15px_rgba(6,182,125,0.2)] hover:shadow-[0_0_20px_rgba(6,182,212,0.6)] text-center transition-all disabled:opacity-50 border-none uppercase"
                      >
                        {isSendingMsg ? "RELAYING WAVE QUANTUMS..." : "INITIALIZE TRANSMISSION SEND"}
                      </button>
                    </form>
                  )}
                </div>

                <div className="flex justify-between items-center text-[10px] text-slate-500 font-mono pt-4 mt-4 border-t border-slate-950">
                  <span>SSL_SECURE CONNECT 256</span>
                  <span>INDEX_V2_ONLINE</span>
                </div>
              </div>

            </div>
          </div>
        </section>

      </main>

      {/* FOOTER */}
      <footer className="py-12 border-t border-slate-950 bg-slate-950/90 relative z-10 text-center font-mono text-[11px] text-slate-500">
        <div className="max-w-7xl mx-auto px-6 space-y-3">
          <div className="flex justify-center gap-6 text-slate-400 uppercase">
            <a href="#about" onClick={() => triggerAppBeep(800, 0.05)} className="hover:text-cyan-400 transition-colors">ABOUT</a>
            <a href="#skills" onClick={() => triggerAppBeep(800, 0.05)} className="hover:text-cyan-400 transition-colors">SKILLS</a>
            <a href="#projects" onClick={() => triggerAppBeep(800, 0.05)} className="hover:text-cyan-400 transition-colors">PROJECTS</a>
            <a href="#experience" onClick={() => triggerAppBeep(800, 0.05)} className="hover:text-cyan-400 transition-colors">EXPERIENCE</a>
          </div>
          
          <p className="pt-2">
            © 2026 Rupanand Palakurthi. Designed for index 2035 with J.A.R.V.I.S. Core Terminal logs.
          </p>
          <p className="text-[10px] text-slate-600 uppercase">
            Built using Node.js full-stack Express, React 19, Tailwind CSS and Google Gemini API.
          </p>
        </div>
      </footer>

    </div>
  );
}
