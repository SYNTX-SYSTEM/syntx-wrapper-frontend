#!/usr/bin/env node
// TEST FÜR API CLIENT v6.1

const c = {
  reset: '\x1b[0m', red: '\x1b[31m', green: '\x1b[32m', yellow: '\x1b[33m',
  blue: '\x1b[34m', purple: '\x1b[35m', cyan: '\x1b[36m',
};

async function test() {
  console.log('');
  console.log(`${c.purple}╔═══════════════════════════════════════════════════════════════╗${c.reset}`);
  console.log(`${c.purple}║${c.reset}   ${c.cyan}🔥 TESTING API CLIENT v6.1 🔥${c.reset}                        ${c.purple}║${c.reset}`);
  console.log(`${c.purple}╚═══════════════════════════════════════════════════════════════╝${c.reset}`);
  console.log('');

  try {
    const { panelAPI } = await import('./api-wrapper-config-panel.js');

    // TEST 1: Get Wrappers
    console.log(`${c.blue}━━━ TEST 1: Get Wrappers ${c.blue}━━━${c.reset}`);
    const wrappers = await panelAPI.getWrappersList();
    console.log(`${c.green}✅ Found ${wrappers.length} wrappers${c.reset}`);
    const firstWrapper = wrappers[0].name;
    console.log('');

    // TEST 2: Load Complete Panel Data (THE BIG ONE!)
    console.log(`${c.blue}━━━ TEST 2: Load Complete Panel Data ${c.blue}━━━${c.reset}`);
    console.log(`${c.gray}   Calling: panelAPI.loadCompletePanelData('${firstWrapper}')${c.reset}`);
    console.log('');
    
    const data = await panelAPI.loadCompletePanelData(firstWrapper);
    
    console.log(`${c.green}✅ COMPLETE PANEL DATA LOADED!${c.reset}`);
    console.log('');
    console.log(`${c.cyan}   Format:${c.reset} ${data.format_name}`);
    console.log(`${c.cyan}   Mistral Wrapper:${c.reset} ${data.mapping.mistral_wrapper}`);
    console.log(`${c.cyan}   GPT Wrapper:${c.reset} ${data.gpt_wrapper_name}`);
    console.log(`${c.cyan}   Drift Scoring:${c.reset} ${data.drift_scoring_enabled ? '✅ ENABLED' : '❌ DISABLED'}`);
    console.log(`${c.cyan}   Format Fields:${c.reset} ${data.format_details.fields.length}`);
    console.log('');
    
    console.log(`${c.cyan}   Fields with Weights:${c.reset}`);
    data.format_details.fields.forEach((field, i) => {
      if (i < 5) {
        console.log(`${c.gray}     - ${field.name}: ${field.weight}${c.reset}`);
      }
    });
    if (data.format_details.fields.length > 5) {
      console.log(`${c.gray}     ... (${data.format_details.fields.length - 5} more)${c.reset}`);
    }
    console.log('');
    
    console.log(`${c.cyan}   Mistral Wrapper Content:${c.reset} ${data.mistral_wrapper.content.length} chars`);
    console.log(`${c.cyan}   Stats:${c.reset} ${data.stats.requests} requests`);
    console.log('');

    console.log(`${c.green}═══════════════════════════════════════════════════════════════${c.reset}`);
    console.log(`${c.green}   ✨ ALL TESTS PASSED! API v6.1 IS READY! ✨${c.reset}`);
    console.log(`${c.green}═══════════════════════════════════════════════════════════════${c.reset}`);
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

test();
