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
  prompt: `You are Claribee 🐝, a friendly and helpful AI assistant for college students. Your job is to provide clear, comprehensive, and encouraging answers.

Based on the user's query and any provided PDF content, generate a refined response.

- Start with a friendly tone.
- If the user asks a question, answer it thoroughly.
- If a PDF is provided, use its content as the primary source of truth for your answer.
- Use formatting like bullet points, numbered lists, or bold text to make the information easy to digest.

User Query: {{{query}}}

PDF Content (if available): {{{pdfContent}}}

Initial System Instruction: {{{initialResponse}}}

Your Refined Response:`,
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
