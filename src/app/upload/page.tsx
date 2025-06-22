'use client';

import Link from 'next/link';
import { useState } from 'react';
import FileUpload from '@/components/FileUpload';
import { ProcessingSpinner } from '@/components/LoadingSpinner';

export default function UploadPage() {
  const [isProcessing, setIsProcessing] = useState(false);
  const [resumeText, setResumeText] = useState<string>('');

  const handleFileSelect = (file: File) => {
    console.log('File selected:', file.name);
  };

  const handleFileProcess = async (text: string) => {
    setIsProcessing(true);
    setResumeText(text);
    
    // Simulate processing time
    setTimeout(() => {
      setIsProcessing(false);
      // Here we would typically redirect to results or start job scraping
      console.log('Resume processed:', text.substring(0, 100) + '...');
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 relative overflow-hidden">
      {/* Floating Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 text-3xl floating" style={{ animationDelay: '0s' }}>📄</div>
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
              <Link href="/results" className="text-gray-700 hover:text-pink-500 transition-colors font-medium">
                📊 Results
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Upload Section */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-4 sparkle">
            <span className="bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent">
              Upload Your Resume ✨
            </span>
          </h1>
          <p className="text-lg text-gray-600">
            We'll analyze your resume and find the best matching jobs from the last 2 days! 🚀
          </p>
        </div>

        {/* File Upload Component */}
        {!isProcessing ? (
          <FileUpload 
            onFileSelect={handleFileSelect}
            onFileProcess={handleFileProcess}
            isLoading={isProcessing}
          />
        ) : (
          <ProcessingSpinner />
        )}

        {/* Instructions */}
        <div className="mt-8 kawaii-card p-6 bg-gradient-to-r from-blue-50 to-cyan-50">
          <h3 className="text-lg font-semibold text-blue-900 mb-3 flex items-center">
            <span className="mr-2">🎯</span>
            How it works:
          </h3>
          <ol className="list-decimal list-inside space-y-2 text-blue-800">
            <li className="flex items-start">
              <span className="mr-2">📄</span>
              Upload your resume (PDF or TXT format)
            </li>
            <li className="flex items-start">
              <span className="mr-2">🔍</span>
              We'll extract and analyze your skills and experience
            </li>
            <li className="flex items-start">
              <span className="mr-2">🌐</span>
              Search for software engineering jobs from the last 2 days
            </li>
            <li className="flex items-start">
              <span className="mr-2">🤖</span>
              Match your resume against job descriptions
            </li>
            <li className="flex items-start">
              <span className="mr-2">💖</span>
              Get your personalized job recommendations with match scores
            </li>
          </ol>
        </div>

        {/* Features Grid */}
        <div className="mt-8 grid md:grid-cols-2 gap-6">
          <div className="kawaii-card p-6 bg-gradient-to-r from-pink-50 to-purple-50">
            <div className="flex items-center mb-3">
              <span className="text-2xl mr-3">🔒</span>
              <h4 className="font-semibold text-gray-900">Secure & Private</h4>
            </div>
            <p className="text-gray-600 text-sm">
              Your resume is processed securely and never stored permanently. We respect your privacy! 💕
            </p>
          </div>
          
          <div className="kawaii-card p-6 bg-gradient-to-r from-mint-50 to-green-50">
            <div className="flex items-center mb-3">
              <span className="text-2xl mr-3">⚡</span>
              <h4 className="font-semibold text-gray-900">Lightning Fast</h4>
            </div>
            <p className="text-gray-600 text-sm">
              Get your job matches in seconds with our optimized AI algorithms! 🚀
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