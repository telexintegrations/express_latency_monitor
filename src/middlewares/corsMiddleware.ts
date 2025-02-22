// src/middlewares/corsMiddleware.ts
import cors from 'cors';
import { corsOptions } from '../config/corsConfig';

export const corsMiddleware = cors(corsOptions);
