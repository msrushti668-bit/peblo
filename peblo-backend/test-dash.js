import 'dotenv/config';
import express from 'express';
import dashboardRoutes from './routes/dashboard.js';

const app = express();
app.use(express.json());
app.use('/dashboard', dashboardRoutes);

const PORT = 5001;
const server = app.listen(PORT, async () => {
  console.log(`Test server running on port ${PORT}`);
  
  try {
    const userId = "test-user-123";
    console.log(`\nTesting GET /dashboard/${userId}/insights...`);
    const response = await fetch(`http://localhost:${PORT}/dashboard/${userId}/insights`);
    const data = await response.json();
    console.log("Response Status:", response.status);
    console.log("Response Data:", JSON.stringify(data, null, 2));
  } catch (error) {
    console.error("Test failed:", error);
  } finally {
    server.close();
    process.exit(0);
  }
});
