"use server";

import { refineBotResponse, RefineBotResponseInput } from '@/ai/flows/refine-bot-response';
import pdf from 'pdf-parse/lib/pdf-parse.js';

async function getPdfContent(pdfBase64: string): Promise<string> {
  if (!pdfBase64) return '';
  try {
    const pdfBuffer = Buffer.from(pdfBase64, 'base64');
    const data = await pdf(pdfBuffer);
    return data.text;
  } catch (error) {
    console.error('Error parsing PDF:', error);
    return '';
  }
}

export async function sendMessage(
  query: string,
  pdfBase64: string = ''
): Promise<string> {
  const pdfContent = await getPdfContent(pdfBase64);

  const input: RefineBotResponseInput = {
    query: query,
    pdfContent: pdfContent,
    initialResponse: "You are Claribee 🐝, a helpful AI assistant for college-related questions. Provide a clear, friendly, and comprehensive answer to the user's query.",
  };

  try {
    const result = await refineBotResponse(input);
    return result.refinedResponse;
  } catch (error) {
    console.error('Error calling GenAI flow:', error);
    throw new Error('An error occurred while communicating with the AI. Please try again.');
  }
}
