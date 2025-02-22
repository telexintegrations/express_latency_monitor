import request from 'supertest';
import express from 'express';
import latencyMonitor from '../latencyMonitor';

const app = express();
app.use(latencyMonitor);

app.get('/test', (req, res) => {
  res.status(200).send('OK');
});

describe('Latency Monitor Middleware', () => {
  it('should log request and response time', async () => {
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation();
    await request(app).get('/test').expect(200);
    expect(consoleSpy).toHaveBeenCalledWith(
      expect.stringContaining('GET /test -'),
    );
    consoleSpy.mockRestore();
  });

  it('should increment request counter', async () => {
    const res = await request(app).get('/test');
    expect(res.status).toBe(200);
  });
});