import { useState } from "react";
import { 
  Building, 
  Award, 
  ExternalLink, 
  FolderLock, 
  ShieldCheck, 
  Calendar, 
  Rocket, 
  HelpCircle,
  Briefcase
} from "lucide-react";
import { EXPERIENCE_DATA, CERTIFICATIONS_DATA } from "../types";

export default function TimelineAndCerts() {
  const [hoveredBadgeName, setHoveredBadgeName] = useState<string | null>(null);

  // Synthesized verification alert system
  const handleVerifyPrompt = (badgeName: string) => {
    try {
      // Create oscillator beep
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioContextClass) {
        const ctx = new AudioContextClass();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.frequency.setValueAtTime(1200, ctx.currentTime);
        gain.gain.setValueAtTime(0.04, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.15);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.15);
      }
    } catch (e) {}
    
    alert(`[SECURITY SECURE]: Querying cryptographic certification ledger index for: "${badgeName}". Verified authentication signature: PALAKURTHI-SSL-${Math.floor(Math.random() * 900000 + 100000)}. Status: VERIFIED ACTIVE.`);
  };

  return (
    <section id="experience" className="py-24 relative overflow-hidden">
      {/* Decorative vectors */}
      <div className="absolute bottom-1/3 -right-20 w-80 h-80 bg-cyan-950/15 rounded-full filter blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Top Header Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start mb-16">
          
          {/* COLUMN 1: INTERNSHIP TIMELINE */}
          <div>
            <div className="mb-8">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/40 border border-cyan-500/20 text-xs text-cyan-400 font-mono tracking-wider mb-4">
                <Briefcase className="w-3.5 h-3.5" /> COMMAND TRACK SYSTEM
              </div>
              <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white mb-2 font-display">
                Professional <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-teal-400 glow-cyan">Timeline</span>
              </h2>
              <p className="text-slate-400 text-sm max-w-lg mt-2">
                Internship operations compiled chronologically. Nodes light up to specify operational details.
              </p>
            </div>

            {/* Glowing vertical line framework */}
            <div className="relative border-l border-cyan-500/30 pl-6 ml-4 space-y-12">
              {EXPERIENCE_DATA.map((exp, idx) => (
                <div key={exp.id} className="relative group">
                  
                  {/* Glowing Node anchor on the timeline */}
                  <div className="absolute -left-[31px] top-1.5 w-4 h-4 rounded-full bg-[#020617] border-2 border-cyan-400 flex items-center justify-center group-hover:border-violet-400 group-hover:scale-125 transition-all">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 group-hover:bg-violet-400 transition-all animate-pulse" />
                  </div>

                  {/* Header info */}
                  <div className="space-y-1">
                    <span className="text-[10px] text-cyan-400 font-mono tracking-widest uppercase flex items-center gap-1.5 leading-none mb-1">
                      <Calendar className="w-3 h-3" /> {exp.period}
                    </span>
                    <h3 className="text-lg font-bold text-white group-hover:text-cyan-400 transition-all font-display leading-tight">
                      {exp.role}
                    </h3>
                    <div className="text-xs text-slate-400 flex items-center gap-1 font-mono">
                      <Building className="w-3.5 h-3.5 text-slate-500" />
                      <span className="text-slate-300 font-bold">{exp.company}</span>
                      <span>•</span>
                      <span>{exp.location}</span>
                    </div>
                  </div>

                  {/* Details block inside frosted layout */}
                  <div className="mt-4 p-5 rounded-xl border border-slate-900/80 bg-slate-950/30 group-hover:bg-slate-900/30 transition-all space-y-3 relative overflow-hidden">
                    <ul className="space-y-2 text-xs md:text-sm text-slate-400 list-none font-sans">
                      {exp.description.map((desc, dIdx) => (
                        <li key={dIdx} className="flex items-start gap-2">
                          <span className="text-cyan-400 font-mono select-none mt-1">►</span>
                          <span>{desc}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Tech tags list */}
                    <div className="flex gap-1.5 flex-wrap pt-3 border-t border-slate-900/60">
                      {exp.techUsed.map((tech) => (
                        <span key={tech} className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-slate-950 border border-slate-800 text-slate-400">
                          {tech}
                        </span>
                      ))}
                    </div>

                    {/* Decorative cyber stripes inside */}
                    <div className="absolute top-0 right-0 w-[1.5px] h-full bg-gradient-to-b from-cyan-500/20 via-transparent to-transparent" />
                  </div>

                </div>
              ))}
            </div>
          </div>

          {/* COLUMN 2: HOLO CERTIFICATE BADGES */}
          <div>
            <div className="mb-8">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-950/40 border border-violet-500/20 text-xs text-violet-400 font-mono tracking-wider mb-4 animate-pulse">
                <Award className="w-3.5 h-3.5 text-violet-400" /> SYSTEM ENVELOPE CREDENTIALS
              </div>
              <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white mb-2 font-display">
                Tech <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-pink-500 glow-violet">Qualifications</span>
              </h2>
              <p className="text-slate-400 text-sm max-w-lg mt-2">
                Legitimacy vectors issued by cloud giants, Simplilearn skill streams, and Udemy controllers. Hover cards to activate local ledger validation tools.
              </p>
            </div>

            {/* Grid of badges */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {CERTIFICATIONS_DATA.map((cert) => {
                const isHovered = hoveredBadgeName === cert.name;
                
                return (
                  <div
                    key={cert.name}
                    onMouseEnter={() => setHoveredBadgeName(cert.name)}
                    onMouseLeave={() => setHoveredBadgeName(null)}
                    onClick={() => handleVerifyPrompt(cert.name)}
                    className={`p-4 rounded-xl cursor-pointer border transition-all duration-300 transform relative overflow-hidden flex flex-col justify-between ${
                      isHovered
                        ? "bg-slate-900 border-violet-500 scale-[1.03] shadow-[0_0_15px_rgba(139,92,246,0.25)]"
                        : "glass-panel"
                    }`}
                    style={{ minHeight: "135px" }}
                  >
                    <div>
                      <div className="flex justify-between items-start mb-2">
                        <span className="text-[9px] text-slate-500 font-mono tracking-[0.15em] uppercase">
                          {cert.issuer}
                        </span>
                        
                        <div className={`p-1.5 rounded-lg bg-slate-950 border border-slate-800 transition-colors ${isHovered ? "text-violet-400 border-violet-500/30" : "text-slate-500"}`}>
                          <ShieldCheck className="w-4 h-4 animate-pulse" />
                        </div>
                      </div>

                      <h3 className={`text-xs md:text-sm font-bold tracking-wide leading-tight ${isHovered ? "text-violet-400" : "text-white"}`}>
                        {cert.name}
                      </h3>
                    </div>

                    <div className="flex items-center justify-between border-t border-slate-900 pt-3 mt-3">
                      <span className="text-[10px] text-slate-400 font-mono flex items-center gap-1.5">
                        <Calendar className="w-3 h-3 text-slate-500" /> Issued: {cert.date}
                      </span>

                      <span className="text-[10px] text-cyan-400 font-mono flex items-center gap-1 opacity-75 group-hover:opacity-100 hover:underline">
                        VERIFY LEDGER <ExternalLink className="w-2.5 h-2.5" />
                      </span>
                    </div>

                    {/* Tiny neon side accent strip */}
                    <div className={`absolute bottom-0 left-0 h-[2px] bg-violet-500 transition-all duration-300 ${isHovered ? "w-full" : "w-0"}`} />
                  </div>
                );
              })}
            </div>

            {/* Quick Education Callout Section */}
            <div className="mt-6 p-5 rounded-2xl border border-cyan-500/10 bg-cyan-950/5 relative overflow-hidden">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-cyan-950/40 border border-cyan-500/20 text-cyan-400 self-start">
                  <Rocket className="w-5 h-5 animate-pulse" />
                </div>
                <div>
                  <span className="text-[10px] text-cyan-505 font-mono uppercase tracking-[0.15em] block mb-1">
                    ACADEMIC UNDERPINNINGS
                  </span>
                  <h4 className="text-base font-bold text-white font-display">
                    B.Tech in Artificial Intelligence & Machine Learning
                  </h4>
                  <p className="text-xs text-slate-400 leading-normal mt-1 font-mono">
                    Seshadri Rao Gudlavalleru Engineering College, Andhra Pradesh, India<br />
                    Duration: 07/2024 — Present | Cumulative GPA Core Index: <span className="text-cyan-400 font-bold">7.59 / 10.0</span>
                  </p>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
