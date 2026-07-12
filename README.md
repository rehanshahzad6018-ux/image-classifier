# 🔍 Image Classifier — Vision AI

An AI-powered image classification web app built with **React** and the **Claude Vision API**. Upload any image and get instant, detailed analysis including subject detection, confidence scores, tags, mood, and more.

---

## ✨ Features

- **Drag & drop** or click-to-upload image interface
- **AI-powered analysis** via Claude's Vision model
- Detects **primary subject** with confidence score
- Returns **tags, mood, setting, dominant colors**
- Shows **detailed visual observations**
- Clean, responsive dark UI

---

## 🛠 Tech Stack

- **React 18** — UI framework
- **Vite** — Build tool & dev server
- **Claude API (claude-sonnet-4)** — Vision AI backend
- **Vanilla CSS** — Styling (no UI library)

---

## 🚀 Getting Started

### 1. Clone the repo
\`\`\`bash
git clone https://github.com/yourusername/image-classifier.git
cd image-classifier
\`\`\`

### 2. Install dependencies
\`\`\`bash
npm install
\`\`\`

### 3. Set up your API key
\`\`\`bash
cp .env.example .env
\`\`\`
Edit `.env` and add your Anthropic API key:
\`\`\`
VITE_ANTHROPIC_API_KEY=sk-ant-...
\`\`\`
Get your key at [console.anthropic.com](https://console.anthropic.com)

### 4. Run the dev server
\`\`\`bash
npm run dev
\`\`\`

Open [http://localhost:5173](http://localhost:5173)

---

## 📁 Project Structure

\`\`\`
image-classifier/
├── public/
│   └── favicon.svg
├── src/
│   ├── components/
│   │   ├── DropZone.jsx       # Image upload & drag-drop
│   │   ├── ResultsPanel.jsx   # Analysis results display
│   │   └── LoadingBar.jsx     # Animated loading indicator
│   ├── utils/
│   │   └── classifier.js      # Claude API call logic
│   ├── App.jsx                # Root component
│   ├── main.jsx               # React entry point
│   └── index.css              # Global styles
├── .env.example
├── .gitignore
├── index.html
├── package.json
├── vite.config.js
└── README.md
\`\`\`

---

## 📦 Build for Production

\`\`\`bash
npm run build
\`\`\`

Deploy the `dist/` folder to **Vercel**, **Netlify**, or any static host.

---

## 🌐 Deploy to Vercel (recommended)

\`\`\`bash
npm i -g vercel
vercel
\`\`\`

Add `VITE_ANTHROPIC_API_KEY` in your Vercel project environment variables.

---

## 📄 License

MIT — free to use, modify, and distribute.
