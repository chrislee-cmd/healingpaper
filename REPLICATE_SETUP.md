# 🎨 Replicate Setup Guide

## Get Your Replicate API Token

### 1. Visit Replicate
Go to: **https://replicate.com/**

### 2. Sign Up / Log In
- Create an account or log in
- It's free to start!

### 3. Get Your API Token
- Go to: https://replicate.com/account/api-tokens
- Click **"Create Token"**
- Copy your token

### 4. Add to .env File
Open `/Users/churryboy/healingpaper/.env` and add:

```env
REPLICATE_API_TOKEN=r8_your_token_here
```

## 🎯 Face Enhancement Models

We're using two powerful models:

### **GFPGAN** (Default)
- Fast face enhancement
- Improves clarity and smoothness
- Makes faces more detailed
- ~5-10 seconds per image

### **CodeFormer** (Advanced)
- More advanced face restoration
- Better for damaged/low-quality photos
- Includes background enhancement
- ~10-15 seconds per image

## 💰 Pricing

- **Free tier**: $0.006 per prediction (very cheap!)
- First $5 credit free for new accounts
- ~1000 face enhancements with free credit

## 🚀 Quick Start

1. Get token from https://replicate.com/account/api-tokens
2. Add to `.env` file
3. Restart backend: `npm run backend`
4. Test at http://localhost:8080

## 📚 Models Used

- **GFPGAN**: https://replicate.com/tencentarc/gfpgan
- **CodeFormer**: https://replicate.com/sczhou/codeformer

Both models are specifically designed for face enhancement and restoration!


