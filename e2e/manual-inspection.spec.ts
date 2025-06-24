import { test, expect } from '@playwright/test';

test.describe('Manual Inspection - Emoji Voting Demo', () => {
  test('Open emoji voting demo for manual inspection', async ({ page }) => {
    // Set very long timeout
    test.setTimeout(600000); // 10 minutes
    
    console.log('🚀 Opening emoji voting demo for manual inspection...');
    console.log('🌐 Navigating to: http://localhost:5173/demos/ActivitySynq');
    
    // Navigate to the ActivitySynq demo
    await page.goto('/demos/ActivitySynq?user=inspector');
    await page.waitForLoadState('networkidle');
    
    console.log('📱 Page loaded, waiting for demo...');
    
    // Wait for demo to load with more lenient selector
    try {
      await page.waitForSelector('h1', { timeout: 10000 });
      console.log('✅ Found page header');
      
      // Log page title and URL for debugging
      const title = await page.title();
      const url = page.url();
      console.log(`📄 Page title: ${title}`);
      console.log(`🔗 Current URL: ${url}`);
      
      // Take screenshot for debugging
      await page.screenshot({ path: 'debug-demo-page.png', fullPage: true });
      console.log('📸 Screenshot saved as debug-demo-page.png');
      
      // Check what's actually on the page
      const bodyText = await page.locator('body').textContent();
      console.log('📝 Page content preview:', bodyText?.substring(0, 200) + '...');
      
      // Look for the demo more broadly
      const demoElements = await page.locator('*:has-text("ActivitySynq"), *:has-text("emoji"), *:has-text("vote"), *:has-text("🗳️")').count();
      console.log(`🔍 Found ${demoElements} elements related to ActivitySynq/emoji/vote`);
      
      if (demoElements > 0) {
        console.log('✅ Demo-related content found on page');
        
        // Try to click any emoji if present
        const emojiButtons = await page.locator('button:has-text("😍"), button:has-text("🚀"), button:has-text("💡")').count();
        console.log(`🎯 Found ${emojiButtons} emoji buttons`);
        
        if (emojiButtons > 0) {
          console.log('👆 Attempting to click first emoji button...');
          await page.locator('button:has-text("😍"), button:has-text("🚀"), button:has-text("💡")').first().click();
          await page.waitForTimeout(2000);
          console.log('✅ Clicked emoji button');
        }
      } else {
        console.log('⚠️ No demo-related content found, might be navigation issue');
      }
      
    } catch (error) {
      console.log('❌ Error waiting for demo:', error.message);
      
      // Take screenshot for debugging
      await page.screenshot({ path: 'debug-error-page.png', fullPage: true });
      console.log('📸 Error screenshot saved as debug-error-page.png');
    }
    
    console.log('🔍 Browser window is now open for manual inspection');
    console.log('🛠️ Press F12 to open DevTools');
    console.log('📱 You can interact with the page manually');
    console.log('⏱️ Test will keep browser open for 5 minutes...');
    
    // Keep browser open for manual inspection
    await page.waitForTimeout(300000); // 5 minutes
    
    console.log('✅ Manual inspection time completed');
  });
  
  test('Check ActivitySynq documentation page', async ({ page }) => {
    test.setTimeout(300000); // 5 minutes
    
    console.log('📚 Opening ActivitySynq documentation page...');
    
    await page.goto('/ActivitySynq');
    await page.waitForLoadState('networkidle');
    
    console.log('📄 Documentation page loaded');
    
    // Take screenshot
    await page.screenshot({ path: 'debug-docs-page.png', fullPage: true });
    console.log('📸 Documentation screenshot saved');
    
    // Look for preview/demo elements
    const previewElements = await page.locator('iframe, [data-testid*="preview"], .preview').count();
    console.log(`🖼️ Found ${previewElements} preview elements`);
    
    if (previewElements > 0) {
      console.log('🔍 Found preview elements, checking iframe content...');
      
      const iframes = await page.locator('iframe').count();
      if (iframes > 0) {
        console.log(`📱 Found ${iframes} iframes`);
        
        const iframe = page.locator('iframe').first();
        const frame = await iframe.contentFrame();
        
        if (frame) {
          console.log('🎯 Accessing iframe content...');
          
          // Wait a bit for iframe to load
          await frame.waitForTimeout(3000);
          
          // Take screenshot of iframe
          await frame.screenshot({ path: 'debug-iframe-content.png' });
          console.log('📸 Iframe screenshot saved');
          
          // Check iframe content
          const iframeText = await frame.locator('body').textContent();
          console.log('📝 Iframe content preview:', iframeText?.substring(0, 200) + '...');
        }
      }
    }
    
    console.log('🔍 Documentation page is open for inspection');
    console.log('⏱️ Keeping open for 3 minutes...');
    
    await page.waitForTimeout(180000); // 3 minutes
  });
});