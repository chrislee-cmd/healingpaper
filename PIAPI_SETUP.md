# PiAPI Nano Banana API Configuration Guide

## 🔑 Getting Your PiAPI API Key

1. **Visit PiAPI:** https://piapi.ai/
2. **Sign Up/Login** to your account
3. **Navigate to API Keys** section in your dashboard
4. **Create a new API key** for Nano Banana service
5. **Copy your API key**

## 📝 Configure Your Environment

Add the following to your `.env` file:

```env
# Google Gemini API Key (optional - not needed if using PiAPI only)
GOOGLE_API_KEY=your_google_api_key_here

# PiAPI Nano Banana API Key (REQUIRED for image editing)
PIAPI_API_KEY=your_piapi_key_here

# Server Configuration
PORT=3000
```

## 🔗 PiAPI Nano Banana API Documentation

**Endpoint:** `https://api.piapi.ai/api/v1/task`

**Model:** `gemini-2.5-flash` (Nano Banana)

**Request Format:**
```json
{
  "model": "gemini-2.5-flash",
  "task_type": "image-edit",
  "input": {
    "image": "base64_image_data",
    "prompt": "edit instructions",
    "parameters": {
      "guidance_scale": 7.5,
      "num_inference_steps": 50,
      "seed": -1
    }
  }
}
```

**Headers:**
```
Authorization: Bearer YOUR_PIAPI_API_KEY
Content-Type: application/json
```

## 📊 Pricing

Check current pricing at: https://piapi.ai/pricing

Typical costs:
- Image editing: ~$0.02-0.05 per request
- Monthly subscriptions available for heavy usage

## 🚀 Quick Start

1. Get your API key from https://piapi.ai/
2. Add `PIAPI_API_KEY` to your `.env` file
3. Install axios: `npm install axios`
4. Restart your backend: `npm run backend`
5. Test on http://localhost:8080

## ⚠️ Important Notes

- **Rate Limits:** Check your PiAPI plan for rate limits
- **Image Size:** Max recommended size: 2048x2048px
- **Processing Time:** Typically 5-15 seconds per image
- **Cost Management:** Monitor your usage in the PiAPI dashboard

## 🔗 Useful Links

- **PiAPI Dashboard:** https://piapi.ai/dashboard
- **Documentation:** https://docs.piapi.ai/
- **Support:** https://piapi.ai/support
- **Nano Banana Info:** https://piapi.ai/nano-banana

## 🐛 Troubleshooting

**Error: API key not configured**
- Make sure `PIAPI_API_KEY` is in your `.env` file
- Restart the backend server after adding the key

**Error: Invalid API key**
- Verify your key in the PiAPI dashboard
- Check for extra spaces or quotes in `.env`

**Error: Task timeout**
- Image might be too large - try resizing
- Check your internet connection
- Verify PiAPI service status

**Error: Insufficient credits**
- Check your PiAPI account balance
- Add credits or upgrade your plan


