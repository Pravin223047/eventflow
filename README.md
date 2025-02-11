# EventFlow

### Seamlessly Plan, Organize, and Manage Events

**EventFlow** is an intuitive and powerful event management platform that simplifies event planning. Built with cutting-edge technologies like **ReactJS, Vite, TailwindCSS, Framer Motion, and ShadCN components**, EventFlow ensures a seamless and visually appealing user experience.

## 🚀 Features

- **Authentication System:** Sign up, log in, reset password, verify email, and receive welcome and reset success emails.
- **Event Management:** Create, update, and delete events with ease.
- **Event Details Page:** View comprehensive details of any event.
- **Email Notifications:** Integrated email system using Nodemailer for various user interactions.
- **Map API Integration:** View event locations seamlessly on an interactive map.
- **Cloud Storage:** Store and manage event-related images using Cloudinary.
- **Modern UI/UX:** Stunning design with smooth animations powered by Framer Motion.

---

## 🛠️ Tech Stack

- **Frontend:** ReactJS, Vite, TailwindCSS, Framer Motion, ShadCN UI components
- **Backend:** Node.js, Express.js
- **Database:** MongoDB (Atlas)
- **Authentication:** JWT (JSON Web Token)
- **Email Service:** Nodemailer (via SMTP/Gmail)
- **Cloud Storage:** Cloudinary
- **Maps API:** Integrated for event location viewing

---

## 📂 Project Setup

### 1️⃣ Clone the Repository
```sh
git clone https://github.com/Pravin223047/EventFlow.git
cd EventFlow
```

### 2️⃣ Install Dependencies
```sh
npm install
```

### 3️⃣ Setup Environment Variables
Create a **`.env`** file in the root directory and add the following variables:

```env
PORT=5000
MONGO_URI=your_mongo_connection_string
JWT_SECRET=your_jwt_secret
NODE_ENV=development
MAILTRAP_TOKEN=your_mailtrap_token
CLIENT_URL=http://localhost:5173

MAP_API_KEY=your_map_api_key

CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

VITE_APP_PASSKEY=your_app_passkey
VITE_APP_ADMIN_EMAIL=your_admin_email

SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your_smtp_email
SMTP_PASS=your_smtp_password
```

> **Note:** Keep your `.env` file secure and never commit it to version control.

### 4️⃣ Run the Development Server
#### **Backend:**
```sh
npm run dev
```

#### **Frontend:**
```sh
cd client
npm run dev
```

---

## 📖 User Guide

### 🔹 Authentication
- Sign up with an email and password.
- Verify your email through the confirmation link sent to your inbox.
- Reset your password if forgotten.

### 🔹 Creating and Managing Events
- Navigate to the dashboard and click **Create Event**.
- Fill in the event details, including title, description, location, and images.
- View, update, or delete your created events from the **My Events** section.

### 🔹 Viewing Event Details
- Click on any event to see its full details, including images, description, and location on the map.

---

## 🚀 Deployment

For production deployment:
```sh
npm run build
```
Then, deploy using **Vercel**, **Netlify**, or a preferred hosting service.

---

## 📧 Support
For any issues, feel free to create an [Issue](https://github.com/Pravin223047/EventFlow/issues) or contact us via email at **kshirsagarpravin.1111@gmail.com**.

---

## 🏆 Contributing
We welcome contributions! If you’d like to improve EventFlow, follow these steps:
1. Fork the repository
2. Create a new branch (`git checkout -b feature-branch`)
3. Commit your changes (`git commit -m 'Add new feature'`)
4. Push to your branch (`git push origin feature-branch`)
5. Open a Pull Request

---

### Made with ❤️ by the kshirsagarpravin.1111@gmail.com

