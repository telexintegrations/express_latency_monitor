import { parentPort } from 'worker_threads';
import axios from 'axios';
import dotenv from 'dotenv';
import { INotificationPayload } from '../interfaces/notification.interface';

dotenv.config();


// Listen for messages from the main thread
parentPort?.on('message', async (payload: INotificationPayload) => {
  
  try {
    const response = await axios.post(
      process.env.ALERT_WEBHOOK as string,
      payload,
      {
        timeout: 5000,
      },
    );

    parentPort?.postMessage({
      status: 'success',
      data: response.status,
    });
  } catch (error) {
    parentPort?.postMessage({
      status: 'error',
      error: (error as Error).message,
    });
  }
});