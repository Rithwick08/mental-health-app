# 🧠 MentiHaven

MentiHaven is a comprehensive full-stack Digital Mental Health Support System built with the MERN stack (MongoDB, Express, React, Node.js). It aims to provide early intervention and continuous mental wellness tracking through a variety of features including AI-powered coping strategies, mood tracking, and guided journaling.

## 🚀 Features

- **User Authentication**: Secure signup and login functionality using JSON Web Tokens (JWT) and bcrypt.
- **Mood Tracking**: Log your daily moods and view trends over time to identify emotional patterns.
- **Guided Journaling**: A safe space to write down your thoughts, reflecting on your daily experiences.
- **Mindfulness Exercises**: Access therapeutic exercises and grounding techniques.
- **Daily Quotes**: Get inspirational and motivational quotes every day to boost your mood.
- **AI Companion**: Chat with an AI assistant powered by OpenAI/Groq for personalized coping mechanisms and mental health support.
- **AI Stress Checkup**: Take a clinical assessment that feeds into a trained Machine Learning model (RandomForest) to dynamically gauge stress probabilities and provide actionable prescriptions.
- **Dashboard Overview**: A centralized dashboard to visualize your mood history and journal entries using interactive charts.
- **Layered Dark UI**: A modern, calming, responsive interface utilizing deep slate aesthetics and glassmorphic glowing elements.

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

**Machine Learning / Python Microservice:**
- Python 3
- Flask
- Scikit-learn, Pandas, Joblib

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
PORT
MONGO_URI
JWT_SECRET
# AI Integration APIs
GROQ_API_KEY=your_groq_api_key

```

### 5. Running the Application
You need to start both the backend server and the frontend React application.

**Start the Backend (from the root directory):**
```bash
npm run dev
```
*The backend API will run on http://localhost:.*

**Start the Frontend (from the `/client` directory):**
```bash
cd client
npm start
```
*The React app will open in your browser at http://localhost:3000.*

**Start the ML Python Microservice (from the `/ml_service` directory):**
```bash
cd ml_service
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
python3 app.py
```
*The Flask server processing ML insights will run on http://localhost:5000.*

## 📂 Project Structure

```
mental-health-app/
├── client/                 # React Frontend application
│   ├── public/             
│   └── src/
│       ├── components/     # Reusable UI components pages (Navbar, Dashboard, StressCheckup, etc.)
│       └── App.js          # Main React Application
├── ml_service/             # Python Flask Microservice 
│   ├── app.py              # ML API Endpoint serving predictions
│   ├── stress_model.pkl    # Serialized RandomForest classification model
│   └── requirements.txt    # Python deps
├── models/                 # Mongoose Database Models
├── routes/                 # Express API Routes (auth, mood, journal, ai, stress, etc.)
├── middleware/             # Express Middlewares (auth verification)
├── server.js               # Backend Entry Point
└── package.json            # Backend dependencies and scripts
```

## 🤝 Contributing
Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License
This project is licensed under the ISC License.
