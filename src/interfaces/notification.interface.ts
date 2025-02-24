export interface INotificationPayload {
  event_name: string;
  status: string;
  username: string;
  message: string;
}

export interface INotificationDetails {
  webhookUrl: string;
  message: string;
}
