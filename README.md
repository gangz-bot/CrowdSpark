# 🚀 CrowdSpark – Crowdfunding Web Platform

CrowdSpark is a full-stack crowdfunding platform where users can launch and support fundraising campaigns. It features secure payments, campaign management, real-time updates, and a clean UI for both donors and campaign creators.

---

## 🌟 Key Features

1. **🔐 Authentication**
   - Sign up, login, logout functionality
   - JWT-based session management

2. **📢 Campaign System**
   - Create, view, and manage campaigns
   - Upload images and details
   - StartCampaign & Campaign pages

3. **💳 Donation Module**
   - Razorpay integrated for secure donations
   - Bank linking and donation tracking (via `BankDetails.jsx`)

4. **📊 Dashboards**
   - Admin and user-specific dashboards
   - Real-time stats, notifications, and updates

5. **📦 Backend API**
   - Modular routes: `auth`, `bank`, `campaign`, `payment`, `chat`, etc.
   - Express + MongoDB setup

6. **🤖 Extras**
   - Chat system
   - RealTimeUpdates, Notification system
   - OpenAI integration (optional feature)

---

## 🛠 Tech Stack

### 🧩 Frontend
- React.js + Vite
- Tailwind CSS
- Razorpay JS SDK
- React Router

### ⚙️ Backend
- Node.js + Express.js
- MongoDB
- JWT for auth
- Multer for uploads

---

## 🗂 Folder Structure
```markdown
### Backend
backend/
├── auth/
├── bank/
├── campaign/
├── chat/
├── config/
├── dashboard/
├── payment/
├── uploads/
├── server.js
├── .env

### Frontend
frontend/crowdspark/
├── src/
│ ├── assets/
│ ├── components/
│ └── pages/
│ ├── AdminDashboard.jsx
│ ├── BankDetails.jsx
│ ├── Campaign.jsx
│ ├── Donation.jsx
│ ├── Chat.jsx
│ ├── Dashboard.jsx
│ ├── GlobalImpact.jsx
│ ├── Home.jsx
│ ├── Login.jsx / Signup.jsx
│ ├── Notification.jsx
│ ├── Payment.jsx / SecurePayments.jsx
│ ├── RealTimeUpdates.jsx
│ └── StartCampaign.jsx

```
---

## 🧪 Local Setup

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/crowdspark.git
cd crowdspark
```
---

2. Backend Setup
- cd backend
- npm install

---

3. Frontend Setup
- cd frontend/crowdspark
- npm install

---
**4. Future Improvements & Author Info**
-   [ ] Email notifications
-   [ ] Wallet or UPI integration
-   [ ] Social media campaign sharing
-   [ ] Comment and reply system
-   [ ] Creator verification system


---
🙋‍♂️ Author
 **Gangdev Pooniya**

   

