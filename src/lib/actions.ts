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

const CheckWebsiteSchema = z.object({
  url: z.string().url({ message: 'Please enter a valid URL.' }),
});

export type CheckWebsiteState = {
  result?: {
    status: 'Operational' | 'Down' | 'Error';
    responseTime: number;
    url: string;
  };
  error?: string;
}

export async function handleCheckExternalWebsite(prevState: CheckWebsiteState, formData: FormData): Promise<CheckWebsiteState> {
    const validatedFields = CheckWebsiteSchema.safeParse({
        url: formData.get('url'),
    });

    if (!validatedFields.success) {
        return {
            error: validatedFields.error.flatten().fieldErrors.url?.[0],
        };
    }

    const { url } = validatedFields.data;
    const startTime = Date.now();

    try {
        const response = await fetch(url, { method: 'HEAD', signal: AbortSignal.timeout(5000) });
        const endTime = Date.now();
        const responseTime = endTime - startTime;

        if (response.ok) {
            return { result: { status: 'Operational', responseTime, url } };
        } else {
            return { result: { status: 'Down', responseTime, url } };
        }
    } catch (e: any) {
        if (e.name === 'TimeoutError') {
             return { error: 'The request timed out.' };
        }
        return { error: 'Failed to fetch the website. Please check the URL and your network connection.' };
    }
}
