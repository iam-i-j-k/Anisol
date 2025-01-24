const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const { z } = require('zod');

dotenv.config();

const ContentPreferencesSchema = z.object({
  tone: z.enum(['professional', 'casual', 'friendly', 'formal']),
  length: z.enum(['short', 'medium', 'long']),
  keywords: z.array(z.string()),
  industry: z.string(),
  contentType: z.string(),
});

const GenerateContentSchema = z.object({
  prompt: z.string(),
  preferences: ContentPreferencesSchema,
});

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

function calculateScores(content, keywords) {
  const wordCount = content.split(/\s+/).length;
  const keywordCount = keywords.reduce((count, keyword) =>
    count + (content.toLowerCase().split(keyword.toLowerCase()).length - 1), 0);
  
  const keywordDensity = parseFloat(((keywordCount / wordCount) * 100).toFixed(2));
  const seoScore = Math.min(Math.max(keywordDensity * 2, 50), 95);
  const readabilityScore = Math.min(90 - (content.split(/[.!?]/).length * 2), 95);

  return {
    seoScore: Math.round(seoScore),
    readabilityScore: Math.round(readabilityScore),
    keywordDensity: parseFloat(keywordDensity.toFixed(2)),
  };
}

function formatContent(content) {
  const paragraphs = content.split(/\n\n/).map(p => p.trim()).filter(p => p);
  
  const formattedContent = paragraphs.map(paragraph => {
    const sentences = paragraph.split(/(?<=[.!?])\s+/)
      .map(sentence => {
        const trimmed = sentence.trim();
        return trimmed.charAt(0).toUpperCase() + trimmed.slice(1) + (trimmed.match(/[.!?]$/) ? '' : '.');
      });
    
    return sentences.join(' ');
  }).join('\n\n');

  return formattedContent;
}

app.post('/generate-content', async (req, res) => {
  try {
    console.log('Received request:', req.body); // Log the incoming request for debugging

    const { prompt, preferences } = req.body;

    const lengthMap = {
      'short': 'concise and brief',
      'medium': 'balanced and informative',
      'long': 'comprehensive and detailed',
    };
    
    const toneMap = {
      'professional': 'formal and authoritative',
      'casual': 'conversational and friendly',
      'friendly': 'warm and approachable',
      'formal': 'academic and structured',
    };

    const aiPrompt = `Generate a ${lengthMap[preferences.length]} ${toneMap[preferences.tone]} 
      ${preferences.contentType} for the ${preferences.industry} industry about: ${prompt}. 
      ${preferences.keywords.length > 0 ? `Incorporate these keywords naturally: ${preferences.keywords.join(', ')}` : ''}
      
      GUIDELINES:
      - Use clear, concise language
      - Create 3-4 paragraphs
      - Ensure logical flow of ideas
      - Use proper grammar and punctuation
      - Make content engaging and informative
      - Naturally integrate the specified keywords`;

    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const result = await model.generateContent(aiPrompt);
    if (!result || !result.response) {
      throw new Error('Invalid response from AI model'); // Check for valid response
    }

    let generatedText = result.response.text() || '';

    const formattedContent = formatContent(generatedText);

    const contentMetrics = calculateScores(
      formattedContent, 
      preferences.keywords
    );

    const generatedContent = {
      title: `${preferences.industry.charAt(0).toUpperCase() + preferences.industry.slice(1)} ${preferences.contentType.charAt(0).toUpperCase() + preferences.contentType.slice(1)}`,
      content: formattedContent,
      ...contentMetrics,
      wordCount: formattedContent.split(/\s+/).length,
      timestamp: new Date(),
    };

    res.json(generatedContent);
  } catch (error) {
    console.error('Content generation error:', error);
    res.status(500).json({ 
      error: 'Failed to generate content', 
      details: error instanceof Error ? error.message : 'Unknown error' 
    });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

module.exports = app;
