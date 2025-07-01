"use client"

function ResultsComponent({ results, onRestart }) {
  const { score, results: questionResults } = results

  const getScoreColor = (percentage) => {
    if (percentage >= 80) return "text-green-600"
    if (percentage >= 60) return "text-yellow-600"
    return "text-red-600"
  }

  const getScoreMessage = (percentage) => {
    if (percentage >= 90) return "🏆 Outstanding! You're a true Mort & Ricky expert!"
    if (percentage >= 80) return "🎉 Excellent! You know your Mort & Ricky well!"
    if (percentage >= 70) return "👍 Good job! You're a solid fan!"
    if (percentage >= 60) return "👌 Not bad! Keep watching to improve!"
    if (percentage >= 50) return "📚 You might want to rewatch some episodes!"
    return "😅 Time for a Mort & Ricky marathon!"
  }

  return (
    <div className="bg-white rounded-2xl shadow-2xl p-8">
      {/* Score Summary */}
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Quiz Results</h2>

        <div className="bg-gray-50 rounded-xl p-6 mb-6">
          <div className="text-6xl font-bold mb-2">
            <span className={getScoreColor(score.percentage)}>{score.percentage}%</span>
          </div>
          <p className="text-xl text-gray-600 mb-2">
            {score.correct} out of {score.total} correct
          </p>
          <p className="text-lg font-medium text-gray-700">{getScoreMessage(score.percentage)}</p>
        </div>

        {/* Score Visualization */}
        <div className="w-full bg-gray-200 rounded-full h-4 mb-6">
          <div
            className={`h-4 rounded-full transition-all duration-1000 ${
              score.percentage >= 80 ? "bg-green-500" : score.percentage >= 60 ? "bg-yellow-500" : "bg-red-500"
            }`}
            style={{ width: `${score.percentage}%` }}
          ></div>
        </div>
      </div>

      {/* Detailed Results */}
      <div className="mb-8">
        <h3 className="text-2xl font-bold text-gray-800 mb-4">Question Review</h3>

        <div className="space-y-4 max-h-96 overflow-y-auto">
          {questionResults.map((result, index) => (
            <div
              key={result.question_id}
              className={`p-4 rounded-lg border-l-4 ${
                result.is_correct ? "border-green-500 bg-green-50" : "border-red-500 bg-red-50"
              }`}
            >
              <div className="flex items-start justify-between mb-2">
                <h4 className="font-semibold text-gray-800 flex-1">
                  Q{index + 1}: {result.question}
                </h4>
                <span className={`ml-4 font-bold ${result.is_correct ? "text-green-600" : "text-red-600"}`}>
                  {result.is_correct ? "✅" : "❌"}
                </span>
              </div>

              <div className="text-sm text-gray-600">
                <p className="mb-1">
                  <span className="font-medium">Your answer:</span>{" "}
                  {result.user_answer !== undefined ? `${String.fromCharCode(65 + result.user_answer)}` : "No answer"}
                </p>
                <p className={result.is_correct ? "text-green-700" : "text-red-700"}>
                  <span className="font-medium">Correct answer:</span> {String.fromCharCode(65 + result.correct_answer)}{" "}
                  - {result.correct_answer_text}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="text-center space-y-4">
        <button
          onClick={onRestart}
          className="bg-purple-500 hover:bg-purple-600 text-white font-bold py-3 px-8 rounded-full text-lg transition-colors duration-200 mr-4"
        >
          Take Another Quiz
        </button>

        <div className="text-sm text-gray-500">
          <p>Share your score with friends and challenge them to beat it! 🎯</p>
        </div>
      </div>

      {/* Fun Stats */}
      <div className="mt-8 bg-gray-50 rounded-lg p-4">
        <h4 className="font-semibold text-gray-700 mb-2">Fun Stats</h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-purple-600">{score.correct}</div>
            <div className="text-xs text-gray-500">Correct</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-red-600">{score.total - score.correct}</div>
            <div className="text-xs text-gray-500">Incorrect</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-blue-600">{score.percentage}%</div>
            <div className="text-xs text-gray-500">Accuracy</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-green-600">
              {score.percentage >= 70 ? "🏅" : score.percentage >= 50 ? "🥉" : "📚"}
            </div>
            <div className="text-xs text-gray-500">Achievement</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ResultsComponent
