import { chromium } from 'playwright';

async function testActivityModel() {
  console.log('🧪 Testing ActivityModel functionality...');
  
  const browser = await chromium.launch({ headless: false });
  
  try {
    // Start website server first
    console.log('📦 Starting website server...');
    const { spawn } = await import('child_process');
    const websiteProcess = spawn('npm', ['run', 'dev'], {
      cwd: '/mnt/c/git/multisynq/react-together/website',
      stdio: 'pipe'
    });
    
    // Wait for server to start
    await new Promise(resolve => setTimeout(resolve, 5000));
    
    // Test the useActivitySynq documentation page with new ActivityModel
    console.log('🌐 Testing useActivitySynq documentation page...');
    const context = await browser.newContext();
    const page = await context.newPage();
    
    await page.goto('http://localhost:5174/useActivitySynq');
    await page.waitForTimeout(5000); // Allow time for connection
    
    // Take screenshot of documentation page
    await page.screenshot({ 
      path: '/mnt/c/git/multisynq/react-together/useActivitySynq-page-new-model.png',
      fullPage: true 
    });
    
    // Check if the page loaded successfully
    const title = await page.textContent('h1');
    console.log('📖 Documentation page title:', title);
    
    // Look for the demo preview components
    const demoComponents = await page.$$('.bg-white-100');
    console.log('🎮 Found demo components:', demoComponents.length);
    
    if (demoComponents.length > 0) {
      // Try clicking emoji buttons in both demo instances
      console.log('🎯 Testing activity synchronization...');
      
      // Wait for demos to be ready
      await page.waitForTimeout(3000);
      
      // Click emoji in first demo
      const emojiButtons = await page.$$('button[class*="text-2xl"]');
      if (emojiButtons.length > 0) {
        await emojiButtons[0].click();
        await page.waitForTimeout(1000);
        console.log('✨ Clicked emoji in first demo');
      }
      
      // Take screenshot after interaction
      await page.screenshot({ 
        path: '/mnt/c/git/multisynq/react-together/useActivitySynq-after-activity.png',
        fullPage: true 
      });
      
      // Check console for ActivitySynq messages
      const consoleLogs = [];
      page.on('console', msg => {
        if (msg.text().includes('ActivitySynq')) {
          consoleLogs.push(msg.text());
        }
      });
      
      await page.waitForTimeout(2000);
      console.log('📝 ActivitySynq console logs:', consoleLogs);
      
      // Check for network activity (WebSocket connections)
      const responses = [];
      page.on('response', response => {
        if (response.url().includes('ws') || response.url().includes('socket')) {
          responses.push(response.url());
        }
      });
      
      console.log('🌐 Network responses:', responses);
    }
    
    await context.close();
    
    console.log('✅ ActivityModel test completed successfully!');
    console.log('📸 Screenshots saved to workspace folder');
    
    // Clean up server
    websiteProcess.kill();
    
  } catch (error) {
    console.error('❌ Test failed:', error);
  } finally {
    await browser.close();
  }
}

testActivityModel();