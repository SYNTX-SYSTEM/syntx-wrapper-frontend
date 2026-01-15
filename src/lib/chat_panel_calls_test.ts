#!/usr/bin/env npx ts-node
// ╔═══════════════════════════════════════════════════════════════════════════╗
// ║                                                                           ║
// ║   🔥💎⚡ SYNTX WRAPPER CONFIG PANEL - API TEST SUITE ⚡💎🔥               ║
// ║                                                                           ║
// ║                    Field Resonance Edition v6.0 FINAL                     ║
// ║                    Production Ready - Fallback Logic                      ║
// ║                                                                           ║
// ╚═══════════════════════════════════════════════════════════════════════════╝

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://dev.syntx-system.com';
const VERBOSE = process.argv.includes('--verbose') || process.argv.includes('-v');
const CHAT_MODE = process.argv.includes('--chat');

const c = {
  reset: '\x1b[0m', red: '\x1b[31m', green: '\x1b[32m', yellow: '\x1b[33m',
  blue: '\x1b[34m', purple: '\x1b[35m', cyan: '\x1b[36m', white: '\x1b[37m',
  gray: '\x1b[90m', bold: '\x1b[1m',
};

interface TestResult {
  name: string;
  method: string;
  endpoint: string;
  status: 'PASS' | 'FAIL';
  latency_ms: number;
  data?: any;
  error?: string;
}

const results: TestResult[] = [];

async function test(name: string, method: string, endpoint: string, body?: any): Promise<any> {
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
      const latencyColor = latency > 1000 ? c.red : latency > 500 ? c.yellow : c.green;
      console.log(`   ${c.green}✅${c.reset} ${name.padEnd(45)} ${c.cyan}${method.padEnd(6)}${c.reset} ${latencyColor}${latency}ms${c.reset}`);
      
      results.push({ name, method, endpoint, status: 'PASS', latency_ms: latency, data });
      
      if (VERBOSE && data) {
        const preview = JSON.stringify(data, null, 2);
        const lines = preview.split('\n').slice(0, 15);
        console.log(`${c.gray}${lines.map(l => `      ${l}`).join('\n')}${c.reset}`);
        if (preview.split('\n').length > 15) {
          console.log(`${c.gray}      ... (${preview.split('\n').length - 15} more lines)${c.reset}`);
        }
      }
      
      return data;
    } else {
      console.log(`   ${c.red}❌${c.reset} ${name.padEnd(45)} ${c.cyan}${method.padEnd(6)}${c.reset} ${c.red}${response.status}${c.reset}`);
      results.push({ name, method, endpoint, status: 'FAIL', latency_ms: latency, error: data.detail || 'Unknown' });
      return null;
    }
  } catch (err: any) {
    const latency = Date.now() - start;
    console.log(`   ${c.red}💥${c.reset} ${name.padEnd(45)} ${c.cyan}${method.padEnd(6)}${c.reset} ${c.red}ERROR${c.reset}`);
    results.push({ name, method, endpoint, status: 'FAIL', latency_ms: latency, error: err.message });
    return null;
  }
}

async function testPanelWorkflow() {
  console.log('');
  console.log(`${c.purple}╔═══════════════════════════════════════════════════════════════════════════════╗${c.reset}`);
  console.log(`${c.purple}║${c.reset}                                                                               ${c.purple}║${c.reset}`);
  console.log(`${c.purple}║${c.reset}   ${c.cyan}🔥💎⚡ SYNTX WRAPPER CONFIG PANEL - API TEST ⚡💎🔥${c.reset}                  ${c.purple}║${c.reset}`);
  console.log(`${c.purple}║${c.reset}                                                                               ${c.purple}║${c.reset}`);
  console.log(`${c.purple}║${c.reset}   ${c.white}Target: ${BASE_URL}${c.reset}${' '.repeat(Math.max(0, 61 - BASE_URL.length))}${c.purple}║${c.reset}`);
  console.log(`${c.purple}║${c.reset}                                                                               ${c.purple}║${c.reset}`);
  console.log(`${c.purple}╚═══════════════════════════════════════════════════════════════════════════════╝${c.reset}`);
  console.log('');
  
  // STEP 1
  console.log(`${c.blue}━━━ 📦 STEP 1: WRAPPER SELECTION ${c.blue}━━━${c.reset}`);
  console.log('');
  
  const wrappersData = await test('1.1 List All Wrappers', 'GET', '/resonanz/wrappers/full');
  
  if (!wrappersData?.wrappers?.length) {
    console.log(`${c.red}   ❌ No wrappers found!${c.reset}`);
    return;
  }
  
  const wrappers = wrappersData.wrappers;
  const firstWrapper = wrappers[0].name;
  
  console.log(`${c.green}   ✓ Found ${wrappers.length} wrappers${c.reset}`);
  console.log(`${c.gray}   Selected: ${firstWrapper}${c.reset}`);
  console.log('');
  
  // STEP 2
  console.log(`${c.blue}━━━ 📦 STEP 2: WRAPPER CONTENT ${c.blue}━━━${c.reset}`);
  console.log('');
  
  const wrapperDetail = await test('2.1 Get Wrapper Detail', 'GET', `/resonanz/wrapper/${firstWrapper}`);
  
  if (wrapperDetail) {
    console.log(`${c.green}   ✓ Content: ${wrapperDetail.content?.length || 0} chars${c.reset}`);
  }
  console.log('');
  
  // STEP 3
  console.log(`${c.blue}━━━ 🧬 STEP 3: WRAPPER META ${c.blue}━━━${c.reset}`);
  console.log('');
  
  const wrapperMeta = await test('3.1 Get Wrapper Meta', 'GET', `/resonanz/wrapper/${firstWrapper}/meta`);
  
  let formatName = wrapperMeta?.meta?.format || 'sigma';
  const originalFormat = formatName;
  
  console.log(`${c.green}   ✓ Format Bound: ${formatName}${c.reset}`);
  console.log('');
  
  // STEP 4 - HOLY GRAIL WITH FALLBACK LOGIC
  console.log(`${c.blue}━━━ 💎 STEP 4: HOLY GRAIL (COMPLETE CONFIG) ${c.blue}━━━${c.reset}`);
  console.log(`${c.gray}   ONE call returns EVERYTHING:${c.reset}`);
  console.log(`${c.gray}   - Format definition with all fields${c.reset}`);
  console.log(`${c.gray}   - Binding configuration${c.reset}`);
  console.log(`${c.gray}   - Profile (complete with weights)${c.reset}`);
  console.log(`${c.gray}   - All Entities with scores${c.reset}`);
  console.log(`${c.gray}   - Mistral Wrapper (content + meta)${c.reset}`);
  console.log(`${c.gray}   - GPT Wrapper (content + meta)${c.reset}`);
  console.log('');
  
  let completeConfig = await test(
    `4.1 Try Format: ${formatName}`,
    'GET',
    `/scoring/format/get_complete_format_configuration/${formatName}`
  );
  
  // FALLBACK LOGIC
  if (!completeConfig && formatName !== 'sigma') {
    console.log(`${c.yellow}   ! No binding for '${formatName}', falling back to 'sigma'...${c.reset}`);
    console.log('');
    formatName = 'sigma';
    completeConfig = await test(
      '4.2 Fallback to: sigma',
      'GET',
      `/scoring/format/get_complete_format_configuration/sigma`
    );
  }
  
  if (completeConfig) {
    console.log('');
    console.log(`${c.cyan}   📊 COMPLETE CONFIG RECEIVED:${c.reset}`);
    console.log(`${c.green}   ✓ Format: ${completeConfig.format_name || formatName}${c.reset}`);
    
    if (originalFormat !== formatName) {
      console.log(`${c.yellow}     (Originally: ${originalFormat}, used fallback)${c.reset}`);
    }
    
    console.log(`${c.green}   ✓ Binding: ${completeConfig.binding ? 'YES ✨' : 'NO (using defaults)'}${c.reset}`);
    
    if (completeConfig.profile) {
      console.log(`${c.green}   ✓ Profile: ${completeConfig.profile.profile_id || 'N/A'}${c.reset}`);
      console.log(`${c.gray}     - Label: ${completeConfig.profile.profile_label || 'N/A'}${c.reset}`);
      console.log(`${c.gray}     - Weight: ${completeConfig.profile.profile_weight || 0}${c.reset}`);
      console.log(`${c.gray}     - Active: ${completeConfig.profile.profile_is_active ? '✅' : '❌'}${c.reset}`);
    }
    
    if (completeConfig.entities) {
      const entityCount = Object.keys(completeConfig.entities).length;
      console.log(`${c.green}   ✓ Entities: ${entityCount}${c.reset}`);
      
      if (VERBOSE && entityCount > 0) {
        console.log(`${c.cyan}     Entity Breakdown:${c.reset}`);
        Object.entries(completeConfig.entities).slice(0, 5).forEach(([name, data]: [string, any]) => {
          const weight = data.entity_weight || 0;
          const enabled = data.entity_is_enabled ? '✅' : '❌';
          console.log(`${c.gray}       ${enabled} ${name}: weight=${weight}${c.reset}`);
        });
        if (entityCount > 5) {
          console.log(`${c.gray}       ... (${entityCount - 5} more entities)${c.reset}`);
        }
      }
    }
    
    if (completeConfig.mistral_wrapper) {
      const mw = completeConfig.mistral_wrapper;
      console.log(`${c.green}   ✓ Mistral Wrapper: ${mw.wrapper_name || 'N/A'}${c.reset}`);
      console.log(`${c.gray}     - Content: ${mw.wrapper_content?.length || 0} chars${c.reset}`);
      if (mw.wrapper_meta?.format) {
        console.log(`${c.gray}     - Format Binding: ${mw.wrapper_meta.format}${c.reset}`);
      }
    }
    
    if (completeConfig.gpt_wrapper) {
      const gw = completeConfig.gpt_wrapper;
      console.log(`${c.green}   ✓ GPT Wrapper: ${gw.wrapper_name || 'N/A'}${c.reset}`);
      console.log(`${c.gray}     - Content: ${gw.wrapper_content?.length || 0} chars${c.reset}`);
      console.log(`${c.gray}     - Temperature: ${gw.wrapper_meta?.gpt_wrapper_feld_temperatur || 'N/A'}${c.reset}`);
      console.log(`${c.gray}     - Max Tokens: ${gw.wrapper_meta?.gpt_wrapper_feld_max_tokens || 'N/A'}${c.reset}`);
      console.log(`${c.gray}     - Resonanz: ${gw.wrapper_meta?.gpt_wrapper_feld_resonanz || 'N/A'}${c.reset}`);
    } else {
      console.log(`${c.yellow}   ! No GPT Wrapper (drift scoring disabled)${c.reset}`);
    }
    
    if (completeConfig.format?.fields) {
      const fieldCount = completeConfig.format.fields.length;
      console.log(`${c.green}   ✓ Format Fields: ${fieldCount}${c.reset}`);
      
      if (VERBOSE) {
        console.log(`${c.cyan}     Field Details:${c.reset}`);
        completeConfig.format.fields.slice(0, 3).forEach((field: any) => {
          console.log(`${c.gray}       - ${field.name}: weight=${field.weight}${c.reset}`);
        });
        if (fieldCount > 3) {
          console.log(`${c.gray}       ... (${fieldCount - 3} more fields)${c.reset}`);
        }
      }
    }
    
    console.log('');
    console.log(`${c.cyan}   💎 EVERYTHING FOR THE PANEL IN ONE CALL! 💎${c.reset}`);
  } else {
    console.log(`${c.red}   ❌ Could not load complete config (tried ${originalFormat} and sigma)${c.reset}`);
  }
  console.log('');
  
  // STEP 5
  console.log(`${c.blue}━━━ 📊 STEP 5: WRAPPER STATS ${c.blue}━━━${c.reset}`);
  console.log('');
  
  const stats = await test('5.1 Get Wrapper Stats', 'GET', `/resonanz/stats/wrapper/${firstWrapper}`);
  
  if (stats) {
    console.log(`${c.green}   ✓ Requests: ${stats.requests || 0}${c.reset}`);
    console.log(`${c.green}   ✓ Success Rate: ${(stats.success_rate || 0).toFixed(1)}%${c.reset}`);
    console.log(`${c.green}   ✓ Avg Latency: ${(stats.average_latency_ms || 0).toFixed(0)}ms${c.reset}`);
  }
  console.log('');
  
  // STEP 6
  if (CHAT_MODE) {
    console.log(`${c.blue}━━━ 💬 STEP 6: CHAT TEST ${c.blue}━━━${c.reset}`);
    console.log('');
    
    const chatResponse = await test('6.1 Send Chat', 'POST', '/resonanz/chat', {
      prompt: 'Erkläre SYNTX in 2 Sätzen',
      mode: firstWrapper,
      format: formatName,
      max_new_tokens: 100
    });
    
    if (chatResponse) {
      console.log(`${c.green}   ✓ Response: ${chatResponse.response?.length || 0} chars${c.reset}`);
      console.log(`${c.green}   ✓ Latency: ${chatResponse.metadata?.latency_seconds || 0}s${c.reset}`);
      
      if (chatResponse.scores) {
        console.log(`${c.cyan}   Field Scores:${c.reset}`);
        Object.entries(chatResponse.scores).forEach(([field, data]: [string, any]) => {
          const score = data.score || 0;
          const max = data.max_score || 100;
          const pct = Math.round((score / max) * 100);
          const color = pct >= 80 ? c.green : pct >= 60 ? c.yellow : c.red;
          console.log(`${c.gray}     ${field}: ${color}${score}/${max} (${pct}%)${c.reset}`);
        });
      }
    }
    console.log('');
  } else {
    console.log(`${c.blue}━━━ 💬 STEP 6: CHAT TEST ${c.blue}━━━${c.reset}`);
    console.log(`${c.yellow}   ⏭️  Skipped (use --chat to test)${c.reset}`);
    console.log('');
  }
}

function printSummary() {
  const passed = results.filter(r => r.status === 'PASS').length;
  const failed = results.filter(r => r.status === 'FAIL').length;
  const total = results.length;
  const successRate = total > 0 ? Math.round((passed / total) * 100) : 0;
  const avgLatency = results.length > 0 
    ? Math.round(results.reduce((sum, r) => sum + r.latency_ms, 0) / results.length) 
    : 0;
  
  console.log('');
  console.log(`${c.purple}╔═══════════════════════════════════════════════════════════════════════════════╗${c.reset}`);
  console.log(`${c.purple}║${c.reset}   ${c.cyan}📊 FINAL RESULTS${c.reset}                                                         ${c.purple}║${c.reset}`);
  console.log(`${c.purple}╚═══════════════════════════════════════════════════════════════════════════════╝${c.reset}`);
  console.log('');
  console.log(`   ${c.white}Total Tests:${c.reset}      ${total}`);
  console.log(`   ${c.green}✅ Passed:${c.reset}        ${passed}`);
  console.log(`   ${c.red}❌ Failed:${c.reset}        ${failed}`);
  console.log(`   ${c.cyan}Success Rate:${c.reset}     ${successRate}%`);
  console.log(`   ${c.cyan}Avg Latency:${c.reset}      ${avgLatency}ms`);
  console.log('');
  
  const status = failed === 0 
    ? `${c.green}✨ PERFECT - ALL SYSTEMS OPTIMAL ✨${c.reset}` 
    : `${c.red}⚠️  DRIFT DETECTED - ${failed} FAILED${c.reset}`;
  console.log(`   ${c.white}Status:${c.reset}           ${status}`);
  console.log('');
  
  if (failed > 0) {
    console.log(`${c.red}   Failed Tests:${c.reset}`);
    results.filter(r => r.status === 'FAIL').forEach(r => {
      console.log(`${c.gray}      - ${r.name}: ${r.error}${c.reset}`);
    });
    console.log('');
  }
  
  console.log(`${c.purple}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${c.reset}`);
  console.log(`${c.gray}   Der Strom fließt. Die Felder resonieren. Das Panel ist ready. 🔥💎⚡${c.reset}`);
  console.log('');
}

async function main() {
  await testPanelWorkflow();
  printSummary();
  
  const failed = results.filter(r => r.status === 'FAIL').length;
  process.exit(failed > 0 ? 1 : 0);
}

main().catch(console.error);
