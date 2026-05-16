import express from 'express';
import { PrismaClient } from '@prisma/client';
import { authMiddleware } from '../middleware/auth.js';

const router = express.Router();
const prisma = new PrismaClient();

// NVIDIA NIM helper
async function callNvidiaAI(prompt) {
  const baseUrl = process.env.LLM_BASE_URL || 'https://integrate.api.nvidia.com/v1';
  const res = await fetch(`${baseUrl}/chat/completions`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.LLM_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'meta/llama-3.1-8b-instruct',
      messages: [{ role: 'user', content: prompt }],
      max_tokens: 512,
    })
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data?.detail || data?.message || 'NVIDIA NIM API error');
  return data.choices[0].message.content.trim();
}

// GET /notes — Fetch all notes for the authenticated user
router.get('/', authMiddleware, async (req, res) => {
  try {
    const notes = await prisma.note.findMany({
      where: { authorId: req.user.userId },
      orderBy: { updatedAt: 'desc' }
    });
    res.json(notes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch notes' });
  }
});

// GET /notes/:id — Fetch a single note (must belong to user)
router.get('/:id', authMiddleware, async (req, res) => {
  try {
    const note = await prisma.note.findFirst({
      where: { id: req.params.id, authorId: req.user.userId }
    });
    if (!note) return res.status(404).json({ error: 'Note not found' });
    res.json(note);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch note' });
  }
});

// POST /notes — Create a new note
router.post('/', authMiddleware, async (req, res) => {
  try {
    const { title, content } = req.body;
    const newNote = await prisma.note.create({
      data: {
        title: title || 'Untitled Note',
        content,
        authorId: req.user.userId,
      }
    });
    res.status(201).json(newNote);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create note' });
  }
});

// POST /notes/:id/generate-summary — AI analysis
router.post('/:id/generate-summary', authMiddleware, async (req, res) => {
  try {
    const note = await prisma.note.findFirst({
      where: { id: req.params.id, authorId: req.user.userId }
    });
    if (!note) return res.status(404).json({ error: 'Note not found' });

    const prompt = `You are a productivity assistant. Analyze the following note and respond ONLY with a valid raw JSON object. Do not include any markdown, code fences, or extra text.

The JSON must have exactly these three keys:
- "summary": a 1-2 sentence summary of the note
- "action_items": an array of actionable task strings
- "suggested_title": a short, relevant title

Note Content:
"""
${note.content}
"""`;

    const responseText = await callNvidiaAI(prompt);
    const jsonMatch = responseText.match(/\{[\s\S]*\}/);
    if (!jsonMatch) throw new Error('No valid JSON found in AI response');
    const aiData = JSON.parse(jsonMatch[0]);

    await prisma.note.update({
      where: { id: note.id },
      data: {
        aiSummary: aiData.summary,
        aiActionItems: JSON.stringify(aiData.action_items || []),
        title: aiData.suggested_title || note.title
      }
    });

    res.json(aiData);
  } catch (error) {
    console.error('AI Generation Error:', error.message || error);
    res.status(500).json({ error: 'Failed to generate AI insights', detail: error.message });
  }
});

export default router;
