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
        'https://images.freeimages.com/images/large-previews/5b3/slow-desert-tortoise-exploration-0410-5700223.jpg',
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
        default: '',
      },
    ],
    target_url:
      'https://ping.telex.im/v1/webhooks/019529e1-c35c-7964-82c6-b55baf1f828f',
    tick_url: `${URL}/`,
  },
};
