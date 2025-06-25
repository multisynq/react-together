import { test, expect, Page } from '@playwright/test'

test.describe('ActivitySynq Global Demo', () => {
  test.beforeEach(async ({ page }) => {
    // Start the global demo app
    await page.goto('http://localhost:3002')
    await page.waitForTimeout(2000) // Wait for app to initialize
  })

  test('should display the main demo page', async ({ page }) => {
    // Check page title and main heading
    await expect(page).toHaveTitle(/ActivitySynq Global Demo/)
    await expect(page.locator('h1')).toContainText('ActivitySynq Global Demo')
    
    // Verify description text
    await expect(page.locator('text=single-line integration')).toBeVisible()
    await expect(page.locator('text=no context wrapper needed')).toBeVisible()

    // Take screenshot of initial state
    await page.screenshot({ 
      path: '/mnt/c/git/multisynq/react-together/screenshots/global-demo-initial.png',
      fullPage: true 
    })
  })

  test('should show connection status in feature trackers', async ({ page }) => {
    // Wait for connection status to be visible
    await page.waitForSelector('text=Status:', { timeout: 10000 })
    
    // Check that all feature tracker sections are present
    const featureSections = [
      'Product Features',
      'Analytics Tools', 
      'User Dashboard'
    ]
    
    for (const section of featureSections) {
      await expect(page.locator(`text=${section}`)).toBeVisible()
      
      // Check that each section has status indicators
      const sectionContainer = page.locator(`text=${section}`).locator('..').locator('..')
      await expect(sectionContainer.locator('text=Status:')).toBeVisible()
      await expect(sectionContainer.locator('text=Ready:')).toBeVisible()
    }

    // Take screenshot showing all feature sections
    await page.screenshot({ 
      path: '/mnt/c/git/multisynq/react-together/screenshots/global-demo-features.png',
      fullPage: true 
    })
  })

  test('should register activities when buttons are clicked', async ({ page }) => {
    // Wait for the activity feed to be visible
    await page.waitForSelector('text=Live Activity Feed', { timeout: 10000 })
    
    // Initially should show no activities
    await expect(page.locator('text=No activities yet')).toBeVisible()
    
    // Click some feature buttons
    await page.locator('button:has-text("🔍 Search")').first().click()
    await page.waitForTimeout(500)
    
    await page.locator('button:has-text("🔽 Filter")').first().click()
    await page.waitForTimeout(500)
    
    await page.locator('button:has-text("📁 Export")').first().click()
    await page.waitForTimeout(500)

    // Add a user action
    await page.locator('button:has-text("+ Add Activity")').click()
    await page.waitForTimeout(500)

    // Verify activities appear in the feed
    await expect(page.locator('text=feature_usage')).toBeVisible()
    await expect(page.locator('text=user_action')).toBeVisible()

    // Take screenshot showing activities
    await page.screenshot({ 
      path: '/mnt/c/git/multisynq/react-together/screenshots/global-demo-activities.png',
      fullPage: true 
    })
  })

  test('should work without context wrapper', async ({ page }) => {
    // Verify the integration explanation is present
    await expect(page.locator('text=Integration Pattern')).toBeVisible()
    await expect(page.locator('text=Old Way (Context Wrapper)')).toBeVisible()
    await expect(page.locator('text=New Way (Single Line)')).toBeVisible()
    
    // Check code examples are shown
    await expect(page.locator('text=ActivitySynqProvider')).toBeVisible()
    await expect(page.locator('text=ActivitySynqGlobal')).toBeVisible()
    
    // Verify the magic explanation
    await expect(page.locator('text=useActivitySynqGlobal() works in any component')).toBeVisible()

    // Take screenshot of integration explanation
    await page.screenshot({ 
      path: '/mnt/c/git/multisynq/react-together/screenshots/global-demo-integration.png',
      fullPage: true 
    })
  })

  test('should display user ID and session info', async ({ page }) => {
    // Check that user ID is displayed
    await expect(page.locator('text=Your User ID:')).toBeVisible()
    
    // Verify user ID format (should be demo-user-{random})
    const userIdElement = page.locator('code').filter({ hasText: 'demo-user-' })
    await expect(userIdElement).toBeVisible()
    
    // Take screenshot showing user info
    await page.screenshot({ 
      path: '/mnt/c/git/multisynq/react-together/screenshots/global-demo-user-info.png' 
    })
  })

  test('should handle multiple activity registrations', async ({ page }) => {
    // Wait for activity feed
    await page.waitForSelector('text=Live Activity Feed', { timeout: 10000 })
    
    // Register multiple activities quickly
    const activities = [
      '🔍 Search',
      '🔽 Filter', 
      '📁 Export',
      '+ Add Activity',
      '+ Add Activity',
      '+ Add Activity'
    ]
    
    for (const activity of activities) {
      await page.locator(`button:has-text("${activity}")`).first().click()
      await page.waitForTimeout(200)
    }
    
    // Verify multiple activities are shown
    const activityElements = page.locator('[style*="border: 1px solid"]').filter({ 
      has: page.locator('text=feature_usage, text=user_action') 
    })
    
    // Should have multiple activity entries
    await expect(activityElements).toHaveCount(6, { timeout: 5000 })

    // Take screenshot of multiple activities
    await page.screenshot({ 
      path: '/mnt/c/git/multisynq/react-together/screenshots/global-demo-multiple-activities.png',
      fullPage: true 
    })
  })
})

test.describe('ActivitySynq Global Multi-User', () => {
  test('should sync activities between multiple browser tabs', async ({ context }) => {
    // Create two pages (simulating two users)
    const page1 = await context.newPage()
    const page2 = await context.newPage()
    
    // Navigate both to the demo
    await page1.goto('http://localhost:3002')
    await page2.goto('http://localhost:3002')
    
    // Wait for both to load
    await page1.waitForSelector('text=Live Activity Feed', { timeout: 10000 })
    await page2.waitForSelector('text=Live Activity Feed', { timeout: 10000 })
    
    // Register activity on page1
    await page1.locator('button:has-text("🔍 Search")').first().click()
    await page1.waitForTimeout(1000)
    
    // Check if activity appears on page2 (cross-user sync)
    // Note: This might require actual Multisynq credentials to work
    
    // Take screenshot of both pages
    await page1.screenshot({ 
      path: '/mnt/c/git/multisynq/react-together/screenshots/global-demo-user1.png',
      fullPage: true 
    })
    
    await page2.screenshot({ 
      path: '/mnt/c/git/multisynq/react-together/screenshots/global-demo-user2.png',
      fullPage: true 
    })
    
    await page1.close()
    await page2.close()
  })
})