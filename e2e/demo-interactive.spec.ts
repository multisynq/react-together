import { test, expect } from '@playwright/test';

test.describe('ActivitySynq Emoji Voting - Interactive Demo', () => {
  test('Interactive emoji voting demonstration', async ({ page }) => {
    // Set longer timeout for interactive demo
    test.setTimeout(300000); // 5 minutes
    
    console.log('🚀 Starting interactive emoji voting demo...');
    
    // Navigate directly to the ActivitySynq demo
    await page.goto('/demos/ActivitySynq?user=tester1');
    await page.waitForLoadState('networkidle');
    
    // Open DevTools
    await page.evaluate(() => {
      if ((window as any).chrome && (window as any).chrome.runtime) {
        // We're in a Chrome context, try to open dev tools
        console.log('🔧 DevTools should be available via F12 or right-click -> Inspect');
      }
    });
    
    console.log('📍 Navigated to emoji voting demo');
    
    // Wait for the demo to fully load
    await page.waitForSelector('text=🗳️ Emoji Voting Demo', { timeout: 15000 });
    console.log('✅ Demo loaded successfully');
    
    // Verify all emoji buttons are present
    const emojis = ['😍', '🚀', '💡', '🎉', '❤️', '👍'];
    for (const emoji of emojis) {
      await expect(page.locator(`button:has-text("${emoji}")`)).toBeVisible();
    }
    console.log('✅ All emoji buttons are visible');
    
    // Verify connection status
    await expect(page.locator('text=Status:')).toBeVisible();
    await page.waitForSelector('text=Ready: Yes', { timeout: 15000 });
    console.log('✅ Connection is ready');
    
    // Demo: Vote for each emoji in sequence with delays
    console.log('🗳️ Starting emoji voting demonstration...');
    
    for (let i = 0; i < emojis.length; i++) {
      const emoji = emojis[i];
      console.log(`👆 Clicking ${emoji} emoji...`);
      
      // Click the emoji button
      await page.click(`button:has-text("${emoji}")`);
      
      // Wait for vote count to update
      await page.waitForTimeout(1000);
      
      // Verify vote count increased
      const voteCount = i + 1;
      await expect(page.locator('text=' + voteCount + ' votes').first()).toBeVisible({ timeout: 5000 });
      console.log(`✅ Vote count updated to ${voteCount}`);
      
      // Verify activity appears in feed
      await expect(page.locator(`text=voted ${emoji}`)).toBeVisible({ timeout: 5000 });
      console.log(`✅ Activity "${emoji}" appears in feed`);
      
      // Pause between votes to demonstrate real-time updates
      await page.waitForTimeout(2000);
    }
    
    console.log('🎉 Emoji voting demonstration completed!');
    
    // Verify final state
    await expect(page.locator('text=6 votes')).toBeVisible();
    console.log('✅ Final vote count verified');
    
    // Keep the browser open for inspection
    console.log('🔍 Browser window will remain open for inspection...');
    console.log('📱 You can see the emoji voting functionality working!');
    console.log('🛠️ DevTools are available for debugging');
    
    // Wait for a long time to keep browser open
    await page.waitForTimeout(60000); // Keep open for 1 minute
  });
  
  test('Multi-user emoji voting simulation', async ({ browser }) => {
    test.setTimeout(300000); // 5 minutes
    
    console.log('🚀 Starting multi-user emoji voting simulation...');
    
    // Create two browser contexts
    const context1 = await browser.newContext();
    const context2 = await browser.newContext();
    
    const page1 = await context1.newPage();
    const page2 = await context2.newPage();
    
    // User 1 navigates to demo
    await page1.goto('/demos/ActivitySynq?user=voter1');
    await page1.waitForLoadState('networkidle');
    await page1.waitForSelector('text=🗳️ Emoji Voting Demo', { timeout: 15000 });
    console.log('✅ User 1 loaded');
    
    // User 2 navigates to demo
    await page2.goto('/demos/ActivitySynq?user=voter2');
    await page2.waitForLoadState('networkidle');
    await page2.waitForSelector('text=🗳️ Emoji Voting Demo', { timeout: 15000 });
    console.log('✅ User 2 loaded');
    
    // Both users vote for different emojis
    console.log('👆 User 1 voting for 😍...');
    await page1.click('button:has-text("😍")');
    await page1.waitForTimeout(1000);
    
    console.log('👆 User 2 voting for 🚀...');
    await page2.click('button:has-text("🚀")');
    await page2.waitForTimeout(1000);
    
    // Verify both users see both votes
    await expect(page1.locator('text=voted 😍')).toBeVisible({ timeout: 10000 });
    await expect(page1.locator('text=voted 🚀')).toBeVisible({ timeout: 10000 });
    
    await expect(page2.locator('text=voted 😍')).toBeVisible({ timeout: 10000 });
    await expect(page2.locator('text=voted 🚀')).toBeVisible({ timeout: 10000 });
    
    console.log('✅ Both users see synchronized votes!');
    
    // Keep browsers open for inspection
    console.log('🔍 Both browser windows will remain open...');
    await page1.waitForTimeout(30000);
    await page2.waitForTimeout(30000);
    
    await context1.close();
    await context2.close();
  });
});