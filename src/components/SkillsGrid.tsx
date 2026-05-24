import { useState } from "react";
import { 
  Terminal, 
  Cpu, 
  Binary, 
  Code2, 
  Zap, 
  Flame, 
  Layers, 
  Database, 
  GitMerge, 
  Workflow, 
  Radio
} from "lucide-react";
import { SKILLS_DATA } from "../types";

export default function SkillsGrid() {
  const [hoveredSkillName, setHoveredSkillName] = useState<string | null>(null);

  // Map string representation of icons to real Lucide icon components safely
  const getSkillIcon = (name: string) => {
    switch (name) {
      case "Python": return <Terminal className="w-5 h-5 text-cyan-400" />;
      case "ML / Predict": return <Cpu className="w-5 h-5 text-purple-400 animate-pulse" />;
      case "NLP": return <Binary className="w-5 h-5 text-pink-400" />;
      case "React.js": return <Code2 className="w-5 h-5 text-cyan-300" />;
      case "FastAPI": return <Zap className="w-5 h-5 text-indigo-400" />;
      case "Flask": return <Flame className="w-5 h-5 text-orange-400" />;
      case "Node.js": return <Layers className="w-5 h-5 text-emerald-400" />;
      case "MongoDB": return <Database className="w-5 h-5 text-teal-400" />;
      case "Git": return <GitMerge className="w-5 h-5 text-blue-400" />;
      case "N8n Hub": return <Workflow className="w-5 h-5 text-amber-500" />;
      default: return <Cpu className="w-5 h-5 text-slate-400" />;
    }
  };

  // Telemetry details displayed if skill is highlighted
  const getSkillDetails = (name: string) => {
    switch(name) {
      case "Python": return "Core pipeline orchestration, data wrangling pipelines (Pandas/Numpy), and supervised classifier training logs.";
      case "ML / Predict": return "XGBoost, Support Vector Machines, Decision Trees scoring, and predictive health assessment engines.";
      case "NLP": return "Stopword removal, NLTK processing, TF-IDF vectorizers, and classification of propaganda/false variables in text.";
      case "React.js": return "Glassmorphic responsive client layers, real-time audio wave synthesis integrations, and modular state binders.";
      case "FastAPI": return "High-performance microservice endpoints featuring asynchronous database drivers and lightning-fast JSON validations.";
      case "Flask": return "Minimalist micro-framework pipelines mapping python predictive engines to standard web clients.";
      case "Node.js": return "Backend server routing systems, bundlers integration, and intermediate API controllers.";
      case "MongoDB": return "Non-relational telemetry schemas, credit-scoring ledger histories, and quick session-log caching.";
      case "Git": return "Agile multi-developer branch versioning, sub-module tracking, and clean deployment streams.";
      case "N8n Hub": return "Advanced workflow automations, third-party webhook binders, and automated AI agent workflows.";
      default: return "Enterprise automation, custom telemetry processing, and clean coding architectures.";
    }
  };

  return (
    <section id="skills" className="py-24 relative overflow-hidden">
      {/* Background neon elements */}
      <div className="absolute top-1/2 left-3/4 w-96 h-96 bg-violet-950/15 rounded-full filter blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Title Block */}
        <div className="mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-950/40 border border-violet-500/20 text-xs text-violet-400 font-mono tracking-wider mb-4">
            <Radio className="w-3.5 h-3.5 text-violet-400 animate-pulse" /> BIO-LOGICAL TELEMETRY
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white mb-2 font-display">
            Quantum <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-pink-400 to-cyan-400 glow-violet">Neural Matrix</span>
          </h2>
          <p className="text-slate-400 max-w-2xl text-sm md:text-base">
            Proficiencies rated using cybernetic radial modules. Hover any node to decode corresponding project details and architecture applications.
          </p>
        </div>

        {/* Primary Skill Grid: 2 Columns on desktop. Left=The radial skills grid. Right=The diagnostic spec panel */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          <div className="lg:col-span-8 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
            {SKILLS_DATA.map((skill) => {
              const isHovered = hoveredSkillName === skill.name;
              
              // Animated Radial SVG variables
              const radius = 28;
              const circumference = 2 * Math.PI * radius;
              const offset = circumference - (skill.percentage / 100) * circumference;

              return (
                <div
                  key={skill.name}
                  id={`skill-cell-${skill.name}`}
                  onMouseEnter={() => setHoveredSkillName(skill.name)}
                  onMouseLeave={() => setHoveredSkillName(null)}
                  className={`relative p-5 rounded-xl transition-all duration-300 flex flex-col items-center justify-between text-center select-none cursor-pointer overflow-hidden ${
                    isHovered
                      ? "bg-slate-900 border-violet-500 shadow-[0_0_20px_rgba(139,92,246,0.3)] scale-[1.04]"
                      : "glass-panel"
                  }`}
                  style={{ minHeight: "172px" }}
                >
                  {/* Neon laser line top indicator */}
                  <div className={`absolute top-0 left-0 w-full h-[1.5px] bg-gradient-to-r transition-all duration-300 ${isHovered ? "from-violet-500 to-cyan-400" : "from-slate-800 to-slate-800/20"}`} />

                  {/* SVG Animated Radial Gauge */}
                  <div className="relative w-16 h-16 flex items-center justify-center">
                    <svg className="w-full h-full transform -rotate-90">
                      {/* Background circle track */}
                      <circle
                        cx="32"
                        cy="32"
                        r={radius}
                        className="stroke-slate-950"
                        strokeWidth="3.5"
                        fill="transparent"
                      />
                      {/* Foreground glowing stroke loading indicator */}
                      <circle
                        cx="32"
                        cy="32"
                        r={radius}
                        className="stroke-cyan-400 transition-all duration-700"
                        strokeWidth="4"
                        fill="transparent"
                        strokeDasharray={circumference}
                        strokeDashoffset={isHovered ? offset : circumference}
                        strokeLinecap="round"
                        style={{
                          filter: "drop-shadow(0 0 3px rgba(6, 182, 212, 0.5))"
                        }}
                      />
                    </svg>
                    
                    {/* Centered Icon block */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      {getSkillIcon(skill.name)}
                    </div>
                  </div>

                  {/* Skill text coordinates */}
                  <div className="mt-3">
                    <span className="text-[10px] text-slate-500 font-mono tracking-widest block uppercase">
                      {skill.category}
                    </span>
                    <h3 className="text-sm font-bold text-white font-display mt-0.5 tracking-wide leading-tight group-hover:text-cyan-400">
                      {skill.name}
                    </h3>
                  </div>

                  {/* Rating Badge */}
                  <div className="mt-2 text-[10px] font-mono font-bold text-cyan-400 bg-slate-950 px-2.5 py-0.5 rounded-full border border-cyan-500/20 shadow-[0_0_8px_rgba(6,182,212,0.1)]">
                    {skill.percentage}% LDR
                  </div>
                </div>
              );
            })}
          </div>

          {/* RIGHT DECK: Holographic details receiver panel */}
          <div className="lg:col-span-4">
            <div className="glass-panel rounded-2xl p-6 md:p-8 h-full flex flex-col justify-between border-dashed border-cyan-500/10 relative overflow-hidden">
              
              {/* Futuristic scanning visual targets in corner */}
              <div className="absolute top-4 right-4 text-slate-500 font-mono text-[9px] select-none text-right">
                SCAN_REC//CLASS_AIML<br />
                MATRIX_SECURED
              </div>

              <div>
                <h3 className="text-xs text-cyan-400 font-mono tracking-widest uppercase mb-4 flex items-center gap-1.5 leading-none">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping inline-block" />
                  DIAGNOSTIC TELEMETRY SPEC:
                </h3>

                {hoveredSkillName ? (
                  <div className="space-y-5 animate-fade-in">
                    <div>
                      <span className="text-[10px] text-slate-500 font-mono block">HIGHLIGHTED COEFFICIENT</span>
                      <h4 className="text-2xl font-black font-display text-white tracking-wide glow-violet">
                        {hoveredSkillName}
                      </h4>
                    </div>

                    <p className="text-slate-300 text-sm leading-relaxed font-mono">
                      {getSkillDetails(hoveredSkillName)}
                    </p>

                    <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800 text-xs text-slate-400 font-mono space-y-2">
                      <div className="flex justify-between">
                        <span>INTEGRATION QUOTIENT:</span>
                        <span className="text-emerald-400 font-bold">100% OPERABLE</span>
                      </div>
                      <div className="flex justify-between">
                        <span>TELEMETRY CLASS:</span>
                        <span className="text-cyan-400 font-bold">PRO LEVEL DECK</span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <p className="text-slate-500 text-sm leading-relaxed font-mono italic">
                      Move your cursor indicator across the skill modules on the left grid matrix to stream localized model logs and applications.
                    </p>
                    <div className="w-12 h-12 rounded-full border border-dashed border-slate-800 flex items-center justify-center animate-spin text-slate-700">
                      +
                    </div>
                  </div>
                )}
              </div>

              <div className="pt-6 border-t border-slate-900 flex justify-between items-center text-[10px] font-mono text-slate-600">
                <span>R.PALAKURTHI INTEGRATED SYSTEMS</span>
                <span>SECURE KERNEL</span>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
