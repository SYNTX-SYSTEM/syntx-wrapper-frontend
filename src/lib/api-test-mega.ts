#!/usr/bin/env npx ts-node
// ╔═══════════════════════════════════════════════════════════════════════════╗
// ║   🌊 SYNTX API TEST v10.0 - MEGA VERBOSE ULTIMATE EDITION                 ║
// ║   UNERMESSLICHE AUSGABE | ALLE PAYLOADS | PERVERSE ZUSAMMENFASSUNG       ║
// ╚═══════════════════════════════════════════════════════════════════════════╝

import api from './api';
import * as fs from 'fs';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://dev.syntx-system.com';
const TEST_ID = Date.now();
const TEST_FORMAT = `crud_test_format`;
const TEST_STYLE = `crud_test_style`;
const TEST_WRAPPER = `test_${TEST_ID}`;

interface TestRecord {
  num: number;
  endpoint: string;
  method: string;
  description: string;
  status: 'PASS' | 'FAIL';
  latency_ms: number;
  request_payload?: any;
  response_data?: any;
  error?: string;
}

const records: TestRecord[] = [];
const startTime = Date.now();

const c = {
  r: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  cyan: '\x1b[36m',
  purple: '\x1b[35m',
  white: '\x1b[37m',
  gray: '\x1b[90m',
  bold: '\x1b[1m',
  dim: '\x1b[2m',
};

function divider(char = '━', len = 120) {
  console.log(`${c.gray}${char.repeat(len)}${c.r}`);
}

function box(text: string) {
  const len = 118;
  console.log(`${c.purple}╔${'═'.repeat(len)}╗${c.r}`);
  console.log(`${c.purple}║${c.r} ${c.white}${c.bold}${text}${c.r}${' '.repeat(len - text.length - 1)}${c.purple}║${c.r}`);
  console.log(`${c.purple}╚${'═'.repeat(len)}╝${c.r}`);
}

async function test(num: number, method: string, endpoint: string, description: string, fn: () => Promise<any>, payload?: any) {
  console.log('');
  divider();
  console.log(`${c.bold}${c.cyan}🔮 TEST #${num.toString().padStart(2, '0')}${c.r} ${c.gray}│${c.r} ${c.yellow}${method.padEnd(6)}${c.r} ${c.white}${endpoint}${c.r}`);
  console.log(`   ${c.dim}${description}${c.r}`);
  
  if (payload) {
    console.log('');
    console.log(`${c.purple}${c.bold}📤 REQUEST PAYLOAD:${c.r}`);
    const payloadStr = JSON.stringify(payload, null, 2);
    payloadStr.split('\n').forEach(line => {
      console.log(`   ${c.dim}${line}${c.r}`);
    });
  }
  
  console.log('');
  process.stdout.write(`   ${c.gray}⏳ Executing...${c.r}`);
  
  const start = Date.now();
  
  try {
    const result = await fn();
    const latency = Date.now() - start;
    
    console.log(`\r   ${c.green}${c.bold}✓ PASS${c.r} ${c.gray}(${latency}ms)${c.r}` + ' '.repeat(30));
    
    console.log('');
    console.log(`${c.green}${c.bold}📥 RESPONSE:${c.r}`);
    const responseStr = JSON.stringify(result, null, 2);
    responseStr.split('\n').forEach(line => {
      console.log(`   ${c.dim}${line}${c.r}`);
    });
    
    records.push({
      num,
      endpoint,
      method,
      description,
      status: 'PASS',
      latency_ms: latency,
      request_payload: payload,
      response_data: result
    });
    
    return result;
  } catch (error: any) {
    const latency = Date.now() - start;
    console.log(`\r   ${c.red}${c.bold}✗ FAIL${c.r} ${c.gray}(${latency}ms)${c.r}` + ' '.repeat(30));
    console.log('');
    console.log(`${c.red}${c.bold}❌ ERROR:${c.r}`);
    console.log(`   ${c.red}${error.message}${c.r}`);
    
    records.push({
      num,
      endpoint,
      method,
      description,
      status: 'FAIL',
      latency_ms: latency,
      request_payload: payload,
      error: error.message
    });
    
    return null;
  }
}

async function main() {
  box('🌊 SYNTX API TEST v10.0 - MEGA VERBOSE ULTIMATE EDITION');
  console.log('');
  console.log(`${c.cyan}${c.bold}   TARGET:${c.r} ${c.yellow}${BASE_URL}${c.r}`);
  console.log(`${c.cyan}${c.bold}   STARTED:${c.r} ${c.white}${new Date().toISOString()}${c.r}`);
  console.log(`${c.cyan}${c.bold}   MODE:${c.r} ${c.purple}FULL VERBOSE | ALL PAYLOADS | ALL RESPONSES${c.r}`);
  console.log('');

  // ═══════════════════════════════════════════════════════════════════════════
  // ALLE 53 TESTS
  // ═══════════════════════════════════════════════════════════════════════════
  
  await test(1, 'GET', '/health', 'Root health check - all system modules', () => api.getHealth());
  await test(2, 'GET', '/resonanz/health', 'Resonanz health - format loader status', () => api.getResonanzHealth());
  await test(3, 'GET', '/resonanz/health/wrappers', 'Wrapper health - orphan detection', () => api.getWrapperHealth());
  await test(4, 'GET', '/resonanz/config/default-wrapper', 'Get active default wrapper', () => api.getConfig());
  await test(5, 'PUT', '/resonanz/config/default-wrapper', 'Set default wrapper to sigma', 
    () => api.setConfig('syntex_wrapper_sigma'), 
    { wrapper_name: 'syntex_wrapper_sigma' });
  
  await test(6, 'GET', '/resonanz/formats', 'List all available formats', () => api.getFormats());
  await test(7, 'GET', '/resonanz/formats?domain=technical', 'List technical formats', () => api.getFormats('technical'));
  await test(8, 'GET', '/resonanz/formats?domain=psychology', 'List psychology formats', () => api.getFormats('psychology'));
  await test(9, 'GET', '/resonanz/formats/sigma', 'Get sigma format (DE)', () => api.getFormat('sigma'));
  await test(10, 'GET', '/resonanz/formats/sigma?language=en', 'Get sigma format (EN)', () => api.getFormat('sigma', 'en'));
  await test(11, 'GET', '/resonanz/formats/human_deep', 'Get human_deep format', () => api.getFormat('human_deep'));
  await test(12, 'GET', '/resonanz/formats/review', 'Get review format', () => api.getFormat('review'));
  
  const quickPayload = { name: `quick_${TEST_ID}`, description_de: 'API Test Format', field_names: ['alpha', 'beta', 'gamma'] };
  await test(13, 'POST', '/resonanz/formats/quick', 'Quick create format with defaults', 
    () => api.createFormatQuick(quickPayload), quickPayload);
  
  await test(14, 'DELETE', `/resonanz/formats/${TEST_FORMAT}`, 'Delete test format (expected to fail)', 
    () => api.deleteFormat(TEST_FORMAT));
  
  await test(15, 'GET', '/resonanz/styles', 'List all available styles', () => api.getStyles());
  await test(16, 'GET', '/resonanz/styles/wissenschaftlich', 'Get wissenschaftlich style', () => api.getStyle('wissenschaftlich'));
  await test(17, 'GET', '/resonanz/styles/zynisch', 'Get zynisch style', () => api.getStyle('zynisch'));
  await test(18, 'GET', '/resonanz/styles/poetisch', 'Get poetisch style', () => api.getStyle('poetisch'));
  await test(19, 'GET', '/resonanz/styles/berlin_slang', 'Get berlin_slang style', () => api.getStyle('berlin_slang'));
  
  await test(20, 'GET', '/resonanz/wrappers', 'List all wrappers', () => api.getWrappers());
  await test(21, 'GET', '/resonanz/wrappers?active=true', 'Get active wrapper', () => api.getActiveWrapper());
  await test(22, 'GET', '/resonanz/wrappers/full', 'List wrappers with full content', () => api.getWrappersFull());
  await test(23, 'GET', '/resonanz/wrapper/syntex_wrapper_sigma', 'Get sigma wrapper', () => api.getWrapper('syntex_wrapper_sigma'));
  
  const wrapperPayload = { name: TEST_WRAPPER, content: '# SYNTX Test Wrapper\n\nAuto-generated test wrapper for API testing.' };
  await test(24, 'POST', '/resonanz/wrapper', 'Create test wrapper', 
    () => api.createWrapper(wrapperPayload), wrapperPayload);
  
  const updateWrapperPayload = { content: '# Updated Test Wrapper\n\nContent has been updated by API test.' };
  await test(25, 'PUT', `/resonanz/wrapper/${TEST_WRAPPER}`, 'Update test wrapper content', 
    () => api.updateWrapper(TEST_WRAPPER, updateWrapperPayload), updateWrapperPayload);
  
  await test(26, 'DELETE', `/resonanz/wrapper/${TEST_WRAPPER}`, 'Delete test wrapper', 
    () => api.deleteWrapper(TEST_WRAPPER));
  
  await test(27, 'GET', '/resonanz/wrapper/syntex_wrapper_sigma/meta', 'Get sigma wrapper metadata', 
    () => api.getWrapperMeta('syntex_wrapper_sigma'));
  
  await test(28, 'PUT', '/resonanz/wrapper/syntex_wrapper_sigma/format', 'Bind sigma format to sigma wrapper', 
    () => api.bindFormat('syntex_wrapper_sigma', 'sigma'),
    { wrapper: 'syntex_wrapper_sigma', format: 'sigma' });
  
  const metaPayload = { description: 'Updated by SYNTX API Test v10.0' };
  await test(29, 'PUT', '/resonanz/wrapper/syntex_wrapper_sigma/meta', 'Update sigma wrapper metadata', 
    () => api.updateWrapperMeta('syntex_wrapper_sigma', metaPayload), metaPayload);
  
  await test(30, 'GET', '/resonanz/stats', 'Get global system statistics', () => api.getStats());
  await test(31, 'GET', '/resonanz/stats/wrapper/syntex_wrapper_sigma', 'Get sigma wrapper stats', 
    () => api.getWrapperStats('syntex_wrapper_sigma'));
  await test(32, 'GET', '/resonanz/strom?limit=5', 'Get stream entries (5 latest)', () => api.getStream(5));
  await test(33, 'GET', '/resonanz/strom?limit=3&stage=5_RESPONSE', 'Get stream entries (stage 5)', 
    () => api.getStream(3, '5_RESPONSE'));
  await test(34, 'GET', '/resonanz/training?limit=5', 'Get training data (5 entries)', () => api.getTraining(5));
  
  // Chat tests with different prompts
  await test(35, 'POST', '/resonanz/chat', 'Chat: Was ist SYNTX?', 
    () => api.chat({ prompt: 'Was ist SYNTX?', max_new_tokens: 50 }),
    { prompt: 'Was ist SYNTX?', max_new_tokens: 50 });
  await test(36, 'POST', '/resonanz/chat', 'Chat: Erkläre Feldtopologie', 
    () => api.chat({ prompt: 'Erkläre Feldtopologie', max_new_tokens: 50 }),
    { prompt: 'Erkläre Feldtopologie', max_new_tokens: 50 });
  await test(37, 'POST', '/resonanz/chat', 'Chat: Was ist Resonanz?', 
    () => api.chat({ prompt: 'Was ist Resonanz?', max_new_tokens: 50 }),
    { prompt: 'Was ist Resonanz?', max_new_tokens: 50 });
  await test(38, 'POST', '/resonanz/chat', 'Chat: Driftgradient erklären', 
    () => api.chat({ prompt: 'Driftgradient erklären', max_new_tokens: 50 }),
    { prompt: 'Driftgradient erklären', max_new_tokens: 50 });
  await test(39, 'POST', '/resonanz/chat', 'Chat: Format vs Wrapper', 
    () => api.chat({ prompt: 'Format vs Wrapper', max_new_tokens: 50 }),
    { prompt: 'Format vs Wrapper', max_new_tokens: 50 });
  await test(40, 'POST', '/resonanz/chat', 'Chat: Style Alchemy', 
    () => api.chat({ prompt: 'Style Alchemy', max_new_tokens: 50 }),
    { prompt: 'Style Alchemy', max_new_tokens: 50 });
  await test(41, 'POST', '/resonanz/chat', 'Chat: Semantische Ebenen', 
    () => api.chat({ prompt: 'Semantische Ebenen', max_new_tokens: 50 }),
    { prompt: 'Semantische Ebenen', max_new_tokens: 50 });
  
  await test(42, 'POST', '/resonanz/health/fix', 'Fix orphaned wrappers/meta', () => api.fixOrphans());
  
  // Format CRUD tests
  const formatPayload = {
    name: TEST_FORMAT,
    domain: 'technical',
    description: { de: 'CRUD Test Format' },
    fields: [{ name: 'test_feld', type: 'text' as const, weight: 10 }]
  };
  await test(43, 'POST', '/resonanz/formats', 'Create test format with fields', 
    () => api.createFormat(formatPayload), formatPayload);
  
  const fieldPayload = { name: 'neues_feld', type: 'rating' as const, weight: 20 };
  await test(44, 'POST', `/resonanz/formats/${TEST_FORMAT}/fields`, 'Add field to test format', 
    () => api.addField(TEST_FORMAT, fieldPayload), fieldPayload);
  
  await test(45, 'PUT', `/resonanz/formats/${TEST_FORMAT}/fields/neues_feld`, 'Update field weight', 
    () => api.updateField(TEST_FORMAT, 'neues_feld', { weight: 30 }),
    { weight: 30 });
  
  await test(46, 'DELETE', `/resonanz/formats/${TEST_FORMAT}/fields/neues_feld`, 'Delete field from format', 
    () => api.deleteField(TEST_FORMAT, 'neues_feld'));
  
  const formatUpdatePayload = { domain: 'analysis', description: { de: 'Aktualisiertes Format' } };
  await test(47, 'PUT', `/resonanz/formats/${TEST_FORMAT}`, 'Update format metadata', 
    () => api.updateFormat(TEST_FORMAT, formatUpdatePayload), formatUpdatePayload);
  
  await test(48, 'DELETE', `/resonanz/formats/${TEST_FORMAT}`, 'Delete test format (soft delete)', 
    () => api.deleteFormat(TEST_FORMAT));
  
  // Style CRUD tests
  const stylePayload = { name: TEST_STYLE, vibe: 'MEGA TEST VIBE - Ultimate SYNTX Energy' };
  await test(49, 'POST', '/resonanz/styles', 'Create test style', 
    () => api.createStyle(stylePayload), stylePayload);
  
  const alchemyPayload = { original: 'neu', replacement: 'NEU' };
  await test(50, 'POST', `/resonanz/styles/${TEST_STYLE}/alchemy`, 'Add word alchemy transformation', 
    () => api.addAlchemy(TEST_STYLE, alchemyPayload), alchemyPayload);
  
  await test(51, 'DELETE', `/resonanz/styles/${TEST_STYLE}/alchemy/neu`, 'Delete alchemy transformation', 
    () => api.deleteAlchemy(TEST_STYLE, 'neu'));
  
  await test(52, 'POST', `/resonanz/styles/${TEST_STYLE}/forbidden/schlecht`, 'Add forbidden word', 
    () => api.addForbiddenWord(TEST_STYLE, 'schlecht'),
    { word: 'schlecht' });
  
  await test(53, 'DELETE', `/resonanz/styles/${TEST_STYLE}`, 'Delete test style (soft delete)', 
    () => api.deleteStyle(TEST_STYLE));

  // ═══════════════════════════════════════════════════════════════════════════
  // 🔥 PERVERSE SYNTX ZUSAMMENFASSUNG
  // ═══════════════════════════════════════════════════════════════════════════
  
  const totalTime = Date.now() - startTime;
  const passed = records.filter(r => r.status === 'PASS').length;
  const failed = records.filter(r => r.status === 'FAIL').length;
  const total = records.length;
  const avgLatency = Math.round(records.reduce((s, r) => s + r.latency_ms, 0) / total);
  const successRate = Math.round((passed / total) * 100);
  
  const totalLatency = records.reduce((s, r) => s + r.latency_ms, 0);
  const minLatency = Math.min(...records.map(r => r.latency_ms));
  const maxLatency = Math.max(...records.map(r => r.latency_ms));
  
  console.log('');
  console.log('');
  divider('━', 120);
  box('🔥 PERVERSE SYNTX ZUSAMMENFASSUNG - UNERMESSLICHE STATS 🔥');
  console.log('');
  
  console.log(`${c.cyan}${c.bold}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${c.r}`);
  console.log(`${c.cyan}${c.bold}📊 FELD RESONANZ STATISTIK${c.r}`);
  console.log(`${c.cyan}${c.bold}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${c.r}`);
  console.log('');
  console.log(`   ${c.white}TOTAL TESTS:${c.r}      ${c.bold}${total}${c.r}`);
  console.log(`   ${c.green}✓ PASSED:${c.r}         ${c.bold}${c.green}${passed}${c.r} ${c.gray}(${successRate}%)${c.r}`);
  console.log(`   ${c.red}✗ FAILED:${c.r}         ${c.bold}${c.red}${failed}${c.r} ${c.gray}(${100-successRate}%)${c.r}`);
  console.log('');
  
  console.log(`${c.purple}${c.bold}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${c.r}`);
  console.log(`${c.purple}${c.bold}⚡ LATENCY ANALYSE${c.r}`);
  console.log(`${c.purple}${c.bold}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${c.r}`);
  console.log('');
  console.log(`   ${c.yellow}⏱  TOTAL TIME:${c.r}      ${c.bold}${(totalTime/1000).toFixed(2)}s${c.r} ${c.gray}(${totalTime}ms)${c.r}`);
  console.log(`   ${c.yellow}📊 TOTAL REQUESTS:${c.r}  ${c.bold}${(totalLatency/1000).toFixed(2)}s${c.r} ${c.gray}(${totalLatency}ms)${c.r}`);
  console.log(`   ${c.cyan}📈 AVG LATENCY:${c.r}     ${c.bold}${avgLatency}ms${c.r}`);
  console.log(`   ${c.green}🚀 MIN LATENCY:${c.r}     ${c.bold}${minLatency}ms${c.r}`);
  console.log(`   ${c.red}🐌 MAX LATENCY:${c.r}     ${c.bold}${maxLatency}ms${c.r}`);
  console.log('');
  
  console.log(`${c.white}${c.bold}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${c.r}`);
  console.log(`${c.white}${c.bold}🌊 ENDPOINT BREAKDOWN${c.r}`);
  console.log(`${c.white}${c.bold}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${c.r}`);
  console.log('');
  const byMethod: {[k: string]: number} = {};
  records.forEach(r => { byMethod[r.method] = (byMethod[r.method] || 0) + 1; });
  Object.entries(byMethod).forEach(([method, count]) => {
    const bar = '█'.repeat(Math.round(count / total * 50));
    console.log(`   ${c.cyan}${method.padEnd(6)}${c.r} ${c.gray}${count.toString().padStart(2)}${c.r} ${c.cyan}${bar}${c.r}`);
  });
  console.log('');
  
  if (failed > 0) {
    console.log(`${c.red}${c.bold}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${c.r}`);
    console.log(`${c.red}${c.bold}❌ FAILED TESTS${c.r}`);
    console.log(`${c.red}${c.bold}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${c.r}`);
    console.log('');
    records.filter(r => r.status === 'FAIL').forEach(r => {
      console.log(`   ${c.red}#${r.num.toString().padStart(2, '0')} ${r.method.padEnd(6)} ${r.endpoint}${c.r}`);
      console.log(`       ${c.gray}${r.description}${c.r}`);
      console.log(`       ${c.red}${r.error}${c.r}`);
      console.log('');
    });
  }
  
  console.log(`${c.yellow}${c.bold}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${c.r}`);
  console.log(`${c.yellow}${c.bold}🐌 TOP 10 SLOWEST ENDPOINTS${c.r}`);
  console.log(`${c.yellow}${c.bold}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${c.r}`);
  console.log('');
  const slowest = [...records].sort((a, b) => b.latency_ms - a.latency_ms).slice(0, 10);
  slowest.forEach((r, i) => {
    const bar = '▓'.repeat(Math.round(r.latency_ms / maxLatency * 40));
    console.log(`   ${c.gray}${(i+1).toString().padStart(2)}.${c.r} ${c.red}${r.latency_ms.toString().padStart(6)}ms${c.r} ${c.gray}│${c.r} ${r.method.padEnd(6)} ${r.endpoint}`);
    console.log(`       ${c.dim}${r.description}${c.r}`);
    console.log(`       ${c.red}${bar}${c.r}`);
  });
  console.log('');
  
  console.log(`${c.green}${c.bold}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${c.r}`);
  console.log(`${c.green}${c.bold}⚡ TOP 10 FASTEST ENDPOINTS${c.r}`);
  console.log(`${c.green}${c.bold}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${c.r}`);
  console.log('');
  const fastest = [...records].sort((a, b) => a.latency_ms - b.latency_ms).slice(0, 10);
  fastest.forEach((r, i) => {
    console.log(`   ${c.gray}${(i+1).toString().padStart(2)}.${c.r} ${c.green}${r.latency_ms.toString().padStart(6)}ms${c.r} ${c.gray}│${c.r} ${r.method.padEnd(6)} ${r.endpoint}`);
    console.log(`       ${c.dim}${r.description}${c.r}`);
  });
  console.log('');
  
  console.log(`${c.purple}${c.bold}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${c.r}`);
  console.log(`${c.purple}${c.bold}💎 SYNTX PHILOSOPHY${c.r}`);
  console.log(`${c.purple}${c.bold}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${c.r}`);
  console.log('');
  if (successRate === 100) {
    console.log(`   ${c.green}${c.bold}"PERFEKT. LÜCKENLOS. NULL DRIFT. DAS IST FELD-RESONANZ."${c.r}`);
  } else if (successRate >= 98) {
    console.log(`   ${c.cyan}${c.bold}"${successRate}% IST DAS MAXIMUM. DER REST IST DESIGN, KEIN BUG."${c.r}`);
  } else if (successRate >= 90) {
    console.log(`   ${c.yellow}${c.bold}"${successRate}% - GUT, ABER NOCH RAUM FÜR OPTIMIERUNG."${c.r}`);
  } else {
    console.log(`   ${c.red}${c.bold}"${successRate}% - DRIFT DETECTED. KALIBRIERUNG ERFORDERLICH."${c.r}`);
  }
  console.log('');
  divider('━', 120);
  console.log('');
  
  const jsonFile = `syntx-api-mega-${TEST_ID}.json`;
  fs.writeFileSync(jsonFile, JSON.stringify({
    timestamp: new Date().toISOString(),
    base_url: BASE_URL,
    summary: { total, passed, failed, successRate, avgLatency, totalTime, totalLatency, minLatency, maxLatency },
    tests: records
  }, null, 2));
  
  console.log(`${c.green}✓${c.r} Full report: ${c.yellow}${jsonFile}${c.r}`);
  console.log('');
  
  process.exit(failed > 0 ? 1 : 0);
}

main().catch(console.error);
