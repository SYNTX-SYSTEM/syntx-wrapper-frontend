#!/usr/bin/env npx ts-node
// ╔═══════════════════════════════════════════════════════════════════════════╗
// ║   🌊 SYNTX API TEST - BACKEND SYNCHRONIZED v8.0                          ║
// ║   53 Endpoints | 1:1 Backend Match | COMPLETE Sync                       ║
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
  status: 'PASS' | 'FAIL';
  latency_ms: number;
  error?: string;
}

const records: TestRecord[] = [];

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
};

async function test(num: number, method: string, endpoint: string, fn: () => Promise<any>) {
  const start = Date.now();
  process.stdout.write(`${c.gray}${num.toString().padStart(2)}${c.r} ${c.cyan}${method.padEnd(6)}${c.r} ${endpoint.padEnd(60)} `);
  
  try {
    await fn();
    const latency = Date.now() - start;
    console.log(`${c.green}✓${c.r} ${c.gray}${latency}ms${c.r}`);
    records.push({ num, endpoint, method, status: 'PASS', latency_ms: latency });
  } catch (error: any) {
    const latency = Date.now() - start;
    console.log(`${c.red}✗${c.r} ${c.gray}${latency}ms${c.r} ${c.red}${error.message}${c.r}`);
    records.push({ num, endpoint, method, status: 'FAIL', latency_ms: latency, error: error.message });
  }
}

async function main() {
  console.log(`${c.purple}╔${'═'.repeat(77)}╗${c.r}`);
  console.log(`${c.purple}║${c.r}   ${c.white}${c.bold}🌊 SYNTX FRONTEND TEST v8.0 - BACKEND SYNC${c.r}                              ${c.purple}║${c.r}`);
  console.log(`${c.purple}║${c.r}   ${c.yellow}${BASE_URL}${' '.repeat(Math.max(0, 63 - BASE_URL.length))}${c.r}${c.purple}║${c.r}`);
  console.log(`${c.purple}║${c.r}   ${c.cyan}53 Tests (1:1 Backend Match)${' '.repeat(38)}${c.r}${c.purple}║${c.r}`);
  console.log(`${c.purple}╚${'═'.repeat(77)}╝${c.r}`);
  console.log('');

  // 1. GET /health
  await test(1, 'GET', '/health', () => api.getHealth());
  
  // 2. GET /resonanz/health
  await test(2, 'GET', '/resonanz/health', () => api.getResonanzHealth());
  
  // 3. GET /resonanz/health/wrappers
  await test(3, 'GET', '/resonanz/health/wrappers', () => api.getWrapperHealth());
  
  // 4. GET /resonanz/config/default-wrapper
  await test(4, 'GET', '/resonanz/config/default-wrapper', () => api.getConfig());
  
  // 5. PUT /resonanz/config/default-wrapper?wrapper_name=syntex_wrapper_sigma
  await test(5, 'PUT', '/resonanz/config/default-wrapper', () => api.setConfig('syntex_wrapper_sigma'));
  
  // 6. GET /resonanz/formats
  await test(6, 'GET', '/resonanz/formats', () => api.getFormats());
  
  // 7. GET /resonanz/formats?domain=technical
  await test(7, 'GET', '/resonanz/formats?domain=technical', () => api.getFormats('technical'));
  
  // 8. GET /resonanz/formats?domain=psychology
  await test(8, 'GET', '/resonanz/formats?domain=psychology', () => api.getFormats('psychology'));
  
    api.createFormatQuick({ name: TEST_FORMAT, description_de: 'API Test Format', field_names: ['alpha', 'beta', 'gamma'], wrapper: 'syntex_wrapper_sigma' })
  await test(9, 'GET', '/resonanz/formats/sigma', () => api.getFormat('sigma'));
  
  // 10. GET /resonanz/formats/sigma?language=en
  await test(10, 'GET', '/resonanz/formats/sigma?language=en', () => api.getFormat('sigma', 'en'));
  
  // 11. GET /resonanz/formats/human_deep
  await test(11, 'GET', '/resonanz/formats/human_deep', () => api.getFormat('human_deep'));
  
  // 12. GET /resonanz/formats/review
  await test(12, 'GET', '/resonanz/formats/review', () => api.getFormat('review'));
  
  // 13. POST /resonanz/formats/quick
  await test(13, 'POST', '/resonanz/formats/quick', () => 
    api.createFormatQuick({ name: `quick_${TEST_ID}`, description_de: 'API Test Format', field_names: ['alpha', 'beta', 'gamma'] })
  );
  
  // 14. DELETE /resonanz/formats/$TEST_FORMAT
  await test(14, 'DELETE', `/resonanz/formats/${TEST_FORMAT}`, () => api.deleteFormat(TEST_FORMAT));
  
  // 15. GET /resonanz/styles
  await test(15, 'GET', '/resonanz/styles', () => api.getStyles());
  
  // 16. GET /resonanz/styles/wissenschaftlich
  await test(16, 'GET', '/resonanz/styles/wissenschaftlich', () => api.getStyle('wissenschaftlich'));
  
  // 17. GET /resonanz/styles/zynisch
  await test(17, 'GET', '/resonanz/styles/zynisch', () => api.getStyle('zynisch'));
  
  // 18. GET /resonanz/styles/poetisch
  await test(18, 'GET', '/resonanz/styles/poetisch', () => api.getStyle('poetisch'));
  
  // 19. GET /resonanz/styles/berlin_slang
  await test(19, 'GET', '/resonanz/styles/berlin_slang', () => api.getStyle('berlin_slang'));
  
  // 20. GET /resonanz/wrappers
  await test(20, 'GET', '/resonanz/wrappers', () => api.getWrappers());
  
  // 21. GET /resonanz/wrappers?active=true
  await test(21, 'GET', '/resonanz/wrappers?active=true', () => api.getActiveWrapper());
  
  // 22. GET /resonanz/wrappers/full
  await test(22, 'GET', '/resonanz/wrappers/full', () => api.getWrappersFull());
  
  // 23. GET /resonanz/wrapper/syntex_wrapper_sigma
  await test(23, 'GET', '/resonanz/wrapper/syntex_wrapper_sigma', () => api.getWrapper('syntex_wrapper_sigma'));
  
  // 24. POST /resonanz/wrapper
  await test(24, 'POST', '/resonanz/wrapper', () => 
    api.createWrapper({ name: TEST_WRAPPER, content: '# Test' })
  );
  
  // 25. PUT /resonanz/wrapper/$TEST_WRAPPER
  await test(25, 'PUT', `/resonanz/wrapper/${TEST_WRAPPER}`, () => 
    api.updateWrapper(TEST_WRAPPER, { content: '# Updated' })
  );
  
  // 26. DELETE /resonanz/wrapper/$TEST_WRAPPER
  await test(26, 'DELETE', `/resonanz/wrapper/${TEST_WRAPPER}`, () => api.deleteWrapper(TEST_WRAPPER));
  
  // 27. GET /resonanz/wrapper/syntex_wrapper_sigma/meta
  await test(27, 'GET', '/resonanz/wrapper/syntex_wrapper_sigma/meta', () => 
    api.getWrapperMeta('syntex_wrapper_sigma')
  );
  
  // 28. PUT /resonanz/wrapper/syntex_wrapper_sigma/format?format_name=sigma
  await test(28, 'PUT', '/resonanz/wrapper/syntex_wrapper_sigma/format', () => 
    api.bindFormat('syntex_wrapper_sigma', 'sigma')
  );
  
  // 29. PUT /resonanz/wrapper/syntex_wrapper_sigma/meta
  await test(29, 'PUT', '/resonanz/wrapper/syntex_wrapper_sigma/meta', () => 
    api.updateWrapperMeta('syntex_wrapper_sigma', { description: 'Updated' })
  );
  
  // 30. GET /resonanz/stats
  await test(30, 'GET', '/resonanz/stats', () => api.getStats());
  
  // 31. GET /resonanz/stats/wrapper/syntex_wrapper_sigma
  await test(31, 'GET', '/resonanz/stats/wrapper/syntex_wrapper_sigma', () => 
    api.getWrapperStats('syntex_wrapper_sigma')
  );
  
  // 32. GET /resonanz/strom?limit=5
  await test(32, 'GET', '/resonanz/strom?limit=5', () => api.getStream(5));
  
  // 33. GET /resonanz/strom?limit=3&stage=5_RESPONSE
  await test(33, 'GET', '/resonanz/strom?limit=3&stage=5_RESPONSE', () => api.getStream(3, '5_RESPONSE'));
  
  // 34. GET /resonanz/training?limit=5
  await test(34, 'GET', '/resonanz/training?limit=5', () => api.getTraining(5));
  
  // 35-41. POST /resonanz/chat (7x)
  await test(35, 'POST', '/resonanz/chat', () => api.chat({ prompt: 'Test 1', max_new_tokens: 50 }));
  await test(36, 'POST', '/resonanz/chat', () => api.chat({ prompt: 'Test 2', max_new_tokens: 50 }));
  await test(37, 'POST', '/resonanz/chat', () => api.chat({ prompt: 'Test 3', max_new_tokens: 50 }));
  await test(38, 'POST', '/resonanz/chat', () => api.chat({ prompt: 'Test 4', max_new_tokens: 50 }));
  await test(39, 'POST', '/resonanz/chat', () => api.chat({ prompt: 'Test 5', max_new_tokens: 50 }));
  await test(40, 'POST', '/resonanz/chat', () => api.chat({ prompt: 'Test 6', max_new_tokens: 50 }));
  await test(41, 'POST', '/resonanz/chat', () => api.chat({ prompt: 'Test 7', max_new_tokens: 50 }));
  
  // 42. POST /resonanz/health/fix
  await test(42, 'POST', '/resonanz/health/fix', () => api.fixOrphans());
  
  // 43. POST /resonanz/formats
  await test(43, 'POST', '/resonanz/formats', () => 
    api.createFormat({ 
      name: TEST_FORMAT, 
      domain: 'technical', 
      description: { de: 'CRUD Test Format' }, 
      fields: [{ name: 'test_feld', type: 'text', weight: 10 }] 
    })
  );
  
  // 44. POST /resonanz/formats/crud_test_format/fields
  await test(44, 'POST', `/resonanz/formats/${TEST_FORMAT}/fields`, () => 
    api.addField(TEST_FORMAT, { name: 'neues_feld', type: 'rating', weight: 20 })
  );
  
  // 45. PUT /resonanz/formats/crud_test_format/fields/neues_feld
  await test(45, 'PUT', `/resonanz/formats/${TEST_FORMAT}/fields/neues_feld`, () => 
    api.updateField(TEST_FORMAT, 'neues_feld', { weight: 30 })
  );
  
  // 46. DELETE /resonanz/formats/crud_test_format/fields/neues_feld
  await test(46, 'DELETE', `/resonanz/formats/${TEST_FORMAT}/fields/neues_feld`, () => 
    api.deleteField(TEST_FORMAT, 'neues_feld')
  );
  
  // 47. PUT /resonanz/formats/crud_test_format
  await test(47, 'PUT', `/resonanz/formats/${TEST_FORMAT}`, () => 
    api.updateFormat(TEST_FORMAT, { domain: 'analysis', description: { de: 'Aktualisiertes Format' } })
  );
  
  // 48. DELETE /resonanz/formats/crud_test_format
  await test(48, 'DELETE', `/resonanz/formats/${TEST_FORMAT}`, () => api.deleteFormat(TEST_FORMAT));
  
  // 49. POST /resonanz/styles
  await test(49, 'POST', '/resonanz/styles', () => 
    api.createStyle({ name: TEST_STYLE, vibe: 'Test' })
  );
  
  // 50. POST /resonanz/styles/crud_test_style/alchemy
  await test(50, 'POST', `/resonanz/styles/${TEST_STYLE}/alchemy`, () => 
    api.addAlchemy(TEST_STYLE, { original: 'neu', replacement: 'NEU' })
  );
  
  // 51. DELETE /resonanz/styles/crud_test_style/alchemy/neu
  await test(51, 'DELETE', `/resonanz/styles/${TEST_STYLE}/alchemy/neu`, () => 
    api.deleteAlchemy(TEST_STYLE, 'neu')
  );
  
  // 52. POST /resonanz/styles/crud_test_style/forbidden/schlecht
  await test(52, 'POST', `/resonanz/styles/${TEST_STYLE}/forbidden/schlecht`, () => 
    api.addForbiddenWord(TEST_STYLE, 'schlecht')
  );
  
  // 53. DELETE /resonanz/styles/crud_test_style
  await test(53, 'DELETE', `/resonanz/styles/${TEST_STYLE}`, () => api.deleteStyle(TEST_STYLE));

  // Summary
  console.log('');
  console.log(`${c.cyan}${'━'.repeat(79)}${c.r}`);
  
  const passed = records.filter(r => r.status === 'PASS').length;
  const failed = records.filter(r => r.status === 'FAIL').length;
  const total = records.length;
  const avgLatency = Math.round(records.reduce((s, r) => s + r.latency_ms, 0) / total);
  const successRate = Math.round((passed / total) * 100);
  
  console.log(`${c.green}✅ PASSED:${c.r} ${passed}/${total}`);
  console.log(`${c.red}❌ FAILED:${c.r} ${failed}/${total}`);
  console.log(`${c.cyan}⚡ AVG LATENCY:${c.r} ${avgLatency}ms`);
  console.log(`${c.yellow}📈 SUCCESS RATE:${c.r} ${successRate}%`);
  console.log('');
  
  const jsonFile = `syntx-api-sync-${TEST_ID}.json`;
  fs.writeFileSync(jsonFile, JSON.stringify({ timestamp: new Date().toISOString(), summary: { total, passed, failed, avgLatency, successRate }, tests: records }, null, 2));
  console.log(`${c.green}✓${c.r} Report: ${c.yellow}${jsonFile}${c.r}`);
  console.log('');
  
  process.exit(failed > 0 ? 1 : 0);
}

main().catch(console.error);
