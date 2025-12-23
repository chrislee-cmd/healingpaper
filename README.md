# AI 셀카 편집기 (AI Selfie Editor)

Google Gemini 2.0 Flash API를 활용한 AI 셀카 편집 웹 애플리케이션입니다.

## 🎯 기능

- 📸 셀카 이미지 업로드 (드래그 앤 드롭 지원)
- 👁️ 얼굴 특징 선택 (눈, 코, 입, 피부, 얼굴형, 눈썹, 쌍커풀, 턱선)
- ✨ AI 기반 자연스러운 얼굴 편집
- 🔄 편집 전후 비교
- 💾 편집된 이미지 다운로드

## 🚀 빠른 시작

### 1. 의존성 설치
```bash
npm install
```

### 2. API 키 설정
`.env` 파일을 생성하고 PiAPI 키를 입력하세요:
```
# PiAPI Nano Banana API Key (REQUIRED)
PIAPI_API_KEY=your_piapi_key_here

# Server Configuration
PORT=3000
```

**PiAPI 키 받기:** 
1. https://piapi.ai/ 방문
2. 회원가입/로그인
3. Dashboard에서 API Key 생성
4. Nano Banana 서비스 활성화

자세한 설정 가이드: `PIAPI_SETUP.md` 참고

### 3. 서버 실행

**백엔드 서버 (터미널 1):**
```bash
npm run backend
# 또는
node server.js
```
→ 백엔드 실행: http://localhost:3000

**프론트엔드 서버 (터미널 2):**
```bash
npm run frontend
```
→ 웹사이트 접속: http://localhost:8080

## 📡 현재 상태

✅ **실행 중인 서버:**
- Frontend: http://127.0.0.1:8080
- Backend: http://localhost:3000
- API Endpoint: http://localhost:3000/api/edit
- Health Check: http://localhost:3000/api/health

## 🛠️ 기술 스택

### Frontend
- HTML5
- CSS3 (Responsive Design)
- Vanilla JavaScript

### Backend
- Node.js + Express
- Google Generative AI SDK (@google/generative-ai)
- CORS
- Multer (이미지 처리)
- dotenv (환경 변수)

## 📝 API 엔드포인트

### POST `/api/edit`
이미지 편집 요청

**Request Body:**
```json
{
  "image": "data:image/jpeg;base64,...",
  "prompt": "자연스러운 쌍커풀을 만들어주세요"
}
```

**Response:**
```json
{
  "success": true,
  "edited_image": "data:image/jpeg;base64,...",
  "message": "Image processing completed"
}
```

### GET `/api/health`
서버 상태 확인

## 🔒 보안

- ✅ API 키는 `.env` 파일에 저장
- ✅ `.gitignore`로 `.env` 파일 커밋 방지
- ✅ 백엔드에서만 API 키 사용 (프론트엔드에 노출 안됨)
- ✅ CORS 설정으로 안전한 통신

## 📖 사용 방법

1. 웹 브라우저에서 http://localhost:8080 접속
2. 셀카 이미지 업로드
3. 편집하고 싶은 얼굴 부위 선택
4. (선택) 상세 요청사항 입력
5. "AI 편집 시작" 버튼 클릭
6. 결과 확인 및 다운로드

## ⚠️ 중요 참고사항

현재 Google Gemini API는 텍스트 생성 위주로 작동합니다. 실제 이미지 편집을 위해서는:

1. **Google Imagen 3** - Google의 전문 이미지 생성/편집 모델
2. **PiAPI Nano Banana** - https://piapi.ai/nano-banana

위 서비스들을 추가로 통합하는 것을 권장합니다.

## 🐛 트러블슈팅

### 백엔드 연결 오류
```bash
# 백엔드가 실행 중인지 확인
npm run backend
```

### API 키 오류
- `.env` 파일이 프로젝트 루트에 있는지 확인
- API 키가 올바른지 확인: https://ai.google.dev/

### 포트 충돌
```bash
# 다른 포트 사용
PORT=4000 node server.js
```

## 📦 패키지 스크립트

```bash
npm run backend    # 백엔드 서버 시작 (포트 3000)
npm run frontend   # 프론트엔드 서버 시작 (포트 8080)
npm run dev        # nodemon으로 개발 모드 실행
```

## 🌐 브라우저 지원

- Chrome (권장)
- Firefox
- Safari
- Edge

## 버전

v1.0.0 | cbf49e8

## 📚 참고자료

- [Google Gemini API Documentation](https://ai.google.dev/gemini-api/docs)
- [Google Generative AI Node.js SDK](https://www.npmjs.com/package/@google/generative-ai)
- [Nano Banana API Guide](https://piapi.ai/nano-banana)
