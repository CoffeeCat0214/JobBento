import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 relative overflow-hidden">
      {/* Floating Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 text-4xl floating" style={{ animationDelay: '0s' }}>🌸</div>
        <div className="absolute top-40 right-20 text-3xl floating" style={{ animationDelay: '1s' }}>✨</div>
        <div className="absolute bottom-40 left-20 text-2xl floating" style={{ animationDelay: '2s' }}>💫</div>
        <div className="absolute bottom-20 right-10 text-3xl floating" style={{ animationDelay: '0.5s' }}>🌟</div>
        <div className="absolute top-1/2 left-1/4 text-2xl floating" style={{ animationDelay: '1.5s' }}>🎀</div>
        <div className="absolute top-1/3 right-1/3 text-3xl floating" style={{ animationDelay: '0.8s' }}>💖</div>
      </div>

      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-pink-200/50 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent sparkle">
                ✨ Resume Job Matcher ✨
              </h1>
            </div>
            <nav className="hidden md:flex space-x-8">
              <Link href="/" className="text-gray-700 hover:text-pink-500 transition-colors font-medium">
                🏠 Home
              </Link>
              <Link href="/results" className="text-gray-700 hover:text-pink-500 transition-colors font-medium">
                📊 Results
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 sparkle">
            <span className="bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent">
              Find Your Perfect
            </span>
            <br />
            <span className="bg-gradient-to-r from-cyan-500 via-mint-500 to-yellow-400 bg-clip-text text-transparent">
              Job Match ✨
            </span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            Upload your resume and get matched with the latest software engineering opportunities 
            from LinkedIn, Indeed, Glassdoor, and CareerBrew! We'll find jobs posted in the last 2 days 
            that best match your skills and experience! 🚀
          </p>
          
          {/* Features */}
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="kawaii-card p-6 floating" style={{ animationDelay: '0s' }}>
              <div className="w-16 h-16 bg-gradient-to-br from-pink-200 to-purple-200 rounded-2xl flex items-center justify-center mb-4 mx-auto shadow-lg">
                <span className="text-2xl">📄</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Smart Resume Parsing</h3>
              <p className="text-gray-600">Upload PDF or TXT resumes and we'll extract all your skills and experience with AI magic! ✨</p>
            </div>
            
            <div className="kawaii-card p-6 floating" style={{ animationDelay: '0.3s' }}>
              <div className="w-16 h-16 bg-gradient-to-br from-blue-200 to-cyan-200 rounded-2xl flex items-center justify-center mb-4 mx-auto shadow-lg">
                <span className="text-2xl">🔍</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Real-time Job Scraping</h3>
              <p className="text-gray-600">We search across multiple job platforms for the latest software engineering roles! 🌟</p>
            </div>
            
            <div className="kawaii-card p-6 floating" style={{ animationDelay: '0.6s' }}>
              <div className="w-16 h-16 bg-gradient-to-br from-mint-200 to-green-200 rounded-2xl flex items-center justify-center mb-4 mx-auto shadow-lg">
                <span className="text-2xl">🤖</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">AI-Powered Matching</h3>
              <p className="text-gray-600">Get match scores from 0-100 based on how well your resume fits each job! 💖</p>
            </div>
          </div>

          {/* CTA Button */}
          <div className="space-y-4">
            <Link 
              href="/upload"
              className="kawaii-button inline-flex items-center text-lg px-8 py-4 sparkle"
            >
              <span className="mr-2">📤</span>
              Upload Resume & Find Jobs
              <span className="ml-2">🚀</span>
            </Link>
            <p className="text-sm text-gray-500">
              Supports PDF and TXT files • Free to use • No registration required • ✨ Kawaii approved! ✨
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white/80 backdrop-blur-sm border-t border-pink-200/50 mt-20 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-gray-600">
            <p>&copy; 2024 Resume Job Matcher. Built with Next.js, AI, and lots of kawaii love! 💕</p>
            <p className="text-sm mt-2">✨ Making job hunting magical since 2024 ✨</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
