'use server';
/**
 * @fileOverview An AI agent that refines chatbot responses to be more contextually relevant and helpful.
 *
 * - refineBotResponse - A function that refines the chatbot's responses.
 * - RefineBotResponseInput - The input type for the refineBotResponse function.
 * - RefineBotResponseOutput - The return type for the refineBotResponse function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const RefineBotResponseInputSchema = z.object({
  query: z.string().describe('The user query.'),
  pdfContent: z.string().optional().describe('The content of the uploaded PDF file, if any.'),
  initialResponse: z.string().describe('The initial chatbot response.'),
});
export type RefineBotResponseInput = z.infer<typeof RefineBotResponseInputSchema>;

const RefineBotResponseOutputSchema = z.object({
  refinedResponse: z.string().describe('The refined chatbot response.'),
});
export type RefineBotResponseOutput = z.infer<typeof RefineBotResponseOutputSchema>;

export async function refineBotResponse(input: RefineBotResponseInput): Promise<RefineBotResponseOutput> {
  return refineBotResponseFlow(input);
}

const prompt = ai.definePrompt({
  name: 'refineBotResponsePrompt',
  input: {schema: RefineBotResponseInputSchema},
  output: {schema: RefineBotResponseOutputSchema},
  prompt: `You are an expert chatbot response refiner. Your job is to take an initial chatbot response, a user's query, and optionally the content of a PDF file, and refine the response to be more contextually relevant and helpful.

User Query: {{{query}}}

PDF Content (if available): {{{pdfContent}}}

Initial Chatbot Response: {{{initialResponse}}}

Refined Chatbot Response:`, // Removed triple curly braces here.
});

const refineBotResponseFlow = ai.defineFlow(
  {
    name: 'refineBotResponseFlow',
    inputSchema: RefineBotResponseInputSchema,
    outputSchema: RefineBotResponseOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return {refinedResponse: output!.refinedResponse};
  }
);
