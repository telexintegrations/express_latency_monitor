import express, { Request, Response } from 'express';
import latencyMonitor from './middlewares/latencyMonitor';
import { IntegrationConfig } from './config/config';
import cors from 'cors';
import { corsMiddleware } from './middlewares/corsMiddleware';

const app = express();

app.use(corsMiddleware);

let requestCount = 0;
let startTime = Date.now();
app.use(latencyMonitor);

app.get('/', (req: Request, res: Response) => {
  res.send('Welcome to Express Latency Monitor...');
});

app.get('/api/test-latency', (req, res) => {
  setTimeout(() => {
    res.send('Delayed response');
  }, 8000); // 4000 ms > 3000 ms threshold
});

app.get('/integration-configurations', (req: Request, res: Response) => {
  res.json(IntegrationConfig);
});

// Route: GET /simulate-slow
app.get('/slow-simulator', async (req: Request, res: Response) => {
  await new Promise((resolve) => setTimeout(resolve, 9000)); // Simulate 4.5s delay
  res.send('Response after 5 seconds');
});

app.get('/api/test-latency', (req, res) => {
  setTimeout(() => {
    res.send('Delayed response');
  }, 8000); // 4000 ms > 3000 ms threshold
});

app.get('/keep-running', (req, res) => {
  res.send('App is running!');
});

// Route: GET /simulate-throughput
app.get('/throughput-simulator', (req: Request, res: Response) => {
  requestCount++;
  const currentTime = Date.now();
  const timeElapsed = (currentTime - startTime) / 1000; // In seconds

  if (timeElapsed > 1) {
    const throughput = (requestCount / timeElapsed).toFixed(2);
    console.log(`Throughput: ${throughput} requests/second`);
    startTime = currentTime;
    requestCount = 0;
  }

  res.send('Throughput tracking endpoint');
});
export default app;