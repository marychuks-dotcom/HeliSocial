import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json({ limit: '10mb' }));

// Health Check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    service: 'HeliSocial Engine',
    timestamp: new Date().toISOString(),
  });
});

// Server-side Gemini API endpoint
app.post('/api/ai/generate', async (req, res) => {
  try {
    const {
      sourceType,
      sourceText,
      sourceTitle,
      targetAudience,
      tone,
      objective,
      brandVoice,
      businessName,
      businessHandle,
      businessNiche,
      campaignId,
    } = req.body;

    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      // Return 404 or gracefully signal client fallback
      return res.status(200).json({
        usingFallback: true,
        message: 'No GEMINI_API_KEY configured on server; using local intelligent generator.',
        assets: null,
      });
    }

    const ai = new GoogleGenAI({ apiKey });

    const prompt = `You are the executive content director and brand strategist for "${businessName}" (@${businessHandle}), operating in the ${businessNiche} niche.
Brand Positioning: ${brandVoice?.archetype || 'The Analytical Expert'}.
Primary Tone: ${tone || 'Authoritative'}.
Strategic Objective: ${objective || 'Thought Leadership'}.
Target Audience: ${targetAudience || 'Founders and industry leaders'}.
Forbidden Words (DO NOT USE): ${brandVoice?.forbiddenTerms?.join(', ') || 'synergy, game-changer, supercharge'}.

Source Content (${sourceType}):
Title: ${sourceTitle}
Content:
${sourceText}

Generate a JSON object containing multi-format campaign assets with this exact structure:
{
  "linkedinPost": {
    "hook": "Strong 1-2 sentence opening hook",
    "body": "Formatted body text with numbered points and strategic clarity",
    "cta": "Engaging closing call-to-action"
  },
  "carousel": {
    "hook": "Carousel opening hook (e.g. 8 Slides on...)",
    "slides": [
      {
        "slideNumber": 1,
        "title": "Slide title",
        "content": "Slide content text",
        "visualNote": "Layout instructions"
      }
    ],
    "cta": "Closing CTA"
  },
  "xThread": {
    "hook": "1/5 Opening hook with thread emoji",
    "tweets": [
      "1/5 ...",
      "2/5 ...",
      "3/5 ...",
      "4/5 ...",
      "5/5 ..."
    ],
    "cta": "Final tweet call to action"
  },
  "quickPosts": [
    "Quick standalone post 1",
    "Quick standalone post 2",
    "Quick standalone post 3"
  ],
  "hooks": [
    "Alternative hook 1",
    "Alternative hook 2",
    "Alternative hook 3",
    "Alternative hook 4",
    "Alternative hook 5"
  ],
  "hashtags": [
    "#Hashtag1",
    "#Hashtag2",
    "#Hashtag3"
  ]
}
Return ONLY valid raw JSON with no extra markdown backticks.`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
      },
    });

    const responseText = response.text || '{}';
    const parsed = JSON.parse(responseText);

    const baseCmpId = campaignId || 'cmp-' + Date.now();
    const assets = [
      {
        id: 'gen-' + Date.now() + '-li',
        businessId: req.headers['x-business-id'] || 'biz-01',
        campaignId: baseCmpId,
        assetType: 'LINKEDIN_POST',
        title: `LinkedIn Post: ${sourceTitle || 'Strategic Insight'}`,
        structuredPayload: parsed.linkedinPost || {},
        plainTextVersion: `${parsed.linkedinPost?.hook || ''}\n\n${parsed.linkedinPost?.body || ''}\n\n${parsed.linkedinPost?.cta || ''}`,
        isArchived: false,
        createdAt: new Date().toISOString(),
      },
      {
        id: 'gen-' + Date.now() + '-car',
        businessId: req.headers['x-business-id'] || 'biz-01',
        campaignId: baseCmpId,
        assetType: 'LINKEDIN_CAROUSEL',
        title: `Carousel Deck: ${sourceTitle || 'Strategy'}`,
        structuredPayload: parsed.carousel || {},
        plainTextVersion: `Carousel: ${sourceTitle}. Contains ${parsed.carousel?.slides?.length || 8} slides.`,
        isArchived: false,
        createdAt: new Date().toISOString(),
      },
      {
        id: 'gen-' + Date.now() + '-thr',
        businessId: req.headers['x-business-id'] || 'biz-01',
        campaignId: baseCmpId,
        assetType: 'X_THREAD',
        title: `X Thread: ${sourceTitle || 'Breakdown'}`,
        structuredPayload: {
          hook: parsed.xThread?.hook,
          threadTweets: parsed.xThread?.tweets,
          cta: parsed.xThread?.cta,
        },
        plainTextVersion: (parsed.xThread?.tweets || []).join('\n\n---\n\n'),
        isArchived: false,
        createdAt: new Date().toISOString(),
      },
      {
        id: 'gen-' + Date.now() + '-qp',
        businessId: req.headers['x-business-id'] || 'biz-01',
        campaignId: baseCmpId,
        assetType: 'QUICK_POSTS',
        title: 'Quick Standalone Variations',
        structuredPayload: { quickPosts: parsed.quickPosts || [] },
        plainTextVersion: (parsed.quickPosts || []).join('\n\n'),
        isArchived: false,
        createdAt: new Date().toISOString(),
      },
      {
        id: 'gen-' + Date.now() + '-hk',
        businessId: req.headers['x-business-id'] || 'biz-01',
        campaignId: baseCmpId,
        assetType: 'HOOKS',
        title: 'Alternative Hooks',
        structuredPayload: { hooksList: parsed.hooks || [] },
        plainTextVersion: (parsed.hooks || []).join('\n'),
        isArchived: false,
        createdAt: new Date().toISOString(),
      },
      {
        id: 'gen-' + Date.now() + '-tag',
        businessId: req.headers['x-business-id'] || 'biz-01',
        campaignId: baseCmpId,
        assetType: 'HASHTAGS',
        title: 'Hashtag Groupings',
        structuredPayload: { hashtags: parsed.hashtags || [] },
        plainTextVersion: (parsed.hashtags || []).join(' '),
        isArchived: false,
        createdAt: new Date().toISOString(),
      },
    ];

    return res.json({ assets });
  } catch (err: any) {
    console.error('Server AI generation error:', err);
    return res.status(500).json({ error: err.message || 'Internal generation error' });
  }
});

async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`HeliSocial Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
