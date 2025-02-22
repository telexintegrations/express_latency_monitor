import path from 'path';
import { Worker } from 'worker_threads';
import { INotificationPayload } from '../interfaces/notification.interface';

class NotificationService {
  static async sendNotification(payload: INotificationPayload): Promise<void> {

    return new Promise<void>((resolve, reject) => {
      const workerPath = path.resolve(
        __dirname, '../../dist/workers/notification.worker.js'
      );
      console.log('Worker path:', workerPath);
      const worker = new Worker(workerPath, {
        execArgv:
          process.env.NODE_ENV === 'production'
            ? []
            : ['-r', 'ts-node/register'],
      });

      worker.postMessage(payload);
      worker.on('message', (msg) => {
        console.log('Notification Worker message:', msg);
        resolve(msg);
      });

      worker.on('error', (err) => {
        console.error('Notification Worker error:', err);
        reject(err);
      });

      worker.on('exit', (code) => {
        if (code !== 0) {
          reject(`Notification Worker stopped with exit code ${code}`);
        }
      });


    });
  }
}

export default NotificationService;