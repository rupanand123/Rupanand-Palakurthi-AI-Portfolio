export interface MachineLearningProject {
  id: string;
  title: string;
  period: string;
  description: string;
  longDescription: string;
  techStack: string[];
  githubLink: string;
  category: "NLP" | "Deep Learning" | "Predictive AI" | "Smart IoT";
  stats: { label: string; value: string }[];
}

export interface CertificationItem {
  name: string;
  date: string;
  issuer: string;
  link: string;
  badgeColor: string;
}

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  location: string;
  period: string;
  description: string[];
  techUsed: string[];
}

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: string;
}

// Full Rupanand portfolio dataset
export const SKILLS_DATA = [
  { name: "Python", category: "Core", percentage: 95, iconName: "Terminal", glowColor: "from-cyan-400 to-blue-500" },
  { name: "ML / Predict", category: "AI & ML", percentage: 92, iconName: "Cpu", glowColor: "from-purple-400 to-indigo-600" },
  { name: "NLP", category: "AI & ML", percentage: 88, iconName: "MessageSquareText", glowColor: "from-pink-400 to-rose-500" },
  { name: "React.js", category: "Web Dev", percentage: 85, iconName: "Atom", glowColor: "from-cyan-400 to-teal-500" },
  { name: "FastAPI", category: "Backend", percentage: 86, iconName: "Zap", glowColor: "from-indigo-400 to-violet-500" },
  { name: "Flask", category: "Backend", percentage: 90, iconName: "Flame", glowColor: "from-orange-400 to-red-500" },
  { name: "Node.js", category: "Backend", percentage: 82, iconName: "Layers", glowColor: "from-green-400 to-emerald-500" },
  { name: "MongoDB", category: "Database", percentage: 84, iconName: "Database", glowColor: "from-emerald-400 to-green-600" },
  { name: "Git", category: "Tools", percentage: 90, iconName: "GitMerge", glowColor: "from-blue-400 to-cyan-500" },
  { name: "N8n Hub", category: "Automation", percentage: 94, iconName: "Workflow", glowColor: "from-orange-400 to-amber-500" }
];

export const EXPERIENCE_DATA: ExperienceItem[] = [
  {
    id: "exp-1",
    role: "AI & Web Development Intern",
    company: "inamigos foundation",
    location: "Chhattisgarh, India (Remote)",
    period: "05/2026 — Present",
    description: [
      "Developed advanced AI-powered web applications using Python, HTML, CSS, JavaScript, and React.",
      "Integrated complex Machine Learning models into web-based platforms, delivering backend connectivity and intelligent automations.",
      "Engineered highly responsive user-friendly interfaces, optimizing app loading and rendering metrics.",
      "Collaborated on real-world multi-developer coding streams, adhering to agile methodologies and version control pipelines."
    ],
    techUsed: ["Python", "HTML5", "CSS3", "JavaScript", "Machine Learning", "FastAPI", "React", "Git"]
  },
  {
    id: "exp-2",
    role: "AWS Cloud Computing Virtual Intern",
    company: "NASSCOM & SmartBridge",
    location: "Noida Uttar Pradesh, India",
    period: "01/2026 — 03/2026",
    description: [
      "Secured structured virtual training on AWS cloud services, cloud infrastructure management, server deployment, and database routing.",
      "Acquired hands-on implementation experience across security controls, virtualization instances, VPC setup, and scalable cloud architectures.",
      "Evaluated cloud performance metrics, and automated basic deployment scripts matching modern enterprise guidelines."
    ],
    techUsed: ["AWS Core Services", "Cloud Infrastructure", "Virtualization", "Cloud Security", "VPC Networking"]
  }
];

export const PROJECTS_DATA: MachineLearningProject[] = [
  {
    id: "fake-news",
    title: "Fake News Detector",
    period: "01/2025 — 02/2025",
    description: "An NLP-based intelligence model that inspects text articles to flag bias, propaganda, or fraudulent news.",
    longDescription: "Built a fully-trained Natural Language Processing model to identify, classify, and isolate fake news articles. Uses sophisticated text preprocessing (stopword removal, stemming/lemmatization) joined with supervised machine learning algorithms to achieve robust predictive scores against noisy text corpuses.",
    techStack: ["Python", "NLP", "Scikit-Learn", "NLTK", "TF-IDF Vectorization", "Random Forest"],
    githubLink: "https://github.com/rupanandpalakurthi",
    category: "NLP",
    stats: [
      { label: "Accuracy", value: "96.4%" },
      { label: "Model Type", value: "Supervised Classification" },
      { label: "Dataset Size", value: "20,000+ Articles" }
    ]
  },
  {
    id: "disease-prediction",
    title: "Disease Prediction AI",
    period: "01/2026 — 02/2026",
    description: "Medical predictive model mapping user-reported symptoms and health history telemetry to potential diseases.",
    longDescription: "A smart healthcare assistant running predictive analytics engine. Built under the vision of diagnostic empowerment, the system receives complex nested arrays of symptoms, validates them using ML models, and outputs highly weighted prediction arrays along with caution alerts.",
    techStack: ["Python", "Flask", "Pandas", "Scikit-Learn", "SVM Classifier", "Decision Trees"],
    githubLink: "https://github.com/rupanandpalakurthi",
    category: "Predictive AI",
    stats: [
      { label: "Symptom Classes", value: "135+ Checked" },
      { label: "Precise Diagnosis", value: "94.8% Score" },
      { label: "Response Latency", value: "<15ms" }
    ]
  },
  {
    id: "speech-emotion",
    title: "Speech Emotion Recognition",
    period: "01/2025 — 03/2025",
    description: "Multi-modal audio signal analysis framework classifying human vocal emotions from audio frequencies.",
    longDescription: "An advanced Deep Learning / ML speech system. It extracts critical audio features like Mel-Frequency Cepstral Coefficients (MFCCs), chroma, and spectral contrast from voice signals to recognize happy, sad, angry, surprised, or fearful human states with high acoustic precision.",
    techStack: ["Python", "Librosa", "Audio Feature Extraction", "MFCCs", "Multi-Layer Perceptron", "FastAPI"],
    githubLink: "https://github.com/rupanandpalakurthi",
    category: "Deep Learning",
    stats: [
      { label: "F1-Score", value: "91.2%" },
      { label: "Feature Vectors", value: "40 MFCC Variables" },
      { label: "Sample Rate", value: "24.5 kHz Audio" }
    ]
  },
  {
    id: "agrismart-farming",
    title: "AgriSmart AI Assistant",
    period: "01/2026 — 03/2026",
    description: "An intelligent precision-farming assistant supporting crop disease diagnostics, NPK recommendations, and tasks.",
    longDescription: "A smart agriculture platform that unites ML and web systems. Features real-time crop disease detection through leaf image analyzing, chemical composition fertilizer suggestions, and local soil environment mapping to boost traditional farm harvests.",
    techStack: ["Python", "FastAPI", "React.js", "Computer Vision", "Plant Pathology CNN", "XGBoost"],
    githubLink: "https://github.com/rupanandpalakurthi",
    category: "Smart IoT",
    stats: [
      { label: "Pathologies", value: "35 Crop Leaf Diseases" },
      { label: "Soil Sensors", value: "NPK Automated Match" },
      { label: "Core Frame", value: "Full-Stack Web App" }
    ]
  },
  {
    id: "credit-scoring",
    title: "Credit Scoring Engine",
    period: "02/2026 — 03/2026",
    description: "Risk assessment model analyzing credit history to predict customer loan viability and scoring risk tier.",
    longDescription: "An automated financial ML pipeline. Built to resolve applicant assessment latency, the classifier analyzes indicators like debt ratios, historical defaults, income indices, and demographic weights to output instant risk tiers and creditworthiness indexes.",
    techStack: ["Python", "Pandas", "Random Forest Classifier", "ROC-AUC Evaluation", "FastAPI", "MongoDB"],
    githubLink: "https://github.com/rupanandpalakurthi",
    category: "Predictive AI",
    stats: [
      { label: "AUC Score", value: "0.93 Index" },
      { label: "Processing", value: "Multi-Threaded Pipelines" },
      { label: "Decision Engine", value: "Dynamic Thresholding" }
    ]
  }
];

export const CERTIFICATIONS_DATA: CertificationItem[] = [
  {
    name: "Machine Learning using Python",
    date: "11/2024",
    issuer: "Simplilearn SkillUp",
    link: "https://simplilearn.com",
    badgeColor: "text-cyan-400 border-cyan-500/30 bg-cyan-950/20"
  },
  {
    name: "AWS Cloud Computing Virtual Internship",
    date: "01/2026",
    issuer: "SmartBridge & NASSCOM FutureSkills Prime",
    link: "https://smartbridge.com",
    badgeColor: "text-amber-400 border-amber-500/30 bg-amber-950/20"
  },
  {
    name: "Introduction to Generative AI Studio",
    date: "08/2025",
    issuer: "Google Cloud (via Simplilearn)",
    link: "https://cloud.google.com",
    badgeColor: "text-blue-400 border-blue-500/30 bg-blue-950/20"
  },
  {
    name: "Introduction to Image Generation",
    date: "09/2024",
    issuer: "Google Cloud (via Simplilearn)",
    link: "https://cloud.google.com",
    badgeColor: "text-cyan-400 border-cyan-500/30 bg-cyan-950/20"
  },
  {
    name: "Introduction to Large Language Models",
    date: "12/2025",
    issuer: "Google Cloud (via Simplilearn)",
    link: "https://cloud.google.com",
    badgeColor: "text-violet-400 border-violet-500/30 bg-violet-950/20"
  },
  {
    name: "Python Software, Games & Automation",
    date: "05/2025",
    issuer: "Udemy Certified",
    link: "https://udemy.com",
    badgeColor: "text-pink-400 border-pink-500/30 bg-pink-950/20"
  },
  {
    name: "Website UI/UX Designing using ChatGPT",
    date: "12/2025",
    issuer: "Simplilearn SkillUp",
    link: "https://simplilearn.com",
    badgeColor: "text-emerald-400 border-emerald-500/30 bg-emerald-950/20"
  },
  {
    name: "AI Agents for Beginners",
    date: "12/2025",
    issuer: "Simplilearn SkillUp",
    link: "https://simplilearn.com",
    badgeColor: "text-indigo-400 border-indigo-500/30 bg-indigo-950/20"
  }
];
