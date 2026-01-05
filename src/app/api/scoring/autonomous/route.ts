import { NextResponse } from 'next/server';

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://dev.syntx-system.com/resonanz';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const path = searchParams.get('path') || 'suggestions';
  
  try {
    const response = await fetch(`${API_BASE}/scoring/autonomous/${path}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const { searchParams } = new URL(request.url);
  const action = searchParams.get('action') || 'analyze';
  const days = searchParams.get('days') || '7';
  const threshold = searchParams.get('score_threshold') || '0.5';
  const minOccurrences = searchParams.get('min_occurrences') || '2';
  
  try {
    let url = `${API_BASE}/scoring/autonomous/${action}`;
    if (action === 'analyze') {
      url += `?days=${days}&score_threshold=${threshold}&min_occurrences=${minOccurrences}`;
    }
    
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({ error: 'Failed to perform action' }, { status: 500 });
  }
}
