"use client"

import { useState, useEffect } from "react"
import axios from "axios"
import QuizComponent from "./components/QuizComponent"
import ResultsComponent from "./components/ResultsComponent"
import LoadingSpinner from "./components/LoadingSpinner"
import "./App.css"

const API_BASE_URL = "https://mortricky-backend-1.onrender.com"

function App() {
  const [currentView, setCurrentView] = useState("home") // 'home', 'quiz', 'results'
  const [quizData, setQuizData] = useState(null)
  const [quizResults, setQuizResults] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [stats, setStats] = useState(null)

  useEffect(() => {
    fetchStats()
  }, [])

  const fetchStats = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/stats`)
      setStats(response.data)
    } catch (err) {
      console.error("Failed to fetch stats:", err)
    }
  }

  const startQuiz = async (numQuestions = 10) => {
    setLoading(true)
    setError(null)

    try {
      const response = await axios.get(`${API_BASE_URL}/api/quiz/${numQuestions}`)
      setQuizData(response.data)
      setCurrentView("quiz")
    } catch (err) {
      setError("Failed to load quiz questions. Make sure the backend is running.")
      console.error("Error fetching quiz:", err)
    } finally {
      setLoading(false)
    }
  }

  const submitQuiz = async (answers) => {
    setLoading(true)
    setError(null)

    try {
      const response = await axios.post(`${API_BASE_URL}/api/submit-quiz`, {
        answers: answers,
      })
      setQuizResults(response.data)
      setCurrentView("results")
    } catch (err) {
      setError("Failed to submit quiz answers.")
      console.error("Error submitting quiz:", err)
    } finally {
      setLoading(false)
    }
  }

  const resetQuiz = () => {
    setCurrentView("home")
    setQuizData(null)
    setQuizResults(null)
    setError(null)
  }

  if (loading) {
    return <LoadingSpinner />
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-500 to-red-500">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <header className="text-center mb-8">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 drop-shadow-lg">🎭 Mort & Ricky Quiz 🎭</h1>
          <p className="text-xl text-white/90 drop-shadow">
            Test your knowledge of the hilarious Mort and Ricky sitcom!
          </p>
        </header>

        {/* Error Message */}
        {error && (
          <div className="bg-red-500 text-white p-4 rounded-lg mb-6 text-center">
            <p className="font-semibold">Error: {error}</p>
            <p className="text-sm mt-2">
              Make sure to run the Python backend first: <code>python scripts/backend.py</code>
            </p>
          </div>
        )}

        {/* Main Content */}
        <div className="max-w-4xl mx-auto">
          {currentView === "home" && (
            <div className="bg-white rounded-2xl shadow-2xl p-8 text-center">
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-gray-800 mb-4">Welcome to the Ultimate Mort & Ricky Quiz!</h2>
                <p className="text-gray-600 text-lg mb-6">
                  Challenge yourself with questions about episodes, characters, and memorable quotes from the beloved
                  sitcom series.
                </p>

                {stats && (
                  <div className="bg-gray-50 rounded-lg p-4 mb-6">
                    <h3 className="font-semibold text-gray-700 mb-2">Quiz Statistics</h3>
                    <p className="text-gray-600">
                      Total Questions Available:{" "}
                      <span className="font-bold text-purple-600">{stats.total_questions}</span>
                    </p>
                    {stats.question_types && (
                      <div className="mt-2 text-sm text-gray-500">
                        <p>Question Types:</p>
                        <ul className="list-disc list-inside">
                          {Object.entries(stats.question_types).map(([type, count]) => (
                            <li key={type} className="capitalize">
                              {type.replace("_", " ")}: {count}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                )}
              </div>

              <div className="space-y-4">
                <button
                  onClick={() => startQuiz(5)}
                  className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-8 rounded-full text-lg transition-colors duration-200 mr-4"
                >
                  Quick Quiz (5 Questions)
                </button>
                <button
                  onClick={() => startQuiz(10)}
                  className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-8 rounded-full text-lg transition-colors duration-200 mr-4"
                >
                  Standard Quiz (10 Questions)
                </button>
                <button
                  onClick={() => startQuiz(20)}
                  className="bg-purple-500 hover:bg-purple-600 text-white font-bold py-3 px-8 rounded-full text-lg transition-colors duration-200"
                >
                  Challenge Mode (20 Questions)
                </button>
              </div>

              <div className="mt-8 text-sm text-gray-500">
                {/* <p>💡 Tip: Make sure the Python backend is running on port 8000</p> */}
              </div>
            </div>
          )}

          {currentView === "quiz" && quizData && (
            <QuizComponent quizData={quizData} onSubmit={submitQuiz} onCancel={resetQuiz} />
          )}

          {currentView === "results" && quizResults && <ResultsComponent results={quizResults} onRestart={resetQuiz} />}
        </div>
      </div>
    </div>
  )
}

export default App
