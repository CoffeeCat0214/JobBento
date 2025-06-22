import { Job } from './types';
import { cleanText, extractKeywords } from './utils';

export class JobMatcher {
  private resumeText: string = '';
  private resumeKeywords: string[] = [];

  // Set resume text and extract keywords
  setResume(resumeText: string) {
    this.resumeText = cleanText(resumeText);
    this.resumeKeywords = extractKeywords(resumeText);
    console.log('📄 Resume processed, extracted keywords:', this.resumeKeywords.length);
  }

  // Calculate match score for a single job
  calculateMatchScore(job: Job): number {
    if (!this.resumeText || !job.description) {
      return 0;
    }

    // Combine job title and description for matching
    const jobText = `${job.title} ${job.description}`.toLowerCase();
    const jobKeywords = extractKeywords(jobText);

    // Calculate TF-IDF similarity
    const similarity = this.calculateTFIDFSimilarity(jobKeywords);
    
    // Normalize to 0-100 scale
    const matchScore = Math.round(similarity * 100);
    
    return Math.min(matchScore, 100); // Cap at 100
  }

  // Match resume against multiple jobs
  matchJobs(jobs: Job[]): Job[] {
    if (!this.resumeText) {
      console.warn('⚠️ No resume text set for matching');
      return jobs;
    }

    console.log(`🤖 Matching ${jobs.length} jobs against resume...`);

    const matchedJobs = jobs.map(job => ({
      ...job,
      matchScore: this.calculateMatchScore(job)
    }));

    // Sort by match score (descending) and filter low scores
    const filteredJobs = matchedJobs
      .filter(job => job.matchScore >= 60) // Only jobs with 60%+ match
      .sort((a, b) => b.matchScore - a.matchScore);

    console.log(`✅ Matching complete: ${filteredJobs.length} jobs with 60%+ match`);

    return filteredJobs;
  }

  // Calculate TF-IDF cosine similarity between resume and job
  private calculateTFIDFSimilarity(jobKeywords: string[]): number {
    if (this.resumeKeywords.length === 0 || jobKeywords.length === 0) {
      return 0;
    }

    // Create vocabulary from both texts
    const vocabulary = new Set([...this.resumeKeywords, ...jobKeywords]);
    
    // Calculate TF-IDF vectors
    const resumeVector = this.calculateTFIDFVector(this.resumeKeywords, vocabulary);
    const jobVector = this.calculateTFIDFVector(jobKeywords, vocabulary);

    // Calculate cosine similarity
    return this.cosineSimilarity(resumeVector, jobVector);
  }

  // Calculate TF-IDF vector for a text
  private calculateTFIDFVector(keywords: string[], vocabulary: Set<string>): number[] {
    const vector: number[] = [];
    
    for (const word of vocabulary) {
      const tf = keywords.filter(k => k === word).length / keywords.length;
      const idf = Math.log(vocabulary.size / (keywords.includes(word) ? 1 : 0.5));
      vector.push(tf * idf);
    }
    
    return vector;
  }

  // Calculate cosine similarity between two vectors
  private cosineSimilarity(vectorA: number[], vectorB: number[]): number {
    if (vectorA.length !== vectorB.length) {
      return 0;
    }

    let dotProduct = 0;
    let normA = 0;
    let normB = 0;

    for (let i = 0; i < vectorA.length; i++) {
      dotProduct += vectorA[i] * vectorB[i];
      normA += vectorA[i] * vectorA[i];
      normB += vectorB[i] * vectorB[i];
    }

    if (normA === 0 || normB === 0) {
      return 0;
    }

    return dotProduct / (Math.sqrt(normA) * Math.sqrt(normB));
  }

  // Get resume analysis summary
  getResumeAnalysis() {
    if (!this.resumeText) {
      return null;
    }

    return {
      wordCount: this.resumeText.split(' ').length,
      keywordCount: this.resumeKeywords.length,
      topKeywords: this.resumeKeywords.slice(0, 10),
      textLength: this.resumeText.length
    };
  }

  // Enhanced matching with multiple algorithms
  async enhancedMatch(jobs: Job[]): Promise<Job[]> {
    // Basic TF-IDF matching
    const basicMatches = this.matchJobs(jobs);

    // Additional matching criteria could be added here:
    // - Skills matching
    // - Experience level matching
    // - Location preference
    // - Salary range
    // - Company size preference

    return basicMatches;
  }

  // Get matching statistics
  getMatchingStats(jobs: Job[]) {
    const matchedJobs = this.matchJobs(jobs);
    
    return {
      totalJobs: jobs.length,
      matchedJobs: matchedJobs.length,
      averageScore: matchedJobs.length > 0 
        ? Math.round(matchedJobs.reduce((sum, job) => sum + job.matchScore, 0) / matchedJobs.length)
        : 0,
      topScore: matchedJobs.length > 0 ? Math.max(...matchedJobs.map(job => job.matchScore)) : 0,
      scoreDistribution: {
        '90-100': matchedJobs.filter(job => job.matchScore >= 90).length,
        '80-89': matchedJobs.filter(job => job.matchScore >= 80 && job.matchScore < 90).length,
        '70-79': matchedJobs.filter(job => job.matchScore >= 70 && job.matchScore < 80).length,
        '60-69': matchedJobs.filter(job => job.matchScore >= 60 && job.matchScore < 70).length,
      }
    };
  }
}

// Export a default matcher instance
export const defaultMatcher = new JobMatcher(); 