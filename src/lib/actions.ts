'use server';

import { analyzeSessionType } from '@/ai/flows/session-type-analyzer';
import { z } from 'zod';

const AnalyzeSessionSchema = z.object({
  description: z.string().min(10, { message: 'Please provide a more detailed description (at least 10 characters).' }),
});

export type AnalyzeState = {
  result?: {
    sessionType: string;
    confidence: number;
  };
  error?: string;
  message?: string;
}

export async function handleAnalyzeSession(prevState: AnalyzeState, formData: FormData): Promise<AnalyzeState> {
  const validatedFields = AnalyzeSessionSchema.safeParse({
    description: formData.get('description'),
  });

  if (!validatedFields.success) {
    return {
      error: validatedFields.error.flatten().fieldErrors.description?.[0]
    };
  }
  
  try {
    const result = await analyzeSessionType({ sessionDescription: validatedFields.data.description });
    if (!result.sessionType) {
       return { error: 'Analysis failed. The model could not determine a session type.' };
    }
    return { result };
  } catch (e) {
    console.error(e);
    return { error: 'Failed to analyze session due to a server error. Please try again.' };
  }
}
