export const URL = 'https://3130-102-89-84-140.ngrok-free.app';

export const IntegrationConfig = {
  data: {
    date: {
      created_at: '2025-02-21',
      updated_at: '2025-02-21',
    },
    descriptions: {
      app_name: 'Express Latency Monitor',
      app_description:
        'ExpressTS-APM is designed to provide seamless latency monitoring for Express applications using TypeScript.',
      app_logo:
        'https://github.com/telexintegrations/nodejs_latency_monitor/blob/main/src/data/logo.jpg?raw=true',
      app_url: `${URL}/`,
      background_color: '#fff',
    },
    is_active: true,
    integration_type: 'modifier',
    integration_category: 'Performance Monitoring',
    key_features: [
      'latency-monitoring',
      'request-response-time',
      'high-latency-alert',
    ],
    author: 'Victor M. Adeleye',
    settings: [
      {
        label: 'channel_webhook',
        type: 'text',
        required: true,
        default: `https://ping.telex.im/v1/webhooks/019529e1-c35c-7964-82c6-b55baf1f828f`,
      },
    ],
    target_url:
      'https://ping.telex.im/v1/webhooks/019529e1-c35c-7964-82c6-b55baf1f828f',
    tick_url: `${URL}/`,
  },
};
