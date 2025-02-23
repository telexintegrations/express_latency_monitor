import axios from 'axios';

const PING_INTERVAL = 10 * 60 * 1000; // 10 minutes in milliseconds
const SITE_URL =
  'https://nodejs-latency-monitor.onrender.com/keep-running'; // Change to your site URL

const keepAppRunning = () => {
  setInterval(async () => {
    try {
      const response = await axios.get(SITE_URL);
      console.log('Keep-Running Ping Success:', response.data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Keep-Running Ping Failed:', error.message);
      } else {
        console.error('Keep-Running Ping Failed:', error);
      }
    }
  }, PING_INTERVAL);
};

// Start the keep-running pings
keepAppRunning();