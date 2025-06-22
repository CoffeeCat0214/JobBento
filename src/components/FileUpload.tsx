'use client';

import { useState, useCallback } from 'react';
import { isValidFileType, formatFileSize } from '@/lib/utils';

interface FileUploadProps {
  onFileSelect: (file: File) => void;
  onFileProcess: (text: string) => void;
  isLoading?: boolean;
}

export default function FileUpload({ onFileSelect, onFileProcess, isLoading = false }: FileUploadProps) {
  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [error, setError] = useState<string>('');

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    setError('');

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      handleFile(file);
    }
  }, []);

  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setError('');
    
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      handleFile(file);
    }
  }, []);

  const handleFile = useCallback((file: File) => {
    // Validate file type
    if (!isValidFileType(file)) {
      setError('Please upload a PDF or TXT file! 📄');
      return;
    }

    // Validate file size (10MB limit)
    if (file.size > 10 * 1024 * 1024) {
      setError('File size must be less than 10MB! 📏');
      return;
    }

    setSelectedFile(file);
    onFileSelect(file);
  }, [onFileSelect]);

  const handleUpload = useCallback(async () => {
    if (!selectedFile) return;

    try {
      const formData = new FormData();
      formData.append('file', selectedFile);

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Upload failed! 💔');
      }

      const data = await response.json();
      if (data.success && data.data?.text) {
        onFileProcess(data.data.text);
      } else {
        throw new Error('Failed to extract text from file! 📝');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Upload failed! 💔');
    }
  }, [selectedFile, onFileProcess]);

  return (
    <div className="space-y-6">
      {/* Drag & Drop Area */}
      <div
        className={`relative border-2 border-dashed rounded-2xl p-12 text-center transition-all duration-300 ${
          dragActive 
            ? 'border-pink-400 bg-pink-50/50 scale-105' 
            : 'border-pink-300 hover:border-pink-400 bg-gradient-to-br from-pink-50 to-purple-50'
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <div className="text-6xl mb-4 floating" style={{ animationDelay: '0s' }}>
          {selectedFile ? '📄' : '📤'}
        </div>
        
        <h3 className="text-xl font-medium text-gray-900 mb-2">
          {selectedFile ? 'File Selected! ✨' : 'Drop your resume here ✨'}
        </h3>
        
        <p className="text-gray-500 mb-4">
          {selectedFile 
            ? `Selected: ${selectedFile.name}`
            : 'or click to browse files 🎀'
          }
        </p>
        
        <p className="text-sm text-gray-400">
          Supports PDF and TXT files up to 10MB • 💖 Kawaii approved! 💖
        </p>

        {/* Hidden File Input */}
        <input
          type="file"
          accept=".pdf,.txt"
          onChange={handleFileInput}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />
      </div>

      {/* Selected File Info */}
      {selectedFile && (
        <div className="kawaii-card p-6 bg-gradient-to-r from-green-50 to-mint-50">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <span className="text-2xl">📄</span>
              <div>
                <h4 className="font-semibold text-gray-900">{selectedFile.name}</h4>
                <p className="text-sm text-gray-600">{formatFileSize(selectedFile.size)}</p>
              </div>
            </div>
            <button
              onClick={() => setSelectedFile(null)}
              className="text-pink-500 hover:text-pink-700 transition-colors"
            >
              ✕
            </button>
          </div>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="kawaii-card p-4 bg-gradient-to-r from-red-50 to-pink-50 border border-red-200">
          <div className="flex items-center space-x-2">
            <span className="text-xl">💔</span>
            <p className="text-red-700">{error}</p>
          </div>
        </div>
      )}

      {/* Upload Button */}
      {selectedFile && !isLoading && (
        <button
          onClick={handleUpload}
          className="kawaii-button w-full text-lg py-4 sparkle"
        >
          <span className="mr-2">🚀</span>
          Process Resume & Find Jobs
          <span className="ml-2">✨</span>
        </button>
      )}

      {/* Loading State */}
      {isLoading && (
        <div className="kawaii-card p-6 bg-gradient-to-r from-blue-50 to-cyan-50 text-center">
          <div className="text-3xl mb-4 floating">⏳</div>
          <h4 className="font-semibold text-gray-900 mb-2">Processing your resume...</h4>
          <p className="text-gray-600">Extracting skills and experience with AI magic! ✨</p>
          <div className="mt-4 flex justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-pink-500"></div>
          </div>
        </div>
      )}
    </div>
  );
} 