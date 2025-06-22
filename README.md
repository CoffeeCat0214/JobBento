# Resume Job Matcher

A full-stack web application that matches resumes to job postings from multiple platforms using AI-powered similarity scoring.

## 🚀 Features

- **Resume Upload**: Support for PDF and TXT files
- **Multi-Platform Job Scraping**: LinkedIn, Indeed, Glassdoor, and CareerBrew
- **AI-Powered Matching**: TF-IDF cosine similarity with optional OpenAI embeddings
- **Real-time Processing**: Jobs from the last 2 days only
- **Smart Filtering**: Software engineering roles with match scores ≥ 60
- **Beautiful UI**: Modern, responsive design with Tailwind CSS

## 🛠️ Tech Stack

- **Frontend**: Next.js 14, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes
- **File Processing**: pdf-parse, multer
- **Web Scraping**: Puppeteer, Cheerio, Axios
- **AI/ML**: TF-IDF, Cosine Similarity
- **Deployment**: Vercel-ready

## 📁 Project Structure

```
src/
├── app/
│   ├── api/
│   │   ├── upload/route.ts      # File upload endpoint
│   │   ├── scrape/route.ts      # Job scraping endpoint
│   │   └── match/route.ts       # Job matching endpoint
│   ├── results/page.tsx         # Results display page
│   ├── upload/page.tsx          # File upload page
│   ├── layout.tsx               # Root layout
│   └── page.tsx                 # Home page
├── components/
│   ├── FileUpload.tsx           # File upload component
│   ├── JobCard.tsx              # Job display card
│   ├── ResultsTable.tsx         # Results table component
│   └── LoadingSpinner.tsx       # Loading indicator
└── lib/
    ├── types.ts                 # TypeScript interfaces
    ├── utils.ts                 # Utility functions
    ├── scraper.ts               # Web scraping logic
    └── matcher.ts               # AI matching algorithms
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd web_scrape_2.0
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📋 API Endpoints

### POST /api/upload
Upload and parse resume files.

**Request:**
- `Content-Type: multipart/form-data`
- Body: File (PDF or TXT)

**Response:**
```json
{
  "success": true,
  "data": {
    "text": "extracted resume text",
    "fileName": "resume.pdf",
    "fileSize": 1024000,
    "uploadDate": "2024-01-15T10:30:00Z"
  }
}
```

### POST /api/scrape
Scrape jobs from multiple platforms.

**Request:**
```json
{
  "jobTypes": ["software engineer", "developer"],
  "locations": ["San Francisco", "Remote"],
  "maxJobs": 100
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "jobs": [...],
    "totalFound": 45,
    "errors": []
  }
}
```

### POST /api/match
Match resume against scraped jobs.

**Request:**
```json
{
  "resumeText": "extracted resume text",
  "jobs": [...]
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "jobs": [
      {
        "id": "1",
        "title": "Senior Software Engineer",
        "company": "Tech Corp",
        "datePosted": "2024-01-15",
        "location": "San Francisco, CA",
        "matchScore": 85,
        "jobURL": "https://...",
        "source": "linkedin"
      }
    ],
    "resumeText": "extracted text",
    "processingTime": 1.2
  }
}
```

## 🔧 Configuration

### Scraping Configuration
Edit `src/lib/types.ts` to modify:
- Job types to search for
- Number of days to look back
- Maximum jobs to scrape
- Target locations

### Matching Algorithm
The default matching uses TF-IDF cosine similarity. To use OpenAI embeddings:
1. Add your OpenAI API key to environment variables
2. Modify the matching logic in `src/lib/matcher.ts`

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy automatically

### Environment Variables

Create a `.env.local` file:
```env
# Optional: OpenAI API key for enhanced matching
OPENAI_API_KEY=your_openai_api_key_here
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📝 License

This project is licensed under the MIT License.

## 🆘 Support

For support, please open an issue in the GitHub repository.

---

**Note**: This project is for educational purposes. Please respect the terms of service of the job platforms you're scraping.
