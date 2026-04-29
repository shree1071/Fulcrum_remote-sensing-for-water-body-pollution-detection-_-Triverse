# 🛰️ AquaSentinel — Dual-Model AI Water Intelligence Platform

> *"In 2018 nobody was watching. In 2026, AquaSentinel is."*

[![Python](https://img.shields.io/badge/Python-3.10+-3776AB?style=flat-square&logo=python&logoColor=white)](https://python.org)
[![React](https://img.shields.io/badge/React-18-61DAFB?style=flat-square&logo=react&logoColor=black)](https://react.dev)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.110-009688?style=flat-square&logo=fastapi&logoColor=white)](https://fastapi.tiangolo.com)
[![Sentinel-2](https://img.shields.io/badge/Satellite-Sentinel--2%20L2A-1a73e8?style=flat-square&logo=google-earth&logoColor=white)](https://sentinel.esa.int)
[![Google Earth Engine](https://img.shields.io/badge/GEE-Connected-34A853?style=flat-square&logo=google&logoColor=white)](https://earthengine.google.com)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](LICENSE)

---

AquaSentinel is a **production-grade, satellite-powered water quality monitoring system** that fuses two independent Random Forest models — one trained on Sentinel-2 spectral bands, one on 20 chemical sensor parameters — to deliver real-time pollution intelligence for India's most at-risk urban lakes.

No field sensors. No expensive hardware. Just orbital data, machine learning, and a dashboard that makes a government official's jaw drop.

---

## 🌊 The Problem

India's urban lakes are dying in silence. Bellandur Lake in Bengaluru receives **70 million gallons of raw, untreated sewage every single day**. It has caught fire — twice. Varthur Lake, its downstream neighbour, has a surface 73% covered in toxic water hyacinth. Hussain Sagar in Hyderabad receives 200,000+ plaster-of-Paris idols annually during Ganesh Chaturthi, each leaching lead at 8× the WHO safe limit for 90 days.

The Central Pollution Control Board publishes reports every **90 days**. By the time a report lands on a minister's desk, the lake has already crossed the point of no return.

**AquaSentinel cuts that to 5 days — using satellites that are already in orbit.**

---

## ✨ Features

### 🛰️ Dual-Model AI Fusion Engine
The core of AquaSentinel is a **consensus architecture** that runs two completely independent ML models on the same water body and cross-validates their outputs:

| Model | Input | Output | Accuracy |
|---|---|---|---|
| **Satellite RF** | 6 Sentinel-2 spectral bands (NDWI, NDVI, B2, B3, B4, B8) | Clean / Moderate / Severe | **92.85%** |
| **Sensor RF** (HydroWatch) | 20 chemical parameters (heavy metals, pathogens, nitrates…) | Safe / Unsafe | **97.14%** |

When both models agree, the system reports **HIGH trust**. When they diverge, it flags the discrepancy and surfaces it to the analyst — because disagreement is itself a signal.

### 🗺️ Live Google Earth Engine Satellite Map
- Real Sentinel-2 L2A tile overlays streamed directly from **Google Earth Engine**
- Toggle between four temporal snapshots of Bellandur Lake: Baseline (Oct 2016), Warning (Apr 2017), Critical (Feb 2018), and RGB True-Color
- Watch the lake visually degrade across time — the foam zones are visible from space
- Sewage inlet hotspots rendered as interactive circles with flow rates in MGD
- Pollution classification zones (Severe / Moderate / Clean) with NDWI readings per zone

### 📊 Multi-Lake Intelligence Dashboard
Monitor **4 Indian lakes** from a single interface, each with full spectral profiles and independent risk assessments:

| Lake | City | Grade | Alert Level |
|---|---|---|---|
| **Bellandur Lake** | Bengaluru, Karnataka | D | 🔴 HIGH |
| **Varthur Lake** | Bengaluru, Karnataka | F | 🚨 CRITICAL |
| **Dal Lake** | Srinagar, J&K | C | 🟡 MODERATE |
| **Hussain Sagar** | Hyderabad, Telangana | D | 🟠 HIGH |

Switching lakes triggers a live API call that re-renders the entire dashboard — map, timeseries, risk report, hotspots, and AI analysis — in under 2 seconds.

### 🧪 Policy "What If" Simulator
The most powerful feature for government stakeholders. Three interactive sliders let a policymaker simulate real interventions **before committing budget**:

- **🚰 Reduce STP Discharge** — Simulates capping Koramangala STP inflow. Adjusts NDWI and turbidity ratio. The satellite model re-predicts in real time.
- **🪔 Idol Immersion Policy** — Simulates regulating chemical-painted idol immersions. Reduces NDVI (algae bloom proxy). Shows before/after classification.
- **💨 Deploy Lake Aerators** — Simulates adding aerators at inlet points. Suppresses algae, increases dissolved oxygen. Modelled as combined NDVI + turbidity reduction.

Every slider change fires a live API call to the Random Forest model. The result is not a hardcoded lookup — it's a genuine ML inference on the adjusted spectral parameters.

### 🤖 Gemini AI Executive Briefing
One click generates a **government-grade intelligence brief** powered by Google Gemini. The brief synthesises:
- Real-time satellite spectral data
- Historical pollution trend analysis
- Festival event correlation
- Prioritised departmental action items with deadlines

Output is formatted as a structured policy document — ready to attach to a KSPCB or BBMP report.

### 📈 Historical Time-Series with Festival Correlation
- 9-year pollution index timeline (2017–2026) per lake
- Festival events overlaid as annotated markers: Ganesh Chaturthi, Diwali, COVID Lockdown
- The COVID lockdown data point is the most compelling slide in any presentation — NDWI improved 31% when human activity stopped
- Recharts-powered interactive chart with threshold lines and zoom

### 🏛️ Risk Report Card (A–F Grading)
Each lake receives a structured risk report:
- **Letter grade** (A–F) with colour-coded severity
- Identified root causes with spectral evidence
- **Prioritised action items** assigned to specific government departments (KSPCB, BBMP, BWSSB, TSPCB) with deadlines
- Days-to-critical estimate based on current trajectory

### 💰 Economic Impact Dashboard
Translates pollution data into rupees — the language every policymaker understands:
- Annual economic damage breakdown: healthcare burden, property depreciation, groundwater treatment, tourism loss, restoration cost
- **ROI calculator**: AquaSentinel costs ₹2 Lakh/year. The damage it helps prevent is orders of magnitude larger
- Cited data sources from CPCB, WHO, IISc, and ISRO-SAC studies

### 🎆 Festival Pollution Event Tracker
- Expandable event cards for every major festival with pollution impact ratings (CRITICAL / HIGH / MEDIUM / POSITIVE)
- NDWI delta per event — quantified, not qualitative
- Links to media coverage of lake fire events
- COVID lockdown tracked as a "POSITIVE" event — the only time the lake recovered

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    React Frontend (Vite)                     │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────────┐  │
│  │Pollution │ │Scenario  │ │Economic  │ │  Gemini AI   │  │
│  │  Map     │ │Simulator │ │ Impact   │ │  Briefing    │  │
│  │(Leaflet) │ │(Sliders) │ │Dashboard │ │  (Markdown)  │  │
│  └──────────┘ └──────────┘ └──────────┘ └──────────────┘  │
└─────────────────────────┬───────────────────────────────────┘
                          │ REST API (axios)
┌─────────────────────────▼───────────────────────────────────┐
│                  FastAPI Backend (Python)                     │
│                                                              │
│  ┌─────────────────────┐   ┌──────────────────────────────┐ │
│  │  Satellite RF Model │   │   Sensor RF Model (HydroWatch)│ │
│  │  (92.85% accuracy)  │   │   (97.14% accuracy)          │ │
│  │  6 spectral features│   │   20 chemical parameters     │ │
│  └──────────┬──────────┘   └──────────────┬───────────────┘ │
│             └──────────────┬──────────────┘                  │
│                    ┌───────▼────────┐                        │
│                    │ Fusion Consensus│                        │
│                    │ Engine         │                        │
│                    └───────┬────────┘                        │
│                            │                                 │
│  ┌─────────────────────────▼──────────────────────────────┐ │
│  │           Google Earth Engine Integration               │ │
│  │   Sentinel-2 L2A · 10m resolution · Real tile URLs     │ │
│  └────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
```

**Stack:**
- **Frontend:** React 18, Vite, React-Leaflet, Recharts, Axios, React-Markdown
- **Backend:** FastAPI, scikit-learn, joblib, Google Earth Engine Python API, Pandas, NumPy
- **ML:** Random Forest Classifier (scikit-learn) × 2 independent models
- **Satellite Data:** Sentinel-2 L2A via Google Earth Engine
- **AI:** Google Gemini (gemini-2.5-flash-preview) for executive briefings

---

## 🚀 Quick Start

### Prerequisites
- Python 3.10+
- Node.js 18+
- Google Earth Engine account (for live satellite tiles)

### 1. Clone & Setup Backend

```bash
git clone https://github.com/your-org/aquasentinel.git
cd aquasentinel/backend

# Install dependencies
pip install fastapi uvicorn[standard] scikit-learn joblib pandas numpy \
            google-earth-engine python-dotenv google-generativeai

# Configure environment
cp .env.example .env
# Add your GEE project ID and Gemini API key to .env

# Start the API server
uvicorn main:app --reload --port 8000
```

### 2. Setup Frontend

```bash
cd ../frontend
npm install
npm run dev
```

Open `http://localhost:5173` — the dashboard loads with live satellite data.

### 3. (Optional) Retrain the Satellite Model

```bash
cd ../arvr
python train_satellite_model.py
# Outputs: satellite_model_latest.pkl + timestamped metadata JSON
```

---

## 📁 Project Structure

```
aquasentinel/
├── backend/
│   ├── main.py                          # FastAPI app — all endpoints
│   ├── satellite_model_latest.pkl       # Trained satellite RF model
│   ├── Rf_model.pkl                     # Trained sensor RF model (HydroWatch)
│   └── requirements.txt
│
├── frontend/
│   ├── src/
│   │   ├── App.jsx                      # Root — tab routing, lake switching, data fetching
│   │   └── components/
│   │       ├── PollutionMap.jsx         # Leaflet map + GEE tile layers
│   │       ├── ScenarioSimulator.jsx    # Policy what-if sliders
│   │       ├── ModelConsensus.jsx       # Dual-model fusion display
│   │       ├── EconomicImpact.jsx       # ₹ damage dashboard
│   │       ├── RiskReport.jsx           # A–F grade + action items
│   │       ├── TimeSeriesChart.jsx      # 9-year pollution timeline
│   │       ├── FestivalMarkers.jsx      # Festival event tracker
│   │       ├── PredictPanel.jsx         # Gemini AI briefing
│   │       ├── StatsCards.jsx           # Clean/Moderate/Severe % cards
│   │       ├── AlertBanner.jsx          # Live alert strip
│   │       └── LakeSelector.jsx         # Multi-lake switcher
│   ├── package.json
│   └── vite.config.js
│
└── arvr/
    ├── train_satellite_model.py         # Satellite model training pipeline
    ├── train_sensor_model.py            # Sensor model training pipeline
    ├── test_both_models.py              # Model validation suite
    └── satellite_model_*_metadata.json  # Training run metadata
```

---

## 🔌 API Reference

The FastAPI backend auto-generates interactive docs at `http://localhost:8000/docs`.

| Endpoint | Method | Description |
|---|---|---|
| `/` | GET | Health check + system status |
| `/lakes` | GET | All monitored lakes with summary grades |
| `/lake-data?lake={id}` | GET | Full data bundle for a lake (map, timeseries, hotspots, AI analysis) |
| `/predict` | GET | Satellite model inference (NDWI, NDVI, B2, B3, B4, B8) |
| `/predict-sensor` | POST | Sensor model inference (20 chemical parameters) |
| `/model-consensus` | GET | Dual-model fusion result with trust level |
| `/risk-report` | GET | A–F grade + prioritised action items |
| `/economic-impact` | GET | ₹ damage breakdown + ROI calculation |
| `/festivals` | GET | Festival pollution event timeline |
| `/timeseries` | GET | 9-year historical pollution index |
| `/gee/tiles` | GET | Live Google Earth Engine tile URLs |
| `/ai-analysis` | GET | Gemini-generated executive briefing |

---

## 🧠 ML Model Details

### Satellite Random Forest (92.85% Test Accuracy)

Trained on a Bellandur Lake Sentinel-2 L2A dataset with pixel-level pollution labels derived from NDTI thresholds, validated against ISRO-SAC and IISc field studies.

**Features:**
- `NDWI` — Normalized Difference Water Index `(B3 - B8) / (B3 + B8)`
- `NDVI` — Normalized Difference Vegetation Index `(B8 - B4) / (B8 + B4)`
- `B2` — Blue band (490nm) — turbidity proxy
- `B3` — Green band (560nm)
- `B4` — Red band (665nm)
- `B8` — NIR band (842nm)

**Classes:** Clean (0) · Moderate (1) · Severe (2)

**Hyperparameters:** `n_estimators=50`, `max_depth=12`, `min_samples_split=15`, `min_samples_leaf=8`, `max_features='sqrt'`

### Sensor Random Forest — HydroWatch (97.14% Test Accuracy)

Trained on 20 chemical water quality parameters covering heavy metals, biological contaminants, and dissolved compounds.

**Features:** Aluminium, Ammonia, Arsenic, Barium, Cadmium, Chloramine, Chromium, Copper, Fluoride, Bacteria, Viruses, Lead, Nitrates, Nitrites, Mercury, Perchlorate, Radium, Selenium, Silver, Uranium

**Classes:** Safe (1) · Unsafe (0)

---

## 🌍 Monitored Lakes

### Bellandur Lake, Bengaluru — Grade D
India's most polluted urban lake. 3.67 km². Receives 70M gallons of raw sewage daily from Koramangala STP. Three fire events (2015, 2018, 2022) from toxic foam accumulation. NDVI=0.28 confirms dense floating hyacinth covering 53% of surface.

### Varthur Lake, Bengaluru — Grade F
Downstream of Bellandur in the lake chain. 2.18 km². Zero functional STPs. 48 MGD raw sewage inflow. NDVI=0.38 — the highest reading in the monitoring network. Foam events recorded every 3–5 days. Fire risk estimated within 30 days without intervention.

### Dal Lake, Srinagar — Grade C
The Jewel of Kashmir. 18 km². 1,200 houseboats, 60% still discharging raw sewage. Seasonal algae blooms intensifying each summer. Lake has shrunk from 25 km² (1900s) to 18 km² today. COVID lockdown showed 31% NDWI improvement — proving tourism is the primary driver.

### Hussain Sagar, Hyderabad — Grade D
India's largest single-lake Ganesh Chaturthi immersion site. 4.4 km². 200,000+ plaster-of-Paris idols annually, each releasing 40–180 mg/L lead for 90+ days. Predictable NDWI crash every September–October. Lead levels peak at 8× WHO limit post-festival.

---

## 📸 Screenshots

| Dashboard Overview | Satellite Map (GEE) |
|---|---|
| Live pollution stats, alert banner, lake selector | Real Sentinel-2 tiles with temporal comparison |

| Policy Simulator | Economic Impact |
|---|---|
| Drag sliders → live ML re-prediction | ₹ damage breakdown with ROI calculator |

| Dual-Model Consensus | Risk Report Card |
|---|---|
| Agreement gauge + zone-by-zone breakdown | A–F grade + prioritised action items |

---

## 🤝 Contributing

Pull requests are welcome. For major changes, open an issue first to discuss what you'd like to change.

To add a new lake:
1. Add a profile to `LAKE_PROFILES` in `backend/main.py` with spectral data, hotspots, timeseries, and action items
2. The frontend picks it up automatically via `/lakes` — no frontend changes needed

---

## 📚 Data Sources & References

- ISRO-SAC Bellandur Lake Remote Sensing Assessment, 2019
- IISc Centre for Ecological Sciences — Bellandur Lake Study, 2022
- CPCB National Water Quality Monitoring Programme
- WHO Guidelines for Drinking-water Quality, 4th Edition
- Karnataka State Pollution Control Board (KSPCB) Annual Reports
- J&K Lakes & Waterways Development Authority — Dal Lake Status Reports
- Telangana State Pollution Control Board — Hussain Sagar Monitoring Data
- ESA Sentinel-2 L2A Product Specification

---

## 📄 License

MIT License — see [LICENSE](LICENSE) for details.

---

<div align="center">

**AquaSentinel v3.0** · Dual-Model RF Intelligence · Sentinel-2 + GEE

*Built to give India's lakes a fighting chance.*

</div>
