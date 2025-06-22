interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  text?: string;
  className?: string;
}

export default function LoadingSpinner({ 
  size = 'md', 
  text = 'Loading...', 
  className = '' 
}: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-8 w-8',
    lg: 'h-12 w-12'
  };

  return (
    <div className={`flex flex-col items-center justify-center space-y-3 ${className}`}>
      <div className="relative">
        {/* Main spinner */}
        <div className={`animate-spin rounded-full border-2 border-pink-200 ${sizeClasses[size]}`}>
          <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-pink-500"></div>
        </div>
        
        {/* Floating emoji */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-xs animate-pulse">✨</span>
        </div>
      </div>
      
      {text && (
        <p className="text-sm text-gray-600 font-medium">{text}</p>
      )}
    </div>
  );
}

// Specialized loading components
export function ProcessingSpinner() {
  return (
    <div className="kawaii-card p-6 bg-gradient-to-r from-blue-50 to-cyan-50 text-center">
      <div className="text-3xl mb-4 floating">⏳</div>
      <h4 className="font-semibold text-gray-900 mb-2">Processing...</h4>
      <p className="text-gray-600 mb-4">Working our kawaii magic! ✨</p>
      <LoadingSpinner size="md" />
    </div>
  );
}

export function ScrapingSpinner() {
  return (
    <div className="kawaii-card p-6 bg-gradient-to-r from-green-50 to-mint-50 text-center">
      <div className="text-3xl mb-4 floating">🔍</div>
      <h4 className="font-semibold text-gray-900 mb-2">Finding Jobs...</h4>
      <p className="text-gray-600 mb-4">Searching across multiple platforms! 🌟</p>
      <LoadingSpinner size="md" />
    </div>
  );
}

export function MatchingSpinner() {
  return (
    <div className="kawaii-card p-6 bg-gradient-to-r from-purple-50 to-pink-50 text-center">
      <div className="text-3xl mb-4 floating">🤖</div>
      <h4 className="font-semibold text-gray-900 mb-2">AI Matching...</h4>
      <p className="text-gray-600 mb-4">Calculating perfect matches! 💖</p>
      <LoadingSpinner size="md" />
    </div>
  );
} 