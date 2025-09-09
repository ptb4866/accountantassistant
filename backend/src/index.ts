import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { json } from 'express';
import { registerAccountingRoutes } from './routes/accounting';
import { errorHandler } from './middleware/error';

dotenv.config();

const app = express();

app.use(cors());
app.use(json({ limit: '2mb' }));

app.get('/health', (_req, res) => {
  res.json({ status: 'ok', service: 'technical-accountant-api' });
});

registerAccountingRoutes(app);

app.use(errorHandler);

const port = process.env.PORT ? Number(process.env.PORT) : 4000;
app.listen(port, () => {
  console.log(`API listening on http://localhost:${port}`);
});
