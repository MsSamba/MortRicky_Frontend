function LoadingSpinner() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-500 to-red-500 flex items-center justify-center">
      <div className="bg-white rounded-2xl shadow-2xl p-8 text-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-purple-600 mx-auto mb-4"></div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Loading...</h2>
        <p className="text-gray-600">Preparing your Mort & Ricky quiz experience!</p>
      </div>
    </div>
  )
}

export default LoadingSpinner
