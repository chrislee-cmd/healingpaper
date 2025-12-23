const Replicate = require('replicate');

// Initialize Replicate (unified API for both steps)
const replicate = new Replicate({
    auth: process.env.REPLICATE_API_TOKEN,
});

// Helper function to convert face editing prompts to video action prompts
function buildVideoActionPrompt(editingPrompt) {
    // Use the specific action prompt for book reading and coffee
    return "the person in the attached image picks up a book, starts to read, and sips a coffee";
}

// Two-step Replicate pipeline: SeeDream 4 (face editing) → SeeDance (video generation)
module.exports = async (req, res) => {
    // Enable CORS
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
    res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

    // Handle OPTIONS request
    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

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
                    prompt: "Korean celebrity style: large eyes with double eyelids, high nose bridge, V-line face shape.",
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
};


