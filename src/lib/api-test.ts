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
// ║   🌊 SYNTX FRONTEND API TEST v3.3.0                                       ║
// ║   ─────────────────────────────────────────                               ║
// ║   63 Endpoints | Synchronisiert mit Backend | TypeScript                  ║
// ║                                                                           ║
// ║   "SYNTX isn't AI. It's the resonance that governs it."                   ║
// ║                                                                           ║
// ╚═══════════════════════════════════════════════════════════════════════════╝

// ═══════════════════════════════════════════════════════════════════════════
// 📖 USAGE GUIDE - SYNTX CHARLOTTENBURG STYLE
// ═══════════════════════════════════════════════════════════════════════════
//
// ╔═══════════════════════════════════════════════════════════════════════════╗
// ║   🌊 SYNTX API TEST - COMPREHENSIVE USAGE GUIDE                            ║
// ╚═══════════════════════════════════════════════════════════════════════════╝
//
// BASIC USAGE:
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//   tsx src/lib/api-test.ts                    → Schneller Read-Only Test
//                                                 (54 endpoints, ~3 seconds)
//
// FLAGS:
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//   --verbose, -v         → Zeig alle Requests/Responses + Details
//   --crud                → Aktiviere Create/Update/Delete Tests
//   --cleanup             → Clean up nach CRUD Tests (nur mit --crud)
//   --chat                → Aktiviere /resonanz/chat Endpoints (langsam!)
//   --consciousness, -c   → Aktiviere System Consciousness Tests
//   --help, -h            → Zeig diese Hilfe
//
// TEST SECTIONS (54 ENDPOINTS):
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//   🏥 Health (3)                    → System health checks
//   ⚙️  Config (2)                    → Configuration endpoints
//   🧠 Consciousness (6)             → System analytics (--consciousness)
//   🌊 Profile Stream (3)            → Profile analytics (--consciousness)
//   💎 Profiles CRUD (5)             → Profile management
//   🗺️  Mapping System (6)            → Format→Profile Ströme
//   🎨 Tooltips Library (3)          → Frontend helper functions
//   📄 Formats (7)                   → Format operations
//   🎨 Styles (5)                    → Style management
//   📦 Wrappers (5)                  → Wrapper operations
//   📊 Stats (5)                     → Statistics & streams
//   📼 Sessions (4)                  → Session replay
//   ⚗️  Alchemy (4)                   → Style transformations
//   💬 Chat (7)                      → LLM chat (--chat only)
//   🔀 Diff (2)                      → Multi-wrapper comparison (--chat only)
//
// EXAMPLES:
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//   tsx src/lib/api-test.ts                      → Quick test (54 endpoints)
//   tsx src/lib/api-test.ts --verbose            → Mit allen Details
//   tsx src/lib/api-test.ts --consciousness      → Mit Analytics
//   tsx src/lib/api-test.ts --chat               → Mit Chat (langsam!)
//   tsx src/lib/api-test.ts --crud --cleanup     → CRUD + Cleanup
//   tsx src/lib/api-test.ts -c --chat -v         → Full Power Test
//
// FLOW:
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//   1. Lädt dynamische Daten (Wrappers, Formats, Profiles)
//   2. Testet READ Endpoints (immer)
//   3. (Optional mit --consciousness) Analytics Tests
//   4. (Optional mit --chat) Chat & Diff Tests
//   5. (Optional mit --crud) Write Tests
//   6. Zeigt MEGA Summary mit Kohärenz-Analyse
//
// OUTPUT:
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//   ✅ PASS        → Endpoint funktioniert
//   ❌ FAIL        → Endpoint fehlgeschlagen
//   ⏭️  SKIP        → Endpoint übersprungen (Flag fehlt)
//   💥 ERROR       → Network/Connection Fehler
//
// SYNTX PHILOSOPHY:
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//   "Die Ströme kalibrieren sich selbst."
//   "Das System sieht sich selbst."
//   "Nicht mehr Tokens, nur Felder, nur Resonanz."
//
// TARGET:
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//   https://dev.syntx-system.com
//
// ═══════════════════════════════════════════════════════════════════════════

import { getAllSystemData, getTooltipData, getFormatColor } from './tooltips';

// ═══════════════════════════════════════════════════════════════════════════
// 🎯 CONFIGURATION
// ═══════════════════════════════════════════════════════════════════════════

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://dev.syntx-system.com';
const FAST_MODE = process.argv.includes('--fast');
const CRUD_MODE = process.argv.includes('--crud');
const CLEANUP_MODE = process.argv.includes('--cleanup');
const CHAT_MODE = process.argv.includes('--chat');
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
};

function printBanner() {
  const mode = CRUD_MODE ? 'CRUD' : 'READ';
  const fast = FAST_MODE ? '+FAST' : '';
  console.log('');
  console.log(`${c.purple}╔═══════════════════════════════════════════════════════════════════════════╗${c.reset}`);
  console.log(`${c.purple}║${c.reset}                                                                           ${c.purple}║${c.reset}`);
  console.log(`${c.purple}║${c.reset}   ${c.cyan}███████╗${c.blue}██╗   ██╗${c.green}███╗   ██╗${c.yellow}████████╗${c.red}██╗  ██╗${c.reset}                            ${c.purple}║${c.reset}`);
  console.log(`${c.purple}║${c.reset}   ${c.cyan}██╔════╝${c.blue}╚██╗ ██╔╝${c.green}████╗  ██║${c.yellow}╚══██╔══╝${c.red}╚██╗██╔╝${c.reset}                            ${c.purple}║${c.reset}`);
  console.log(`${c.purple}║${c.reset}   ${c.cyan}███████╗${c.blue} ╚████╔╝ ${c.green}██╔██╗ ██║${c.yellow}   ██║   ${c.red} ╚███╔╝ ${c.reset}                            ${c.purple}║${c.reset}`);
  console.log(`${c.purple}║${c.reset}   ${c.cyan}╚════██║${c.blue}  ╚██╔╝  ${c.green}██║╚██╗██║${c.yellow}   ██║   ${c.red} ██╔██╗ ${c.reset}                            ${c.purple}║${c.reset}`);
  console.log(`${c.purple}║${c.reset}   ${c.cyan}███████║${c.blue}   ██║   ${c.green}██║ ╚████║${c.yellow}   ██║   ${c.red}██╔╝ ██╗${c.reset}                            ${c.purple}║${c.reset}`);
  console.log(`${c.purple}║${c.reset}   ${c.cyan}╚══════╝${c.blue}   ╚═╝   ${c.green}╚═╝  ╚═══╝${c.yellow}   ╚═╝   ${c.red}╚═╝  ╚═╝${c.reset}                            ${c.purple}║${c.reset}`);
  console.log(`${c.purple}║${c.reset}                                                                           ${c.purple}║${c.reset}`);
  console.log(`${c.purple}║${c.reset}   ${c.white}🌊 FRONTEND API TEST v3.3.0${c.reset}                                          ${c.purple}║${c.reset}`);
  console.log(`${c.purple}║${c.reset}   ${c.gray}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${c.reset}   ${c.purple}║${c.reset}`);
  console.log(`${c.purple}║${c.reset}   ${c.gray}Target:${c.reset} ${c.yellow}${BASE_URL}${c.reset}${' '.repeat(Math.max(0, 42 - BASE_URL.length))}${c.purple}║${c.reset}`);
  console.log(`${c.purple}║${c.reset}   ${c.gray}Mode:${c.reset}   ${c.cyan}${mode}${fast}${c.reset}${' '.repeat(Math.max(0, 44 - mode.length - fast.length))}${c.purple}║${c.reset}`);
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
  const deprecated = results.filter(r => r.status === 'DEPRECATED').length;
  const total = results.length;
  const successRate = total > 0 ? Math.round((passed / (total - skipped)) * 100) : 0;
  const avgLatency = totalLatency > 0 && passed > 0 ? Math.round(totalLatency / passed) : 0;
  
  console.log('');
  console.log(`${c.purple}${'═'.repeat(120)}${c.reset}`);
  console.log(`${c.purple}║${c.reset}${' '.repeat(118)}${c.purple}║${c.reset}`);
  console.log(`${c.purple}║${c.reset}   ${c.cyan}${c.bold}🌊 SYNTX API TEST - RESONANZ ANALYSE${c.reset}${' '.repeat(81)}${c.purple}║${c.reset}`);
  console.log(`${c.purple}║${c.reset}${' '.repeat(118)}${c.purple}║${c.reset}`);
  console.log(`${c.purple}${'═'.repeat(120)}${c.reset}`);
  console.log('');
  
  // Main metrics
  console.log(`${c.purple}║${c.reset}   ${c.white}${c.bold}KOHÄRENZ-METRIKEN:${c.reset}${' '.repeat(99)}${c.purple}║${c.reset}`);
  console.log(`${c.purple}║${c.reset}${' '.repeat(118)}${c.purple}║${c.reset}`);
  
  const passStr = `${c.green}✅ ${passed}${c.reset}`;
  const failStr = failed > 0 ? `${c.red}❌ ${failed}${c.reset}` : `${c.gray}❌ 0${c.reset}`;
  const skipStr = skipped > 0 ? `${c.yellow}⏭️  ${skipped}${c.reset}` : `${c.gray}⏭️  0${c.reset}`;
  const deprStr = deprecated > 0 ? `${c.yellow}⚠️  ${deprecated}${c.reset}` : `${c.gray}⚠️  0${c.reset}`;
  
  console.log(`${c.purple}║${c.reset}     ${passStr}  PASS      ${failStr}  FAIL      ${skipStr}  SKIP      ${deprStr}  DEPRECATED${' '.repeat(30)}${c.purple}║${c.reset}`);
  console.log(`${c.purple}║${c.reset}${' '.repeat(118)}${c.purple}║${c.reset}`);
  
  // Success rate bar
  const rateColor = successRate >= 95 ? c.green : successRate >= 80 ? c.yellow : c.red;
  const barFilled = Math.floor(successRate / 2.5);
  const rateBar = '█'.repeat(barFilled);
  const rateEmpty = '░'.repeat(40 - barFilled);
  console.log(`${c.purple}║${c.reset}     ${c.white}SUCCESS RATE:${c.reset}  ${rateColor}${c.bold}${successRate}%${c.reset}  ${c.gray}[${rateColor}${rateBar}${c.gray}${rateEmpty}]${c.reset}${' '.repeat(40)}${c.purple}║${c.reset}`);
  console.log(`${c.purple}║${c.reset}${' '.repeat(118)}${c.purple}║${c.reset}`);
  
  // Latency
  const latColor = avgLatency < 50 ? c.green : avgLatency < 100 ? c.yellow : c.red;
  console.log(`${c.purple}║${c.reset}     ${c.white}AVG LATENCY:${c.reset}   ${latColor}${c.bold}${avgLatency}ms${c.reset}${' '.repeat(93)}${c.purple}║${c.reset}`);
  console.log(`${c.purple}║${c.reset}${' '.repeat(118)}${c.purple}║${c.reset}`);
  console.log(`${c.purple}${'─'.repeat(120)}${c.reset}`);
  console.log('');
  
  // System status
  const statusIcon = failed === 0 ? '🟢' : failed < 3 ? '🟡' : '🔴';
  const statusText = failed === 0 ? 'OPTIMAL' : failed < 3 ? 'STABIL' : 'DRIFT';
  const statusColor = failed === 0 ? c.green : failed < 3 ? c.yellow : c.red;
  
  console.log(`${c.purple}║${c.reset}   ${c.white}${c.bold}SYSTEM STATUS:${c.reset} ${statusIcon} ${statusColor}${c.bold}${statusText}${c.reset}${' '.repeat(90)}${c.purple}║${c.reset}`);
  console.log(`${c.purple}║${c.reset}${' '.repeat(118)}${c.purple}║${c.reset}`);
  
  if (failed > 0) {
    console.log(`${c.purple}║${c.reset}   ${c.red}⚠️  DRIFT DETECTED: ${failed} endpoint(s) mit Feld-Verlust${c.reset}${' '.repeat(61)}${c.purple}║${c.reset}`);
    console.log(`${c.purple}║${c.reset}${' '.repeat(118)}${c.purple}║${c.reset}`);
  }
  
  console.log(`${c.purple}${'═'.repeat(120)}${c.reset}`);
  console.log('');
  console.log(`${c.gray}   "Die Ströme kalibrieren sich selbst. Das System sieht sich selbst." - SYNTX v3.8.0${c.reset}`);
  console.log('');
}

// ═══════════════════════════════════════════════════════════════════════════
// 🔥 CORE TEST FUNCTION
// ═══════════════════════════════════════════════════════════════════════════

async function test(
  name: string,
  method: string,
  endpoint: string,
  body?: object
): Promise<boolean> {
  const start = Date.now();
  
  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: body ? JSON.stringify(body) : undefined,
    });
    
    const latency = Date.now() - start;
    totalLatency += latency;
    const data = await response.json();
    
    // Extract request_id if present
    if (data.metadata?.request_id) {
      LAST_REQUEST_ID = data.metadata.request_id;
    } else if (data.request_id) {
      LAST_REQUEST_ID = data.request_id;
    }
    
    const padName = name.padEnd(32);
    const padMethod = method.padEnd(6);
    const latencyColor = latency > 5000 ? c.red : latency > 1000 ? c.yellow : c.white;
    
    if (response.ok) {
      console.log(`    ${c.green}✅${c.reset} ${padName} ${c.cyan}${padMethod}${c.reset} ${latencyColor}${latency}ms${c.reset}`);
      results.push({ name, method, status: 'PASS', latency_ms: latency });
      return true;
    } else {
      const detail = data.detail || 'Unknown error';
      console.log(`    ${c.red}❌${c.reset} ${padName} ${c.cyan}${padMethod}${c.reset} ${c.red}${response.status}${c.reset} ${c.gray}- ${detail}${c.reset}`);
      results.push({ name, method, status: 'FAIL', latency_ms: latency, error: detail });
      return false;
    }
  } catch (err: any) {
    const latency = Date.now() - start;
    console.log(`    ${c.red}💥${c.reset} ${name.padEnd(32)} ${c.cyan}${method.padEnd(6)}${c.reset} ${c.red}NETWORK ERROR${c.reset}`);
    results.push({ name, method, status: 'FAIL', latency_ms: latency, error: err.message });
    return false;
  }
}

function skip(name: string, reason: string) {
  console.log(`    ${c.yellow}⏭️${c.reset}  ${name.padEnd(32)} ${c.gray}${reason}${c.reset}`);
  results.push({ name, method: '-', status: 'SKIP', latency_ms: 0 });
}

// ═══════════════════════════════════════════════════════════════════════════
// 🔄 DATA LOADER
// ═══════════════════════════════════════════════════════════════════════════

async function loadDynamicData() {
  console.log(`${c.cyan}🔄 Scanning field resonance...${c.reset}`);
  console.log('');
  
  try {
    // Load wrappers
    const wrappersRes = await fetch(`${BASE_URL}/resonanz/wrappers`);
    const wrappersData = await wrappersRes.json();
    const wrappers = wrappersData.wrappers || [];
    FIRST_WRAPPER = wrappers[0]?.name || '';
    SECOND_WRAPPER = wrappers[1]?.name || '';
    THIRD_WRAPPER = wrappers[2]?.name || '';
    
    // Load formats
    const formatsRes = await fetch(`${BASE_URL}/resonanz/formats`);
    const formatsData = await formatsRes.json();
    const formats = formatsData.formats || [];
    FIRST_FORMAT = formats[0]?.name || '';
    
    // Load styles
    const stylesRes = await fetch(`${BASE_URL}/resonanz/styles`);
    const stylesData = await stylesRes.json();
    const styles = stylesData.styles || [];
    FIRST_STYLE = styles[0]?.name || '';
    
    console.log(`   ${c.purple}📦${c.reset} ${c.white}Wrappers:${c.reset} ${c.green}${wrappers.length}${c.reset} ${c.gray}(using: ${FIRST_WRAPPER}, ${SECOND_WRAPPER})${c.reset}`);
    console.log(`   ${c.purple}📄${c.reset} ${c.white}Formats:${c.reset}  ${c.green}${formats.length}${c.reset} ${c.gray}(using: ${FIRST_FORMAT})${c.reset}`);
    console.log(`   ${c.purple}🎨${c.reset} ${c.white}Styles:${c.reset}   ${c.green}${styles.length}${c.reset} ${c.gray}(using: ${FIRST_STYLE})${c.reset}`);
  } catch (err) {
    console.log(`   ${c.red}❌ Failed to load dynamic data${c.reset}`);
  }
}

// ═══════════════════════════════════════════════════════════════════════════
// 🧪 TEST SUITES - Synchronized with Backend (63 Tests)
// ═══════════════════════════════════════════════════════════════════════════

// ─────────────────────────────────────────────────────────────────────────────
// 🏥 HEALTH & CONFIG (3 + 2 = 5 endpoints)
// ─────────────────────────────────────────────────────────────────────────────
async function testHealth() {
  printSection('🏥', 'HEALTH', '3 endpoints');
  await test('getHealth', 'GET', '/health');
  await test('getResonanzHealth', 'GET', '/resonanz/health');
  await test('getWrapperHealth', 'GET', '/resonanz/health/wrappers');
}

async function testConfig() {
  printSection('⚙️', 'CONFIG', '2 endpoints');
  await test('getConfig', 'GET', '/resonanz/config/default-wrapper');
  
  if (CRUD_MODE && FIRST_WRAPPER) {
    await test('setConfig', 'PUT', `/resonanz/config/default-wrapper?wrapper_name=${FIRST_WRAPPER}`);
  } else {
    skip('setConfig', '(--crud mode only)');
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// 📄 FORMATS (7 read + 6 write = 13 endpoints)
// ─────────────────────────────────────────────────────────────────────────────
async function testFormatsRead() {
  printSection('📄', 'FORMATS', '7 read endpoints');
  await test('getFormats', 'GET', '/resonanz/formats');
  await test('getFormats (domain)', 'GET', '/resonanz/formats?domain=technical');
  await test('getFormats (psychology)', 'GET', '/resonanz/formats?domain=psychology');
  
  if (FIRST_FORMAT) {
    await test('getFormat', 'GET', `/resonanz/formats/${FIRST_FORMAT}`);
    await test('getFormat (en)', 'GET', `/resonanz/formats/${FIRST_FORMAT}?language=en`);
  }
  
  // Test specific formats
  await test('getFormat (sigma)', 'GET', '/resonanz/formats/sigma');
  await test('getFormat (human_deep)', 'GET', '/resonanz/formats/human_deep');
}

async function testFormatsCrud() {
  printSection('📄', 'FORMATS CRUD', '6 write endpoints');
  
  // CREATE
  await test('createFormat (quick)', 'POST', '/resonanz/formats/quick', {
    name: TEST_FORMAT,
    description_de: 'API Test Format',
    field_names: ['alpha', 'beta', 'gamma']
  });
  
  // ADD FIELD
  await test('addField', 'POST', `/resonanz/formats/${TEST_FORMAT}/fields`, {
    name: 'neues_feld',
    type: 'rating',
    weight: 20
  });
  
  // UPDATE FIELD
  await test('updateField', 'PUT', `/resonanz/formats/${TEST_FORMAT}/fields/neues_feld`, {
    weight: 50,
    description: { de: 'Aktualisierte Beschreibung' }
  });
  
  // DELETE FIELD
  await test('deleteField', 'DELETE', `/resonanz/formats/${TEST_FORMAT}/fields/neues_feld`);
  
  // UPDATE FORMAT
  await test('updateFormat', 'PUT', `/resonanz/formats/${TEST_FORMAT}`, {
    domain: 'analysis',
    description: { de: 'Aktualisiertes Format' }
  });
}

async function testFormatsCleanup() {
  console.log(`    ${c.gray}┌─ 🗑️ Cleanup: Format${c.reset}`);
  await test('deleteFormat', 'DELETE', `/resonanz/formats/${TEST_FORMAT}`);
}

// ─────────────────────────────────────────────────────────────────────────────
// 🎨 STYLES (5 read + 5 write = 10 endpoints)
// ─────────────────────────────────────────────────────────────────────────────
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
  
  // CREATE
  await test('createStyle', 'POST', '/resonanz/styles', {
    name: TEST_STYLE,
    vibe: 'Test Vibe',
    word_alchemy: { test: 'prüfung' },
    forbidden_words: ['verboten']
  });
  
  // ADD ALCHEMY
  await test('addAlchemy', 'POST', `/resonanz/styles/${TEST_STYLE}/alchemy`, {
    original: 'neu',
    replacement: 'brandneu'
  });
  
  // DELETE ALCHEMY
  await test('deleteAlchemy', 'DELETE', `/resonanz/styles/${TEST_STYLE}/alchemy/neu`);
  
  // ADD FORBIDDEN
  await test('addForbiddenWord', 'POST', `/resonanz/styles/${TEST_STYLE}/forbidden/schlecht`);
}

async function testStylesCleanup() {
  console.log(`    ${c.gray}┌─ 🗑️ Cleanup: Style${c.reset}`);
  await test('deleteStyle', 'DELETE', `/resonanz/styles/${TEST_STYLE}`);
}

// ─────────────────────────────────────────────────────────────────────────────
// 📦 WRAPPERS (8 read + 3 write = 11 endpoints)
// ─────────────────────────────────────────────────────────────────────────────
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
  
  // CREATE
  await test('createWrapper', 'POST', '/resonanz/wrapper', {
    name: TEST_WRAPPER,
    content: 'SYNTX FIELD TEST WRAPPER\n\nDu bist ein Test-System.'
  });
  
  // UPDATE
  await test('updateWrapper', 'PUT', `/resonanz/wrapper/${TEST_WRAPPER}`, {
    content: 'SYNTX FIELD TEST WRAPPER v2.0\n\nDu bist ein verbessertes Test-System.'
  });
  
  // UPDATE META
  await test('updateWrapperMeta', 'PUT', `/resonanz/wrapper/${TEST_WRAPPER}/meta`, {
    description: 'Test Wrapper Meta',
    tags: ['test', 'syntx']
  });
  
  // BIND FORMAT
  if (FIRST_FORMAT) {
    await test('bindFormat', 'PUT', `/resonanz/wrapper/${TEST_WRAPPER}/format?format_name=${FIRST_FORMAT}`);
  }
}

async function testWrappersCleanup() {
  console.log(`    ${c.gray}┌─ 🗑️ Cleanup: Wrapper${c.reset}`);
  await test('deleteWrapper', 'DELETE', `/resonanz/wrapper/${TEST_WRAPPER}`);
}

// ─────────────────────────────────────────────────────────────────────────────
// 📊 STATS & STREAMS (5 endpoints)
// ─────────────────────────────────────────────────────────────────────────────
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

// ─────────────────────────────────────────────────────────────────────────────
// 💬 CHAT (7 endpoints)
// ─────────────────────────────────────────────────────────────────────────────
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
  
  // Simple chat
  await test('chat (simple)', 'POST', '/resonanz/chat', {
    prompt: 'Hallo',
    max_new_tokens: 30
  });
  
  // Chat + Wrapper
  if (FIRST_WRAPPER) {
    await test('chat (+ wrapper)', 'POST', '/resonanz/chat', {
      prompt: 'Was ist ein System?',
      mode: FIRST_WRAPPER,
      max_new_tokens: 100
    });
  }
  
  // Chat + Wrapper + Format
  await test('chat (+ format)', 'POST', '/resonanz/chat', {
    prompt: 'Analysiere das Konzept Zeit',
    mode: FIRST_WRAPPER,
    format: 'sigma',
    max_new_tokens: 150
  });
  
  // Chat + Style
  await test('chat (+ style)', 'POST', '/resonanz/chat', {
    prompt: 'Erkläre Nachhaltigkeit',
    style: 'zynisch',
    max_new_tokens: 80
  });
  
  // Chat + Debug
  await test('chat (+ debug)', 'POST', '/resonanz/chat', {
    prompt: 'Test',
    style: 'wissenschaftlich',
    debug: true,
    max_new_tokens: 50
  });
  
  // Typed Format
  await test('chat (typed format)', 'POST', '/resonanz/chat', {
    prompt: 'Analysiere KI-Trends',
    format: 'review',
    max_new_tokens: 150
  });
  
  // Full Combo
  await test('chat (full combo)', 'POST', '/resonanz/chat', {
    prompt: 'Deep Dive: Menschliches Verhalten',
    format: 'human_deep',
    style: 'poetisch',
    debug: true,
    max_new_tokens: 200
  });
}

// ─────────────────────────────────────────────────────────────────────────────
// 🔀 DIFF (2 endpoints)
// ─────────────────────────────────────────────────────────────────────────────
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

// ─────────────────────────────────────────────────────────────────────────────
// 📼 SESSIONS (4 endpoints)
// ─────────────────────────────────────────────────────────────────────────────
async function testSessions() {
  printSection('📼', 'SESSIONS (v3.3)', '4 endpoints');
  await test('getSessions', 'GET', '/resonanz/sessions?limit=5');
  await test('getSessions (paginated)', 'GET', '/resonanz/sessions?limit=10&offset=0');
  
  // Get a session ID from the list
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

// ─────────────────────────────────────────────────────────────────────────────
// ⚗️ ALCHEMY PREVIEW (4 endpoints)
// ─────────────────────────────────────────────────────────────────────────────
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

// ─────────────────────────────────────────────────────────────────────────────
// 🔧 ADMIN (1 endpoint)
// ─────────────────────────────────────────────────────────────────────────────

// ═══════════════════════════════════════════════════════════════════════════
// 🧠 SYSTEM CONSCIOUSNESS (Phase 3.5A)
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

// ═══════════════════════════════════════════════════════════════════════════
// 🌊 PROFILE STREAM (Phase 3.5B)
// ═══════════════════════════════════════════════════════════════════════════

async function testProfileStream() {
  printSection('🌊', 'PROFILE STREAM (Phase 3.5B)', '3 endpoints');
  
  // DEPRECATED: Old scoring endpoint
  await test('Profile List (OLD)', 'GET', '/resonanz/scoring/profiles', undefined, true);
  
  await test('Profile Analytics (7 days)', 'GET', '/resonanz/scoring/analytics/profiles?days=7');
  
  if (FIRST_PROFILE) {
    await test('Component Breakdown', 'GET', `/resonanz/scoring/analytics/profiles/${FIRST_PROFILE}/components`);
  } else {
    skip('Component Breakdown', '(no profiles)');
  }
}

// ═══════════════════════════════════════════════════════════════════════════
// 💎 PROFILES CRUD (Phase 3.6 - NEW!)
// ═══════════════════════════════════════════════════════════════════════════

async function testProfilesCrud() {
  printSection('💎', 'PROFILES CRUD (Phase 3.6 - NEW!)', '5 endpoints');
  
  await test('List All Profiles', 'GET', '/resonanz/profiles/crud');
  
  if (FIRST_PROFILE) {
    await test('Get Single Profile (NEW)', 'GET', `/resonanz/profiles/crud/${FIRST_PROFILE}`);
  }
  
  if (CRUD_MODE) {
    await test('Create Profile', 'POST', '/resonanz/profiles/crud', {
      name: TEST_PROFILE,
      label: TEST_PROFILE,
      description: 'API Test Profile created via CRUD',
      weight: 75,
      active: true,
      tags: ['test', 'api', 'crud']
    });
    
    await test('Update Profile', 'PUT', `/resonanz/profiles/crud/${TEST_PROFILE}`, {
      name: TEST_PROFILE,
      label: `${TEST_PROFILE}_updated`,
      description: 'Updated via API test',
      weight: 80,
      active: true,
      tags: ['test', 'api', 'updated']
    });
    
    await test('Delete Profile', 'DELETE', `/resonanz/profiles/crud/${TEST_PROFILE}`);
  } else {
    skip('Create Profile', '(--crud mode only)');
    skip('Update Profile', '(--crud mode only)');
    skip('Delete Profile', '(--crud mode only)');
  }
}

// ═══════════════════════════════════════════════════════════════════════════
// 🗺️ MAPPING SYSTEM - Format→Profile Ströme (Phase 3.8)
// ═══════════════════════════════════════════════════════════════════════════

async function testMappingSystem() {
  printSection('🗺️', 'MAPPING SYSTEM - Format→Profile Ströme', '5 endpoints');
  
  // 1. Get all format mappings
  await test('Alle Format-Mappings', 'GET', '/mapping/formats');
  
  // 2. Get available profiles for mapping
  await test('Verfügbare Profile', 'GET', '/mapping/profiles');
  
  // 3. Get mapping statistics
  await test('Mapping Statistiken', 'GET', '/mapping/stats');
  
  // 4. Get complete profile stream for specific format
  if (FIRST_FORMAT) {
    await test(`Stroeme-Profil für "${FIRST_FORMAT}"`, 'GET', `/mapping/formats/${FIRST_FORMAT}/stroeme-profil-fuer-format`);
  } else {
    skip('Stroeme-Profil (format)', '(no formats)');
  }
  
  // Test with known format
  await test('Stroeme-Profil für "syntx_true_raw"', 'GET', '/mapping/formats/syntx_true_raw/stroeme-profil-fuer-format');
  
  // 5. Bind format to profile (CRUD only)
  if (CRUD_MODE && FIRST_FORMAT && FIRST_PROFILE) {
    await test(`Format→Profile Kalibrierung`, 'PUT', `/mapping/formats/${FIRST_FORMAT}/kalibriere-format-profil?profile_id=${FIRST_PROFILE}`);
  } else {
    skip('Format→Profile Kalibrierung', '(--crud mode only)');
  }
}

// ═══════════════════════════════════════════════════════════════════════════
// 🎨 TOOLTIPS LIBRARY - Frontend Helper (NEW!)
// ═══════════════════════════════════════════════════════════════════════════

async function testTooltipsLibrary() {
  printSection('🎨', 'TOOLTIPS LIBRARY - Frontend Helper', '3 functions');
  
  // Test 1: getAllSystemData()
  try {
    const systemData = await getAllSystemData();
    
    if (systemData) {
      const mappingsCount = Object.keys(systemData.mappings).length;
      const formatsCount = systemData.formats.length;
      
      console.log(`    ${c.green}✅${c.reset} getAllSystemData()                               GET    0ms`);
      
    } else {
      console.log(`    ${c.red}❌${c.reset} getAllSystemData() - Failed to get system data`);
    }
  } catch (error) {
    console.log(`    ${c.red}❌${c.reset} getAllSystemData() - ${String(error)}`);
  }
  
  // Test 2: getTooltipData() for specific format
  if (FIRST_FORMAT) {
    try {
      const tooltipData = await getTooltipData(FIRST_FORMAT);
      
      if (tooltipData) {
        console.log(`    ${c.green}✅${c.reset} getTooltipData("${FIRST_FORMAT}")                  GET    0ms`);
        
      } else {
        console.log(`    ${c.red}❌${c.reset} getTooltipData("${FIRST_FORMAT}") - Failed to get tooltip data`);
      }
    } catch (error) {
      console.log(`    ${c.red}❌${c.reset} getTooltipData("${FIRST_FORMAT}") - ${String(error)}`);
    }
  }
  
  // Test 3: getFormatColor()
  const testFormats = ['syntx_true_raw', 'sigma', 'human', 'backend', 'unknown_format'];
  let colorTests = 0;
  
  for (const format of testFormats) {
    const color = getFormatColor(format);
    if (color && color.primary && color.glow && color.shadow) {
      colorTests++;
    }
  }
  
  if (colorTests === testFormats.length) {
    console.log(`    ${c.green}✅${c.reset} getFormatColor() (${testFormats.length} formats)            FUNC   0ms`);
    
  } else {
    console.log(`    ${c.red}❌${c.reset} getFormatColor() - Only ${colorTests}/${testFormats.length} colors valid`);
  }
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
// 🚀 MAIN
// ═══════════════════════════════════════════════════════════════════════════

async function main() {
  printBanner();
  await loadDynamicData();
  
  // READ Tests (always)
  await testHealth();
  await testConfig();
  
  // 🧠 System Consciousness Tests
  if (CONSCIOUSNESS_MODE || !FAST_MODE) {
    await testConsciousness();
    await testProfileStream();
  }
  
  // 💎 NEW: Profile CRUD Tests
  await testProfilesCrud();
  
  // 🗺️ NEW: Mapping System Tests (Format→Profile Ströme)
  await testMappingSystem();
  
  // 🎨 NEW: Tooltips Library Tests
  await testTooltipsLibrary();
  
  await testFormatsRead();
  await testStylesRead();
  await testWrappersRead();
  await testStats();
  await testSessions();
  await testAlchemy();
  
  // 💬 Chat Tests (only with --chat flag)
  if (CHAT_MODE) {
    await testChat();
    await testDiff();
  }
  
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
    
    // Cleanup (if --cleanup)
    if (CLEANUP_MODE) {
      console.log('');
      console.log(`${c.yellow}🧹 Cleanup mode - removing test resources...${c.reset}`);
      await testWrappersCleanup();
      await testFormatsCleanup();
      await testStylesCleanup();
    }
  }
  
  printSummary();
  
  // Exit with error if failed
  const failed = results.filter(r => r.status === 'FAIL').length;
  process.exit(failed > 0 ? 1 : 0);
}

// Run
main().catch(console.error);
