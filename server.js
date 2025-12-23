const express = require('express');
const cors = require('cors');
const path = require('path');
const Replicate = require('replicate');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Initialize Replicate (unified API for both steps)
const replicate = new Replicate({
    auth: process.env.REPLICATE_API_TOKEN,
});

// Middleware
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Serve static files (HTML, CSS, JS)
app.use(express.static(path.join(__dirname)));

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', message: 'AI Selfie Editor API is running' });
});

// Helper function to convert face editing prompts to video action prompts
function buildVideoActionPrompt(editingPrompt) {
    // Use the specific action prompt for book reading and coffee
    return "the person in the attached image picks up a book, starts to read, and sips a coffee";
}

// Two-step Replicate pipeline: SeeDream 4 (face editing) → SeeDance (video generation)
app.post('/api/edit', async (req, res) => {
    try {
        const { image, prompt } = req.body;

        if (!image) {
            return res.status(400).json({ 
                error: 'Image is required' 
            });
        }

        console.log('🎬 Starting Replicate two-step pipeline...');
        console.log('Step 1: SeeDream 4 face editing');
        console.log('Step 2: SeeDance video generation');

        if (!process.env.REPLICATE_API_TOKEN) {
            return res.status(500).json({
                error: 'Replicate API token not configured',
                message: 'Please add REPLICATE_API_TOKEN to your .env file'
            });
        }

        // STEP 1: Use SeeDream 4 for plastic surgery face editing
        console.log('🔧 Step 1: Running SeeDream 4 for face editing...');
        
        const editedImageOutput = await replicate.run(
            "bytedance/seedream-4",
            {
                input: {
                    size: "2K",
                    prompt: "Korean celebrity style: large eyes with double eyelids, high nose bridge,ok  V-line face shape.",
                    image_input: [image],  // Array of base64 images
                    aspect_ratio: "1:1",
                    enhance_prompt: true
                }
            }
        );

        console.log('✅ SeeDream 4 editing completed');
        
        // Get the edited image URL
        const editedImageUrl = Array.isArray(editedImageOutput) ? editedImageOutput[0] : editedImageOutput;
        console.log('Edited image URL:', editedImageUrl);

        // STEP 2: Use SeeDance for video generation with edited image
        console.log('🎬 Step 2: Running SeeDance 1 Pro for video generation...');
        
        const videoPrompt = buildVideoActionPrompt(prompt);
        console.log('Video action prompt:', videoPrompt);
        
        const videoOutput = await replicate.run(
            "bytedance/seedance-1-pro",
            {
                input: {
                    image: editedImageUrl,  // Use the EDITED image from SeeDream
                    prompt: videoPrompt,
                    fps: 24,
                    duration: 8,
                    resolution: "1080p",
                    aspect_ratio: "3:4",
                    camera_fixed: false
                }
            }
        );

        console.log('✅ SeeDance video generation completed');

        // The output is a URL to the generated video
        const videoUrl = videoOutput;

        res.json({
            success: true,
            message: 'Two-step Replicate pipeline completed: Face editing + Video generation',
            edited_image: videoUrl,
            video_url: videoUrl,
            edited_face_url: editedImageUrl,  // Include the edited still image too
            model_used: 'SeeDream 4 → SeeDance 1 Pro',
            description: 'Face edited with plastic surgery, then animated'
        });

    } catch (error) {
        console.error('Error in Replicate pipeline:', error);
        
        res.status(500).json({ 
            error: 'Failed to process image',
            details: error.message,
            help: 'Make sure REPLICATE_API_TOKEN is configured'
        });
    }
});

// Alternative endpoint with CodeFormer (more advanced face restoration)
app.post('/api/edit-advanced', async (req, res) => {
    try {
        const { image, prompt } = req.body;

        if (!image || !prompt) {
            return res.status(400).json({ 
                error: 'Image and prompt are required' 
            });
        }

        console.log('Processing with CodeFormer (advanced)...');

        if (!process.env.REPLICATE_API_TOKEN) {
            return res.status(500).json({
                error: 'Replicate API token not configured'
            });
        }

        // CodeFormer - more advanced face restoration
        const output = await replicate.run(
            "sczhou/codeformer:7de2ea26c616d5bf2245ad0d5e24f0ff9a6204578a5c876db53142edd9d2cd56",
            {
                input: {
                    image: image,
                    codeformer_fidelity: 0.1,  // Lowered from 0.7 to 0.3 for more dramatic edits
                    background_enhance: true,
                    face_upsample: true,
                    upscale: 4  // Increased from 2 to 4 for stronger enhancement
                }
            }
        );

        console.log('CodeFormer processing completed');

        // Fetch and convert to base64
        const axios = require('axios');
        const imageResponse = await axios.get(output, {
            responseType: 'arraybuffer'
        });
        
        const base64Image = `data:image/png;base64,${Buffer.from(imageResponse.data).toString('base64')}`;

        res.json({
            success: true,
            message: 'Advanced face restoration completed',
            edited_image: base64Image,
            model_used: 'CodeFormer',
            description: 'Advanced face restoration with enhanced details'
        });

    } catch (error) {
        console.error('Error processing image:', error);
        
        res.status(500).json({ 
            error: 'Failed to process image',
            details: error.message
        });
    }
});

// Start server (only if not in serverless environment)
if (process.env.VERCEL !== '1') {
    app.listen(PORT, () => {
        console.log(`🚀 AI Selfie Editor Backend running on http://localhost:${PORT}`);
        console.log(`📝 API endpoint: http://localhost:${PORT}/api/edit`);
        console.log(`🎨 Advanced endpoint: http://localhost:${PORT}/api/edit-advanced`);
        console.log(`❤️ Health check: http://localhost:${PORT}/api/health`);
        
        if (!process.env.REPLICATE_API_TOKEN) {
            console.warn('⚠️  WARNING: REPLICATE_API_TOKEN not found!');
            console.warn('   Get your token at: https://replicate.com/account/api-tokens');
        } else {
            console.log('✅ Replicate API token configured');
            console.log('🎬 Unified Replicate pipeline: SeeDream 4 → SeeDance');
            console.log('📸 Step 1: SeeDream 4 face editing (plastic surgery)');
            console.log('🎥 Step 2: SeeDance video generation');
        }
    });
}

module.exports = app;
