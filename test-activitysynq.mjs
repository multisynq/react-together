import { chromium } from 'playwright';

async function testActivitySynqDemo() {
  const browser = await chromium.launch({ headless: false });
  
  try {
    // Test the website demo
    console.log('Testing website ActivitySynq demo...');
    const context1 = await browser.newContext();
    const page1 = await context1.newPage();
    
    await page1.goto('http://localhost:5174/demos/ActivitySynq?user=user1');
    await page1.waitForTimeout(3000); // Allow time for connection
    
    // Take screenshot of website demo
    await page1.screenshot({ path: '/mnt/c/git/multisynq/react-together/website-activitysynq-demo.png' });
    
    // Check if the demo loaded successfully
    const title = await page1.textContent('h1');
    console.log('Website demo title:', title);
    
    // Check if the connection status shows ready
    const statusText = await page1.textContent('.border-2 .text-sm');
    console.log('Website demo status:', statusText);
    
    // Try clicking an emoji button
    await page1.click('button:has-text("😍")');
    await page1.waitForTimeout(1000);
    
    // Take another screenshot after interaction
    await page1.screenshot({ path: '/mnt/c/git/multisynq/react-together/website-activitysynq-after-vote.png' });
    
    await context1.close();
    
    // Test the standalone demo
    console.log('Testing standalone ActivitySynq demo...');
    const context2 = await browser.newContext();
    const page2 = await context2.newPage();
    
    await page2.goto('http://localhost:3001?user=user1');
    await page2.waitForTimeout(3000); // Allow time for connection
    
    // Take screenshot of standalone demo
    await page2.screenshot({ path: '/mnt/c/git/multisynq/react-together/standalone-activitysynq-demo.png' });
    
    // Check if the demo loaded successfully
    const standaloneTitle = await page2.textContent('h1');
    console.log('Standalone demo title:', standaloneTitle);
    
    // Check if the connection status shows ready
    const standaloneStatusText = await page2.textContent('.border-2 .text-sm');
    console.log('Standalone demo status:', standaloneStatusText);
    
    // Try clicking an emoji button
    await page2.click('button:has-text("😍")');
    await page2.waitForTimeout(1000);
    
    // Take another screenshot after interaction
    await page2.screenshot({ path: '/mnt/c/git/multisynq/react-together/standalone-activitysynq-after-vote.png' });
    
    await context2.close();
    
    console.log('✅ ActivitySynq tests completed successfully!');
    console.log('Screenshots saved to workspace folder');
    
  } catch (error) {
    console.error('❌ Test failed:', error);
  } finally {
    await browser.close();
  }
}

testActivitySynqDemo();