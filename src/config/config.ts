require('dotenv').config();

export const URL = 'https://nodejs-latency-monitor.onrender.com';

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
      app_url: `${URL}`,
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
    message: 'Latency monitoring for Express applications',
    settings: [
      {
        label: 'channel_webhook',
        type: 'text',
        required: true,
        description: 'The webhook URL for alert notifications',
        default: process.env.ALERT_WEBHOOK || "Not set",
      },
    ],
    target_url: process.env.TARGET_URL,
    tick_url: `${URL}`,
    website: 'https://telex.im',
  },
};
