# NodeJS Express Latency Monitor



**Nodejs Express Latency Monitor** is a middleware for monitoring and alerting high latency in Express applications using TypeScript. It tracks request-response times, total requests, error counts, and latency distribution. When latency exceeds a threshold, it sends real-time alerts to **Telex** for quick incident response.

---

## **Features**
- **Latency Monitoring:** Tracks request-response times for all API endpoints.
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

## **Usage**

1.
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
```
```

### **Step 3: Send Request:**
Open a browser or use `curl` to hit the endpoint:
```bash
curl https://nodejs-latency-monitor.onrender.com/api/test-latency
```

### **Step 4: Check Telex Dashboard:**
1. Log in to your **Telex Dashboard**.
2. Navigate to **Channel where the webhook is taken**.
3. Confirm the alert is displayed with the following details:
   - Event Title: **High Latency Detected**
   - Method: `GET`
   - URL: `/api/test-latency`
   - Response Time: **8000 ms**

### **Step 5: Verify Alert Details:**
Ensure the alert contains:
- Request Method and URL
- Response Time
- HTTP Status Code

---

## **Acknowledgements**

- **Express.js** for the web framework.
- **Prom-Client** for metrics collection.
- **Telex** for real-time alert notifications.
- **TypeScript** for static typing and maintainability