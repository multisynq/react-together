import { test, expect, Page } from '@playwright/test';

test.describe('ActivitySynq Emoji Voting Demo', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the ActivitySynq documentation page
    await page.goto('/ActivitySynq');
    await page.waitForLoadState('networkidle');
  });

  test('should display emoji voting demo with all required elements', async ({ page }) => {
    // Wait for the demo to load
    await page.waitForSelector('[data-testid="preview-tab"], .preview-container, iframe', { timeout: 10000 });
    
    // Try to find the iframe containing the demo
    const iframe = page.locator('iframe').first();
    
    if (await iframe.count() > 0) {
      // If demo is in iframe, switch to iframe context
      const frame = await iframe.contentFrame();
      if (frame) {
        await testEmojiVotingInFrame(frame);
      }
    } else {
      // If demo is directly in page, test in main page
      await testEmojiVotingInPage(page);
    }
  });

  test('should handle multiple users voting simultaneously', async ({ browser }) => {
    // Create two browser contexts to simulate multiple users
    const context1 = await browser.newContext();
    const context2 = await browser.newContext();
    
    const page1 = await context1.newPage();
    const page2 = await context2.newPage();
    
    // Both users navigate to the demo
    await page1.goto('/demos/ActivitySynq?user=user1');
    await page2.goto('/demos/ActivitySynq?user=user2');
    
    await page1.waitForLoadState('networkidle');
    await page2.waitForLoadState('networkidle');
    
    // Wait for demos to initialize
    await page1.waitForSelector('text=🗳️ Emoji Voting Demo', { timeout: 10000 });
    await page2.waitForSelector('text=🗳️ Emoji Voting Demo', { timeout: 10000 });
    
    // User 1 votes for 😍
    await page1.click('button:has-text("😍")');
    
    // User 2 votes for 🚀  
    await page2.click('button:has-text("🚀")');
    
    // Verify vote counts are updated on both pages
    await expect(page1.locator('text=1 votes').first()).toBeVisible({ timeout: 5000 });
    await expect(page2.locator('text=1 votes').first()).toBeVisible({ timeout: 5000 });
    
    // Verify activity feed shows votes from both users
    await expect(page1.locator('text=voted 😍')).toBeVisible({ timeout: 5000 });
    await expect(page1.locator('text=voted 🚀')).toBeVisible({ timeout: 5000 });
    
    await expect(page2.locator('text=voted 😍')).toBeVisible({ timeout: 5000 });
    await expect(page2.locator('text=voted 🚀')).toBeVisible({ timeout: 5000 });
    
    await context1.close();
    await context2.close();
  });

  test('should show connection status and buffering information', async ({ page }) => {
    await page.goto('/demos/ActivitySynq');
    await page.waitForLoadState('networkidle');
    
    // Wait for demo to load
    await page.waitForSelector('text=🗳️ Emoji Voting Demo', { timeout: 10000 });
    
    // Check connection status is displayed
    await expect(page.locator('text=Status:')).toBeVisible();
    await expect(page.locator('text=Ready:')).toBeVisible();
    
    // Check that ready status shows "Yes" when connected
    await expect(page.locator('text=Ready: Yes')).toBeVisible({ timeout: 10000 });
  });
});

async function testEmojiVotingInFrame(frame: any) {
  // Wait for emoji voting demo to load in iframe
  await frame.waitForSelector('text=🗳️ Emoji Voting Demo', { timeout: 10000 });
  
  // Check that all emoji buttons are present
  const emojis = ['😍', '🚀', '💡', '🎉', '❤️', '👍'];
  for (const emoji of emojis) {
    await expect(frame.locator(`button:has-text("${emoji}")`)).toBeVisible();
  }
  
  // Check initial vote counts are 0
  await expect(frame.locator('text=0 votes').first()).toBeVisible();
  
  // Click on an emoji to vote
  await frame.click('button:has-text("😍")');
  
  // Verify vote count increases
  await expect(frame.locator('text=1 votes').first()).toBeVisible({ timeout: 5000 });
  
  // Verify activity appears in feed
  await expect(frame.locator('text=voted 😍')).toBeVisible({ timeout: 5000 });
  
  // Check connection status
  await expect(frame.locator('text=Status:')).toBeVisible();
  await expect(frame.locator('text=Ready: Yes')).toBeVisible({ timeout: 10000 });
}

async function testEmojiVotingInPage(page: Page) {
  // Wait for emoji voting demo to load
  await page.waitForSelector('text=🗳️ Emoji Voting Demo', { timeout: 10000 });
  
  // Check that all emoji buttons are present
  const emojis = ['😍', '🚀', '💡', '🎉', '❤️', '👍'];
  for (const emoji of emojis) {
    await expect(page.locator(`button:has-text("${emoji}")`)).toBeVisible();
  }
  
  // Check initial vote counts are 0
  await expect(page.locator('text=0 votes').first()).toBeVisible();
  
  // Click on an emoji to vote
  await page.click('button:has-text("😍")');
  
  // Verify vote count increases
  await expect(page.locator('text=1 votes').first()).toBeVisible({ timeout: 5000 });
  
  // Verify activity appears in feed
  await expect(page.locator('text=voted 😍')).toBeVisible({ timeout: 5000 });
  
  // Check connection status
  await expect(page.locator('text=Status:')).toBeVisible();
  await expect(page.locator('text=Ready: Yes')).toBeVisible({ timeout: 10000 });
}