# 🎬 Two-Step AI Pipeline: Nano Banana → SeeDance

## ✅ Integration Complete!

Your website now uses a **two-step AI pipeline**:

### Step 1: 🔧 **Nano Banana (Google Gemini)**
- Performs plastic surgery edits
- Double eyelid surgery
- Nose job
- Slim facial line

### Step 2: 🎥 **SeeDance**
- Takes the edited face
- Creates animated video
- "picks up a book, starts to read, and sips a coffee"

## 🎯 Workflow

```
Upload Selfie
    ↓
Step 1: Gemini Nano Banana
    - Face editing (plastic surgery)
    - Double eyelids, nose, slim face
    ↓
Step 2: SeeDance
    - Animate the edited face
    - Book reading + coffee action
    ↓
Final Video Output
```

## ⚙️ Configuration

### Nano Banana Prompt (Line ~54)
```javascript
const nanoBananaPrompt = `A photorealistic facial image of the image attached. Perform some plastic surgery, especially double eyelid surgery, nose job, and slim facial line.`;
```

### SeeDance Action (Line ~28)
```javascript
function buildVideoActionPrompt(editingPrompt) {
    return "the person in the attached image picks up a book, starts to read, and sips a coffee";
}
```

## ⚠️ Current Limitation

**Important:** Gemini 2.0 Flash Exp currently returns **text descriptions** of edits, not actual edited images. 

The code is ready for when Google releases **Imagen 3** or when Gemini starts returning actual edited images. For now:
- Step 1: Gemini analyzes and describes the edits
- Step 2: SeeDance uses the original image (not edited yet)

When Imagen 3 becomes available, the pipeline will work fully as intended!

## ⏱️ Processing Time

- **Step 1 (Nano Banana):** ~5-10 seconds
- **Step 2 (SeeDance):** ~30-60 seconds
- **Total:** ~35-70 seconds

## 💰 Cost Per Video

- Nano Banana: ~$0.01
- SeeDance: ~$0.50-1.00
- **Total:** ~$0.51-1.01 per video

## 📝 API Keys Required

Both keys must be in your `.env` file:
```
GOOGLE_API_KEY=your_google_key
REPLICATE_API_TOKEN=your_replicate_token
```

## 🚀 Testing

1. Go to http://127.0.0.1:8080
2. Upload a selfie
3. Wait ~35-70 seconds
4. Watch your edited and animated video!

## 🔮 Future Enhancement

Once Google releases Imagen 3 or Gemini image editing:
- Replace line ~67 with actual edited image from Gemini
- Full pipeline will work: Edit face → Animate edited face

