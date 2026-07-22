import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI, Type } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = 3000;

// Increase request size limits to support base64 image uploads for camera scanning
app.use(express.json({ limit: '25mb' }));
app.use(express.urlencoded({ limit: '25mb', extended: true }));

// Lazy initializer for Google GenAI to avoid crashing if API key is temporarily missing
let aiClient: GoogleGenAI | null = null;
function getGenAI(): GoogleGenAI {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      console.warn("WARNING: GEMINI_API_KEY is not defined. Features relying on Gemini will fail gracefully.");
    }
    aiClient = new GoogleGenAI({
      apiKey: apiKey || 'MOCK_KEY',
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
  }
  return aiClient;
}

// ==========================================
// API ROUTES
// ==========================================

// Chat Endpoint: Integrates the "Thambi" AI guide
app.post('/api/chat', async (req, res) => {
  try {
    const { message, history, language } = req.body;
    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    if (!process.env.GEMINI_API_KEY) {
      return res.json({
        text: "Vanakkam! I'm Thambi, your Tamil Nadu Cultural Guide. (Note: The Gemini API key is currently unconfigured. To enable real replies, please add GEMINI_API_KEY to your Secrets panel under Settings).",
      });
    }

    const ai = getGenAI();

    // Map history to contents structure required by ai.models.generateContent
    const formattedContents: any[] = [];
    
    if (history && Array.isArray(history)) {
      history.forEach((msg: any) => {
        formattedContents.push({
          role: msg.sender === 'user' ? 'user' : 'model',
          parts: [{ text: msg.text }]
        });
      });
    }
    
    // Add current message
    formattedContents.push({
      role: 'user',
      parts: [{ text: message }]
    });

    const langNames: Record<string, string> = {
      en: 'English',
      ta: 'Tamil (தமிழ்)',
      ur: 'Urdu (اردو)',
      hi: 'Hindi (हिन्दी)',
      ml: 'Malayalam (മലയാളം)',
      es: 'Spanish (Español)'
    };
    const targetLang = langNames[language] || 'English';

    const systemInstruction = `You are "Thambi", an exceptionally warm, welcoming, multitalented AI Cultural Ambassador and travel companion for Tamil Nadu, India.
    You are fluent in 6 core languages: English, Tamil (தமிழ்), Urdu (اردو), Hindi (हिन्दी), Malayalam (മലയാളം), and Spanish (Español).
    
    Your objective is to provide tourists with rich, accurate, and culturally authentic insights about Tamil Nadu's history, ancient dynasties (Chola, Pandya, Pallava, Nayaka, Chera), outstanding Dravidian architecture, sacred temples, beaches, cuisine, and local festivals.
    
    Follow these rules:
    1. Primary Language: You MUST reply in ${targetLang}. If the user addresses you in another language or script, respond in that language smoothly, but default to ${targetLang}.
    2. Trademark Greeting: Always begin or naturally sprinkle in polite Tamil greetings like "Vanakkam" (welcome), "Nandri" (thank you), or "Nalama?" (how are you?), regardless of language, as your friendly signature greeting as Thambi!
    3. Maintain an extremely polite, passionate, and hospitable tone.
    4. Promote local artisans, traditional handicrafts (like Tanjore paintings, brass plates, Athangudi tiles), and community-guided tours to support the local economy.
    5. Provide clear safety and emergency guidance if a tourist mentions feeling lost, needing medical attention, or requiring police assistance.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.5-flash',
      contents: formattedContents,
      config: {
        systemInstruction,
        temperature: 0.7,
      }
    });

    res.json({ text: response.text });
  } catch (error: any) {
    console.error('Chat error:', error);
    res.status(500).json({ error: 'Failed to process AI chat. Please try again.', details: error.message });
  }
});

// Itinerary Planner Endpoint: Generates a fully customized Tamil Nadu travel itinerary
app.post('/api/itinerary', async (req, res) => {
  try {
    const { duration, budget, theme, companions, destination, pace, dietary } = req.body;
    
    if (!duration) {
      return res.status(400).json({ error: 'Duration is required' });
    }

    if (!process.env.GEMINI_API_KEY) {
      // Return a beautiful mock itinerary when API key is missing
      return res.json({
        title: `Explore ${destination || 'Tamil Nadu Heritage'}`,
        duration: Number(duration),
        budget: budget || 'Moderate',
        theme: theme || 'Cultural Heritage',
        pace: pace || 'Balanced',
        dietary: dietary || 'Any Food Preference',
        estimatedCost: {
          accommodation: '₹4,500 - ₹9,000',
          food: '₹2,000 - ₹3,500',
          activities: '₹800 - ₹1,500',
          transport: '₹2,500 - ₹4,000',
          total: '₹9,800 - ₹18,000'
        },
        days: Array.from({ length: Number(duration) }, (_, i) => ({
          day: i + 1,
          title: `Day ${i + 1}: Iconic Cultural & Heritage Exploration`,
          description: `Enjoy the beauty of historical heritage sites, local culinary journeys, and spiritual art forms tailored for ${pace || 'Balanced'} pace.`,
          activities: [
            {
              time: '08:30 AM',
              title: 'Morning Guided Heritage & Temple Tour',
              description: 'Explore the main architectural marvels and historic complexes with an authorized local guide.',
              locationName: destination || 'Grand Heritage Monument',
              fees: '₹40 - ₹100',
              category: 'temple',
              insiderTip: 'Arrive early before 9:00 AM to avoid noon heat and capture the golden sunlight on gopurams.'
            },
            {
              time: '01:00 PM',
              title: 'Authentic Banana Leaf Lunch',
              description: `Enjoy a legendary authentic meal served on a fresh banana leaf (${dietary || 'Vegetarian / Non-Veg options available'}).`,
              locationName: 'Heritage Culinary Mess',
              fees: '₹150 - ₹300',
              category: 'dining',
              insiderTip: 'Fold the banana leaf towards you when finished as a traditional sign of gratitude.'
            },
            {
              time: '04:00 PM',
              title: 'Artisan Workshop & Handicraft Shopping',
              description: 'Observe master artisans crafting traditional Tanjore paintings, brass lamps, or handloom sarees.',
              locationName: 'Cooperative Handicraft Emporium',
              fees: 'Free Entry',
              category: 'shopping',
              insiderTip: 'Ask the artisans for a live demonstration of bronze casting or silk thread loom weaving.'
            }
          ]
        })),
        tips: [
          'Add GEMINI_API_KEY to your workspace Secrets panel to enable dynamically personalized, real-time AI itinerary generations!',
          'Always dress modestly when visiting sacred places across Tamil Nadu.',
          'Keep lightweight cotton clothing and a reusable water bottle handy.'
        ]
      });
    }

    const ai = getGenAI();
    
    const prompt = `Generate a comprehensive, highly customized day-by-day travel itinerary for a tourist visiting Tamil Nadu.
    Parameters:
    - Destination: ${destination || 'Tamil Nadu'}
    - Duration: ${duration} days
    - Budget Level: ${budget || 'Moderate'}
    - Theme/Interest: ${theme || 'Cultural Heritage'}
    - Companions: ${companions || 'Solo'}
    - Travel Pace: ${pace || 'Balanced'} (Relaxed = 2 spots/day, Balanced = 3-4 spots/day, Fast-Paced = packed schedule)
    - Dietary Preference: ${dietary || 'Authentic Local Cuisine'}
    
    Ensure the activities are realistic, respect geographic distance, include specific dining options matching ${dietary || 'local cuisine'}, name actual monuments, specify appropriate fees (in Indian Rupees ₹), recommend local experiences like handicrafts, weaving centers, or music assemblies, provide an insider tip for each activity, and estimate an itemized cost breakdown for the trip total.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.5-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING, description: 'Catchy and culturally relevant title for the itinerary' },
            duration: { type: Type.INTEGER },
            budget: { type: Type.STRING },
            theme: { type: Type.STRING },
            pace: { type: Type.STRING },
            dietary: { type: Type.STRING },
            estimatedCost: {
              type: Type.OBJECT,
              properties: {
                accommodation: { type: Type.STRING, description: 'Estimated accommodation cost range' },
                food: { type: Type.STRING, description: 'Estimated food and beverage cost range' },
                activities: { type: Type.STRING, description: 'Estimated entry ticket fees range' },
                transport: { type: Type.STRING, description: 'Estimated local transport cost range' },
                total: { type: Type.STRING, description: 'Estimated grand total per person range' }
              },
              required: ['accommodation', 'food', 'activities', 'transport', 'total']
            },
            days: {
              type: Type.ARRAY,
              description: 'List of days in the itinerary',
              items: {
                type: Type.OBJECT,
                properties: {
                  day: { type: Type.INTEGER },
                  title: { type: Type.STRING, description: 'Theme or highlight of this specific day' },
                  description: { type: Type.STRING, description: 'General overview of what the tourist will experience today' },
                  activities: {
                    type: Type.ARRAY,
                    items: {
                      type: Type.OBJECT,
                      properties: {
                        time: { type: Type.STRING, description: 'E.g., "09:00 AM" or "Sunset"' },
                        title: { type: Type.STRING, description: 'Name of the activity' },
                        description: { type: Type.STRING, description: 'Vivid description of what the tourist will see, eat, or do' },
                        locationName: { type: Type.STRING, description: 'Specific location or attraction name' },
                        fees: { type: Type.STRING, description: 'Estimated ticket prices or fees in Rupees, e.g. "₹40" or "Free"' },
                        category: { type: Type.STRING, description: 'One of: temple, dining, sightseeing, shopping, travel, relax' },
                        insiderTip: { type: Type.STRING, description: 'Local secret or practical tip for this specific activity' }
                      },
                      required: ['time', 'title', 'description', 'locationName', 'fees', 'category', 'insiderTip']
                    }
                  }
                },
                required: ['day', 'title', 'description', 'activities']
              }
            },
            tips: {
              type: Type.ARRAY,
              description: 'Practical, high-value cultural, weather, transport, and dress code tips for the trip',
              items: { type: Type.STRING }
            }
          },
          required: ['title', 'duration', 'budget', 'theme', 'days', 'tips']
        }
      }
    });

    const data = JSON.parse(response.text || '{}');
    res.json(data);
  } catch (error: any) {
    console.error('Itinerary generator error:', error);
    res.status(500).json({ error: 'Failed to generate itinerary. Please try again.', details: error.message });
  }
});

// Image Recognition Endpoint: Analyzes camera uploads/frames and detects heritage monuments
app.post('/api/recognize', async (req, res) => {
  try {
    const { image } = req.body; // base64 encoded image
    if (!image) {
      return res.status(400).json({ error: 'Base64 image is required' });
    }

    // Extract the raw base64 data (strip prefix if present)
    const matches = image.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
    let mimeType = 'image/jpeg';
    let base64Data = image;

    if (matches && matches.length === 3) {
      mimeType = matches[1];
      base64Data = matches[2];
    }

    if (!process.env.GEMINI_API_KEY) {
      return res.json({
        monumentName: 'Brihadisvara Temple (Big Temple)',
        identified: true,
        dynasty: 'Chola Dynasty',
        constructionYear: '1010 AD',
        architectureStyle: 'Dravidian Architecture',
        historySummary: 'Identified from simulated scanning. Built by Rajaraja Chola I, featuring a 216-foot high tower (Vimana) constructed entirely of granite. (Add GEMINI_API_KEY to secrets to enable real visual analysis!)',
        interestingFacts: [
          'The shadow of the main Vimana is said to never fall on the ground at noon during any season.',
          'The temple is built entirely of granite, which had to be brought from a quarry over 60 km away.',
          'The top dome (Kumbam) is carved from a single massive rock weighing about 80 tons.'
        ],
        visitorTips: [
          'The entry to the main sanctuary requires removing shoes.',
          'Marvel at the giant monolithic Nandi bull facing the main sanctum.',
          'Early morning around 07:00 AM is the most beautiful and peaceful time.'
        ],
        confidenceScore: 0.95
      });
    }

    const ai = getGenAI();

    const response = await ai.models.generateContent({
      model: 'gemini-3.5-flash',
      contents: [
        {
          inlineData: {
            mimeType,
            data: base64Data
          }
        },
        'Analyze this image. If it depicts a famous historical monument, temple, fort, beach, or heritage site in Tamil Nadu, identify it, detect its historical context, and return structured JSON. If it is NOT a heritage site or temple in Tamil Nadu, or if it is a photo of a person or random object, set identified to false, fill in a generic description of Tamil Nadu tourism, and provide tips to visit actual monuments.'
      ],
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            monumentName: { type: Type.STRING, description: 'Name of the identified site, e.g. "Mahabalipuram Shore Temple" or "Unknown Object"' },
            identified: { type: Type.BOOLEAN, description: 'True if it is a Tamil Nadu cultural/heritage site, false if it is a person, general landscape, or unrelated object.' },
            dynasty: { type: Type.STRING, description: 'The ruling dynasty associated with it, e.g., "Chola Dynasty", "Pallava Dynasty", "Nayak Dynasty", or "N/A"' },
            constructionYear: { type: Type.STRING, description: 'Estimated year or century of building, e.g., "11th Century AD", "700 AD", or "N/A"' },
            architectureStyle: { type: Type.STRING, description: 'Style of architecture, e.g. "Dravidian Style", "Indo-Saracenic", or "N/A"' },
            historySummary: { type: Type.STRING, description: 'A highly educational and rich paragraph detailing its historical significance, builders, and cultural importance.' },
            interestingFacts: {
              type: Type.ARRAY,
              description: '3 interesting or lesser-known facts about the monument',
              items: { type: Type.STRING }
            },
            visitorTips: {
              type: Type.ARRAY,
              description: 'Practical tips for tourists visiting this monument (e.g. dress codes, timings, best photography angles)',
              items: { type: Type.STRING }
            },
            confidenceScore: { type: Type.NUMBER, description: 'Score between 0.0 and 1.0 representing identification confidence' }
          },
          required: ['monumentName', 'identified', 'dynasty', 'constructionYear', 'architectureStyle', 'historySummary', 'interestingFacts', 'visitorTips', 'confidenceScore']
        }
      }
    });

    const result = JSON.parse(response.text || '{}');
    res.json(result);
  } catch (error: any) {
    console.error('Image recognition error:', error);
    res.status(500).json({ error: 'Failed to analyze image. Please try again.', details: error.message });
  }
});

// Mock TTS Endpoint: Can be called for Voice Guide narration if needed, though client-side Web Speech API is preferred for fluid latency.
app.post('/api/voice-guide', async (req, res) => {
  try {
    const { text } = req.body;
    if (!text) {
      return res.status(400).json({ error: 'Text is required for TTS' });
    }
    // We provide a fallback JSON response. In standard React we prefer Web Speech API for instant zero-lag audio.
    res.json({ success: true, message: 'Web Speech API is recommended on client side.' });
  } catch (error) {
    res.status(500).json({ error: 'Speech synthesis request failed' });
  }
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', time: new Date(), hasKey: !!process.env.GEMINI_API_KEY });
});


// ==========================================
// VITE AND STATIC SERVING MIDDLEWARE
// ==========================================

async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    // Development mode: Integrate Vite Dev Server
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
    console.log('Vite Dev Server integrated.');
  } else {
    // Production mode: Serve compiled assets
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
    console.log('Production static asset serving configured.');
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
});
