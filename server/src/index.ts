import express, { Application } from 'express';
import helmet from 'helmet';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { authRouter } from './routes/auth.route';
import { globalErrorHandler } from './middlewares/handleErrors';

dotenv.config();

const app: Application = express();

const MONGO_URI = process.env.MONGO_CONNECTION_STRING || '';
const PORT = process.env.PORT || 5000;

app.use(
  cors({
    origin: 'http://localhost:5173',
    credentials: true,
  })
);
app.use(helmet());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/auth', authRouter);

if (!MONGO_URI) {
  console.error('❌ MONGO_CONNECTION_STRING is missing');
  process.exit(1);
}

mongoose
  .connect(MONGO_URI)
  .then(() => console.log('✅ DB is connected successfully!'))
  .catch((err) => {
    console.error('❌ DB connection failed:', err);
    process.exit(1);
  });

app.listen(PORT, () => {
  console.log(`✅ Server is running on port ${PORT}`);
});

app.use(globalErrorHandler);
