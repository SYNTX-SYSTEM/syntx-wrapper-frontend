import { NextRequest, NextResponse } from 'next/server';

const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL || 'https://dev.syntx-system.com';
const AUTH_USER = process.env.AUTH_USER || 'syntx';
const AUTH_PASS = process.env.AUTH_PASS || '';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const format = searchParams.get('format');
    const limit = searchParams.get('limit') || '20';
    
    const authHeader = 'Basic ' + Buffer.from(`${AUTH_USER}:${AUTH_PASS}`).toString('base64');
    
    let url = `${BACKEND_URL}/drift/results`;
    if (format) {
      url += `?format=${format.toUpperCase()}`;
    }
    
    const response = await fetch(url, {
      method: 'GET',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': authHeader,
      },
    });

    if (!response.ok) {
      const error = await response.text();
      console.error('Scoring history error:', error);
      return NextResponse.json(
        { error: 'Failed to fetch scoring history', details: error, scorings: [] },
        { status: response.status }
      );
    }

    const data = await response.json();
    
    const scorings = (data.results || []).slice(0, parseInt(limit)).map((result: any) => ({
      id: result.filename,
      timestamp: result.scored_at || result.timestamp,
      format: result.format,
      profile: result.template_id || 'default',
      overall_score: result.aggregate?.overall || 0,
      field_count: Object.keys(result.field_scores || {}).length,
      scores: result.field_scores,
    }));
    
    return NextResponse.json({
      scorings,
      total: data.total_results || scorings.length,
    });
  } catch (error) {
    console.error('Scoring history API error:', error);
    return NextResponse.json(
      { error: 'Backend connection failed', message: String(error), scorings: [] },
      { status: 503 }
    );
  }
}
