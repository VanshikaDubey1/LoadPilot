'use server';

/**
 * @fileOverview An AI agent to analyze and categorize session types.
 *
 * - analyzeSessionType - A function that categorizes a session type based on its description.
 * - SessionTypeInput - The input type for the analyzeSessionType function.
 * - SessionTypeOutput - The return type for the analyzeSessionType function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SessionTypeInputSchema = z.object({
  sessionDescription: z
    .string()
    .describe('The description of the session, including its purpose and activities.'),
});
export type SessionTypeInput = z.infer<typeof SessionTypeInputSchema>;

const SessionTypeOutputSchema = z.object({
  sessionType: z
    .string()
    .describe(
      'The categorized session type (e.g., user login, data processing, API call).' + 
      'Respond only with session type, do not add any other explanation or text.'
    ),
  confidence: z
    .number()
    .describe('A confidence score (0-1) indicating the accuracy of the categorization.'),
});
export type SessionTypeOutput = z.infer<typeof SessionTypeOutputSchema>;

export async function analyzeSessionType(
  input: SessionTypeInput
): Promise<SessionTypeOutput> {
  return analyzeSessionTypeFlow(input);
}

const prompt = ai.definePrompt({
  name: 'sessionTypeAnalyzerPrompt',
  input: {schema: SessionTypeInputSchema},
  output: {schema: SessionTypeOutputSchema},
  prompt: `You are an expert system for categorizing session types in a web application.

You will receive a description of a session and must categorize it into one of the following types:
- user login
- data processing
- API call
- other

Description: {{{sessionDescription}}}

Respond ONLY with one of the session types listed above. Do not add any other explanation or text. Also add the confidence score (0-1) of the categorization.`,
});

const analyzeSessionTypeFlow = ai.defineFlow(
  {
    name: 'analyzeSessionTypeFlow',
    inputSchema: SessionTypeInputSchema,
    outputSchema: SessionTypeOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
