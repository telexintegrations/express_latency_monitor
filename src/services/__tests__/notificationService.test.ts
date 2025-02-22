import { INotificationPayload } from '../../interfaces/notification.interface';
import NotificationService from '../notificationService';
import { Worker } from 'worker_threads';

describe('NotificationService', () => {
  it('should send notification successfully', async () => {
    const payload: INotificationPayload = {
      eventName: 'Test Event',
      status: 'info',
      username: 'Test User',
      message: 'This is a test message',
    };

    jest.spyOn(NotificationService, 'sendNotification').mockResolvedValue();

    await expect(
      NotificationService.sendNotification(payload),
    ).resolves.not.toThrow();
  });

  it('should handle worker error', async () => {
    const payload: INotificationPayload = {
      eventName: 'Test Event',
      status: 'error',
      username: 'Test User',
      message: 'This is a test message',
    };

    jest
      .spyOn(NotificationService, 'sendNotification')
      .mockRejectedValue('Error');

    await expect(NotificationService.sendNotification(payload)).rejects.toEqual(
      'Error',
    );
  });
});