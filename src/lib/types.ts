export interface Job {
  id: string;
  title: string;
  company: string;
  datePosted: string;
  location: string;
  matchScore: number;
  jobURL: string;
  description?: string;
  source: 'careerbrew' | 'linkedin' | 'glassdoor' | 'indeed';
}

export interface ResumeData {
  text: string;
  fileName: string;
  fileSize: number;
  uploadDate: Date;
}

export interface ScrapingResult {
  jobs: Job[];
  totalFound: number;
  errors: string[];
}

export interface MatchingResult {
  jobs: Job[];
  resumeText: string;
  processingTime: number;
}

export interface APIResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface UploadResponse extends APIResponse<ResumeData> {}
export interface ScrapeResponse extends APIResponse<ScrapingResult> {}
export interface MatchResponse extends APIResponse<MatchingResult> {}

// Scraping configuration
export interface ScrapingConfig {
  maxJobs: number;
  daysBack: number;
  jobTypes: string[];
  locations?: string[];
}

// Default scraping configuration
export const DEFAULT_SCRAPING_CONFIG: ScrapingConfig = {
  maxJobs: 100,
  daysBack: 2,
  jobTypes: [
    'software engineer',
    'software developer',
    'full stack developer',
    'frontend developer',
    'backend developer',
    'devops engineer',
    'data engineer',
    'machine learning engineer',
    'product manager',
    'technical lead'
  ]
}; 