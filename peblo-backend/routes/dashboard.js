import express from 'express';
import { PrismaClient } from '@prisma/client';
import { authMiddleware } from '../middleware/auth.js';

const router = express.Router();
const prisma = new PrismaClient();

// GET /dashboard/insights
router.get('/insights', authMiddleware, async (req, res) => {
  try {
    const userId = req.user.userId;

    // 1. Total Notes Created
    const totalNotes = await prisma.note.count({
      where: { authorId: userId }
    });

    // 2. Aggregate Pending Tasks
    const notesWithTasks = await prisma.note.findMany({
      where: { authorId: userId },
      select: { aiActionItems: true }
    });

    const allActionItems = notesWithTasks.flatMap(n => {
      try { return JSON.parse(n.aiActionItems || '[]'); }
      catch { return []; }
    }).filter(item => item && item.trim().length > 0);

    const pendingTasksCount = allActionItems.length;

    // 3. Activity Tracking (Notes created in the last 7 days)
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const recentActivity = await prisma.note.count({
      where: { authorId: userId, createdAt: { gte: sevenDaysAgo } }
    });

    res.json({
      metrics: { totalNotes, pendingTasksCount, recentActivity },
      recentTasks: allActionItems.slice(0, 10)
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch dashboard insights' });
  }
});

export default router;
