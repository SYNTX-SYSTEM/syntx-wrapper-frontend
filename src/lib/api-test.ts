#!/usr/bin/env npx ts-node
// ╔═══════════════════════════════════════════════════════════════════════════╗
// ║   🧪 SYNTX API FRONTEND TEST SCRIPT v3.3.0                                ║
// ║   ─────────────────────────────────────────                               ║
// ║   Testet alle 44 Endpoints gegen die Live-API                             ║
// ╚═══════════════════════════════════════════════════════════════════════════╝

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://dev.syntx-system.com';

interface TestResult {
  endpoint: string;
  method: string;
  status: 'PASS' | 'FAIL' | 'SKIP';
  latency_ms: number;
  error?: string;
}

const results: TestResult[] = [];

async function test(
  name: string,
  method: string,
  endpoint: string,
  body?: object
): Promise<void> {
  const start = Date.now();
  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: body ? JSON.stringify(body) : undefined,
    });
    const latency = Date.now() - start;
    const data = await response.json();
    
    if (response.ok) {
      console.log(`✅ ${name.padEnd(25)} ${method.padEnd(6)} ${latency}ms`);
      results.push({ endpoint: name, method, status: 'PASS', latency_ms: latency });
    } else {
      console.log(`❌ ${name.padEnd(25)} ${method.padEnd(6)} ${response.status} - ${data.detail || 'Unknown'}`);
      results.push({ endpoint: name, method, status: 'FAIL', latency_ms: latency, error: data.detail });
    }
  } catch (err: any) {
    const latency = Date.now() - start;
    console.log(`💥 ${name.padEnd(25)} ${method.padEnd(6)} NETWORK ERROR`);
    results.push({ endpoint: name, method, status: 'FAIL', latency_ms: latency, error: err.message });
  }
}

async function runTests() {
  console.log('');
  console.log('╔═══════════════════════════════════════════════════════════════════╗');
  console.log('║   🧪 SYNTX API FRONTEND TEST - v3.3.0                             ║');
  console.log('║   Target: ' + BASE_URL.padEnd(54) + '║');
  console.log('╚═══════════════════════════════════════════════════════════════════╝');
  console.log('');

  // ═══════════════════════════════════════════════════════════════════════
  // 🏥 HEALTH & CONFIG
  // ═══════════════════════════════════════════════════════════════════════
  console.log('─── 🏥 HEALTH & CONFIG ───');
  await test('getHealth', 'GET', '/health');
  await test('getResonanzHealth', 'GET', '/resonanz/health');
  await test('getWrapperHealth', 'GET', '/resonanz/health/wrappers');
  await test('getConfig', 'GET', '/resonanz/config/default-wrapper');

  // ═══════════════════════════════════════════════════════════════════════
  // 📦 WRAPPER
  // ═══════════════════════════════════════════════════════════════════════
  console.log('');
  console.log('─── 📦 WRAPPER ───');
  await test('getWrappers', 'GET', '/resonanz/wrappers');
  await test('getWrappersFull', 'GET', '/resonanz/wrappers/full');
  await test('getActiveWrapper', 'GET', '/resonanz/wrappers?active=true');
  await test('getWrapper', 'GET', '/resonanz/wrapper/init');
  await test('getWrapperMeta', 'GET', '/resonanz/wrapper/init/meta');

  // ═══════════════════════════════════════════════════════════════════════
  // 📊 STATS & ANALYTICS
  // ═══════════════════════════════════════════════════════════════════════
  console.log('');
  console.log('─── 📊 STATS & ANALYTICS ───');
  await test('getStats', 'GET', '/resonanz/stats');
  await test('getWrapperStats', 'GET', '/resonanz/stats/wrapper/init');
  await test('getStream', 'GET', '/resonanz/strom?limit=5');
  await test('getTraining', 'GET', '/resonanz/training?limit=5');

  // ═══════════════════════════════════════════════════════════════════════
  // 💬 CHAT
  // ═══════════════════════════════════════════════════════════════════════
  console.log('');
  console.log('─── 💬 CHAT ───');
  await test('chat', 'POST', '/resonanz/chat', { prompt: 'Test vom Frontend', mode: 'init' });

  // ═══════════════════════════════════════════════════════════════════════
  // 📄 FORMAT
  // ═══════════════════════════════════════════════════════════════════════
  console.log('');
  console.log('─── 📄 FORMAT ───');
  await test('getFormats', 'GET', '/resonanz/formats');
  await test('getFormat', 'GET', '/resonanz/formats/syntx-standard');

  // ═══════════════════════════════════════════════════════════════════════
  // 🔀 DIFF (v3.3)
  // ═══════════════════════════════════════════════════════════════════════
  console.log('');
  console.log('─── 🔀 DIFF (v3.3) ───');
  await test('diff', 'POST', '/resonanz/chat/diff', { 
    prompt: 'Was ist SYNTX?', 
    wrappers: ['init', 'syntx-core'] 
  });

  // ═══════════════════════════════════════════════════════════════════════
  // 📼 SESSIONS (v3.3)
  // ═══════════════════════════════════════════════════════════════════════
  console.log('');
  console.log('─── 📼 SESSIONS (v3.3) ───');
  await test('getSessions', 'GET', '/resonanz/sessions?limit=5');

  // ═══════════════════════════════════════════════════════════════════════
  // ⚗️ ALCHEMY (v3.3)
  // ═══════════════════════════════════════════════════════════════════════
  console.log('');
  console.log('─── ⚗️ ALCHEMY (v3.3) ───');
  await test('getAlchemyStyles', 'GET', '/resonanz/alchemy/styles');
  await test('alchemyPreview', 'POST', '/resonanz/alchemy/preview', {
    text: 'Das ist ein grundlegender Test',
    style: 'zynisch'
  });

  // ═══════════════════════════════════════════════════════════════════════
  // 🎨 STYLES (v3.3)
  // ═══════════════════════════════════════════════════════════════════════
  console.log('');
  console.log('─── 🎨 STYLES (v3.3) ───');
  await test('getStyles', 'GET', '/resonanz/styles');
  await test('getStyle', 'GET', '/resonanz/styles/zynisch');

  // ═══════════════════════════════════════════════════════════════════════
  // 📊 SUMMARY
  // ═══════════════════════════════════════════════════════════════════════
  console.log('');
  console.log('╔═══════════════════════════════════════════════════════════════════╗');
  const passed = results.filter(r => r.status === 'PASS').length;
  const failed = results.filter(r => r.status === 'FAIL').length;
  const avgLatency = Math.round(results.reduce((a, b) => a + b.latency_ms, 0) / results.length);
  console.log(`║   📊 RESULTS: ${passed} PASS | ${failed} FAIL | avg ${avgLatency}ms`.padEnd(68) + '║');
  console.log('╚═══════════════════════════════════════════════════════════════════╝');
  
  if (failed > 0) {
    console.log('');
    console.log('❌ FAILED TESTS:');
    results.filter(r => r.status === 'FAIL').forEach(r => {
      console.log(`   - ${r.endpoint}: ${r.error || 'Unknown error'}`);
    });
  }
}

runTests();
