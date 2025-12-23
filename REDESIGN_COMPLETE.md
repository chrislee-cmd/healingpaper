# 🎨 Website Redesign + Unified Replicate Pipeline

## ✅ Complete Redesign Done!

### 🎨 New Design
- **Primary Color:** #F26E3C (강남언니 Blog Orange)
- **Gradient:** #F26E3C → #E85A2B
- **Font:** Pretendard (Korean web font - similar to 강남언니 style)
- **Weight:** Bold 700-800 for headers
- **Style:** Modern, clean, medical aesthetic

### 🔄 Unified Architecture
**Removed:** Google Gemini / Nano Banana  
**Now using:** 100% Replicate only

```
Upload Selfie
    ↓
Step 1: SeeDream 4 (Replicate)
    - Plastic surgery editing
    - Double eyelid, nose job, slim face
    - 2K resolution output
    ↓
Step 2: SeeDance (Replicate)
    - Animate the edited face
    - "picks up book, reads, sips coffee"
    - 1080p video, 8 seconds
    ↓
Final Animated Video
```

## 📋 Changes Summary

### Design Changes
✅ Orange gradient background (#F26E3C)
✅ Pretendard font (강남언니-style)
✅ Bold headers (font-weight: 700-800)
✅ Orange accent colors throughout
✅ Updated all hover states to orange
✅ Matching loader colors

### Backend Changes
✅ Removed Google Gemini integration
✅ Unified to Replicate only
✅ SeeDream 4 for face editing
✅ SeeDance for video animation
✅ Proper image passing between steps

## 🎯 Pipeline Flow

### Step 1: SeeDream 4 Face Editing
```javascript
{
    size: "2K",
    width: 2048,
    height: 2048,
    prompt: "Perform double eyelid surgery, nose job, and making facial line slim.",
    image_input: [uploaded image],
    aspect_ratio: "1:1",
    enhance_prompt: true
}
```

### Step 2: SeeDance Video Generation
```javascript
{
    image: [edited image from Step 1],
    prompt: "picks up a book, starts to read, and sips a coffee",
    fps: 24,
    duration: 8,
    resolution: "1080p",
    aspect_ratio: "1:1"
}
```

## ⏱️ Processing Time
- **Step 1 (SeeDream 4):** ~15-20 seconds
- **Step 2 (SeeDance):** ~30-60 seconds
- **Total:** ~45-80 seconds

## 💰 Cost Per Video
- SeeDream 4: ~$0.10-0.15
- SeeDance: ~$0.50-1.00
- **Total:** ~$0.60-1.15 per video

## 📝 API Key Required
Only need **ONE key** now:
```
REPLICATE_API_TOKEN=your_replicate_token
```

## 🎨 Color Palette
- **Primary:** #F26E3C (강남언니 Orange)
- **Secondary:** #E85A2B (Darker Orange)
- **Background Light:** #fff5f2
- **Background Hover:** #ffe9e0
- **Text:** #333

## 🔤 Typography
- **Font Family:** Pretendard (Korean web font)
- **Headers:** 700-800 weight
- **Body:** 400-500 weight
- **Letter Spacing:** -0.5px (tighter, modern)

## 🚀 Test It!
Refresh: http://127.0.0.1:8080

You'll see:
- Beautiful orange gradient design
- Pretendard font (강남언니-style)
- Unified Replicate pipeline
- Real face editing → video animation

