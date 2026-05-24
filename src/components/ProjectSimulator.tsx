import { useState, useRef, useEffect } from "react";
import { 
  Github, 
  Cpu, 
  ExternalLink, 
  Sparkles, 
  AlertTriangle, 
  CheckCircle, 
  RefreshCw, 
  Sliders, 
  Volume2, 
  MessageSquareText, 
  Activity, 
  Leaf, 
  Landmark, 
  ArrowRight
} from "lucide-react";
import { PROJECTS_DATA, MachineLearningProject } from "../types";

export default function ProjectSimulator() {
  const [selectedProjectId, setSelectedProjectId] = useState<string>("fake-news");
  const [activeTab, setActiveTab] = useState<"info" | "simulate">("simulate");
  
  // Custom simulator states
  const [isSimulating, setIsSimulating] = useState<boolean>(false);
  const [simulationResult, setSimulationResult] = useState<any>(null);

  // 1. Fake News Detector states
  const [fakeNewsHeadline, setFakeNewsHeadline] = useState<string>(
    "Scientists discover fully operational alien research outpost orbiting the Moon!"
  );
  const presetHeadlines = [
    "Scientists discover fully operational alien research outpost orbiting the Moon!",
    "Federal reserve adjusts interest rates by 25 basis points to stabilize market indicators.",
    "Billionaire secretly purchases entire country to construct classified private bio-sphere project.",
    "Recent multi-center clinical trials suggest regular exercise boosts cognitive recall scores."
  ];

  // 2. Disease Prediction AI states
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>(["Dry Cough", "Fever"]);
  const symptomOptions = ["Fever", "Dry Cough", "Fatigue", "Skin Rash", "Joint Pain", "Headache", "Nausea", "Shortness of Breath"];

  // 3. Speech Emotion Recognition states
  const [audioSensorActive, setAudioSensorActive] = useState<boolean>(false);
  const [voiceVolume, setVoiceVolume] = useState<number>(65);

  // 4. AgriSmart AI states
  const [selectedCrop, setSelectedCrop] = useState<string>("Tomato");
  const [soilNitrogen, setSoilNitrogen] = useState<number>(45);
  const [soilPhosphorus, setSoilPhosphorus] = useState<number>(30);
  const [soilPotassium, setSoilPotassium] = useState<number>(55);

  // 5. Credit Scoring Model states
  const [monthlyIncome, setMonthlyIncome] = useState<number>(8500);
  const [debtRatio, setDebtRatio] = useState<number>(35);
  const [paymentDelays, setPaymentDelays] = useState<number>(0);

  // Auto-reset simulation when project shifts
  useEffect(() => {
    setIsSimulating(false);
    setSimulationResult(null);
  }, [selectedProjectId]);

  const activeProject = PROJECTS_DATA.find((p) => p.id === selectedProjectId) || PROJECTS_DATA[0];

  // Simulation runner handler
  const handleRunSimulation = () => {
    setIsSimulating(true);
    setSimulationResult(null);

    // Simulated network latencies for a futuristic scanning experience
    setTimeout(() => {
      setIsSimulating(false);
      let result: any = null;

      switch (selectedProjectId) {
        case "fake-news": {
          // Calculate dummy logic based on string complexity/sensationalism
          const words = fakeNewsHeadline.split(" ");
          let sensationScore = 20;
          const triggers = ["alien", "secretly", "billionaire", "operational", "outpost", "orbiting", "cures", "miracle", "shocking"];
          words.forEach(w => {
            if (triggers.includes(w.toLowerCase())) sensationScore += 25;
          });
          if (fakeNewsHeadline.includes("!")) sensationScore += 15;
          if (sensationScore > 100) sensationScore = 98;

          const isFake = sensationScore >= 50;
          result = {
            integrityIndex: 100 - sensationScore,
            status: isFake ? "FLAGGED: HIGH VARIANCE" : "VERIFIED COMMS",
            isFake,
            details: isFake 
              ? "High density of hyper-charged verbs and unverifiable spatial descriptors flagged in TF-IDF index."
              : "Text patterns correspond with standard objective documentation indices.",
            keywordsChecked: words.length,
            vectorMagnitude: (Math.random() * 0.9 + 0.1).toFixed(3)
          };
          break;
        }

        case "disease-prediction": {
          // Map symptoms to some dummy potential diagnostic result
          if (selectedSymptoms.length === 0) {
            result = {
              error: "Null input registered. Please select at least one core symptom."
            };
          } else {
            const tempSymptoms = [...selectedSymptoms];
            let suspectedPathology = "General Physical Wear";
            let matchConfidence = 45;
            
            if (tempSymptoms.includes("Dry Cough") && tempSymptoms.includes("Fever")) {
              suspectedPathology = "Acute Respiratory Pharyngitis";
              matchConfidence = 88;
            } else if (tempSymptoms.includes("Skin Rash") && tempSymptoms.includes("Joint Pain")) {
              suspectedPathology = "Inflammatory Autoimmune Response Type Beta";
              matchConfidence = 82;
            } else if (tempSymptoms.includes("Fatigue") && tempSymptoms.includes("Headache")) {
              suspectedPathology = "Neural Dehydration / Tension Induced Spasm";
              matchConfidence = 76;
            } else if (tempSymptoms.includes("Shortness of Breath")) {
              suspectedPathology = "Cardio-pulmonary Exhaustion Indication";
              matchConfidence = 64;
            } else if (tempSymptoms.includes("Fever")) {
              suspectedPathology = "Nonspecific Pyrexia / Viral Elevation";
              matchConfidence = 70;
            }

            result = {
              pathology: suspectedPathology,
              confidence: matchConfidence,
              severity: matchConfidence > 80 ? "CRITICAL ALERT CODE RED" : "MONITOR ACTION STANDARD",
              countermeasures: [
                "Initialize thermal logging twice daily.",
                "Administer system rehydration protocols.",
                "Execute local primary physician validation scan if symptoms remain active."
              ]
            };
          }
          break;
        }

        case "speech-emotion": {
          // Dynamic calculation based on selected sliders
          const currentPitch = Math.floor(110 + (voiceVolume / 100) * 150);
          let emoState = "SERENE / BALANCED";
          let valence = 85;

          if (voiceVolume > 85) {
            emoState = "HYPER-EVOKED: ANGER / INTENSE JUBILANCE";
            valence = 32;
          } else if (voiceVolume < 35) {
            emoState = "APATHETIC / DEPRESSED TELEROBOTIC FLATNESS";
            valence = 18;
          } else if (voiceVolume >= 60 && voiceVolume <= 85) {
            emoState = "HIGHLY MOTIVATED / ENGAGED";
            valence = 91;
          }

          result = {
            emotion: emoState,
            vocalPitch: `${currentPitch} Hz`,
            valenceIndex: `${valence}%`,
            extractedAcoustics: {
              mfccIndex: (Math.random() * 4 + 1.2).toFixed(2) + " dB",
              jitterPct: (0.12 + (voiceVolume / 1000)).toFixed(3) + "%",
              harmonicity: (15 + Math.random() * 10).toFixed(1) + " NHR"
            }
          };
          break;
        }

        case "agrismart-farming": {
          // Crop and NPK recommendation calculation
          let leafCondition = "Optimal Biological State";
          let optimalDiffs = { N: 0, P: 0, K: 0 };
          let warningTag = "Green Level 1";

          if (selectedCrop === "Tomato") {
            optimalDiffs = { N: 40 - soilNitrogen, P: 25 - soilPhosphorus, K: 50 - soilPotassium };
            if (soilNitrogen < 20) {
              leafCondition = " Tomato Septoria Leaf Spot Indicated (Dry Spore Flag)";
              warningTag = "Yellow Warning Level 2";
            }
          } else if (selectedCrop === "Rice") {
            optimalDiffs = { N: 60 - soilNitrogen, P: 35 - soilPhosphorus, K: 40 - soilPotassium };
            if (soilPotassium < 30) {
              leafCondition = "Brown Rice Planthopper Infiltration Threat Metric High";
              warningTag = "Amber Alert Level 3";
            }
          } else {
            optimalDiffs = { N: 50 - soilNitrogen, P: 30 - soilPhosphorus, K: 45 - soilPotassium };
          }

          result = {
            healthCondition: leafCondition,
            cropThreatStatus: warningTag,
            requiredAmendingMatrix: {
              nitrogen: (optimalDiffs.N > 0 ? `Supplement +${optimalDiffs.N} kg/hectare` : `Excess detected, reduce N fertilizer`),
              phosphorus: (optimalDiffs.P > 0 ? `Supplement +${optimalDiffs.P} kg/hectare` : `Sufficient P (OK)`),
              potassium: (optimalDiffs.K > 0 ? `Supplement +${optimalDiffs.K} kg/hectare` : `Sufficient K (OK)`)
            },
            NPKFeedback: `NPK Ratios calibrated of ${soilNitrogen}-${soilPhosphorus}-${soilPotassium}`
          };
          break;
        }

        case "credit-scoring": {
          // Underwriting risk estimation
          const totalAssets = monthlyIncome * 12;
          const leverageFactor = (monthlyIncome * (1 - debtRatio / 100)) - (paymentDelays * 450);
          let creditScore = Math.floor(400 + (leverageFactor / 30));
          if (paymentDelays > 2) creditScore -= 120;
          if (creditScore > 900) creditScore = 895;
          if (creditScore < 300) creditScore = 300;

          let riskTier = "TIER-A PREFERRED (Vast Capital Reserve)";
          let decStatus = "APPROVED SECURED";
          let alertColor = "text-emerald-400";

          if (creditScore < 500) {
            riskTier = "TIER-E HIGH RISK DEFAULT WARNING";
            decStatus = "REJECTED RISKY METRIC";
            alertColor = "text-red-400";
          } else if (creditScore < 700) {
            riskTier = "TIER-C MODERATE RISK (Under surveillance)";
            decStatus = "CONDITIONAL ACCEPTANCE REQ COLLATERAL";
            alertColor = "text-amber-400";
          }

          result = {
            underwritingRisk: riskTier,
            scoringEngineRating: `${creditScore} / 900`,
            automatedSystemVerdict: decStatus,
            verdictColorClass: alertColor,
            debtLoadFactor: `${debtRatio}% ratio`,
            probabilityOfDefault: (1 - (creditScore / 900)).toFixed(4) + "%"
          };
          break;
        }
      }

      setSimulationResult(result);
    }, 1200);
  };

  const handleSymptomToggle = (symptom: string) => {
    if (selectedSymptoms.includes(symptom)) {
      setSelectedSymptoms(selectedSymptoms.filter((s) => s !== symptom));
    } else {
      setSelectedSymptoms([...selectedSymptoms, symptom]);
    }
  };

  return (
    <section id="projects" className="py-24 relative overflow-hidden">
      {/* Visual cyber mesh back accents */}
      <div className="absolute inset-0 bg-radial-gradient from-violet-950/20 via-transparent to-transparent pointer-events-none" />
      <div className="absolute top-1/4 -left-20 w-80 h-80 bg-cyan-950/20 rounded-full filter blur-[100px] pointer-events-none animate-pulse-slow" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/40 border border-cyan-500/20 text-xs text-cyan-400 font-mono tracking-wider mb-4 animate-pulse">
            <Cpu className="w-3.5 h-3.5" /> PROJECT COGNITIVE CORE
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white mb-2 font-display">
            Interactive <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-400 to-violet-500 glow-cyan">Holographic Systems</span>
          </h2>
          <p className="text-slate-400 max-w-2xl text-sm md:text-base">
            Hover to view core mechanics. Select a model to launch the interactive live Sandbox Simulator—built exactly like Stark Industries diagnostic panels.
          </p>
        </div>

        {/* 2-Column Dashboard Framework: Projects Side Rail + Active Deck */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT RAIL: The 5 Projects Holographic selector list */}
          <div className="col-span-1 lg:col-span-5 flex flex-col gap-4">
            <span className="text-xs text-cyan-400/70 font-mono uppercase tracking-[0.2em] mb-1 px-1 block">
              SYSTEM FILES [5/5 INTEGRITY PASS]
            </span>
            
            {PROJECTS_DATA.map((project, index) => {
              const isSelected = selectedProjectId === project.id;
              
              // Icon selector
              const getProjIcon = (id: string) => {
                switch(id) {
                  case "fake-news": return <MessageSquareText className="w-5 h-5 text-cyan-400" />;
                  case "disease-prediction": return <Activity className="w-5 h-5 text-red-400" />;
                  case "speech-emotion": return <Volume2 className="w-5 h-5 text-violet-400" />;
                  case "agrismart-farming": return <Leaf className="w-5 h-5 text-emerald-400" />;
                  case "credit-scoring": return <Landmark className="w-5 h-5 text-amber-400" />;
                  default: return <Cpu className="w-5 h-5 text-slate-400" />;
                }
              };

              return (
                <div
                  key={project.id}
                  id={`project-card-${project.id}`}
                  onClick={() => setSelectedProjectId(project.id)}
                  className={`group relative overflow-hidden rounded-xl cursor-pointer p-5 transition-all duration-300 transform hover:-translate-y-1 ${
                    isSelected 
                      ? "glass-panel-cyan border-cyan-500/50 shadow-[0_0_20px_rgba(6,182,212,0.25)]" 
                      : "glass-panel hover:border-violet-500/30 hover:bg-violet-950/10"
                  }`}
                >
                  {/* Subtle index tag or scanning indicator */}
                  <div className="absolute top-2 right-4 text-[10px] text-slate-500 font-mono select-none">
                    MOD_0{index + 1}_INDEX
                  </div>

                  <div className="flex items-start gap-4">
                    <div className={`p-2.5 rounded-lg border ${isSelected ? "bg-cyan-950/60 border-cyan-500/40" : "bg-slate-900/80 border-slate-800"} transition-all`}>
                      {getProjIcon(project.id)}
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <h3 className={`font-semibold tracking-wide text-sm font-display leading-tight ${isSelected ? "text-cyan-400 font-bold" : "text-white group-hover:text-cyan-400"}`}>
                          {project.title}
                        </h3>
                        {isSelected && (
                          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping inline-block" />
                        )}
                      </div>
                      <p className="text-slate-400 text-xs mt-1.5 line-clamp-2">
                        {project.description}
                      </p>
                      
                      {/* Hover stats or short tech pill */}
                      <div className="flex gap-2 flex-wrap items-center mt-3">
                        {project.techStack.slice(0, 3).map((tech) => (
                          <span key={tech} className="text-[10px] px-2 py-0.5 rounded-md font-mono bg-slate-950 text-slate-400 border border-slate-800">
                            {tech}
                          </span>
                        ))}
                        {project.techStack.length > 3 && (
                          <span className="text-[9px] text-violet-400 font-mono">
                            +{project.techStack.length - 3}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  {/* Progress Line indicating loaded telemetry */}
                  <div className={`absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-500 to-transparent transition-all duration-500 ${isSelected ? "w-full" : "w-0 group-hover:w-[40%]"}`} />
                </div>
              );
            })}
          </div>

          {/* RIGHT DECK: Immersive control sandbox panel */}
          <div className="col-span-1 lg:col-span-7 flex flex-col h-full min-h-[560px]">
            <div className="glass-panel-cyan rounded-2xl flex-1 flex flex-col overflow-hidden border border-cyan-500/20">
              
              {/* Header Bar */}
              <div className="p-4 bg-slate-950/80 border-b border-cyan-500/25 flex flex-wrap gap-4 items-center justify-between font-mono">
                <div className="flex items-center gap-2">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-500/60" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
                    <div className="w-3 h-3 rounded-full bg-cyan-500/60 animate-pulse" />
                  </div>
                  <span className="text-xs text-slate-400 ml-2">
                    CORE_EMULATION://{activeProject.id}.core
                  </span>
                </div>

                {/* Sub-Tabs: Telemetry Specification Info vs Simulation Sandbox */}
                <div className="flex gap-1.5 text-xs bg-slate-900 p-1 rounded-lg border border-slate-800">
                  <button
                    id={`tab-info-${activeProject.id}`}
                    onClick={() => setActiveTab("info")}
                    className={`px-3 py-1 rounded-md cursor-pointer transition-all ${activeTab === "info" ? "bg-cyan-500 text-slate-950 font-bold" : "text-slate-400 hover:text-white"}`}
                  >
                    SPECS
                  </button>
                  <button
                    id={`tab-sim-${activeProject.id}`}
                    onClick={() => setActiveTab("simulate")}
                    className={`px-3 py-1 rounded-md cursor-pointer flex items-center gap-1 transition-all ${activeTab === "simulate" ? "bg-cyan-500 text-slate-950 font-bold" : "text-slate-400 hover:text-white"}`}
                  >
                    <Sparkles className="w-3 h-3 animate-pulse" /> SANDBOX
                  </button>
                </div>
              </div>

              {/* Deck Interior Content */}
              <div className="p-6 md:p-8 flex-1 flex flex-col justify-between">
                
                {/* Mode A: Telemetry Structure Spec Mode */}
                {activeTab === "info" && (
                  <div className="space-y-6">
                    <div>
                      <span className="text-xs text-cyan-400 font-mono tracking-widest block uppercase mb-1">
                        PROJECT DURATION: {activeProject.period}
                      </span>
                      <h3 className="text-2xl font-bold text-white font-display tracking-wide uppercase">
                        {activeProject.title}
                      </h3>
                    </div>

                    <p className="text-slate-300 text-sm leading-relaxed">
                      {activeProject.longDescription}
                    </p>

                    <div>
                      <h4 className="text-xs text-slate-400 font-mono tracking-wider uppercase mb-3">
                        COMPLIANT STACK CAPABILITIES:
                      </h4>
                      <div className="flex gap-2 flex-wrap">
                        {activeProject.techStack.map((tech) => (
                          <span key={tech} className="text-xs font-mono font-medium px-3 py-1 rounded-md border border-cyan-500/20 bg-cyan-950/20 text-cyan-400">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-4 pt-4 border-t border-slate-800">
                      {activeProject.stats.map((stat, idx) => (
                        <div key={idx} className="bg-slate-950/70 p-3 rounded-lg border border-slate-800 text-center">
                          <span className="text-[10px] text-slate-400 font-mono block uppercase">
                            {stat.label}
                          </span>
                          <span className="text-sm md:text-base font-bold text-white font-mono mt-1 block glow-cyan">
                            {stat.value}
                          </span>
                        </div>
                      ))}
                    </div>

                    <div className="pt-4 flex justify-end">
                      <a
                        href={activeProject.githubLink}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2 text-xs font-mono tracking-wider bg-slate-900 hover:bg-slate-800 hover:text-cyan-400 text-white rounded-lg border border-slate-800 transition-all cursor-pointer"
                      >
                        <Github className="w-4 h-4" /> REPOSITORY LOGS <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </div>
                )}

                {/* Mode B: Full sandbox simulator for user tests */}
                {activeTab === "simulate" && (
                  <div className="space-y-6 flex-1 flex flex-col justify-between">
                    <div className="space-y-5">
                      <div className="flex items-center justify-between border-b border-slate-800/60 pb-3">
                        <span className="text-xs text-slate-400 font-mono uppercase tracking-wider block">
                          SYSTEM TYPE: <span className="text-cyan-400 font-bold">{activeProject.category}</span>
                        </span>
                        <span className="text-xs text-emerald-400 font-mono flex items-center gap-1">
                          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping inline-block" /> CONSOLE ONLINE
                        </span>
                      </div>

                      {/* SIMULATOR INTERFACE PER THEMATIC ID */}
                      <div className="bg-slate-950/60 border border-slate-800/80 rounded-xl p-5 relative overflow-hidden">
                        
                        {/* 1. Fake News Detector Sandbox */}
                        {activeProject.id === "fake-news" && (
                          <div className="space-y-4">
                            <label className="text-xs text-slate-400 font-mono block">
                              INSERT NEWS TEXT FOR PROPAGANDA SCANNING:
                            </label>
                            
                            <textarea
                              id="fake-news-input"
                              value={fakeNewsHeadline}
                              onChange={(e) => setFakeNewsHeadline(e.target.value)}
                              rows={3}
                              className="w-full text-sm bg-slate-900 border border-slate-800 rounded-lg p-3 text-white focus:outline-none focus:border-glow-cyan"
                              placeholder="Type in a custom news line..."
                            />

                            {/* Presets */}
                            <div>
                              <span className="text-[10px] text-slate-400 font-mono uppercase block mb-2">
                                PRE-BUFFERED EXAMPLES:
                              </span>
                              <div className="flex flex-col gap-2">
                                {presetHeadlines.map((p, idx) => (
                                  <button
                                    key={idx}
                                    onClick={() => setFakeNewsHeadline(p)}
                                    className="text-left text-xs bg-slate-900/40 hover:bg-slate-900 border border-slate-800 p-2 rounded text-slate-300 hover:text-cyan-400 cursor-pointer transition-all truncate"
                                    title={p}
                                  >
                                    {p}
                                  </button>
                                ))}
                              </div>
                            </div>
                          </div>
                        )}

                        {/* 2. Disease Prediction AI Sandbox */}
                        {activeProject.id === "disease-prediction" && (
                          <div className="space-y-4">
                            <label className="text-xs text-slate-400 font-mono block">
                              MAPPED SYMPTOMS CHECK-TELEMETRY (SELECT 1-4 CORES):
                            </label>

                            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                              {symptomOptions.map((sym) => {
                                const selected = selectedSymptoms.includes(sym);
                                return (
                                  <button
                                    key={sym}
                                    id={`symptom-${sym}`}
                                    onClick={() => handleSymptomToggle(sym)}
                                    className={`py-2 px-3 text-xs text-center border rounded-lg cursor-pointer transition-all ${
                                      selected 
                                        ? "bg-red-950/40 border-red-500/50 text-red-400 font-medium" 
                                        : "bg-slate-900/60 border-slate-800 text-slate-400 hover:text-white"
                                    }`}
                                  >
                                    {sym}
                                  </button>
                                );
                              })}
                            </div>
                          </div>
                        )}

                        {/* 3. Speech Emotion Recognition Sandbox */}
                        {activeProject.id === "speech-emotion" && (
                          <div className="space-y-4">
                            <div className="flex justify-between items-center mb-1">
                              <label className="text-xs text-slate-400 font-mono block">
                                LIVE WAVE MICROPHONE AMPLITUDE COEFFICIENT:
                              </label>
                              <span className="text-xs font-mono text-cyan-400 block font-bold">
                                {voiceVolume}% Sensor
                              </span>
                            </div>

                            <input
                              type="range"
                              min="0"
                              max="100"
                              value={voiceVolume}
                              onChange={(e) => setVoiceVolume(Number(e.target.value))}
                              className="w-full accent-cyan-500"
                            />

                            {/* Simulated active wave render visualizer */}
                            <div className="h-20 bg-slate-900 rounded-lg flex items-center justify-center gap-1 px-4 overflow-hidden border border-slate-800">
                              {[...Array(24)].map((_, idx) => {
                                const activeAmp = Math.max(
                                  4,
                                  Math.sin((idx + Date.now()/200)) * (voiceVolume * 0.7) + (20 + Math.random() * 20)
                                );
                                return (
                                  <div
                                    key={idx}
                                    style={{ height: `${Math.min(100, activeAmp)}%` }}
                                    className="w-1.5 bg-gradient-to-t from-violet-600 via-cyan-400 to-cyan-300 rounded-full transition-all duration-300"
                                  />
                                );
                              })}
                            </div>

                            <div className="text-center">
                              <button
                                onClick={() => {
                                  setAudioSensorActive(!audioSensorActive);
                                  // Randomized value sweep
                                  if(!audioSensorActive) {
                                    setVoiceVolume(Math.floor(Math.random() * 40 + 45));
                                  }
                                }}
                                className="inline-flex items-center gap-2 text-xs py-1.5 px-3 rounded-full bg-slate-900 text-slate-300 hover:text-cyan-500 border border-slate-800 hover:border-cyan-500/30 transition-all cursor-pointer"
                              >
                                {audioSensorActive ? (
                                  <>
                                    <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                                    STOP REACTION WAVE
                                  </>
                                ) : (
                                  <>
                                    <Volume2 className="w-3.5 h-3.5 text-slate-400" />
                                    DISPATCH TEST HARMONICS
                                  </>
                                )}
                              </button>
                            </div>
                          </div>
                        )}

                        {/* 4. AgriSmart AI Sandbox */}
                        {activeProject.id === "agrismart-farming" && (
                          <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <label className="text-xs text-slate-400 font-mono block mb-1.5">
                                  CROP TYPE TARGET:
                                </label>
                                <select
                                  id="crop-type-select"
                                  value={selectedCrop}
                                  onChange={(e) => setSelectedCrop(e.target.value)}
                                  className="w-full text-xs font-mono bg-slate-900 border border-slate-800 p-2 rounded-lg text-white font-semibold focus:outline-none focus:border-cyan-500"
                                >
                                  <option value="Tomato">Tomato (Solanum Lycopersicum)</option>
                                  <option value="Rice">Rice (Oryza Sativa)</option>
                                  <option value="Wheat">Wheat (Triticum Aestivum)</option>
                                  <option value="Coffee">Coffee (Rubiaceae)</option>
                                </select>
                              </div>

                              <div className="flex flex-col justify-end">
                                <span className="text-[10px] text-slate-500 font-mono leading-snug">
                                  Telemetry includes leaf necrosis patterns & humidity sensor data.
                                </span>
                              </div>
                            </div>

                            <div className="space-y-3 pt-2">
                              <span className="text-xs text-slate-400 font-mono block uppercase">
                                SOIL COMPOSITION RATIOS (NPK INDICES):
                              </span>
                              
                              <div className="grid grid-cols-3 gap-3">
                                <div>
                                  <div className="flex justify-between text-[10px] font-mono mb-1">
                                    <span className="text-orange-400">Nitrogen (N)</span>
                                    <span>{soilNitrogen}</span>
                                  </div>
                                  <input 
                                    type="range" min="10" max="100" value={soilNitrogen} 
                                    onChange={(e)=>setSoilNitrogen(Number(e.target.value))} 
                                    className="w-full accent-orange-500 h-1" 
                                  />
                                </div>
                                <div>
                                  <div className="flex justify-between text-[10px] font-mono mb-1">
                                    <span className="text-yellow-400">Phosphorus (P)</span>
                                    <span>{soilPhosphorus}</span>
                                  </div>
                                  <input 
                                    type="range" min="10" max="100" value={soilPhosphorus} 
                                    onChange={(e)=>setSoilPhosphorus(Number(e.target.value))} 
                                    className="w-full accent-yellow-500 h-1" 
                                  />
                                </div>
                                <div>
                                  <div className="flex justify-between text-[10px] font-mono mb-1">
                                    <span className="text-emerald-400">Potassium (K)</span>
                                    <span>{soilPotassium}</span>
                                  </div>
                                  <input 
                                    type="range" min="10" max="100" value={soilPotassium} 
                                    onChange={(e)=>setSoilPotassium(Number(e.target.value))} 
                                    className="w-full accent-emerald-500 h-1" 
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        )}

                        {/* 5. Credit Scoring Model Sandbox */}
                        {activeProject.id === "credit-scoring" && (
                          <div className="space-y-4">
                            
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                              <div>
                                <label className="text-[11px] text-slate-400 font-mono block mb-1">
                                  INCOME PER MONTH ($):
                                </label>
                                <input
                                  type="number"
                                  value={monthlyIncome}
                                  onChange={(e) => setMonthlyIncome(Math.max(100, Number(e.target.value)))}
                                  className="w-full text-xs font-mono bg-slate-900 border border-slate-800 p-2 rounded-lg text-white"
                                />
                              </div>

                              <div>
                                <label className="text-[11px] text-slate-400 font-mono block mb-1">
                                  DEBT RATIO DECK (%):
                                </label>
                                <input
                                  type="number"
                                  min="0"
                                  max="100"
                                  value={debtRatio}
                                  onChange={(e) => setDebtRatio(Math.min(100, Math.max(0, Number(e.target.value))))}
                                  className="w-full text-xs font-mono bg-slate-900 border border-slate-800 p-2 rounded-lg text-white"
                                />
                              </div>

                              <div>
                                <label className="text-[11px] text-slate-400 font-mono block mb-1">
                                  DELAYED REPAYMENTS:
                                </label>
                                <select
                                  value={paymentDelays}
                                  onChange={(e) => setPaymentDelays(Number(e.target.value))}
                                  className="w-full text-xs font-mono bg-slate-900 border border-slate-800 p-2 rounded-lg text-white"
                                >
                                  <option value={0}>0 Delays (Perfect)</option>
                                  <option value={1}>1 Repayment Missed</option>
                                  <option value={3}>3 Delay Cycles</option>
                                  <option value={5}>5+ Severe default flags</option>
                                </select>
                              </div>
                            </div>

                            <span className="text-[10px] text-slate-500 font-mono block leading-snug">
                              Scoring engine evaluates via Random Forest Multi-criteria thresholds against risk factors.
                            </span>

                          </div>
                        )}

                        {/* GLOW BAR GRADIENT TOP ACCENT */}
                        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-cyan-500 via-transparent to-violet-500" />
                      </div>
                    </div>

                    {/* RUN TRIGGER & RESULT PANEL */}
                    <div className="space-y-4 pt-4 border-t border-slate-800/80">
                      
                      <div className="flex justify-between items-center flex-wrap gap-4">
                        <span className="text-xs text-slate-400 font-mono">
                          Ready to execute custom dataset pipeline.
                        </span>
                        
                        <button
                          id="submit-sim-btn"
                          onClick={handleRunSimulation}
                          disabled={isSimulating}
                          className="px-6 py-2.5 rounded-lg font-mono font-bold tracking-wider text-xs bg-cyan-400 text-slate-950 flex items-center gap-2 border-none shadow-[0_0_15px_rgba(6,182,125,0.25)] hover:shadow-[0_0_25px_rgba(6,182,212,0.6)] cursor-pointer hover:bg-white transition-all disabled:opacity-50 xl:text-xs"
                        >
                          {isSimulating ? (
                            <>
                              <RefreshCw className="w-4 h-4 animate-spin text-slate-950" />
                              PROCESSING SIGNAL MATRIX...
                            </>
                          ) : (
                            <>
                              <Cpu className="w-4 h-4 text-slate-950" />
                              DEPLOY SIMULATION SCAN
                            </>
                          )}
                        </button>
                      </div>

                      {/* SIMULATION RESPONSE REPORT */}
                      {simulationResult && (
                        <div className="p-5 rounded-lg border border-cyan-500/20 bg-cyan-950/15 animate-fade-in space-y-3 relative overflow-hidden font-mono">
                          
                          <div className="flex items-center gap-2 text-cyan-400 text-xs font-bold uppercase tracking-widest border-b border-cyan-500/10 pb-2">
                            <Sparkles className="w-4 h-4 text-cyan-400 animate-pulse" /> SIMULATED ANALYSIS REPORT:
                          </div>

                          {/* 1. Fake News Output */}
                          {activeProject.id === "fake-news" && (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                              <div className="space-y-2">
                                <div>
                                  <span className="text-slate-400">CLASSIFICATION ENGINE:</span>
                                  <div className={`text-sm font-bold mt-1 ${simulationResult.isFake ? "text-red-400":"text-emerald-400"}`}>
                                    {simulationResult.status}
                                  </div>
                                </div>
                                <div>
                                  <span className="text-slate-400">INTEGRITY QUOTIENT:</span>
                                  <span className="font-bold text-white block mt-0.5">{simulationResult.integrityIndex}% score</span>
                                </div>
                              </div>

                              <div className="space-y-2">
                                <div>
                                  <span className="text-slate-400">DIAGNOSTIC TELEMETRY:</span>
                                  <p className="text-[11px] text-slate-300 leading-normal mt-0.5">{simulationResult.details}</p>
                                </div>
                                <div className="grid grid-cols-2 gap-2 text-[10px]">
                                  <div>
                                    <span className="text-slate-500">TOKENS EXAMINED:</span>
                                    <div className="text-white font-bold">{simulationResult.keywordsChecked}</div>
                                  </div>
                                  <div>
                                    <span className="text-slate-500">VECTOR MAGNITUDE:</span>
                                    <div className="text-white font-bold">{simulationResult.vectorMagnitude}</div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          )}

                          {/* 2. Disease Prediction Output */}
                          {activeProject.id === "disease-prediction" && (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                              {simulationResult.error ? (
                                <div className="col-span-2 text-red-400 flex items-center gap-1">
                                  <AlertTriangle className="w-4 h-4" /> {simulationResult.error}
                                </div>
                              ) : (
                                <>
                                  <div className="space-y-2">
                                    <div>
                                      <span className="text-slate-400">IDENTIFIED PATHOLOGY MAPPING:</span>
                                      <div className="text-sm font-bold text-red-400 mt-1">{simulationResult.pathology}</div>
                                    </div>
                                    <div>
                                      <span className="text-slate-400">PROBABILITY CONFIDENCE:</span>
                                      <span className="font-bold text-white block mt-0.5">{simulationResult.confidence}% match coefficient</span>
                                    </div>
                                    <div>
                                      <span className="text-slate-400">SEVERITY PROTOCOL:</span>
                                      <span className="font-bold text-white text-[11px] block mt-0.5">{simulationResult.severity}</span>
                                    </div>
                                  </div>

                                  <div>
                                    <span className="text-slate-400 block mb-1">AMENDING SYSTEM COUNTERMEASURES:</span>
                                    <ul className="list-disc list-inside text-[11px] text-slate-300 space-y-1">
                                      {simulationResult.countermeasures.map((cm: string, idx: number) => (
                                        <li key={idx}>{cm}</li>
                                      ))}
                                    </ul>
                                  </div>
                                </>
                              )}
                            </div>
                          )}

                          {/* 3. Speech Emotion Output */}
                          {activeProject.id === "speech-emotion" && (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                              <div className="space-y-2">
                                <div>
                                  <span className="text-slate-400">VOCODER EMOTION CLASSIFIED:</span>
                                  <div className="text-sm font-bold text-violet-400 mt-1">{simulationResult.emotion}</div>
                                </div>
                                <div>
                                  <span className="text-slate-400">FUNDAMENTAL RESONANCE PITCH:</span>
                                  <span className="font-bold text-white block mt-0.5">{simulationResult.vocalPitch}</span>
                                </div>
                                <div>
                                  <span className="text-slate-400">POSITIVE VALENCE COEFFICIENT:</span>
                                  <span className="font-bold text-white block mt-0.5">{simulationResult.valenceIndex}</span>
                                </div>
                              </div>

                              <div className="space-y-2">
                                <span className="text-slate-400 block">EXTRACTED ACOUSTIC COEFFICIENTS:</span>
                                <div className="grid grid-cols-2 gap-2 text-[11px]">
                                  <div>
                                    <span className="text-slate-500">MFCC INTENSITY:</span>
                                    <div className="text-white font-semibold">{simulationResult.extractedAcoustics.mfccIndex}</div>
                                  </div>
                                  <div>
                                    <span className="text-slate-500">JITTER RATIO %:</span>
                                    <div className="text-white font-semibold">{simulationResult.extractedAcoustics.jitterPct}</div>
                                  </div>
                                  <div className="col-span-2">
                                    <span className="text-slate-500">HARMONIC-TO-NOISE INDEX:</span>
                                    <div className="text-white font-semibold">{simulationResult.extractedAcoustics.harmonicity}</div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          )}

                          {/* 4. AgriSmart Output */}
                          {activeProject.id === "agrismart-farming" && (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                              <div className="space-y-2">
                                <div>
                                  <span className="text-slate-400">LEAF MICRO-PATHOLOGY AUDIT:</span>
                                  <div className="text-sm font-bold text-emerald-400 mt-1">{simulationResult.healthCondition}</div>
                                </div>
                                <div>
                                  <span className="text-slate-400">CRITICAL AGRO THREAT WARNING:</span>
                                  <span className="font-bold block mt-0.5 text-white">{simulationResult.cropThreatStatus}</span>
                                </div>
                                <div className="text-[11px] text-slate-400 bg-slate-900/60 p-2 rounded border border-slate-800">
                                  {simulationResult.NPKFeedback}
                                </div>
                              </div>

                              <div className="space-y-2">
                                <span className="text-slate-400 block mb-1">SOIL NPK NUTRIENT OPTIMIZATION METRIC:</span>
                                <div className="space-y-1 bg-slate-900/60 p-3 rounded-lg border border-slate-800 text-[11px]">
                                  <div>
                                    <span className="text-orange-400">Nitrogen adjustment:</span>
                                    <div className="text-white font-semibold">{simulationResult.requiredAmendingMatrix.nitrogen}</div>
                                  </div>
                                  <div className="mt-1">
                                    <span className="text-yellow-400">Phosphorus adjustment:</span>
                                    <div className="text-white font-semibold">{simulationResult.requiredAmendingMatrix.phosphorus}</div>
                                  </div>
                                  <div className="mt-1">
                                    <span className="text-emerald-400">Potassium adjustment:</span>
                                    <div className="text-white font-semibold">{simulationResult.requiredAmendingMatrix.potassium}</div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          )}

                          {/* 5. Credit Scoring Output */}
                          {activeProject.id === "credit-scoring" && (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                              <div className="space-y-2">
                                <div>
                                  <span className="text-slate-400">LOAN ELIGIBILITY STATUS:</span>
                                  <div className={`text-sm font-bold mt-1 uppercase ${simulationResult.verdictColorClass}`}>
                                    {simulationResult.automatedSystemVerdict}
                                  </div>
                                </div>
                                <div>
                                  <span className="text-slate-400">CALCULATED CREDIT RATING:</span>
                                  <span className="font-bold text-white block mt-0.5">{simulationResult.scoringEngineRating}</span>
                                </div>
                                <div>
                                  <span className="text-slate-400">UNDERWRITING RISK TIER:</span>
                                  <span className="font-bold text-white block mt-0.5 text-[11px]">{simulationResult.underwritingRisk}</span>
                                </div>
                              </div>

                              <div className="space-y-2">
                                <div>
                                  <span className="text-slate-400">MAPPED SYSTEM STATS:</span>
                                  <div className="space-y-1 text-[11px] mt-1">
                                    <div className="flex justify-between border-b border-slate-800 pb-1">
                                      <span className="text-slate-500">DEBT-TO-INCOME LOAD:</span>
                                      <span className="text-white font-semibold">{simulationResult.debtLoadFactor}</span>
                                    </div>
                                    <div className="flex justify-between pt-1">
                                      <span className="text-slate-500">PROBABILITY OF DEFAULT:</span>
                                      <span className="text-white font-semibold">{simulationResult.probabilityOfDefault}</span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          )}

                          {/* Decorative technical line */}
                          <div className="absolute top-1 right-2 text-[8px] text-cyan-400/40 font-mono select-none">
                            SECURE CORE PIPELINE RES_VALID
                          </div>
                        </div>
                      )}
                    </div>

                  </div>
                )}

              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
