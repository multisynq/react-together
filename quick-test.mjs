import { chromium } from 'playwright';

async function quickTest() {
  const browser = await chromium.launch({ headless: false });
  
  try {
    // Test standalone demo only
    console.log('Testing standalone ActivitySynq demo...');
    const context = await browser.newContext();
    const page = await context.newPage();
    
    await page.goto('http://localhost:3001', { timeout: 10000 });
    await page.waitForTimeout(5000); // Allow time for connection
    
    // Take screenshot
    await page.screenshot({ path: '/mnt/c/git/multisynq/react-together/standalone-working.png' });
    
    // Check if the demo loaded successfully
    const title = await page.textContent('h1');
    console.log('Standalone demo title:', title);
    
    // Check vote counts
    const voteElements = await page.$$('.text-xs');
    for (const element of voteElements) {
      const text = await element.textContent();
      if (text && text.includes('votes')) {
        console.log('Vote count:', text);
      }
    }
    
    // Try clicking an emoji button to test activity registration
    await page.click('button:has-text("😍")');
    await page.waitForTimeout(2000);
    
    // Take screenshot after interaction
    await page.screenshot({ path: '/mnt/c/git/multisynq/react-together/standalone-after-vote.png' });
    
    // Check vote counts again
    const voteElementsAfter = await page.$$('.text-xs');
    for (const element of voteElementsAfter) {
      const text = await element.textContent();
      if (text && text.includes('votes')) {
        console.log('Vote count after voting:', text);
      }
    }
    
    await context.close();
    
    console.log('✅ Standalone test completed successfully!');
    
  } catch (error) {
    console.error('❌ Test failed:', error);
  } finally {
    await browser.close();
  }
}

quickTest();