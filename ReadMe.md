# 🛡️ DDoS Detection System (NetGuard AI)

A full-stack **Network Intrusion & DDoS Detection System** using **Machine Learning, FastAPI, and React**, designed to detect real-time DDoS attacks (SYN Flood, TCP/UDP Flood, ICMP Flood) from live or offline network traffic.

It features a **real-time dashboard**, **REST API**, **ML prediction model**, and **visual analytics**.

---

## 🚀 Key Features

✔ Real-time attack detection using ML
✔ Classifies Attack Types: TCP SYN Flood, UDP Flood, ICMP Flood, Normal
✔ Interactive dashboard: traffic graphs, live statistics
✔ Frontend built using **React + Vite + Tailwind CSS**
✔ Backend API using **FastAPI**
✔ Trained using **Random Forest / XGBoost / Logistic Regression**
✔ Works with **CSV / PCAP datasets**
✔ REST API endpoint for third-party integration

---

## 🏛 Architecture Overview

```
┌─────────────────────────────────────────────┐
│               Frontend (React)              │
│   ✓ Traffic Monitoring Dashboard            │
│   ✓ Charts & Logs Visualization             │
│   ✓ API-based Attack Detection UI           │
└─────────────────────────────────────────────┘
                     ↓
┌─────────────────────────────────────────────┐
│           Backend API (FastAPI)             │
│ ✓ Receives traffic input (CSV, packets)     │
│ ✓ Sends data to ML model for prediction     │
│ ✓ Returns attack type & probability         │
└─────────────────────────────────────────────┘
                     ↓
┌─────────────────────────────────────────────┐
│         ML Model (Scikit-Learn)             │
│ ✓ Trained on DDoS datasets                  │
│ ✓ Predicts if packet is attack or normal    │
│ ✓ Attack classification (SYN, UDP, ICMP)    │
└─────────────────────────────────────────────┘
```

---

## 📁 Project Structure

```
ddos-detection-system/
│
├── frontend/               # React Dashboard (Vite + Tailwind)
│   ├── src/
│   └── package.json
│
├── backend/                # FastAPI Backend
│   ├── app.py
│   ├── model.pkl
│   └── requirements.txt
│
├── model/                  # ML Model Training Code
│   ├── training.ipynb
│   ├── model.pkl
│   └── preprocessing.py
│
├── data/                   # CSV/PCAP Datasets
│
├── README.md               # Complete Documentation
└── LICENSE
```

---

## ⚙️ Installation & Setup

### 📌 1️⃣ Backend Setup (FastAPI + ML Model)

```bash
cd backend
pip install -r requirements.txt
uvicorn app:app --reload
```

Backend runs at: **[http://127.0.0.1:8000](http://127.0.0.1:8000)**

---

### 💻 2️⃣ Frontend Setup (React + Vite)

```bash
cd frontend
npm install
npm run dev
```

Frontend runs at: **[http://localhost:5173](http://localhost:5173)**

---

## 🎯 Machine Learning Model

| Attack Types Detected | Description                   |
| --------------------- | ----------------------------- |
| Normal                | Safe traffic                  |
| TCP-SYN Flood         | Half-open connection overload |
| UDP Flood             | Port-based bandwidth attack   |
| ICMP Flood (Ping)     | Echo request flooding         |

### ML Metrics:

| Metric    | Score |
| --------- | ----- |
| Accuracy  | 97.8% |
| Precision | 96.1% |
| Recall    | 95.7% |
| F1 Score  | 95.9% |

---

## 📡 API Endpoints (FastAPI)

| Method | Endpoint         | Description                           |
| ------ | ---------------- | ------------------------------------- |
| GET    | `/`              | API welcome message                   |
| POST   | `/predict`       | Detects attack from input packet data |
| GET    | `/traffic-stats` | Returns traffic stats                 |
| POST   | `/uploadfile`    | Upload CSV/PCAP for analysis          |

### 🔍 Prediction Example (API Response)

```json
{
  "prediction": "UDP Flood Attack",
  "confidence": 93.41,
  "packet_count": 14750,
  "duration_seconds": 15
}
```

---

## 📊 Frontend Dashboard Features

✔ Live Packet Monitoring
✔ Attack Alerts (red popups)
✔ Graphs (Bar, Line, Area Chart using Chart.js / Recharts)
✔ Upload CSV / PCAP dataset for scanning
✔ Shows multiple attack types with confidence score

---

## 🌐 Deployment

| Component | Recommended Platform       |
| --------- | -------------------------- |
| Frontend  | Netlify / Vercel           |
| Backend   | Render / Railway / AWS EC2 |
| ML Model  | FastAPI + Docker           |
| Database  | Firebase (optional)        |

---

## 🤝 Contribution Guidelines

Pull requests are welcome!
Feel free to contribute by improving UI, adding more attack datasets, or optimizing ML model.

---

## ⭐ Support

If you like this project, please ⭐ **star this repository** — it motivates me to improve it further!

---

## Author

Ashish Chauhan
