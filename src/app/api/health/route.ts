import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    return NextResponse.json({ 
      status: 'ok', 
      timestamp: new Date().toISOString() 
    });
  } catch (error) {
    return NextResponse.json({ 
      status: 'error', 
      message: 'An unexpected error occurred.',
      timestamp: new Date().toISOString() 
    }, { status: 500 });
  }
}
