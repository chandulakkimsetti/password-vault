import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import authRoutes from './src/routes/auth.js';

dotenv.config();

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

const dbUrl = process.env.DATABASE_URL;

if (!dbUrl) {
  console.error("Error: DATABASE_URL is not defined in .env file");
  process.exit(1);
}

mongoose.connect(dbUrl)
  .then(() => console.log("✅ Successfully connected to MongoDB Atlas!"))
  .catch((error) => console.error("❌ Error connecting to MongoDB Atlas:", error));

app.get('/api', (req: Request, res: Response) => {
  res.json({ message: 'Hello from the back-end API!' });
});

app.use('/api/auth', authRoutes);

app.listen(port, () => {
  console.log(`🚀 Server is running on http://localhost:${port}`);
});