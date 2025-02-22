import { Request, Response, NextFunction } from 'express';
import { performance } from 'perf_hooks';
import { Counter, Histogram, Registry } from 'prom-client';
import AlertWorker from '../workers/latencyAlertWorker';
import { IAlertDetails } from '../interfaces/alert.interface';
import path from 'path';

const register = new Registry();
const requestCount = new Counter({
  name: 'requests_total',
  help: 'Total number of requests',
  labelNames: ['method', 'status'],
  registers: [register],
});

const errorCount = new Counter({
  name: 'error_total',
  help: 'Total number of failed requests',
  labelNames: ['method', 'status'],
  registers: [register],
});

const latencyHistogram = new Histogram({
  name: 'request_latency_seconds',
  help: 'Request latency in seconds',
  labelNames: ['method', 'status'],
  buckets: [0.005, 0.01, 0.025, 0.05, 0.1, 0.25, 0.5, 1, 2.5, 5, 10],
  registers: [register],
})

let totalRequests = 0;
let totalErrors = 0;
let startTime = performance.now();

const latencyMonitor = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  const requestStartTime = performance.now();

  res.on('finish', () => {
    const requestEndTime = performance.now();
    const responseTime = requestEndTime - requestStartTime;

    requestCount.inc({ method: req.method, status: res.statusCode.toString() });
    totalRequests++;

    if (res.statusCode >= 400) {
      errorCount.inc({ method: req.method, status: res.statusCode.toString() });
      totalErrors++;
    }
latencyHistogram.observe(3)
    console.log(`${req.method} ${req.url} - ${responseTime.toFixed(3)} ms`);

    const errorRate =
      totalRequests > 0 ? (totalErrors / totalRequests) * 100 : 0;
    const elapsedTime = (performance.now() - startTime) / 1000;
    const throughput = totalRequests / elapsedTime;

    console.log(`Error Rate: ${errorRate.toFixed(2)}%`);
    console.log(`Throughput: ${throughput.toFixed(2)} requests/second`);

    if (responseTime > 3000) {
      const alertDetails: IAlertDetails = {
        method: req.method,
        url: req.url,
        responseTime: responseTime.toFixed(3),
        statusCode: res.statusCode,
      };

      AlertWorker.processHighLatencyAlert(alertDetails).catch((err) =>
        console.error('Alert Worker Error:', err),
      );
    }
  });

  next();
};

export default latencyMonitor;