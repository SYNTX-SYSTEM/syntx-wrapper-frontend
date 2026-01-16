import { NextRequest, NextResponse } from 'next/server';

const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL || 'https://dev.syntx-system.com';
const AUTH_USER = process.env.AUTH_USER || 'syntx';
const AUTH_PASS = process.env.AUTH_PASS || '';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const format = searchParams.get('format');
    
    const authHeader = 'Basic ' + Buffer.from(`${AUTH_USER}:${AUTH_PASS}`).toString('base64');
    
    const response = await fetch(`${BACKEND_URL}/scoring/profiles-list`, {
      method: 'GET',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': authHeader,
      },
    });

    if (!response.ok) {
      const error = await response.text();
      console.error('Backend profiles error:', error);
      return NextResponse.json(
        { error: 'Failed to fetch profiles', details: error, profiles: [] },
        { status: response.status }
      );
    }

    const data = await response.json();
    let profiles = data.profiles || [];
    
    if (format) {
      const bindingResponse = await fetch(
        `${BACKEND_URL}/scoring/bindings/get_binding_by_format/${format}`,
        {
          method: 'GET',
          headers: { 
            'Content-Type': 'application/json',
            'Authorization': authHeader,
          },
        }
      );
      
      if (bindingResponse.ok) {
        const bindingData = await bindingResponse.json();
        const profileId = bindingData.binding?.profile_id;
        
        if (profileId) {
          profiles = profiles.filter((p: any) => p.id === profileId);
        }
      }
    }
    
    return NextResponse.json({ profiles });
  } catch (error) {
    console.error('Profiles API error:', error);
    return NextResponse.json(
      { error: 'Backend connection failed', message: String(error), profiles: [] },
      { status: 503 }
    );
  }
}
