"use client";

import { useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import { handleCheckExternalWebsite, type CheckWebsiteState } from "@/lib/actions";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Globe, Search, Loader2, CircleCheck, XCircle, AlertTriangle } from "lucide-react";
import { useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { Badge } from '../ui/badge';

const initialState: CheckWebsiteState = {};

function SubmitButton() {
    const { pending } = useFormStatus();
    return (
        <Button type="submit" disabled={pending} className="w-full sm:w-auto">
            {pending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Search className="mr-2 h-4 w-4" />}
            Check Status
        </Button>
    );
}

const statusConfig = {
    Operational: { icon: CircleCheck, className: 'text-green-500', label: 'Operational' },
    Down: { icon: XCircle, className: 'text-destructive', label: 'Down' },
    Error: { icon: AlertTriangle, className: 'text-yellow-500', label: 'Error' },
};


export function ExternalHealthCheckCard() {
    const [state, formAction] = useActionState(handleCheckExternalWebsite, initialState);
    const { toast } = useToast();

    useEffect(() => {
        if (state.error && !state.result) {
            toast({
                variant: 'destructive',
                title: 'Check Failed',
                description: state.error,
            });
        }
    }, [state, toast]);
    
    return (
        <Card>
            <form action={formAction}>
                <CardHeader>
                    <div className="flex items-center gap-4">
                        <div className='p-3 bg-primary/10 rounded-lg'>
                           <Globe className="h-8 w-8 text-primary" />
                        </div>
                        <div>
                            <CardTitle className="font-headline text-2xl">External Website Check</CardTitle>
                            <CardDescription>Enter a URL to check its status and response time.</CardDescription>
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="grid gap-2">
                        <Label htmlFor="url">Website URL</Label>
                        <div className="flex flex-col sm:flex-row gap-2">
                           <Input
                                id="url"
                                name="url"
                                type="url"
                                placeholder="https://example.com"
                                required
                                className="flex-grow"
                            />
                            <SubmitButton />
                        </div>
                        {state.error && !state.result && <p className="text-sm text-destructive mt-2">{state.error}</p>}
                    </div>
                </CardContent>
            </form>
             {state.result && (
                <CardFooter className='flex-col items-start gap-4'>
                    <div className='w-full p-4 rounded-lg bg-secondary/50'>
                         <p className="text-sm font-medium text-muted-foreground mb-2">Result for: <a href={state.result.url} target="_blank" rel="noopener noreferrer" className="text-primary underline font-semibold">{state.result.url}</a></p>
                        <div className='grid grid-cols-2 gap-4'>
                            <div>
                                <p className="text-sm font-medium text-muted-foreground">Status</p>
                                 <div className="flex items-center gap-2">
                                    {(() => {
                                        const config = statusConfig[state.result.status];
                                        const Icon = config.icon;
                                        return <>
                                            <Icon className={cn("h-5 w-5", config.className)} />
                                            <Badge variant={state.result.status === 'Operational' ? 'secondary' : 'destructive'} className="text-base">{config.label}</Badge>
                                        </>;
                                    })()}
                                </div>
                            </div>
                            <div>
                                <p className="text-sm font-medium text-muted-foreground">Response Time</p>
                                <p className="text-2xl font-bold">{state.result.responseTime}ms</p>
                            </div>
                        </div>
                    </div>

                </CardFooter>
            )}
        </Card>
    );
}
