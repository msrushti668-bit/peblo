import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import authRoutes from './routes/auth.js';
import notesRoutes from './routes/notes.js';
import dashboardRoutes from './routes/dashboard.js';

const app = express();
app.use(cors());
app.use(express.json());

app.use('/auth', authRoutes);
app.use('/notes', notesRoutes);
app.use('/dashboard', dashboardRoutes);

// Health check for Railway
app.get('/', (req, res) => res.json({ status: 'ok', app: 'peblo-backend' }));
app.get('/health', (req, res) => res.json({ status: 'ok' }));

// DB diagnostic — remove after confirming DB works
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
app.get('/db-check', async (req, res) => {
  try {
    const count = await prisma.user.count();
    res.json({ status: 'ok', userCount: count });
  } catch (err) {
    res.status(500).json({ status: 'error', detail: err.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
