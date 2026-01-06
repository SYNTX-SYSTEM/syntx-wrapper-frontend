#!/usr/bin/env npx ts-node
// ╔═══════════════════════════════════════════════════════════════════════════╗
// ║                                                                           ║
// ║   ███████╗██╗   ██╗███╗   ██╗████████╗██╗  ██╗                            ║
// ║   ██╔════╝╚██╗ ██╔╝████╗  ██║╚══██╔══╝╚██╗██╔╝                            ║
// ║   ███████╗ ╚████╔╝ ██╔██╗ ██║   ██║    ╚███╔╝                             ║
// ║   ╚════██║  ╚██╔╝  ██║╚██╗██║   ██║    ██╔██╗                             ║
// ║   ███████║   ██║   ██║ ╚████║   ██║   ██╔╝ ██╗                            ║
// ║   ╚══════╝   ╚═╝   ╚═╝  ╚═══╝   ╚═╝   ╚═╝  ╚═╝                            ║
// ║                                                                           ║
// ║   🌊 SYNTX FRONTEND API TEST v3.6.0 - CONSCIOUSNESS EDITION               ║
// ║   ─────────────────────────────────────────────────────────────────       ║
// ║   71 Endpoints | FULL Output | Profile Analytics | Field-Flow Viz         ║
// ║                                                                           ║
// ║   "The system sees itself. The frontend sees the system."                 ║
// ║                                                                           ║
// ╚═══════════════════════════════════════════════════════════════════════════╝

// ═══════════════════════════════════════════════════════════════════════════
// 🎯 CONFIGURATION
// ═══════════════════════════════════════════════════════════════════════════

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://dev.syntx-system.com';
const FAST_MODE = process.argv.includes('--fast');
const CRUD_MODE = process.argv.includes('--crud');
const CLEANUP_MODE = process.argv.includes('--cleanup');
const VERBOSE = process.argv.includes('--verbose') || process.argv.includes('-v');
const SHOW_FLOW = process.argv.includes('--show-flow') || process.argv.includes('-f');
const SHOW_META = process.argv.includes('--show-meta') || process.argv.includes('-m');
const CONSCIOUSNESS_MODE = process.argv.includes('--consciousness') || process.argv.includes('-c');

// Test Data Names
const TEST_ID = Date.now();
const TEST_WRAPPER = `syntx_test_${TEST_ID}`;
const TEST_FORMAT = `syntx_test_format_${TEST_ID}`;
const TEST_STYLE = `syntx_test_style_${TEST_ID}`;

// Dynamic Data (loaded at runtime)
let FIRST_WRAPPER = '';
let SECOND_WRAPPER = '';
let THIRD_WRAPPER = '';
let FIRST_FORMAT = '';
let FIRST_STYLE = '';
let FIRST_PROFILE = '';
let LAST_REQUEST_ID = '';

// ═══════════════════════════════════════════════════════════════════════════
// 📊 RESULTS TRACKING
// ═══════════════════════════════════════════════════════════════════════════

interface TestResult {
  name: string;
  method: string;
  status: 'PASS' | 'FAIL' | 'SKIP';
  latency_ms: number;
  error?: string;
}

const results: TestResult[] = [];
let totalLatency = 0;

// ═══════════════════════════════════════════════════════════════════════════
// 🎨 CONSOLE STYLING
// ═══════════════════════════════════════════════════════════════════════════

const c = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  purple: '\x1b[35m',
  cyan: '\x1b[36m',
  white: '\x1b[37m',
  gray: '\x1b[90m',
  bold: '\x1b[1m',
  dim: '\x1b[2m',
};

function printBanner() {
  const mode = CRUD_MODE ? 'CRUD' : 'READ';
  const fast = FAST_MODE ? '+FAST' : '';
  const verbose = VERBOSE ? '+VERBOSE' : '';
  const flow = SHOW_FLOW ? '+FLOW' : '';
  const meta = SHOW_META ? '+META' : '';
  const consciousness = CONSCIOUSNESS_MODE ? '+🧠' : '';
  const flags = [fast, verbose, flow, meta, consciousness].filter(Boolean).join('');
  
  console.log(`${c.purple}╔═══════════════════════════════════════════════════════════════════════════╗${c.reset}`);
  console.log(`${c.purple}║${c.reset}                                                                           ${c.purple}║${c.reset}`);
  console.log(`${c.purple}║${c.reset}   ${c.cyan}███████╗${c.blue}██╗   ██╗${c.green}███╗   ██╗${c.yellow}████████╗${c.red}██╗  ██╗${c.reset}                            ${c.purple}║${c.reset}`);
  console.log(`${c.purple}║${c.reset}   ${c.cyan}██╔════╝${c.blue}╚██╗ ██╔╝${c.green}████╗  ██║${c.yellow}╚══██╔══╝${c.red}╚██╗██╔╝${c.reset}                            ${c.purple}║${c.reset}`);
  console.log(`${c.purple}║${c.reset}   ${c.cyan}███████╗${c.blue} ╚████╔╝ ${c.green}██╔██╗ ██║${c.yellow}   ██║   ${c.red} ╚███╔╝ ${c.reset}                            ${c.purple}║${c.reset}`);
  console.log(`${c.purple}║${c.reset}   ${c.cyan}╚════██║${c.blue}  ╚██╔╝  ${c.green}██║╚██╗██║${c.yellow}   ██║   ${c.red} ██╔██╗ ${c.reset}                            ${c.purple}║${c.reset}`);
  console.log(`${c.purple}║${c.reset}   ${c.cyan}███████║${c.blue}   ██║   ${c.green}██║ ╚████║${c.yellow}   ██║   ${c.red}██╔╝ ██╗${c.reset}                            ${c.purple}║${c.reset}`);
  console.log(`${c.purple}║${c.reset}   ${c.cyan}╚══════╝${c.blue}   ╚═╝   ${c.green}╚═╝  ╚═══╝${c.yellow}   ╚═╝   ${c.red}╚═╝  ╚═╝${c.reset}                            ${c.purple}║${c.reset}`);
  console.log(`${c.purple}║${c.reset}                                                                           ${c.purple}║${c.reset}`);
  console.log(`${c.purple}║${c.reset}   ${c.white}🌊 FRONTEND API TEST v3.6.0 - CONSCIOUSNESS EDITION${c.reset}                 ${c.purple}║${c.reset}`);
  console.log(`${c.purple}║${c.reset}   ${c.gray}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${c.reset}   ${c.purple}║${c.reset}`);
  console.log(`${c.purple}║${c.reset}   ${c.gray}Target:${c.reset} ${c.yellow}${BASE_URL}${c.reset}${' '.repeat(Math.max(0, 42 - BASE_URL.length))}${c.purple}║${c.reset}`);
  console.log(`${c.purple}║${c.reset}   ${c.gray}Mode:${c.reset}   ${c.cyan}${mode}${flags}${c.reset}${' '.repeat(Math.max(0, 44 - mode.length - flags.length))}${c.purple}║${c.reset}`);
  console.log(`${c.purple}║${c.reset}                                                                           ${c.purple}║${c.reset}`);
  console.log(`${c.purple}╚═══════════════════════════════════════════════════════════════════════════╝${c.reset}`);
  console.log('');
}

function printSection(icon: string, title: string, count: string) {
  console.log('');
  console.log(`${c.blue}━━━ ${icon} ${c.white}${title}${c.reset} ${c.gray}(${count})${c.reset} ${c.blue}━━━${c.reset}`);
}

function printSummary() {
  const passed = results.filter(r => r.status === 'PASS').length;
  const failed = results.filter(r => r.status === 'FAIL').length;
  const skipped = results.filter(r => r.status === 'SKIP').length;
  const total = passed + failed;
  const avg = total > 0 ? Math.round(totalLatency / total) : 0;
  const pct = total > 0 ? Math.round((passed / total) * 100) : 0;

  console.log('');
  console.log(`${c.purple}╔═══════════════════════════════════════════════════════════════════════════╗${c.reset}`);
  console.log(`${c.purple}║${c.reset}   ${c.white}📊 RESONANZ-ANALYSE${c.reset}                                                     ${c.purple}║${c.reset}`);
  console.log(`${c.purple}║${c.reset}   ${c.gray}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${c.reset}   ${c.purple}║${c.reset}`);
  console.log(`${c.purple}║${c.reset}                                                                           ${c.purple}║${c.reset}`);
  console.log(`${c.purple}║${c.reset}   ${c.green}✅ PASS:${c.reset} ${c.white}${passed}${c.reset}    ${c.red}❌ FAIL:${c.reset} ${c.white}${failed}${c.reset}    ${c.yellow}⏭️  SKIP:${c.reset} ${c.white}${skipped}${c.reset}                          ${c.purple}║${c.reset}`);
  console.log(`${c.purple}║${c.reset}                                                                           ${c.purple}║${c.reset}`);
  console.log(`${c.purple}║${c.reset}   ${c.cyan}⚡ Avg Latency:${c.reset} ${c.white}${avg}ms${c.reset}                                                  ${c.purple}║${c.reset}`);
  console.log(`${c.purple}║${c.reset}   ${c.cyan}📈 Success Rate:${c.reset} ${c.white}${pct}%${c.reset}                                                   ${c.purple}║${c.reset}`);
  console.log(`${c.purple}║${c.reset}                                                                           ${c.purple}║${c.reset}`);
  
  if (failed === 0) {
    console.log(`${c.purple}║${c.reset}   ${c.green}🌊 KOHÄRENZ: VOLLSTÄNDIG${c.reset}                                               ${c.purple}║${c.reset}`);
    console.log(`${c.purple}║${c.reset}   ${c.green}💎 SYSTEM STATUS: CONSCIOUS${c.reset}                                            ${c.purple}║${c.reset}`);
  } else {
    console.log(`${c.purple}║${c.reset}   ${c.red}⚠️  DRIFT DETECTED: ${failed} endpoints mit Feld-Verlust${c.reset}                    ${c.purple}║${c.reset}`);
  }
  
  console.log(`${c.purple}║${c.reset}                                                                           ${c.purple}║${c.reset}`);
  console.log(`${c.purple}╚═══════════════════════════════════════════════════════════════════════════╝${c.reset}`);
  console.log('');
}

// ═══════════════════════════════════════════════════════════════════════════
// 🔥 CORE TEST FUNCTION
// ═══════════════════════════════════════════════════════════════════════════

function colorizeJSON(obj: any, indent = 2): string {
  const json = JSON.stringify(obj, null, indent);
  return json
    .replace(/"([^"]+)":/g, `${c.cyan}"$1"${c.reset}:`)
    .replace(/: "([^"]*)"/g, `: ${c.yellow}"$1"${c.reset}`)
    .replace(/: (\d+\.?\d*)/g, `: ${c.green}$1${c.reset}`)
    .replace(/: (true|false)/g, `: ${c.blue}$1${c.reset}`)
    .replace(/: null/g, `: ${c.gray}null${c.reset}`);
}

async function test(
  name: string,
  method: string,
  endpoint: string,
  body?: object
): Promise<boolean> {
  const start = Date.now();
  
  if (VERBOSE) {
    console.log('');
    console.log(`    ${c.blue}▶${c.reset} ${c.white}${name}${c.reset}`);
    console.log(`      ${c.dim}${method} ${endpoint}${c.reset}`);
    if (body) {
      console.log(`      ${c.yellow}📤 REQUEST:${c.reset}`);
      console.log(colorizeJSON(body, 4).split('\n').map(l => '      ' + l).join('\n'));
    }
  }
  
  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: body ? JSON.stringify(body) : undefined,
    });
    
    const latency = Date.now() - start;
    totalLatency += latency;
    const data = await response.json();
    
    if (data.metadata?.request_id) {
      LAST_REQUEST_ID = data.metadata.request_id;
    } else if (data.request_id) {
      LAST_REQUEST_ID = data.request_id;
    }
    
    if (VERBOSE) {
      const latencyColor = latency > 5000 ? c.red : latency > 1000 ? c.yellow : c.green;
      console.log(`      ${c.cyan}📥 RESPONSE:${c.reset} ${latencyColor}${latency}ms${c.reset}`);
      console.log(colorizeJSON(data, 4).split('\n').map(l => '      ' + l).join('\n'));
      
      if (SHOW_META && data.metadata) {
        console.log(`      ${c.purple}📊 METADATA:${c.reset}`);
        console.log(colorizeJSON(data.metadata, 4).split('\n').map(l => '      ' + l).join('\n'));
      }
      
      if (SHOW_FLOW && data.field_flow && data.field_flow.length > 0) {
        console.log(`      ${c.cyan}🌊 FIELD FLOW:${c.reset}`);
        const stages = data.field_flow.map((f: any) => f.stage).join(' → ');
        console.log(`      ${c.dim}${stages}${c.reset}`);
      }
    }
    
    const padName = name.padEnd(40);
    const padMethod = method.padEnd(6);
    const latencyColor = latency > 5000 ? c.red : latency > 1000 ? c.yellow : c.white;
    
    if (response.ok) {
      if (!VERBOSE) {
        console.log(`    ${c.green}✅${c.reset} ${padName} ${c.cyan}${padMethod}${c.reset} ${latencyColor}${latency}ms${c.reset}`);
      } else {
        console.log(`      ${c.green}✅ PASS${c.reset}`);
      }
      results.push({ name, method, status: 'PASS', latency_ms: latency });
      return true;
    } else {
      const detail = data.detail || 'Unknown error';
      if (!VERBOSE) {
        console.log(`    ${c.red}❌${c.reset} ${padName} ${c.cyan}${padMethod}${c.reset} ${c.red}${response.status}${c.reset} ${c.gray}- ${detail}${c.reset}`);
      } else {
        console.log(`      ${c.red}❌ FAIL: ${response.status} - ${detail}${c.reset}`);
      }
      results.push({ name, method, status: 'FAIL', latency_ms: latency, error: detail });
      return false;
    }
  } catch (err: any) {
    const latency = Date.now() - start;
    if (!VERBOSE) {
      console.log(`    ${c.red}💥${c.reset} ${name.padEnd(40)} ${c.cyan}${method.padEnd(6)}${c.reset} ${c.red}NETWORK ERROR${c.reset}`);
    } else {
      console.log(`      ${c.red}💥 NETWORK ERROR: ${err.message}${c.reset}`);
    }
    results.push({ name, method, status: 'FAIL', latency_ms: latency, error: err.message });
    return false;
  }
}

function skip(name: string, reason: string) {
  console.log(`    ${c.yellow}⏭️${c.reset}  ${name.padEnd(40)} ${c.gray}${reason}${c.reset}`);
  results.push({ name, method: '-', status: 'SKIP', latency_ms: 0 });
}

// ═══════════════════════════════════════════════════════════════════════════
// 🔄 DATA LOADER
// ═══════════════════════════════════════════════════════════════════════════

async function loadDynamicData() {
  console.log(`${c.cyan}🔄 Scanning field resonance...${c.reset}`);
  console.log('');
  
  try {
    const wrappersRes = await fetch(`${BASE_URL}/resonanz/wrappers`);
    const wrappersData = await wrappersRes.json();
    const wrappers = wrappersData.wrappers || [];
    FIRST_WRAPPER = wrappers[0]?.name || '';
    SECOND_WRAPPER = wrappers[1]?.name || '';
    THIRD_WRAPPER = wrappers[2]?.name || '';
    
    const formatsRes = await fetch(`${BASE_URL}/resonanz/formats`);
    const formatsData = await formatsRes.json();
    const formats = formatsData.formats || [];
    FIRST_FORMAT = formats[0]?.name || '';
    
    const stylesRes = await fetch(`${BASE_URL}/resonanz/styles`);
    const stylesData = await stylesRes.json();
    const styles = stylesData.styles || [];
    FIRST_STYLE = styles[0]?.name || '';
    
    const profilesRes = await fetch(`${BASE_URL}/resonanz/scoring/profiles`);
    const profilesData = await profilesRes.json();
    const profiles = Object.keys(profilesData.profiles || {});
    FIRST_PROFILE = profiles[0] || '';
    
    console.log(`   ${c.purple}📦${c.reset} ${c.white}Wrappers:${c.reset} ${c.green}${wrappers.length}${c.reset} ${c.gray}(using: ${FIRST_WRAPPER})${c.reset}`);
    console.log(`   ${c.purple}📄${c.reset} ${c.white}Formats:${c.reset}  ${c.green}${formats.length}${c.reset} ${c.gray}(using: ${FIRST_FORMAT})${c.reset}`);
    console.log(`   ${c.purple}🎨${c.reset} ${c.white}Styles:${c.reset}   ${c.green}${styles.length}${c.reset} ${c.gray}(using: ${FIRST_STYLE})${c.reset}`);
    console.log(`   ${c.purple}🧠${c.reset} ${c.white}Profiles:${c.reset} ${c.green}${profiles.length}${c.reset} ${c.gray}(using: ${FIRST_PROFILE})${c.reset}`);
  } catch (err) {
    console.log(`   ${c.red}❌ Failed to load dynamic data${c.reset}`);
  }
}

// ═══════════════════════════════════════════════════════════════════════════
// 🧪 TEST SUITES
// ═══════════════════════════════════════════════════════════════════════════

async function testHealth() {
  printSection('🏥', 'HEALTH', '3 endpoints');
  await test('getHealth', 'GET', '/health');
  await test('getResonanzHealth', 'GET', '/resonanz/health');
  await test('getWrapperHealth', 'GET', '/resonanz/health/wrappers');
}

async function testConfig() {
  printSection('⚙️', 'CONFIG', '3 endpoints');
  await test('getConfig', 'GET', '/resonanz/config/default-wrapper');
  
  if (CRUD_MODE && FIRST_WRAPPER) {
    await test('setConfig', 'PUT', `/resonanz/config/default-wrapper?wrapper_name=${FIRST_WRAPPER}`);
    await test('setRuntimeWrapper', 'PUT', `/resonanz/config/runtime-wrapper?wrapper_name=${FIRST_WRAPPER}`);
  } else {
    skip('setConfig', '(--crud mode only)');
    skip('setRuntimeWrapper', '(--crud mode only)');
  }
}

async function testFormatsRead() {
  printSection('📄', 'FORMATS', '7 read endpoints');
  await test('getFormats', 'GET', '/resonanz/formats');
  await test('getFormats (domain)', 'GET', '/resonanz/formats?domain=technical');
  await test('getFormats (psychology)', 'GET', '/resonanz/formats?domain=psychology');
  
  if (FIRST_FORMAT) {
    await test('getFormat', 'GET', `/resonanz/formats/${FIRST_FORMAT}`);
    await test('getFormat (en)', 'GET', `/resonanz/formats/${FIRST_FORMAT}?language=en`);
  }
  
  await test('getFormat (sigma)', 'GET', '/resonanz/formats/sigma');
  await test('getFormat (human_deep)', 'GET', '/resonanz/formats/human_deep');
}

async function testFormatsCrud() {
  printSection('📄', 'FORMATS CRUD', '6 write endpoints');
  
  await test('createFormat (quick)', 'POST', '/resonanz/formats/quick', {
    name: TEST_FORMAT,
    description_de: 'API Test Format',
    field_names: ['alpha', 'beta', 'gamma']
  });
  
  await test('addField', 'POST', `/resonanz/formats/${TEST_FORMAT}/fields`, {
    name: 'neues_feld',
    type: 'rating',
    weight: 20
  });
  
  await test('updateField', 'PUT', `/resonanz/formats/${TEST_FORMAT}/fields/neues_feld`, {
    weight: 50,
    description: { de: 'Aktualisierte Beschreibung' }
  });
  
  await test('deleteField', 'DELETE', `/resonanz/formats/${TEST_FORMAT}/fields/neues_feld`);
  
  await test('updateFormat', 'PUT', `/resonanz/formats/${TEST_FORMAT}`, {
    domain: 'analysis',
    description: { de: 'Aktualisiertes Format' }
  });
}

async function testFormatsCleanup() {
  console.log(`    ${c.gray}┌─ 🗑️ Cleanup: Format${c.reset}`);
  await test('deleteFormat', 'DELETE', `/resonanz/formats/${TEST_FORMAT}`);
}

async function testStylesRead() {
  printSection('🎨', 'STYLES', '5 read endpoints');
  await test('getStyles', 'GET', '/resonanz/styles');
  await test('getStyle (wissenschaftlich)', 'GET', '/resonanz/styles/wissenschaftlich');
  await test('getStyle (zynisch)', 'GET', '/resonanz/styles/zynisch');
  await test('getStyle (poetisch)', 'GET', '/resonanz/styles/poetisch');
  await test('getStyle (berlin_slang)', 'GET', '/resonanz/styles/berlin_slang');
}

async function testStylesCrud() {
  printSection('🎨', 'STYLES CRUD', '5 write endpoints');
  
  await test('createStyle', 'POST', '/resonanz/styles', {
    name: TEST_STYLE,
    vibe: 'Test Vibe',
    word_alchemy: { test: 'prüfung' },
    forbidden_words: ['verboten']
  });
  
  await test('addAlchemy', 'POST', `/resonanz/styles/${TEST_STYLE}/alchemy`, {
    original: 'neu',
    replacement: 'brandneu'
  });
  
  await test('deleteAlchemy', 'DELETE', `/resonanz/styles/${TEST_STYLE}/alchemy/neu`);
  await test('addForbiddenWord', 'POST', `/resonanz/styles/${TEST_STYLE}/forbidden/schlecht`);
  await test('deleteForbiddenWord', 'DELETE', `/resonanz/styles/${TEST_STYLE}/forbidden/schlecht`);
  
  await test('updateStyle', 'PUT', `/resonanz/styles/${TEST_STYLE}`, {
    vibe: 'Updated Test Vibe',
    description: 'Updated Test Description'
  });
}

async function testStylesCleanup() {
  console.log(`    ${c.gray}┌─ 🗑️ Cleanup: Style${c.reset}`);
  await test('deleteStyle', 'DELETE', `/resonanz/styles/${TEST_STYLE}`);
}

async function testWrappersRead() {
  printSection('📦', 'WRAPPERS', '5 read endpoints');
  await test('getWrappers', 'GET', '/resonanz/wrappers');
  await test('getActiveWrapper', 'GET', '/resonanz/wrappers?active=true');
  await test('getWrappersFull', 'GET', '/resonanz/wrappers/full');
  
  if (FIRST_WRAPPER) {
    await test('getWrapper', 'GET', `/resonanz/wrapper/${FIRST_WRAPPER}`);
    await test('getWrapperMeta', 'GET', `/resonanz/wrapper/${FIRST_WRAPPER}/meta`);
  }
}

async function testWrappersCrud() {
  printSection('📦', 'WRAPPERS CRUD', '4 write endpoints');
  
  await test('createWrapper', 'POST', '/resonanz/wrapper', {
    name: TEST_WRAPPER,
    content: 'SYNTX FIELD TEST WRAPPER\n\nDu bist ein Test-System.'
  });
  
  await test('updateWrapper', 'PUT', `/resonanz/wrapper/${TEST_WRAPPER}`, {
    content: 'SYNTX FIELD TEST WRAPPER v2.0\n\nDu bist ein verbessertes Test-System.'
  });
  
  await test('updateWrapperMeta', 'PUT', `/resonanz/wrapper/${TEST_WRAPPER}/meta`, {
    description: 'Test Wrapper Meta',
    tags: ['test', 'syntx']
  });
  
  if (FIRST_FORMAT) {
    await test('bindFormat', 'PUT', `/resonanz/wrapper/${TEST_WRAPPER}/format?format_name=${FIRST_FORMAT}`);
  }
}

async function testWrappersCleanup() {
  console.log(`    ${c.gray}┌─ 🗑️ Cleanup: Wrapper${c.reset}`);
  await test('deleteWrapper', 'DELETE', `/resonanz/wrapper/${TEST_WRAPPER}`);
}

async function testStats() {
  printSection('📊', 'STATS & STREAMS', '5 endpoints');
  await test('getStats', 'GET', '/resonanz/stats');
  
  if (FIRST_WRAPPER) {
    await test('getWrapperStats', 'GET', `/resonanz/stats/wrapper/${FIRST_WRAPPER}`);
  }
  
  await test('getStream', 'GET', '/resonanz/strom?limit=5');
  await test('getStream (filtered)', 'GET', '/resonanz/strom?limit=3&stage=5_RESPONSE');
  await test('getTraining', 'GET', '/resonanz/training?limit=5');
}

async function testChat() {
  printSection('💬', 'CHAT', '7 endpoints');
  
  if (FAST_MODE) {
    skip('chat (simple)', '(--fast mode)');
    skip('chat (+ wrapper)', '(--fast mode)');
    skip('chat (+ format)', '(--fast mode)');
    skip('chat (+ style)', '(--fast mode)');
    skip('chat (+ debug)', '(--fast mode)');
    skip('chat (typed format)', '(--fast mode)');
    skip('chat (full combo)', '(--fast mode)');
    return;
  }
  
  await test('chat (simple)', 'POST', '/resonanz/chat', {
    prompt: 'Hallo',
    max_new_tokens: 30
  });
  
  if (FIRST_WRAPPER) {
    await test('chat (+ wrapper)', 'POST', '/resonanz/chat', {
      prompt: 'Was ist ein System?',
      mode: FIRST_WRAPPER,
      max_new_tokens: 100
    });
  }
  
  await test('chat (+ format)', 'POST', '/resonanz/chat', {
    prompt: 'Analysiere das Konzept Zeit',
    mode: FIRST_WRAPPER,
    format: 'sigma',
    max_new_tokens: 150
  });
  
  await test('chat (+ style)', 'POST', '/resonanz/chat', {
    prompt: 'Erkläre Nachhaltigkeit',
    style: 'zynisch',
    max_new_tokens: 80
  });
  
  await test('chat (+ debug)', 'POST', '/resonanz/chat', {
    prompt: 'Test',
    style: 'wissenschaftlich',
    debug: true,
    max_new_tokens: 50
  });
  
  await test('chat (typed format)', 'POST', '/resonanz/chat', {
    prompt: 'Analysiere KI-Trends',
    format: 'review',
    max_new_tokens: 150
  });
  
  await test('chat (full combo)', 'POST', '/resonanz/chat', {
    prompt: 'Deep Dive: Menschliches Verhalten',
    format: 'human_deep',
    style: 'poetisch',
    debug: true,
    max_new_tokens: 200
  });
}

async function testDiff() {
  printSection('🔀', 'DIFF (v3.3)', '2 endpoints');
  
  if (FAST_MODE) {
    skip('diff (2 wrappers)', '(--fast mode)');
    skip('diff (3 wrappers)', '(--fast mode)');
    return;
  }
  
  if (FIRST_WRAPPER && SECOND_WRAPPER) {
    await test('diff (2 wrappers)', 'POST', '/resonanz/chat/diff', {
      prompt: 'Was ist System?',
      wrappers: [FIRST_WRAPPER, SECOND_WRAPPER],
      max_new_tokens: 100
    });
  }
  
  if (FIRST_WRAPPER && SECOND_WRAPPER && THIRD_WRAPPER) {
    await test('diff (3 wrappers)', 'POST', '/resonanz/chat/diff', {
      prompt: 'Erkläre Liebe',
      wrappers: [FIRST_WRAPPER, SECOND_WRAPPER, THIRD_WRAPPER],
      format: 'sigma',
      max_new_tokens: 100
    });
  }
}

async function testSessions() {
  printSection('📼', 'SESSIONS (v3.3)', '4 endpoints');
  await test('getSessions', 'GET', '/resonanz/sessions?limit=5');
  await test('getSessions (paginated)', 'GET', '/resonanz/sessions?limit=10&offset=0');
  
  try {
    const res = await fetch(`${BASE_URL}/resonanz/sessions?limit=1`);
    const data = await res.json();
    const sessionId = data.sessions?.[0]?.request_id;
    
    if (sessionId) {
      await test('getSession', 'GET', `/resonanz/session/${sessionId}`);
      await test('getSessionReplay', 'GET', `/resonanz/session/${sessionId}/replay`);
    } else {
      skip('getSession', '(no sessions)');
      skip('getSessionReplay', '(no sessions)');
    }
  } catch {
    skip('getSession', '(error)');
    skip('getSessionReplay', '(error)');
  }
}

async function testAlchemy() {
  printSection('⚗️', 'ALCHEMY (v3.3)', '4 endpoints');
  
  await test('getAlchemyStyles', 'GET', '/resonanz/alchemy/styles');
  
  await test('alchemyPreview (wissenschaftlich)', 'POST', '/resonanz/alchemy/preview', {
    text: 'Das ist wirklich sehr wichtig und nachhaltig',
    style: 'wissenschaftlich'
  });
  
  await test('alchemyPreview (zynisch)', 'POST', '/resonanz/alchemy/preview', {
    text: 'Dieses innovative Projekt ist nachhaltig und wichtig für die Experten',
    style: 'zynisch'
  });
  
  await test('alchemyPreview (poetisch)', 'POST', '/resonanz/alchemy/preview', {
    text: 'Der Prozess im System zeigt die Daten',
    style: 'poetisch'
  });
}

async function testAdmin() {
  printSection('🔧', 'ADMIN', '1 endpoint');
  
  if (CRUD_MODE) {
    await test('fixOrphans', 'POST', '/resonanz/health/fix');
  } else {
    skip('fixOrphans', '(--crud mode only)');
  }
}

// ═══════════════════════════════════════════════════════════════════════════
// 🧠 SYSTEM CONSCIOUSNESS (Phase 3.5 - 9 new endpoints)
// ═══════════════════════════════════════════════════════════════════════════

async function testConsciousness() {
  printSection('🧠', 'SYSTEM CONSCIOUSNESS (Phase 3.5A)', '6 endpoints');
  
  await test('System Health', 'GET', '/profiles/analytics/health');
  
  if (FIRST_PROFILE) {
    await test('Profile Usage (7 days)', 'GET', `/profiles/analytics/usage/${FIRST_PROFILE}?days_back=7`);
    await test('Profile Usage (30 days)', 'GET', `/profiles/analytics/usage/${FIRST_PROFILE}?days_back=30`);
    
    await test('Pattern Pulse (7 days)', 'GET', `/profiles/analytics/patterns/${FIRST_PROFILE}?days_back=7`);
    await test('Pattern Pulse (30 days)', 'GET', `/profiles/analytics/patterns/${FIRST_PROFILE}?days_back=30`);
    
    await test('Pattern Details (verbose)', 'GET', `/profiles/analytics/patterns/${FIRST_PROFILE}?days_back=7&verbose=true`);
  } else {
    skip('Profile Usage (7 days)', '(no profiles)');
    skip('Profile Usage (30 days)', '(no profiles)');
    skip('Pattern Pulse (7 days)', '(no profiles)');
    skip('Pattern Pulse (30 days)', '(no profiles)');
    skip('Pattern Details (verbose)', '(no profiles)');
  }
}

async function testProfileStream() {
  printSection('🌊', 'PROFILE STREAM (Phase 3.5B)', '3 endpoints');
  
  await test('Profile List', 'GET', '/resonanz/scoring/profiles');
  
  await test('Profile Analytics (7 days)', 'GET', '/resonanz/scoring/analytics/profiles?days=7');
  
  if (FIRST_PROFILE) {
    await test('Component Breakdown', 'GET', `/resonanz/scoring/analytics/profiles/${FIRST_PROFILE}/components`);
  } else {
    skip('Component Breakdown', '(no profiles)');
  }
}

// ═══════════════════════════════════════════════════════════════════════════
// 🚀 MAIN
// ═══════════════════════════════════════════════════════════════════════════

async function main() {
  printBanner();
  await loadDynamicData();
  
  // READ Tests (always)
  await testHealth();
  await testConfig();
  
  // 🧠 NEW: System Consciousness Tests
  if (CONSCIOUSNESS_MODE || !FAST_MODE) {
    await testConsciousness();
    await testProfileStream();
  }
  
  await testFormatsRead();
  await testStylesRead();
  await testWrappersRead();
  await testStats();
  await testSessions();
  await testAlchemy();
  await testChat();
  await testDiff();
  
  // CRUD Tests (if --crud)
  if (CRUD_MODE) {
    console.log('');
    console.log(`${c.purple}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${c.reset}`);
    console.log(`${c.white}🔥 CRUD MODE - Creating/Modifying/Deleting test resources...${c.reset}`);
    console.log(`${c.purple}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${c.reset}`);
    
    await testWrappersCrud();
    await testFormatsCrud();
    await testStylesCrud();
    await testAdmin();
    
    if (CLEANUP_MODE) {
      console.log('');
      console.log(`${c.yellow}🧹 Cleanup mode - removing test resources...${c.reset}`);
      await testWrappersCleanup();
      await testFormatsCleanup();
      await testStylesCleanup();
    }
  }
  
  printSummary();
  
  const failed = results.filter(r => r.status === 'FAIL').length;
  process.exit(failed > 0 ? 1 : 0);
}

main().catch(console.error);
