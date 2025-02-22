import { parentPort } from 'worker_threads';
import NotificationService from '../services/notificationService';
import { IAlertDetails } from '../interfaces/alert.interface';
import { INotificationDetails, INotificationPayload } from '../interfaces/notification.interface';

if (parentPort) {
  parentPort.on('message', async (data: IAlertDetails) => {
    console.log('Worker received data:', data);

    const alertMessage = `🚨 High Latency Alert: ${data.method} ${data.url} took ${data.responseTime} ms`;

    const notificationDetails: INotificationPayload = {
      eventName: 'High Latency Detected',
      status: 'warning',
      username: 'ExpressTS APM',
      message: alertMessage,
    };

    try {
      await NotificationService.sendNotification(notificationDetails);
      parentPort?.postMessage('Notification Sent');
    } catch (error) {
      parentPort?.postMessage('Notification Failed');
    }
  });
}