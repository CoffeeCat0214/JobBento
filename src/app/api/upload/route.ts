import { NextRequest, NextResponse } from 'next/server';
import { createErrorResponse, createSuccessResponse, validateResumeData } from '@/lib/utils';
import { ResumeData, UploadResponse } from '@/lib/types';

export async function POST(request: NextRequest): Promise<NextResponse<UploadResponse>> {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return createErrorResponse('No file provided! 📄', 400);
    }

    // Validate file type
    const allowedTypes = ['application/pdf', 'text/plain'];
    if (!allowedTypes.includes(file.type)) {
      return createErrorResponse('Invalid file type! Please upload PDF or TXT files only! 📝', 400);
    }

    // Validate file size (10MB limit)
    const maxSize = 10 * 1024 * 1024; // 10MB
    if (file.size > maxSize) {
      return createErrorResponse('File too large! Maximum size is 10MB! 📏', 400);
    }

    let extractedText = '';

    // Extract text based on file type
    if (file.type === 'application/pdf') {
      try {
        // Dynamic import to avoid issues with pdf-parse
        const pdf = (await import('pdf-parse')).default;
        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        const pdfData = await pdf(buffer);
        extractedText = pdfData.text;
      } catch (error) {
        console.error('PDF parsing error:', error);
        return createErrorResponse('Failed to parse PDF file! Please check if the file is valid! 📄', 400);
      }
    } else if (file.type === 'text/plain') {
      try {
        extractedText = await file.text();
      } catch (error) {
        console.error('Text file reading error:', error);
        return createErrorResponse('Failed to read text file! Please check if the file is valid! 📝', 400);
      }
    }

    // Validate extracted text
    if (!extractedText || extractedText.trim().length < 10) {
      return createErrorResponse('File appears to be empty or contains insufficient text! Please check your resume! 📄', 400);
    }

    // Clean and process the text
    const cleanedText = extractedText
      .replace(/\s+/g, ' ')
      .trim()
      .substring(0, 50000); // Limit to 50k characters

    // Create resume data object
    const resumeData: ResumeData = {
      text: cleanedText,
      fileName: file.name,
      fileSize: file.size,
      uploadDate: new Date()
    };

    // Validate resume data
    if (!validateResumeData(resumeData)) {
      return createErrorResponse('Invalid resume data! Please try again! 💔', 400);
    }

    // Return success response
    return createSuccessResponse(resumeData);

  } catch (error) {
    console.error('Upload API error:', error);
    return createErrorResponse('Internal server error! Please try again! 💔', 500);
  }
}

// Handle unsupported methods
export async function GET() {
  return createErrorResponse('Method not allowed! Use POST to upload files! 📤', 405);
}

export async function PUT() {
  return createErrorResponse('Method not allowed! Use POST to upload files! 📤', 405);
}

export async function DELETE() {
  return createErrorResponse('Method not allowed! Use POST to upload files! 📤', 405);
} 