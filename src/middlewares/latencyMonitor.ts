import { Request, Response, NextFunction } from 'express';
import { performance } from 'perf_hooks';
import { Counter, Histogram, Registry } from 'prom-client';
import { INotificationPayload } from '../interfaces/notification.interface';
import NotificationService from '../services/notificationService';

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
});

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

    console.log(`${req.method} ${req.url} - ${responseTime.toFixed(3)} ms`);

    if (responseTime > 3000) {
      const alertMessage = `🚨 High Latency Alert: ${req.method} ${
        req.url
      } took ${responseTime.toFixed(3)} ms`;

      const notificationDetails: INotificationPayload = {
        eventName: 'High Latency Detected',
        status: 'success',
        username: 'ExpressTS Latency Monitor',
        message: alertMessage,
      };

      // Call the Notification Service here
      NotificationService.sendNotification(notificationDetails)
        .then(() => {
          console.log('Notification Sent Successfully');
        })
        .catch((error) => {
          console.error('Notification Sending Failed:', error);
        });
    }
  });

  next();
};

export default latencyMonitor;