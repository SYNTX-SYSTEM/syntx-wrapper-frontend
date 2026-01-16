import { NextRequest, NextResponse } from 'next/server';

const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL || 'https://dev.syntx-system.com';
const AUTH_USER = process.env.AUTH_USER || 'syntx';
const AUTH_PASS = process.env.AUTH_PASS || '';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const format = searchParams.get('format');
    const profile = searchParams.get('profile');
    const limit = searchParams.get('limit') || '20';
    
    // Scorings hängen an Format + Profile!
    if (!format || !profile) {
      return NextResponse.json(
        { error: 'Format and profile parameters required', scorings: [] },
        { status: 400 }
      );
    }
    
    const authHeader = 'Basic ' + Buffer.from(`${AUTH_USER}:${AUTH_PASS}`).toString('base64');
    
    // Call backend: /resonanz/scoring/history?format=sigma&profile=gpt-4&limit=20
    const response = await fetch(
      `${BACKEND_URL}/resonanz/scoring/history?format=${format}&profile=${profile}&limit=${limit}`,
      {
        method: 'GET',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': authHeader,
        },
      }
    );

    if (!response.ok) {
      const error = await response.text();
      console.error('Scoring history error:', error);
      return NextResponse.json(
        { error: 'Failed to fetch scoring history', details: error, scorings: [] },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Scoring history API error:', error);
    return NextResponse.json(
      { error: 'Backend connection failed', message: String(error), scorings: [] },
      { status: 503 }
    );
  }
}
