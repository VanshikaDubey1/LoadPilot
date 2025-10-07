"use client";

import { useFormState, useFormStatus } from 'react-dom';
import { handleAnalyzeSession, type AnalyzeState } from "@/lib/actions";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { ArrowRight, BrainCircuit, Loader2 } from "lucide-react";
import { useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';

const initialState: AnalyzeState = {};

function SubmitButton() {
    const { pending } = useFormStatus();
    return (
        <Button type="submit" disabled={pending}>
            {pending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <ArrowRight className="mr-2 h-4 w-4" />}
            Analyze Session
        </Button>
    );
}

export default function AnalyzerPage() {
    const [state, formAction] = useFormState(handleAnalyzeSession, initialState);
    const { toast } = useToast();

    useEffect(() => {
        if (state.error) {
            toast({
                variant: 'destructive',
                title: 'Analysis Failed',
                description: state.error,
            });
        }
    }, [state, toast]);

    return (
        <div className="flex justify-center items-start pt-10">
            <Card className="w-full max-w-2xl">
                <form action={formAction}>
                    <CardHeader>
                        <div className="flex items-center gap-4">
                            <div className='p-3 bg-primary/10 rounded-lg'>
                               <BrainCircuit className="h-8 w-8 text-primary" />
                            </div>
                            <div>
                                <CardTitle className="font-headline text-2xl">AI Session Analyzer</CardTitle>
                                <CardDescription>Use AI to categorize session types based on their description.</CardDescription>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="description">Session Description</Label>
                            <Textarea
                                id="description"
                                name="description"
                                placeholder="e.g., 'User authenticates with username and password, receives a JWT, and is redirected to the dashboard.'"
                                rows={5}
                                required
                            />
                            {state.error && <p className="text-sm text-destructive">{state.error}</p>}
                        </div>
                        {state.result && (
                            <Card className="bg-secondary/50">
                                <CardHeader>
                                    <CardTitle className="text-lg">Analysis Result</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div>
                                        <p className="text-sm font-medium text-muted-foreground">Session Type</p>
                                        <Badge variant="secondary" className="text-base capitalize">{state.result.sessionType}</Badge>
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-muted-foreground">Confidence Score</p>
                                        <div className='flex items-center gap-2'>
                                            <Progress value={state.result.confidence * 100} className="w-full h-2" />
                                            <span className='font-mono text-sm'>{(state.result.confidence * 100).toFixed(1)}%</span>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        )}
                    </CardContent>
                    <CardFooter className="border-t px-6 py-4">
                        <SubmitButton />
                    </CardFooter>
                </form>
            </Card>
        </div>
    );
}
