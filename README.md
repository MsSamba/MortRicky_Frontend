# Mort & Ricky Quiz App

A full-stack Single Page Application (SPA) built with React + Vite frontend and Python FastAPI backend for a quiz about the fictional "Mort and Ricky" sitcom.

## Features

- 🎯 Multiple choice quiz questions
- ⏰ Timer for each question (30 seconds)
- 📊 Real-time progress tracking
- 🏆 Detailed results with score breakdown
- 📱 Responsive design with Tailwind CSS
- 🔄 Question review after completion
- 🎨 Beautiful gradient UI design

## Project Structure

\`\`\`
├── scripts/
│   ├── scraper.py          # Web scraping (Mort & Ricky Wikipedia page)
│   ├── question_generator.py # Question generation logic
│   └── backend.py          # FastAPI backend server
├── src/
│   ├── components/
│   │   ├── QuizComponent.jsx
│   │   ├── ResultsComponent.jsx
│   │   └── LoadingSpinner.jsx
│   ├── App.jsx
│   ├── main.jsx
│   ├── App.css
│   └── index.css
├── package.json
├── vite.config.js
├── tailwind.config.js
└── index.html
\`\`\`

## Setup Instructions

### 1. Install Python Dependencies

\`\`\`bash
pip install fastapi uvicorn beautifulsoup4 requests
\`\`\`

### 2. Generate Quiz Data

\`\`\`bash
# Run the scraper to scrape Wikipedia
python scripts/scraper.py

# Generate quiz questions
python scripts/question_generator.py
\`\`\`

### 3. Start the Backend Server

\`\`\`bash
python scripts/backend.py
\`\`\`

The API will be available at `http://localhost:8000`

### 4. Install Frontend Dependencies

\`\`\`bash
npm install
\`\`\`

### 5. Start the Frontend Development Server

\`\`\`bash
npm run dev
\`\`\`

The React app will be available at `http://localhost:5173`

## API Endpoints

- `GET /` - API status and info
- `GET /api/questions` - Get all available questions
- `GET /api/quiz/{num_questions}` - Get a random quiz with specified number of questions
- `POST /api/submit-quiz` - Submit quiz answers and get results
- `GET /api/stats` - Get quiz statistics

## Usage

1. **Home Screen**: Choose quiz difficulty (5, 10, or 20 questions)
2. **Quiz Screen**: Answer multiple-choice questions with timer
3. **Results Screen**: View detailed results and score breakdown


## Technologies Used

- **Frontend**: React 18, Vite, Tailwind CSS, Axios
- **Backend**: Python, FastAPI, Uvicorn
- **Data Processing**: BeautifulSoup4, JSON
