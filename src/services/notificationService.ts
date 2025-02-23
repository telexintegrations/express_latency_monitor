import path from 'path';
import { Worker } from 'worker_threads';
import { INotificationPayload } from '../interfaces/notification.interface';

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
        '../../dist/workers/notification.worker.js',
      );
      await this.createWorker(workerPath, payload);
    } catch (error) {
      console.error('Failed to send notification:', error);
      throw error;
    }
  }
}

export default NotificationService;
