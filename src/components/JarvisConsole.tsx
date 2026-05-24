import { useState, useRef, useEffect } from "react";
import { 
  Send, 
  Terminal as TermIcon, 
  Sparkles, 
  HelpCircle, 
  RefreshCw, 
  Volume2, 
  Lock, 
  X,
  Radio
} from "lucide-react";
import { ChatMessage } from "../types";

// HTML5 Synthesized Audio Oscillator sound generator for futuristic cyber interface feedback
const playCyberBeep = (frequency = 900, duration = 0.08, type: OscillatorType = "sine") => {
  try {
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContextClass) return;
    const ctx = new AudioContextClass();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = type;
    osc.frequency.value = frequency;

    gain.gain.setValueAtTime(0.03, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + duration);
  } catch (e) {
    // Silently proceed if browser blocks sound interaction initially
  }
};

export default function JarvisConsole() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "initial-system",
      role: "assistant",
      content: "System diagnostics completed. All quantum cores online. Greetings, I am JARVIS, representation of Rupanand Palakurthi's developmental core. My databases are live. Instruct me on which telemetry coordinates you would like to analyze, or ask me anything regarding Rupanand's AI/ML engineering capabilities.",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isPending, setIsPending] = useState(false);
  const [audioFeedback, setAudioFeedback] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  // Auto scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isPending]);

  // Cyber sound trigger wrapper
  const triggerAudioBeep = (freq = 850, dur = 0.08) => {
    if (audioFeedback) playCyberBeep(freq, dur);
  };

  const presetQueries = [
    { label: "Check GPA & College", query: "What are your education credentials, college, and B.Tech GPA?" },
    { label: "AWS Cloud Intern", query: "Explain your experience at NASSCOM and AWS Cloud Computing Internship" },
    { label: "AgriSmart AI details", query: "Explain the AgriSmart AI smart farming project details" },
    { label: "Google Cloud Certifications", query: "What Google Cloud or AWS certifications do you possess?" },
    { label: "Hiring Coordinates", query: "How can I contact or hire Rupanand Palakurthi?" }
  ];

  const handleSendMessage = async (textToSend: string) => {
    if (!textToSend.trim() || isPending) return;

    triggerAudioBeep(1000, 0.06);

    const userMsg: ChatMessage = {
      id: "usr-" + Date.now(),
      role: "user",
      content: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInputValue("");
    setIsPending(true);

    try {
      // Build message payload
      const payloadMessages = [...messages, userMsg].map(m => ({
        role: m.role,
        content: m.content
      }));

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: payloadMessages })
      });

      if (!res.ok) {
        throw new Error("Core connection interrupted.");
      }

      const data = await res.json();
      
      triggerAudioBeep(650, 0.15);

      setMessages(prev => [
        ...prev,
        {
          id: "jarvis-" + Date.now(),
          role: "assistant",
          content: data.text || "Connection loss detected from AI Core.",
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    } catch (err: any) {
      console.error(err);
      triggerAudioBeep(300, 0.3); // low failure sound
      setMessages(prev => [
        ...prev,
        {
          id: "err-" + Date.now(),
          role: "assistant",
          content: `⚡ **SYSTEM DIAGNOSTIC FAULT**: ${err?.message || "Quantum signal channel timed out."} JARVIS indicates Offline Mode. Rupanand can be contacted directly at **rupanandpalakurthi@gmail.com** or **+917095052818** to secure communication rules.`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    } finally {
      setIsPending(false);
    }
  };

  const clearConsoleLogs = () => {
    triggerAudioBeep(400, 0.1);
    setMessages([
      {
        id: "sys-reboot",
        role: "assistant",
        content: "JARVIS session history purged. Kernel reinitialized. Standing by.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
  };

  return (
    <div id="jarvis-ai-terminal" className="glass-panel-cyan rounded-2xl overflow-hidden border border-cyan-500/20 flex flex-col h-[520px] shadow-[0_15px_35px_rgba(0,0,0,0.6)] relative">
      
      {/* HUD System Header Bar */}
      <div className="bg-slate-950/90 py-3 px-5 border-b border-cyan-500/25 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="relative flex items-center justify-center">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping absolute" />
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400" />
          </div>
          <span className="font-display text-xs tracking-[0.2em] font-black text-white flex items-center gap-1.5 uppercase">
            <Radio className="w-3.5 h-3.5 text-cyan-400 animate-pulse" /> JARVIS v2.35 CORE INTELLIGENCE
          </span>
        </div>

        {/* Console control options */}
        <div className="flex items-center gap-3">
          
          {/* Beep sound toggle */}
          <button
            onClick={() => {
              setAudioFeedback(!audioFeedback);
              if(!audioFeedback) playCyberBeep(900, 0.05);
            }}
            title={audioFeedback ? "Disable Beep Synth" : "Enable Beep Synth"}
            className={`p-1.5 rounded hover:bg-slate-900 transition-all cursor-pointer ${audioFeedback ? "text-cyan-400":"text-slate-500"}`}
          >
            <Volume2 className="w-4 h-4" />
          </button>

          {/* Wipe log button */}
          <button
            onClick={clearConsoleLogs}
            title="Purge Console History"
            className="p-1.5 rounded text-slate-400 hover:text-red-400 hover:bg-slate-900 transition-all cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Terminal Grid Background Overlay */}
      <div className="absolute inset-0 bg-grid-shift opacity-5 pointer-events-none" />

      {/* Chat Logs Window Panel */}
      <div className="flex-1 p-5 overflow-y-auto space-y-4 font-mono text-xs md:text-sm bg-slate-950/70 relative z-10">
        {messages.map((msg) => {
          const isUser = msg.role === "user";
          return (
            <div
              key={msg.id}
              className={`flex flex-col ${isUser ? "items-end text-right" : "items-start text-left"} space-y-1 animate-fade-in`}
            >
              {/* Name Tag */}
              <div className="flex items-center gap-2 text-[10px] text-slate-500 uppercase tracking-wider">
                <span>{isUser ? "Visitor Index" : "J.A.R.V.I.S. (2035 Core)"}</span>
                <span>•</span>
                <span>{msg.timestamp}</span>
              </div>

              {/* Speech container */}
              <div
                className={`max-w-[85%] rounded-xl p-3 md:p-4 leading-relaxed ${
                  isUser
                    ? "bg-cyan-950/50 text-cyan-200 border border-cyan-500/35 rounded-tr-none text-shadow-cyan"
                    : "bg-slate-900/40 text-slate-300 border border-slate-800 rounded-tl-none whitespace-pre-line"
                }`}
              >
                {/* Clean inline markdown lists/highlights */}
                {msg.content.includes("**") ? (
                  // Simple renderer to avoid importing heavy markdown components
                  msg.content.split("\n").map((line, i) => {
                    let cleaned = line;
                    cleaned = cleaned.replace(/\*\*(.*?)\*\*/g, "$1");
                    return (
                      <p key={i} className={cleaned.startsWith("-") || cleaned.startsWith("*") ? "pl-3 text-cyan-300 mt-1" : "mt-1 text-slate-200"}>
                        {line}
                      </p>
                    );
                  })
                ) : (
                  msg.content
                )}
              </div>
            </div>
          );
        })}

        {isPending && (
          <div className="flex items-center gap-2.5 text-cyan-400 animate-pulse font-bold tracking-widest text-[11px] py-2">
            <RefreshCw className="w-3.5 h-3.5 animate-spin" />
            ANAL_CORE_SIGNAL PROCESS IN PROGRESS...
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Preset Suggestion Chips Panel */}
      <div className="p-3 bg-slate-950/80 border-t border-slate-900 relative z-10 flex gap-1.5 overflow-x-auto no-scrollbar">
        {presetQueries.map((item, idx) => (
          <button
            key={idx}
            onClick={() => handleSendMessage(item.query)}
            className="flex-shrink-0 px-3 py-1 text-[11px] font-mono rounded-lg bg-slate-900 hover:bg-cyan-950/40 border border-slate-800 hover:border-cyan-500/30 text-slate-400 hover:text-cyan-400 cursor-pointer transition-all"
          >
            <HelpCircle className="w-3 h-3 text-cyan-500 inline mr-1" /> {item.label}
          </button>
        ))}
      </div>

      {/* Message Submission Area */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSendMessage(inputValue);
        }}
        className="p-4 bg-slate-950/95 border-t border-cyan-500/25 relative z-10 flex gap-3 items-center"
      >
        <div className="flex-1 relative">
          <input
            type="text"
            id="jarvis-terminal-input"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onFocus={() => triggerAudioBeep(880, 0.04)}
            placeholder="Instruct JARVIS (e.g. 'Show me his Flask projects' or type hello)..."
            className="w-full font-mono text-sm bg-slate-900 border-glow-cyan text-white rounded-xl py-3 pl-4 pr-10 focus:outline-none transition-all placeholder:text-slate-500"
          />
          <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[10px] text-cyan-500/40 select-none font-bold font-mono">
            SYS_CMD
          </span>
        </div>

        <button
          type="submit"
          id="send-cmd-btn"
          disabled={!inputValue.trim() || isPending}
          className="p-3 rounded-xl bg-cyan-500 text-slate-950 font-bold transition-all hover:bg-white disabled:opacity-40 disabled:hover:bg-cyan-400 cursor-pointer shadow-[0_0_15px_rgba(6,182,125,0.25)] flex items-center justify-center border-none"
        >
          <Send className="w-4 h-4 text-slate-950" />
        </button>
      </form>
    </div>
  );
}
