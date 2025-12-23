# Healing Paper - AI Selfie Editor

AI-powered selfie editing web application with Korean celebrity-style face editing and video animation.

## 🎨 Features

- **SeeDream 4**: Face editing with plastic surgery effects (double eyelids, nose job, V-line face)
- **SeeDance**: Animated video generation from edited photos
- **Progress Tracking**: Real-time progress bar during processing
- **Korean Design**: Orange gradient design (강남언니 style) with Pretendard font

## 🚀 Live Demo

Visit: https://healingpaper.vercel.app/

## 🛠️ Tech Stack

- **Frontend**: HTML, CSS, JavaScript (Pretendard font)
- **Backend**: Node.js + Express (Serverless on Vercel)
- **AI Models**: Replicate (SeeDream 4 + SeeDance)
- **Deployment**: Vercel

## 📦 Installation

```bash
npm install
```

## 🔑 Environment Variables

Create a `.env` file:

```env
REPLICATE_API_TOKEN=your_replicate_token_here
PORT=3000
```

## 🏃 Run Locally

### Start Backend
```bash
npm run backend
```

### Start Frontend
```bash
npm run frontend
```

Visit: http://localhost:8080

## 📝 Vercel Deployment

1. Connect GitHub repository to Vercel
2. Add environment variable: `REPLICATE_API_TOKEN`
3. Deploy!

## 🎯 How It Works

1. Upload selfie
2. **SeeDream 4** edits face (Korean celebrity style)
3. **SeeDance** animates edited face (8-second video)
4. View results (~45-80 seconds total)

## 💰 Cost

- SeeDream 4: ~$0.10-0.15 per image
- SeeDance: ~$0.50-1.00 per video
- Total: ~$0.60-1.15 per video

## 📄 License

MIT
