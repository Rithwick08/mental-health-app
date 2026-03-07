# 🧠 MentiHaven

MentiHaven is a comprehensive full-stack Digital Mental Health Support System built with the MERN stack (MongoDB, Express, React, Node.js). It aims to provide early intervention and continuous mental wellness tracking through a variety of features including AI-powered coping strategies, mood tracking, and guided journaling.

## 🚀 Features

- **User Authentication**: Secure signup and login functionality using JSON Web Tokens (JWT) and bcrypt.
- **Mood Tracking**: Log your daily moods and view trends over time to identify emotional patterns.
- **Guided Journaling**: A safe space to write down your thoughts, reflecting on your daily experiences.
- **Mindfulness Exercises**: Access therapeutic exercises and grounding techniques.
- **Daily Quotes**: Get inspirational and motivational quotes every day to boost your mood.
- **AI Companion**: Chat with an AI assistant powered by OpenAI/Groq for personalized coping mechanisms and mental health support.
- **Dashboard Overview**: A centralized dashboard to visualize your mood history and journal entries using interactive charts.

## 🛠️ Technology Stack

**Frontend:**
- React 18
- React Router DOM
- Bootstrap 5
- Recharts (for data visualization)
- Lucide React (for icons)

**Backend:**
- Node.js & Express
- MongoDB & Mongoose
- JSON Web Tokens (JWT) for authentication
- Bcrypt.js for password hashing
- OpenAI / Groq APIs for AI features

## ⚙️ Installation & Setup

### Prerequisites
- [Node.js](https://nodejs.org/) installed
- [MongoDB](https://www.mongodb.com/) running locally or a MongoDB Atlas URI

### 1. Clone the repository
```bash
git clone <your-repository-url>
cd mental-health-app
```

### 2. Install Backend Dependencies
```bash
npm install
```

### 3. Install Frontend Dependencies
```bash
cd client
npm install
cd ..
```

### 4. Environment Variables
Create a `.env` file in the root directory and add the following keys:
```env
# Server
PORT=4000
MONGO_URI=mongodb://127.0.0.1:27017/mentalhealth
JWT_SECRET=your_jwt_secret_key

# AI Integration APIs
GROQ_API_KEY=your_groq_api_key
# OPENAI_API_KEY=your_openai_api_key
```

### 5. Running the Application
You need to start both the backend server and the frontend React application.

**Start the Backend (from the root directory):**
```bash
npm run dev
```
*The backend API will run on http://localhost:4000.*

**Start the Frontend (from the `/client` directory):**
```bash
cd client
npm start
```
*The React app will open in your browser at http://localhost:3000.*

## 📂 Project Structure

```
mental-health-app/
├── client/                 # React Frontend application
│   ├── public/             
│   └── src/
│       ├── components/     # Reusable UI components pages (Navbar, Dashboard, etc.)
│       └── App.js          # Main React Application
├── models/                 # Mongoose Database Models
├── routes/                 # Express API Routes (auth, mood, journal, ai, etc.)
├── middleware/             # Express Middlewares (auth verification)
├── server.js               # Backend Entry Point
└── package.json            # Backend dependencies and scripts
```

## 🤝 Contributing
Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License
This project is licensed under the ISC License.
