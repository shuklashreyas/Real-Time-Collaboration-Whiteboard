// server/src/app.ts

import express from 'express';
import cors from 'cors';

const app = express();

app.use(cors());
app.use(express.json());

// You could set up any REST endpoints here, e.g.:
// app.use('/api/auth', authRoutes);

export default app;
