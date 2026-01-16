import { NextRequest, NextResponse } from 'next/server';

const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL || 'https://dev.syntx-system.com';
const AUTH_USER = process.env.AUTH_USER || 'syntx';
const AUTH_PASS = process.env.AUTH_PASS || '';

export async function GET(request: NextRequest) {
  try {
    const authHeader = 'Basic ' + Buffer.from(`${AUTH_USER}:${AUTH_PASS}`).toString('base64');
    
    const response = await fetch(`${BACKEND_URL}/resonanz/formats`, {
      method: 'GET',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': authHeader,
      },
    });

    if (!response.ok) {
      const error = await response.text();
      console.error('Backend formats error:', error);
      return NextResponse.json(
        { error: 'Failed to fetch formats', details: error },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Formats API error:', error);
    return NextResponse.json(
      { error: 'Backend connection failed', message: String(error) },
      { status: 503 }
    );
  }
}
