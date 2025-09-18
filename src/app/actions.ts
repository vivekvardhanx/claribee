"use server";

import { refineBotResponse, RefineBotResponseInput } from '@/ai/flows/refine-bot-response';

export async function sendMessage(
  query: string,
): Promise<string> {
  // The user prompt allows for PDF uploads, but we cannot process PDF file
  // content on the server without adding a new dependency (e.g., pdf-parse),
  // which is outside the scope of this task.
  // Therefore, we pass an empty string for pdfContent.
  const pdfContent = '';

  const input: RefineBotResponseInput = {
    query: query,
    pdfContent: pdfContent,
    // The initial response acts as a system prompt for the refiner model.
    initialResponse: "You are Claribee 🐝, a helpful AI assistant for college-related questions. Provide a clear, friendly, and comprehensive answer to the user's query.",
  };

  try {
    const result = await refineBotResponse(input);
    return result.refinedResponse;
  } catch (error) {
    console.error('Error calling GenAI flow:', error);
    // Propagate the error to be handled by the client
    throw new Error('An error occurred while communicating with the AI. Please try again.');
  }
}
