import Link from 'next/link';

export default function ResultsPage() {
  // This will be populated with real data later
  const mockJobs = [
    {
      id: '1',
      title: 'Senior Software Engineer',
      company: 'Tech Corp',
      datePosted: '2024-01-15',
      location: 'San Francisco, CA',
      matchScore: 85,
      jobURL: '#',
      source: 'linkedin' as const
    },
    {
      id: '2',
      title: 'Full Stack Developer',
      company: 'Startup Inc',
      datePosted: '2024-01-14',
      location: 'Remote',
      matchScore: 78,
      jobURL: '#',
      source: 'indeed' as const
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 relative overflow-hidden">
      {/* Floating Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 text-3xl floating" style={{ animationDelay: '0s' }}>📊</div>
        <div className="absolute top-40 right-20 text-2xl floating" style={{ animationDelay: '1s' }}>✨</div>
        <div className="absolute bottom-40 left-20 text-3xl floating" style={{ animationDelay: '2s' }}>💫</div>
        <div className="absolute bottom-20 right-10 text-2xl floating" style={{ animationDelay: '0.5s' }}>🌟</div>
        <div className="absolute top-1/2 left-1/4 text-2xl floating" style={{ animationDelay: '1.5s' }}>🎀</div>
        <div className="absolute top-1/3 right-1/3 text-3xl floating" style={{ animationDelay: '0.8s' }}>💖</div>
      </div>

      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-pink-200/50 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent sparkle">
                ✨ Resume Job Matcher ✨
              </Link>
            </div>
            <nav className="hidden md:flex space-x-8">
              <Link href="/" className="text-gray-700 hover:text-pink-500 transition-colors font-medium">
                🏠 Home
              </Link>
              <Link href="/upload" className="text-gray-700 hover:text-pink-500 transition-colors font-medium">
                📤 Upload
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Results Section */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold mb-4 sparkle">
            <span className="bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent">
              Your Job Matches ✨
            </span>
          </h1>
          <p className="text-lg text-gray-600">
            Here are the best matching software engineering jobs from the last 2 days! 🚀
          </p>
        </div>

        {/* Results Table */}
        <div className="kawaii-card overflow-hidden">
          <div className="px-6 py-4 border-b border-pink-200/50 bg-gradient-to-r from-pink-50 to-purple-50">
            <h2 className="text-lg font-semibold text-gray-900 flex items-center">
              <span className="mr-2">📋</span>
              Matched Jobs ({mockJobs.length})
            </h2>
          </div>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-pink-200/50">
              <thead className="bg-gradient-to-r from-pink-50 to-purple-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    💼 Job Title
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    🏢 Company
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    📍 Location
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    📅 Posted
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    💖 Match Score
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    🌐 Source
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    ⚡ Action
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white/50 divide-y divide-pink-200/30">
                {mockJobs.map((job) => (
                  <tr key={job.id} className="hover:bg-pink-50/50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {job.title}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {job.company}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {job.location}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {new Date(job.datePosted).toLocaleDateString()}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="text-sm font-medium text-gray-900 mr-2">
                          {job.matchScore}%
                        </div>
                        <div className="w-16 bg-pink-200 rounded-full h-2">
                          <div 
                            className="bg-gradient-to-r from-pink-400 to-purple-400 h-2 rounded-full transition-all duration-300" 
                            style={{ width: `${job.matchScore}%` }}
                          ></div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="kawaii-badge">
                        {job.source}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <a 
                        href={job.jobURL} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-pink-600 hover:text-pink-800 transition-colors font-medium"
                      >
                        👀 View Job
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* No Results State */}
        {mockJobs.length === 0 && (
          <div className="text-center py-12 kawaii-card">
            <div className="text-6xl mb-4 floating">📄</div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No matching jobs found 💔
            </h3>
            <p className="text-gray-500 mb-4">
              Try uploading a different resume or adjusting your search criteria! ✨
            </p>
            <Link 
              href="/upload"
              className="kawaii-button inline-flex items-center px-4 py-2"
            >
              <span className="mr-2">📤</span>
              Upload Resume
            </Link>
          </div>
        )}

        {/* Summary Stats */}
        {mockJobs.length > 0 && (
          <div className="mt-8 grid md:grid-cols-3 gap-6">
            <div className="kawaii-card p-6 bg-gradient-to-r from-pink-50 to-purple-50 text-center">
              <div className="text-3xl mb-2">📊</div>
              <div className="text-2xl font-bold text-gray-900">{mockJobs.length}</div>
              <div className="text-sm text-gray-600">Total Matches</div>
            </div>
            <div className="kawaii-card p-6 bg-gradient-to-r from-blue-50 to-cyan-50 text-center">
              <div className="text-3xl mb-2">💖</div>
              <div className="text-2xl font-bold text-gray-900">
                {Math.round(mockJobs.reduce((acc, job) => acc + job.matchScore, 0) / mockJobs.length)}%
              </div>
              <div className="text-sm text-gray-600">Average Match</div>
            </div>
            <div className="kawaii-card p-6 bg-gradient-to-r from-mint-50 to-green-50 text-center">
              <div className="text-3xl mb-2">🚀</div>
              <div className="text-2xl font-bold text-gray-900">2</div>
              <div className="text-sm text-gray-600">Days Back</div>
            </div>
          </div>
        )}
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