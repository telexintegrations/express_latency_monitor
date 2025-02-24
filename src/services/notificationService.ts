import path from 'path';
import { Worker } from 'worker_threads';
import { INotificationPayload } from '../interfaces/notification.interface';

const ALERT_URL =
  'https://ping.telex.im/v1/webhooks/0195349e-5223-76a4-8b03-4a7374921ab0';
class NotificationService {
  // Private method to create and initialize a worker
  private static createWorker(
    workerPath: string,
    payload: INotificationPayload,
  ): Promise<unknown> {
    return new Promise((resolve, reject) => {
      const worker = new Worker(workerPath, {
        execArgv:
          process.env.NODE_ENV === 'production'
            ? []
            : ['-r', 'ts-node/register'],
      });

      // Send payload to worker
      worker.postMessage(payload);

      // Listen for messages from the worker
      worker.on('message', (msg) => {
        console.log('Notification Worker message:', msg);
        resolve(msg);
      });

      // Handle worker errors
      worker.on('error', (err) => {
        console.error('Notification Worker error:', err);
        reject(err);
      });

      // Handle worker exit
      worker.on('exit', (code) => {
        if (code !== 0) {
          reject(
            new Error(`Notification Worker stopped with exit code ${code}`),
          );
        }
      });
    });
  }

  // Public method to send a notification
  public static async sendNotification(
    payload: INotificationPayload,
  ): Promise<void> {
    try {
      const workerPath = path.resolve(
        __dirname,
        '../workers/notification.worker.ts',
      );
      console.log('Sending Notification:', (payload));
    const response = await fetch(ALERT_URL, {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });
      await this.createWorker(workerPath, payload);
    } catch (error) {
      console.error('Failed to send notification:', error);
      throw error;
    }
  }
}

export default NotificationService;
