import { parentPort } from 'worker_threads';
import NotificationService from '../services/notificationService';
import { IAlertDetails } from '../interfaces/alert.interface';
import { INotificationDetails, INotificationPayload } from '../interfaces/notification.interface';

class AlertWorker {
  static async processHighLatencyAlert(data: IAlertDetails): Promise<void> {
    console.log('Processing High Latency Alert:', data);

    const alertMessage = `🚨 High Latency Alert: ${data.method} ${data.url} took ${data.responseTime} ms`;

    const notificationDetails: INotificationPayload = {
      eventName: 'High Latency Detected',
      status: 'success',
      username: 'ExpressTS Latency Monitor',
      message: alertMessage,
    };

    try {
      await NotificationService.sendNotification(notificationDetails);
      console.log('Notification Sent Successfully');
    } catch (error) {
      console.error('Notification Sending Failed:', error);
    }
  }
}

export default AlertWorker;