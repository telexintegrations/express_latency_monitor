# NodeJS Express Latency Monitor



**Nodejs Express Latency Monitor** is a middleware for monitoring and alerting high latency in Express applications using TypeScript. It tracks request-response times, total requests, error counts, and latency distribution. When latency exceeds a threshold, it sends real-time alerts to **Telex** for quick incident response.

---

## **Features**
- **Latency Monitoring:** Tracks request-response times for all API endpoints.
- **Error Tracking:** Monitors HTTP status codes for error responses.
- **Prometheus Metrics:** Exposes metrics compatible with Prometheus scraping.
- **High Latency Alerts:** Sends alerts to Telex when latency exceeds 3000 ms.
- **Real-Time Notifications:** Integrates with Telex for instant latency alerts.

---

## **Technology Stack**
- **Express.js:** Web framework for building REST APIs.
- **TypeScript:** Static typing for better maintainability and scalability.
- **Prom-Client:** Collects and exposes metrics for Prometheus.
- **Axios:** HTTP client for sending notifications to Telex.
- **Telex:** Notification platform for real-time alerts.

---

## **Installation**

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/telexintegrations/nodejs_latency_monitor.git
   cd express-latency-monitor
   ```

2. **Install Dependencies:**
   ```bash
   npm install
   ```

3. **Environment Variables:**
   Create a `.env` file in the root directory and add the following:

   ```env
   PORT=3000
   TELEX_WEBHOOK_URL='https://ping.telex.im/v1/webhooks/YOUR_TELEX_WEBHOOK_ID'
   LATENCY_THRESHOLD=3000
   ```

4. **Start the Server:**
   ```bash
   npm run start
   ```

---

## **Usage**

1. **Import and Use Middleware in Express App:**
   ```typescript
   import express from 'express';
   import latencyMonitor from './middleware/latencyMonitor';

   const app = express();

   app.use(latencyMonitor);

   app.get('/api/example', (req, res) => {
     res.send('Example route');
   });

   const PORT = process.env.PORT || 3000;
   app.listen(PORT, () => console.log(\`Server running on port \${PORT}\));
   ```


## **Telex Integration**

### **How It Works:**
- The middleware tracks the response time of each request.
- If the latency exceeds **3000 ms**, it triggers an alert.
- The alert is processed in a worker thread (`AlertWorker`) to avoid blocking the main thread.
- `NotificationService` sends the alert to the **Telex webhook URL**.
- Telex receives the alert and displays it as a warning notification in the dashboard.

### **Alert Message Format:**
```
🚨 High Latency Alert: [HTTP Method] [URL] took [Response Time] ms
```

### **Example Alert on Telex:**
```
🚨 High Latency Alert: GET /api/example took 4500 ms
```

---

## **Testing with Telex**

### **Step 1: Verify Setup**
Ensure the app is running with the Telex webhook URL correctly configured in `.env`.

### **Step 2: Trigger High Latency:**
Simulate high latency by delaying a response in one of the routes:
```typescript
app.get('/api/test-latency', (req, res) => {
  setTimeout(() => {
    res.send('Delayed response');
  }, 4000); // 4000 ms > 3000 ms threshold
});
```

### **Step 3: Send Request:**
Open a browser or use `curl` to hit the endpoint:
```bash
curl http://localhost:3000/api/test-latency
```

### **Step 4: Check Telex Dashboard:**
1. Log in to your **Telex Dashboard**.
2. Navigate to **Notifications**.
3. Confirm the alert is displayed with the following details:
   - Event Title: **High Latency Detected**
   - Method: `GET`
   - URL: `/api/test-latency`
   - Response Time: **4000 ms**

### **Step 5: Verify Alert Details:**
Ensure the alert contains:
- Request Method and URL
- Response Time
- HTTP Status Code

---

## **Monitoring with Prometheus**

### **Metrics Available:**
- `requests_total`: Total number of requests received
- `error_total`: Count of error responses
- `request_latency_seconds`: Latency distribution of requests


## **Acknowledgements**

- **Express.js** for the web framework.
- **Prom-Client** for metrics collection.
- **Telex** for real-time alert notifications.
- **TypeScript** for static typing and maintainability