// Global variables
let uploadedImage = null;
let selectedFeatures = [];
let editedImageUrl = null;

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    initializeUpload();
    initializeFeatureButtons();
});

// Initialize upload functionality
function initializeUpload() {
    const imageInput = document.getElementById('imageInput');
    const uploadArea = document.getElementById('uploadArea');

    imageInput.addEventListener('change', handleImageUpload);

    // Drag and drop functionality
    uploadArea.addEventListener('dragover', (e) => {
        e.preventDefault();
        uploadArea.classList.add('dragover');
    });

    uploadArea.addEventListener('dragleave', () => {
        uploadArea.classList.remove('dragover');
    });

    uploadArea.addEventListener('drop', (e) => {
        e.preventDefault();
        uploadArea.classList.remove('dragover');
        
        const files = e.dataTransfer.files;
        if (files.length > 0 && files[0].type.startsWith('image/')) {
            handleImageFile(files[0]);
        }
    });
}

// Handle image upload
function handleImageUpload(event) {
    const file = event.target.files[0];
    if (file && file.type.startsWith('image/')) {
        handleImageFile(file);
    }
}

// Process uploaded image file
function handleImageFile(file) {
    const reader = new FileReader();
    
    reader.onload = (e) => {
        uploadedImage = e.target.result;
        
        // Immediately start video generation without showing edit section
        showLoadingAndGenerate();
    };
    
    reader.readAsDataURL(file);
}

// Show loading state and start video generation immediately
function showLoadingAndGenerate() {
    const uploadSection = document.getElementById('uploadSection');
    const editSection = document.getElementById('editSection');
    const resultSection = document.getElementById('resultSection');
    
    // Hide upload section
    uploadSection.style.display = 'none';
    
    // Show result section with loading state
    resultSection.style.display = 'block';
    
    // Set loading state
    const originalImage = document.getElementById('originalImage');
    const editedImageEl = document.getElementById('editedImage');
    
    originalImage.src = uploadedImage;
    
    // Show loading message with progress bar
    editedImageEl.style.display = 'none';
    let loadingDiv = document.getElementById('videoLoadingDiv');
    if (!loadingDiv) {
        loadingDiv = document.createElement('div');
        loadingDiv.id = 'videoLoadingDiv';
        loadingDiv.style.textAlign = 'center';
        loadingDiv.style.padding = '60px 20px';
        loadingDiv.innerHTML = `
            <div class="loader" style="margin: 0 auto 20px;"></div>
            <h3 style="color: #F26E3C; margin-bottom: 10px;">🎬 AI 비디오 생성 중...</h3>
            <p style="color: #666; margin-bottom: 20px;" id="loadingStatus">준비 중...</p>
            <div style="width: 100%; max-width: 400px; margin: 0 auto; background: #f0f0f0; border-radius: 10px; overflow: hidden; height: 30px;">
                <div id="progressBar" style="width: 0%; height: 100%; background: linear-gradient(90deg, #F26E3C, #E85A2B); transition: width 0.3s ease; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold; font-size: 14px;">
                    <span id="progressText">0%</span>
                </div>
            </div>
            <p style="color: #999; font-size: 0.9rem; margin-top: 15px;">45-80초 정도 소요됩니다</p>
        `;
        editedImageEl.parentElement.appendChild(loadingDiv);
    }
    loadingDiv.style.display = 'block';
    
    // Scroll to result section
    resultSection.scrollIntoView({ behavior: 'smooth' });
    
    // Generate video with progress tracking
    generateVideoImmediately();
}

// Update progress bar
function updateProgress(percent, status) {
    const progressBar = document.getElementById('progressBar');
    const progressText = document.getElementById('progressText');
    const loadingStatus = document.getElementById('loadingStatus');
    
    if (progressBar && progressText && loadingStatus) {
        progressBar.style.width = percent + '%';
        progressText.textContent = percent + '%';
        loadingStatus.textContent = status;
    }
}

// Show edit section with preview
function showEditSection() {
    const uploadSection = document.getElementById('uploadSection');
    const editSection = document.getElementById('editSection');
    const previewImage = document.getElementById('previewImage');

    previewImage.src = uploadedImage;
    
    uploadSection.style.display = 'none';
    editSection.style.display = 'grid';

    // Scroll to edit section
    editSection.scrollIntoView({ behavior: 'smooth' });
}

// Initialize feature button functionality
function initializeFeatureButtons() {
    const featureButtons = document.querySelectorAll('.feature-btn');
    
    featureButtons.forEach(button => {
        button.addEventListener('click', () => {
            const feature = button.dataset.feature;
            
            if (button.classList.contains('selected')) {
                button.classList.remove('selected');
                selectedFeatures = selectedFeatures.filter(f => f !== feature);
            } else {
                button.classList.add('selected');
                selectedFeatures.push(feature);
            }
        });
    });
}

// Generate video immediately after upload
async function generateVideoImmediately() {
    try {
        // Use a default pleasant prompt
        const prompt = "makes natural movements and expressions";
        
        // Show thoughts section
        showThoughts(prompt, ['자동 비디오 생성']);

        // Call the backend API
        const editedImage = await simulateAPICall(uploadedImage, prompt);
        
        // Hide loading, show result
        const loadingDiv = document.getElementById('videoLoadingDiv');
        if (loadingDiv) loadingDiv.style.display = 'none';
        
        // Show results
        showResults(editedImage);
        
    } catch (error) {
        console.error('Error generating video:', error);
        alert('비디오 생성 중 오류가 발생했습니다. 다시 시도해주세요.');
        resetUpload();
    }
}

// Generate AI edit (original function kept for compatibility)
async function generateEdit() {
    if (selectedFeatures.length === 0) {
        alert('편집할 부위를 최소 1개 이상 선택해주세요.');
        return;
    }

    const generateBtn = document.getElementById('generateBtn');
    const btnText = document.getElementById('btnText');
    const btnLoader = document.getElementById('btnLoader');
    const customPrompt = document.getElementById('customPrompt').value;

    // Show loading state
    generateBtn.disabled = true;
    btnText.style.display = 'none';
    btnLoader.style.display = 'inline-block';

    try {
        // Build prompt based on selected features
        const prompt = buildPrompt(selectedFeatures, customPrompt);
        
        // Show thoughts section
        showThoughts(prompt, selectedFeatures);

        // In a real implementation, you would call the Nano Banana API here
        // For now, we'll simulate the API call
        const editedImage = await simulateAPICall(uploadedImage, prompt);
        
        // Show results
        showResults(editedImage);
        
    } catch (error) {
        console.error('Error generating edit:', error);
        alert('편집 중 오류가 발생했습니다. 다시 시도해주세요.');
    } finally {
        // Reset button state
        generateBtn.disabled = false;
        btnText.style.display = 'inline';
        btnLoader.style.display = 'none';
    }
}

// Build prompt based on selections
function buildPrompt(features, customPrompt) {
    const featureMap = {
        'eyes': '눈을 더 크고 또렷하게',
        'nose': '코를 자연스럽게 정리',
        'mouth': '입술을 더 예쁘게',
        'skin': '피부를 맑고 깨끗하게',
        'face-shape': '얼굴형을 더 갸름하게',
        'eyebrows': '눈썹을 자연스럽게 정돈',
        'double-eyelid': '자연스러운 쌍커풀 만들기',
        'jawline': '턱선을 더 또렷하게'
    };

    let prompt = '다음 특징들을 자연스럽게 개선해주세요: ';
    prompt += features.map(f => featureMap[f]).join(', ');
    
    if (customPrompt) {
        prompt += `. 추가 요청사항: ${customPrompt}`;
    }

    prompt += '. 매우 자연스럽고 현실적으로 보이도록 해주세요.';
    
    return prompt;
}

// Call the backend API for image editing
async function simulateAPICall(imageData, prompt) {
    try {
        // Update progress: Starting
        updateProgress(5, '이미지 전송 중...');
        
        // Call the backend server
        const response = await fetch('http://localhost:3000/api/edit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                image: imageData,
                prompt: prompt
            })
        });
        
        // Update progress: Request sent
        updateProgress(15, 'SeeDream 얼굴 편집 시작...');
        
        if (!response.ok) {
            throw new Error(`API error: ${response.status}`);
        }
        
        // Simulate progress during processing
        // Start polling for progress updates
        const progressInterval = setInterval(() => {
            const currentProgress = parseInt(document.getElementById('progressBar').style.width);
            if (currentProgress < 85) {
                const newProgress = Math.min(currentProgress + 2, 85);
                if (newProgress < 50) {
                    updateProgress(newProgress, 'SeeDream 얼굴 편집 중...');
                } else {
                    updateProgress(newProgress, 'SeeDance 비디오 생성 중...');
                }
            }
        }, 2000); // Update every 2 seconds
        
        const result = await response.json();
        
        // Clear progress interval
        clearInterval(progressInterval);
        
        // Update progress: Almost complete
        updateProgress(95, '최종 처리 중...');
        
        if (result.success) {
            // Update progress: Complete
            updateProgress(100, '완료!');
            
            // Return both the edited image and video
            return {
                video_url: result.video_url,
                edited_face_url: result.edited_face_url
            };
        } else {
            console.warn('API response:', result);
            return null;
        }
        
    } catch (error) {
        console.error('Error calling API:', error);
        updateProgress(0, '오류 발생');
        alert('API 호출 중 오류가 발생했습니다. 백엔드 서버가 실행 중인지 확인해주세요.\n\n' + 
              '백엔드 시작: npm run backend');
        throw error;
    }
}

// Show thoughts section
function showThoughts(prompt, features) {
    const thoughtsSection = document.getElementById('thoughtsSection');
    const thoughtsText = document.getElementById('thoughtsText');
    
    const thoughtsContent = `
        <strong>Processing Request:</strong><br>
        Selected features: ${features.join(', ')}<br><br>
        <strong>Generated Prompt:</strong><br>
        "${prompt}"<br><br>
        <strong>Model:</strong> Google Gemini 2.5 Flash (Nano Banana)<br>
        <strong>Mode:</strong> Image-to-Image with guided editing<br>
        <strong>Quality:</strong> High (Natural enhancement)
    `;
    
    thoughtsText.innerHTML = thoughtsContent;
    thoughtsSection.style.display = 'block';
}

// Toggle thoughts visibility
function toggleThoughts() {
    const thoughtsContent = document.getElementById('thoughtsContent');
    const toggleIcon = document.getElementById('toggleIcon');
    
    if (thoughtsContent.style.display === 'none') {
        thoughtsContent.style.display = 'block';
        toggleIcon.classList.add('open');
    } else {
        thoughtsContent.style.display = 'none';
        toggleIcon.classList.remove('open');
    }
}

// Show results with both edited image and video
function showResults(resultData) {
    const resultSection = document.getElementById('resultSection');
    const originalImage = document.getElementById('originalImage');
    const editedImageEl = document.getElementById('editedImage');

    originalImage.src = uploadedImage;
    
    // Show the edited still image from SeeDream
    if (resultData && resultData.edited_face_url) {
        editedImageEl.style.display = 'block';
        editedImageEl.src = resultData.edited_face_url;
        editedImageUrl = resultData.edited_face_url;
    }

    // Check if there's a video URL (from SeeDance)
    if (resultData && resultData.video_url) {
        // Create video element if it doesn't exist
        let videoEl = document.getElementById('editedVideo');
        if (!videoEl) {
            videoEl = document.createElement('video');
            videoEl.id = 'editedVideo';
            videoEl.controls = true;
            videoEl.autoplay = true;
            videoEl.loop = true;
            videoEl.style.width = '100%';
            videoEl.style.borderRadius = '15px';
            videoEl.style.marginTop = '20px';
            editedImageEl.parentElement.appendChild(videoEl);
        }
        videoEl.src = resultData.video_url;
        videoEl.style.display = 'block';
    }

    resultSection.style.display = 'block';
    resultSection.scrollIntoView({ behavior: 'smooth' });
}

// Download result
function downloadResult() {
    if (!editedImageUrl) return;

    const link = document.createElement('a');
    link.href = editedImageUrl;
    link.download = `edited-selfie-${Date.now()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

// Reset upload
function resetUpload() {
    // Reset variables
    uploadedImage = null;
    selectedFeatures = [];
    editedImageUrl = null;

    // Reset UI
    document.getElementById('uploadSection').style.display = 'block';
    document.getElementById('editSection').style.display = 'none';
    document.getElementById('resultSection').style.display = 'none';
    document.getElementById('thoughtsSection').style.display = 'none';
    document.getElementById('imageInput').value = '';
    document.getElementById('customPrompt').value = '';

    // Deselect all feature buttons
    document.querySelectorAll('.feature-btn').forEach(btn => {
        btn.classList.remove('selected');
    });

    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

