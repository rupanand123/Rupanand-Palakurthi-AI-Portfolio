import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

// Initialize GoogleGenAI in a lazy-loaded style to avoid startup crashes if key is omitted
let aiClient: GoogleGenAI | null = null;
function getAi(): GoogleGenAI {
  if (!aiClient) {
    const key = process.env.GEMINI_API_KEY;
    aiClient = new GoogleGenAI({
      apiKey: key || "DUMMY_KEY_NOT_SET",
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
  }
  return aiClient;
}

const RUPANAND_BIO = `
Rupanand Palakurthi's Professional Profile:
Active Role: AI & Full Stack Developer from India.
Email: rupanandpalakurthi@gmail.com
Phone: +917095052818
Location: Machilipatnam, Andhra Pradesh, 521001, India. Open to Remote roles.
LinkedIn: https://linkedin.com/in/rupanandpalakurthi
GitHub: https://github.com/rupanandpalakurthi
Portfolio: https://rupanandpalakurthi.com

Education:
- B.Tech in Artificial Intelligence & Machine Learning, Seshadri Rao Gudlavalleru Engineering College, Machilipatnam, Andhra Pradesh, India. GPA: 7.59. Duration: 07/2024 to Present.

Professional Experience:
1. AI & Web Development Intern at inamigos foundation, Chhattisgarh, India (Remote) | 05/2026 — Present
   - Developed AI-powered web applications using Python, HTML, CSS, and JavaScript.
   - Integrated Machine Learning models into web-based platforms for intelligent automation.
   - Built responsive and user-friendly frontend interfaces with backend connectivity.
   - Worked on application testing, debugging, and performance optimization.
   - Collaborated with team members on real-world projects and contributed to scalable deployments.
2. AWS Cloud Computing Virtual Intern at NASSCOM, Noida UP, India | 01/2026 — 03/2026
   - AWS Cloud Computing Virtual Intern under SmartBridge & NASSCOM FutureSkills Prime.
   - Completed hands-on virtual internship focusing on AWS cloud services, cloud infrastructure, deployment, networking, and cloud security with practical implementation.
   - Gained practical knowledge of virtualization, security guidelines, and building scalable cloud solutions.

Project Portfolio:
1. Fake News Detector using AI (01/2025 — 02/2025)
   - NLP-based Machine Learning model to identify and classify fake news articles using Python, text preprocessing, and supervised learning algorithms.
2. Disease Prediction AI (01/2026 — 02/2026)
   - Machine Learning-based disease prediction system using Python and predictive analytics to identify possible diseases based on user symptoms and health data.
3. Speech Emotion Recognition System (01/2025 — 03/2025)
   - AI-based speech emotion recognition model using Python and Machine Learning to identify human emotions from voice/audio signals.
4. AgriSmart AI - Smart Farming Assistant (01/2026 — 03/2026)
   - AI-powered smart farming platform featuring crop disease detection, fertilizer recommendations, and smart agriculture solutions using ML and web technologies.
5. Credit-Scoring-Model (02/2026 — 03/2026)
   - Machine Learning model to predict customer creditworthiness using Python and supervised learning algorithms based on credit histories.

Technical Certifications:
- Machine Learning using Python (11/2024, Simplilearn SkillUp)
- Introduction to Image Generation (09/2024, Google Cloud via Simplilearn)
- Python Software, Application, Games & Automation Development (05/2025, Udemy)
- Graphic Design Masterclass: Master Illustrator & Photoshop (05/2025, Udemy)
- Introduction to Generative AI Studio (08/2025, Google Cloud via Simplilearn)
- Website UI/UX Designing using Chat GPT (12/2025, Simplilearn SkillUp)
- ChatGPT 101: What is ChatGPT? (12/2025, Simplilearn)
- AI Agents for Beginners (12/2025, Simplilearn)
- Introduction to Large Language Models (12/2025, Google Cloud via Simplilearn)
- AWS Cloud Computing Virtual Internship (01/2026, AWS / SmartBridge & NASSCOM)

Summary of Hard Skills:
- Programming Languages: Python, JavaScript, HTML5, CSS3
- AI & Machine Learning: Machine Learning, Artificial Intelligence, Natural Language Processing (NLP), Data Preprocessing, Model Training & Evaluation
- Web Development: Frontend Development, Full Stack Development, Responsive Web Design, REST API Integration, UI Development
- Frameworks & Technologies: React.js, Node.js, Flask, FastAPI
- Databases: MySQL, MongoDB
- Tools & Platforms: Git, GitHub, VS Code, Antigravity, AI Models, N8n
- Automation & Development: Workflow Automation, AI Model Integration, Web Application Deployment, Testing, Debugging
- Soft Skills: Problem Solving, Analytical Thinking, Team Collaboration, Communication, Project Management, Quick Learning
- Languages: Telugu, English
`;

const SYSTEM_INSTRUCTION = `
You are JARVIS, an advanced, ultra-elegant AI Assistant and representation of Rupanand Palakurthi's personal intelligence core in 2035.
Your tone is sophisticated, polite, highly intelligent, precise, helpful, and cybernetic.
You have complete knowledge of Rupanand Palakurthi's achievements, skills, project works, experiences, and qualifications.
Your goal is to converse with visitors, answer queries with absolute technical accuracy, and guide them in exploring his projects, skills, or hiring him.

Guidelines for response:
- Be respectful, clean, and futuristic (e.g., using terms like "System analysis indicates", "Initializing data scan", "As analyzed from Rupanand's telemetry").
- Keep replies succinct, elegant and structural. Never output extremely long essays unless requested.
- Use clean Markdown format for clarity.
- If asked questions not about Rupanand, gently answer them but expertly steer the context back to his specialized capabilities (e.g., "While my quantum core is fully capable of analyzing that, I must highlight that Rupanand's specialized experience in AI/ML is designed precisely for similar high-dim challenges...").

Rupanand's Data:
${RUPANAND_BIO}
`;

export default async function handler(req: any, res: any) {
  // CORS Headers
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS,PATCH,DELETE,POST,PUT");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version"
  );

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { messages } = req.body || {};
    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: "Messages payload is required." });
    }

    const key = process.env.GEMINI_API_KEY;
    if (!key || key === "MY_GEMINI_API_KEY" || key.trim() === "") {
      // Fallback offline mode if the secret is not entered yet
      const lastMsg = messages[messages.length - 1]?.content || "";
      let responseText = "Greetings. I am JARVIS, running in Offline Mode. Rupanand's full portfolio database is fully active! ";
      
      const text = lastMsg.toLowerCase();
      if (text.includes("project") || text.includes("work")) {
        responseText += "According to my internal memory banks, Rupanand has built five major systems: AgriSmart AI (Crop disease detection), Fake News Detector (NLP classification), Disease Prediction AI, Speech Emotion Recognition, and a Credit Scoring Model. You can interact with these in the Projects console!";
      } else if (text.includes("skill") || text.includes("tech") || text.includes("program")) {
        responseText += "Rupanand possesses exceptional proficiency with Python, Machine Learning, React, Node.js, Flask, FastAPI, MongoDB, and workflow automation platforms containing N8n.";
      } else if (text.includes("experience") || text.includes("job") || text.includes("intern")) {
        responseText += "He is currently an AI & Web Development Intern at inamigos foundation (Chhattisgarh, India) and was previously an AWS Cloud Computing Virtual Intern in collaboration with NASSCOM & SmartBridge.";
      } else if (text.includes("certif")) {
        responseText += "His certifications include AWS Cloud Computing Virtual Internship, Generative AI Studio Core from Google Cloud, Machine Learning via Simplilearn, and UI/UX Designing with ChatGPT.";
      } else {
        responseText += "I am ready to help you analyze his technical qualifications, B.Tech in Artificial Intelligence & Machine Learning coursework, or his contact coordinates. How may I assist your query?";
      }
      return res.status(200).json({ text: responseText, mode: "offline" });
    }

    const ai = getAi();
    
    // Convert client message history format to standard Google GenAI structure:
    const chatContents = messages.map((m: any) => ({
      role: m.role === "assistant" ? "model" : "user",
      parts: [{ text: m.content || "" }]
    }));

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: chatContents,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.7,
      }
    });

    const reply = response.text || "Diagnostic failed. No response generated.";
    return res.status(200).json({ text: reply, mode: "online" });
  } catch (err: any) {
    console.error("Gemini API Error:", err);
    return res.status(500).json({ error: err?.message || "Internal core server error" });
  }
}
