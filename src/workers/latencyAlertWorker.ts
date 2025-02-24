import * as path from 'path';
import { Worker } from 'worker_threads';
import { IAlertDetails } from '../interfaces/alert.interface';

class AlertWorker {
  static async processHighLatencyAlert(details: IAlertDetails): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      const workerPath = path.resolve(
        __dirname,
        process.env.NODE_ENV === 'production'
          ? '../dist/workers/notification.worker.js'
          : '../workers/alert.worker.ts',
      );

      const worker = new Worker(workerPath, {
        execArgv:
          process.env.NODE_ENV === 'production'
            ? []
            : ['-r', 'ts-node/register'],
      });

      worker.postMessage(details);

      worker.on('message', (msg) => {
        console.log('Worker message:', msg);
        resolve(msg);
      });

      worker.on('error', (err) => {
        console.error('Worker error:', err);
        reject(err);
      });

      worker.on('exit', (code) => {
        if (code !== 0) {
          reject(`Worker stopped with exit code ${code}`);
        }
      });
    });
  }
}

export default AlertWorker;
