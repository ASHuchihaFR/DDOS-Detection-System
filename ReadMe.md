🛡️ NetGuardAI - Hybrid DDoS Detection System

Real-time AI-powered Network Security Dashboard for detecting DDoS attacks using a Hybrid Ensemble Machine Learning Model.










📋 Overview

Traditional firewalls rely on static rule-based systems, such as IP blocking or port thresholds. Modern DDoS attacks intelligently mimic legitimate user traffic, making them hard to detect using static filters.

NetGuardAI solves this challenge using Hybrid Machine Learning to analyze behavioral network patterns—like packet flow, protocol distribution, duration, and frequency—and intelligently differentiate between legitimate heavy traffic (e.g., live streaming) and malicious DDoS attacks.

🚀 Key Features

✔ Hybrid AI Engine:
🧠 Voting Ensemble (Decision Tree + KNN + Naive Bayes)
🔍 Random Forest-based Validation Layer for boosting confidence

✔ Real-Time Detection:
⚡ WebSocket-driven architecture with <50 ms detection latency

✔ Live Traffic Visualization:
📊 Interactive graphs using Recharts for data flow and attack spikes

✔ Manual Packet Inspector:
🔬 Test suspicious packets manually via frontend sandbox

✔ Production-Ready API:
📡 REST API + WebSocket support using FastAPI

🏗️ System Architecture
                 ┌──────────────────────────┐
                 │   Live Traffic / Simulated│
                 │     Packet Generator      │
                 └─────────────┬─────────────┘
                               │
                               ▼
 ┌───────────────────────────────────────────────────────┐
 │                    🧠 FastAPI Backend                 │
 │  ┌───────────────┐       ┌────────────────────────┐   │
 │  │ ML Inference  │──────▶│ Hybrid Model (Voting + │   │
 │  │  Engine       │◀──────│ RandomForest Validator)│   │
 │  └───────────────┘       └────────────────────────┘   │
 │         │                        │                    │
 │   REST API & WebSocket       Packet Scoring           │
 └─────────┬─────────────────────────────────────────────┘
           │
           ▼
 ┌───────────────────────────────────────────────────────┐
 │            💻 React + Tailwind Frontend               │
 │   ┌────────────────────┐   ┌────────────────────┐     │
 │   │ Live Attack Alerts │   │ Packet Lab Sandbox │     │
 │   └────────────────────┘   └────────────────────┘     │
 └───────────────────────────────────────────────────────┘

📦 Directory Structure
NetGuardAI/
├── backend/
│   ├── main.py               # FastAPI Server & WebSocket
│   ├── train_model.py        # ML Model Training Script
│   ├── model_loader.py       # Load & Inference Logic
│   ├── preprocessing.py      # Feature Engineering
│   └── ddos_detector.pkl     # Saved ML Model
│
├── frontend/
│   ├── src/
│   │   ├── App.js            # React Dashboard
│   │   ├── components/       # UI Widgets
│   │   └── styles.css        # Tailwind Styling
│   ├── package.json
│   └── tailwind.config.js
│
└── README.md

⚙️ Installation & Setup
▶ Backend Setup (FastAPI Server + ML Model)
cd backend

# Install dependencies
pip install -r requirements.txt

# Train the ML model (Generates ddos_detector.pkl)
python train_model.py

# Start FastAPI Server
uvicorn main:app --reload


📡 Backend will run at:
👉 http://127.0.0.1:8000

💻 Frontend Setup (React Dashboard)
cd frontend

# Install dependencies
npm install

# Run frontend
npm start


🌐 Dashboard will open at:
👉 http://localhost:3000

🧠 AI Model Insights
Algorithm	Role	Strength
Decision Tree	Primary Classifier	Handles non-linear traffic rules
Naive Bayes	Statistical Classifier	Fast and robust in probabilities
KNN	Traffic Similarity	Good for behavior pattern match
Random Forest	Validator Layer	Final risk scoring & reduction of false alarms
🔎 Real Example:
Scenario	Traffic Behavior	NetGuardAI Decision
10,000 packets/sec HTTPS	Long duration, consistent IPs	Benign (Download)
Rapid UDP bursts on random ports	Short duration, unstable RPS	DDoS Attack
✨ Features in the Dashboard
Feature	Description
🟢 Live Threat Monitor	Shows real-time attack alerts
📊 Traffic Analyzer	Visualizes packet trends & anomalies
🧪 Packet Sandbox	Manually test and score network packets
🔔 Alert System	Automatic alerts for high-risk packets
📥 Export Logs	Save traffic snapshot as CSV
🔮 Future Enhancements

🚀 Live Packet Sniffing: Integrate Scapy / Wireshark to capture real network traffic
🛑 Firewall Auto-Blocking: Sync with iptables or AWS WAF to block malicious IPs
🗃️ Threat Database: Store attack metadata in MongoDB for forensic analysis
🌐 Cloud Deployment: Deploy using Docker, Kubernetes, or AWS Lambda

👨‍💻 Author

Ashish Chauhan
💻 Full Stack Developer & AI Enthusiast
🔐 Specializing in Cyber Security & Forensics

📧 Email: chauhan.ashish250204@gmail.com


