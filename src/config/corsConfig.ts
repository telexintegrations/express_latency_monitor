// src/config/corsConfig.ts
import { CorsOptions } from 'cors';

const allowedOrigins = [
  'https://telex.im',
  'https://staging.telex.im',
  'http://telextest.im',
  'http://staging.telextest.im',
];

export const corsOptions: CorsOptions = {
  origin: (origin, callback) => {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    } else {
      return callback(new Error('Not allowed by CORS'));
    }
  },
};