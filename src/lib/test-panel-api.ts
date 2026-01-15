#!/usr/bin/env node
// ╔═══════════════════════════════════════════════════════════════════════════╗
// ║                                                                           ║
// ║   🔥💎⚡ PANEL API ROUTER TEST ⚡💎🔥                                      ║
// ║                                                                           ║
// ╚═══════════════════════════════════════════════════════════════════════════╝

const c = {
  reset: '\x1b[0m', red: '\x1b[31m', green: '\x1b[32m', yellow: '\x1b[33m',
  blue: '\x1b[34m', purple: '\x1b[35m', cyan: '\x1b[36m', white: '\x1b[37m',
  gray: '\x1b[90m',
};

async function testPanelAPI() {
  console.log('');
  console.log(`${c.purple}╔═══════════════════════════════════════════════════════════════════════════════╗${c.reset}`);
  console.log(`${c.purple}║${c.reset}   ${c.cyan}🔥 TESTING PANEL API ROUTER 🔥${c.reset}                                          ${c.purple}║${c.reset}`);
  console.log(`${c.purple}╚═══════════════════════════════════════════════════════════════════════════════╝${c.reset}`);
  console.log('');

  try {
    // Dynamic import to avoid ts-node issues
    const { panelAPI } = await import('./api-wrapper-config-panel.js');

    // TEST 1: Get Wrappers List
    console.log(`${c.blue}━━━ TEST 1: Get Wrappers List ${c.blue}━━━${c.reset}`);
    const wrappers = await panelAPI.getWrappersList();
    console.log(`${c.green}✅ Found ${wrappers.length} wrappers${c.reset}`);
    const firstWrapper = wrappers[0].name;
    console.log(`${c.gray}   Using: ${firstWrapper}${c.reset}`);
    console.log('');

    // TEST 2: Load Complete Panel Data
    console.log(`${c.blue}━━━ TEST 2: Load Complete Panel Data ${c.blue}━━━${c.reset}`);
    console.log(`${c.gray}   Calling: panelAPI.loadPanelData('${firstWrapper}')${c.reset}`);
    console.log('');
    
    const panelData = await panelAPI.loadPanelData(firstWrapper);
    
    console.log(`${c.green}✅ Panel Data Loaded!${c.reset}`);
    console.log('');
    console.log(`${c.cyan}   Wrapper:${c.reset}`);
    console.log(`${c.gray}     - Name: ${panelData.wrapper.name}${c.reset}`);
    console.log(`${c.gray}     - Content: ${panelData.wrapper.content.length} chars${c.reset}`);
    console.log('');
    console.log(`${c.cyan}   Meta:${c.reset}`);
    console.log(`${c.gray}     - Format: ${panelData.meta.meta?.format || 'N/A'}${c.reset}`);
    console.log(`${c.gray}     - Author: ${panelData.meta.meta?.author || 'N/A'}${c.reset}`);
    console.log('');
    console.log(`${c.cyan}   Config (Holy Grail):${c.reset}`);
    console.log(`${c.gray}     - Format Name: ${panelData.config.format_name}${c.reset}`);
    console.log(`${c.gray}     - Format Used: ${panelData.format_used}${c.reset}`);
    console.log(`${c.gray}     - Had Fallback: ${panelData.had_fallback ? '✅ YES' : '❌ NO'}${c.reset}`);
    console.log(`${c.gray}     - Binding: ${panelData.config.binding ? '✅ YES' : '❌ NO'}${c.reset}`);
    console.log(`${c.gray}     - Profile: ${panelData.config.profile?.profile_id || 'N/A'}${c.reset}`);
    console.log(`${c.gray}     - Fields: ${panelData.config.format?.fields?.length || 0}${c.reset}`);
    console.log(`${c.gray}     - Entities: ${Object.keys(panelData.config.entities || {}).length}${c.reset}`);
    console.log(`${c.gray}     - Mistral Wrapper: ${panelData.config.mistral_wrapper ? '✅' : '❌'}${c.reset}`);
    console.log(`${c.gray}     - GPT Wrapper: ${panelData.config.gpt_wrapper ? '✅' : '❌'}${c.reset}`);
    console.log('');
    console.log(`${c.cyan}   Stats:${c.reset}`);
    console.log(`${c.gray}     - Requests: ${panelData.stats.requests}${c.reset}`);
    console.log(`${c.gray}     - Success Rate: ${panelData.stats.success_rate}%${c.reset}`);
    console.log(`${c.gray}     - Avg Latency: ${panelData.stats.average_latency_ms}ms${c.reset}`);
    console.log('');

    // TEST 3: Test Individual Methods
    console.log(`${c.blue}━━━ TEST 3: Individual Methods ${c.blue}━━━${c.reset}`);
    
    const detail = await panelAPI.getWrapperDetail(firstWrapper);
    console.log(`${c.green}✅ getWrapperDetail()${c.reset} - ${detail.content.length} chars`);
    
    const meta = await panelAPI.getWrapperMeta(firstWrapper);
    console.log(`${c.green}✅ getWrapperMeta()${c.reset} - format: ${meta.meta?.format || 'N/A'}`);
    
    const stats = await panelAPI.getWrapperStats(firstWrapper);
    console.log(`${c.green}✅ getWrapperStats()${c.reset} - ${stats.requests} requests`);
    
    const config = await panelAPI.getCompleteFormatConfigWithFallback('sigma');
    console.log(`${c.green}✅ getCompleteFormatConfigWithFallback()${c.reset} - ${config.format_used}`);
    
    console.log('');
    console.log(`${c.green}═══════════════════════════════════════════════════════════════════════════════${c.reset}`);
    console.log(`${c.green}   ✨ ALL TESTS PASSED! PANEL API ROUTER IS READY! ✨${c.reset}`);
    console.log(`${c.green}═══════════════════════════════════════════════════════════════════════════════${c.reset}`);
    console.log('');

  } catch (error) {
    console.error(`${c.red}❌ TEST FAILED!${c.reset}`);
    console.error(`${c.red}${error.message}${c.reset}`);
    if (error.detail) {
      console.error(`${c.red}Detail: ${error.detail}${c.reset}`);
    }
    process.exit(1);
  }
}

testPanelAPI();
