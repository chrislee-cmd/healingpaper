# 🎬 SeeDance 1 Pro Integration Complete!

## ✅ What is SeeDance?

**SeeDance 1 Pro** turns your static selfie into an **animated video**!

Instead of just editing your photo, it creates a **realistic video** where you:
- Move naturally
- Perform actions
- React and express emotions
- All based on text prompts!

## 🎯 How It Works

1. **Upload your selfie** 📸
2. **Select features** (these become part of the prompt)
3. **AI generates an 8-second video** showing you in motion! 🎬
4. **Watch and download** your animated video

## 🎚️ Configuration Parameters

### Location: `/Users/churryboy/healingpaper/server.js` (Line ~48-58)

```javascript
const output = await replicate.run(
    "bytedance/seedance-1-pro",
    {
        input: {
            image: image,
            prompt: `The person in the image: ${prompt}`,
            fps: 24,           // ← FRAME RATE: 24, 30
            duration: 8,       // ← VIDEO LENGTH: 4-12 seconds
            resolution: "1080p", // ← QUALITY: "720p" or "1080p"
            aspect_ratio: "1:1", // ← FORMAT: "1:1", "16:9", "9:16"
            camera_fixed: false  // ← CAMERA: true=static, false=dynamic
        }
    }
);
```

### Adjustable Parameters:

**1. `fps` - Frame Rate**
- `24` - Cinematic (current)
- `30` - Smooth, TV-style

**2. `duration` - Video Length**
- Range: `4` to `12` seconds
- Current: `8` seconds
- **Longer = more expensive, more complex animations**

**3. `resolution` - Video Quality**
- `"720p"` - Faster, lower quality
- `"1080p"` - High quality (current)

**4. `aspect_ratio` - Video Format**
- `"1:1"` - Square (Instagram/selfie format) ← **Current**
- `"16:9"` - Landscape (YouTube)
- `"9:16"` - Portrait (TikTok/Stories)

**5. `camera_fixed` - Camera Movement**
- `false` - Dynamic camera (current)
- `true` - Static camera, no movement

## 🎬 Example Prompts

Based on your feature selections, prompts like:

- "smiles warmly and nods"
- "looks to the side and laughs"
- "raises eyebrows in surprise"
- "tilts head and blinks slowly"
- "speaks and makes eye contact"

## ⚙️ For More Dramatic Videos

```javascript
duration: 12,          // Longer video
resolution: "1080p",   // Highest quality
camera_fixed: false,   // Allow camera movement
fps: 30               // Smoother motion
```

## 💰 Pricing

SeeDance 1 Pro on Replicate:
- ~$0.50-1.00 per video (more expensive than image editing)
- 8-second 1080p video
- High quality, production-ready

**Cost factors:**
- Longer duration = more expensive
- Higher resolution = more expensive
- Worth it for unique animated content!

## 🎥 Output Format

- **Format:** MP4 video
- **Length:** 8 seconds (configurable 4-12s)
- **Quality:** 1080p
- **Aspect:** 1:1 (square, perfect for selfies)
- **Includes:** Natural movement, facial expressions, subtle animations

## 🚀 How to Use

1. Go to http://127.0.0.1:8080
2. Upload your selfie
3. Select features (e.g., "eyes", "smile")
4. Click "AI 편집 시작"
5. Wait ~30-60 seconds (video generation takes longer)
6. **Watch your animated video!** 🎬

## ⚠️ Important Notes

- Video generation takes **30-60 seconds**
- Much slower than image editing
- Higher cost per request
- Results are **videos**, not images
- Can be downloaded as MP4

## 📚 Model Info

- **Model:** ByteDance SeeDance 1 Pro
- **Type:** Image-to-Video (I2V)
- **Replicate:** https://replicate.com/bytedance/seedance-1-pro
- **Technology:** Diffusion-based video generation
- **Best for:** Creating animated selfie videos with natural motion

