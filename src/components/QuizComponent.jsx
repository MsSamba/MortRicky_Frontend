"use client"

import { useState, useEffect } from "react"

function QuizComponent({ quizData, onSubmit, onCancel }) {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState({})
  const [timeLeft, setTimeLeft] = useState(null)
  const [showConfirmSubmit, setShowConfirmSubmit] = useState(false)

  const questions = quizData.questions || []
  const totalQuestions = questions.length

  // Optional timer (30 seconds per question)
  useEffect(() => {
    if (timeLeft === null) {
      setTimeLeft(30)
    }

    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000)
      return () => clearTimeout(timer)
    } else if (timeLeft === 0) {
      // Auto-advance to next question when time runs out
      handleNextQuestion()
    }
  }, [timeLeft])

  const handleAnswerSelect = (questionId, answerIndex) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: answerIndex,
    }))
  }

  const handleNextQuestion = () => {
    if (currentQuestion < totalQuestions - 1) {
      setCurrentQuestion(currentQuestion + 1)
      setTimeLeft(30) // Reset timer for next question
    } else {
      setShowConfirmSubmit(true)
    }
  }

  const handlePreviousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
      setTimeLeft(30) // Reset timer
    }
  }

  const handleSubmitQuiz = () => {
    onSubmit(answers)
  }

  const getAnsweredCount = () => {
    return Object.keys(answers).length
  }

  if (questions.length === 0) {
    return (
      <div className="bg-white rounded-2xl shadow-2xl p-8 text-center">
        <p className="text-red-500 text-xl">No questions available!</p>
        <button
          onClick={onCancel}
          className="mt-4 bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded"
        >
          Go Back
        </button>
      </div>
    )
  }

  const currentQ = questions[currentQuestion]

  if (showConfirmSubmit) {
    return (
      <div className="bg-white rounded-2xl shadow-2xl p-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Ready to Submit?</h2>
        <div className="text-center mb-6">
          <p className="text-lg text-gray-600 mb-4">
            You've answered <span className="font-bold text-purple-600">{getAnsweredCount()}</span> out of{" "}
            <span className="font-bold">{totalQuestions}</span> questions.
          </p>
          {getAnsweredCount() < totalQuestions && (
            <p className="text-orange-600 mb-4">
              ⚠️ You haven't answered all questions. Unanswered questions will be marked as incorrect.
            </p>
          )}
        </div>
        <div className="flex justify-center space-x-4">
          <button
            onClick={() => setShowConfirmSubmit(false)}
            className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-3 px-6 rounded-lg"
          >
            Review Answers
          </button>
          <button
            onClick={handleSubmitQuiz}
            className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-lg"
          >
            Submit Quiz
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-2xl shadow-2xl p-8">
      {/* Progress Bar */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-gray-600">
            Question {currentQuestion + 1} of {totalQuestions}
          </span>
          <span className="text-sm font-medium text-gray-600">
            Answered: {getAnsweredCount()}/{totalQuestions}
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-purple-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${((currentQuestion + 1) / totalQuestions) * 100}%` }}
          ></div>
        </div>
      </div>

      {/* Timer */}
      <div className="text-center mb-6">
        <div
          className={`inline-block px-4 py-2 rounded-full text-white font-bold ${
            timeLeft <= 10 ? "bg-red-500" : timeLeft <= 20 ? "bg-orange-500" : "bg-green-500"
          }`}
        >
          ⏰ {timeLeft}s
        </div>
      </div>

      {/* Question */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">{currentQ.question}</h2>

        {/* Question Type Badge */}
        <div className="mb-4">
          <span className="inline-block bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded-full capitalize">
            {currentQ.type?.replace("_", " ") || "General"}
          </span>
        </div>

        {/* Answer Options */}
        <div className="space-y-3">
          {currentQ.options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswerSelect(currentQ.id, index)}
              className={`w-full text-left p-4 rounded-lg border-2 transition-all duration-200 ${
                answers[currentQ.id] === index
                  ? "border-purple-500 bg-purple-50 text-purple-700"
                  : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
              }`}
            >
              <span className="font-bold text-lg mr-3">{String.fromCharCode(65 + index)}.</span>
              {option}
            </button>
          ))}
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between items-center">
        <button
          onClick={handlePreviousQuestion}
          disabled={currentQuestion === 0}
          className="bg-gray-500 hover:bg-gray-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-bold py-2 px-6 rounded-lg transition-colors duration-200"
        >
          ← Previous
        </button>

        <button
          onClick={onCancel}
          className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-6 rounded-lg transition-colors duration-200"
        >
          Cancel Quiz
        </button>

        <button
          onClick={handleNextQuestion}
          className="bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 px-6 rounded-lg transition-colors duration-200"
        >
          {currentQuestion === totalQuestions - 1 ? "Finish" : "Next →"}
        </button>
      </div>
    </div>
  )
}

export default QuizComponent
