import { expect, test } from '@playwright/test'

test.describe('ActivitySynq Global Demo', () => {
  test.beforeEach(async ({ page }) => {
    // Start the global demo app
    await page.goto('http://localhost:3002/activitysynqglobal')
    await page.waitForTimeout(2000) // Wait for app to initialize
  })

  test('should display the demo page with react-toastify pattern', async ({
    page
  }) => {
    // Check page title and main heading
    await expect(page).toHaveTitle(/ActivitySynq Global Demo/)
    await expect(page.locator('h1')).toContainText('ActivitySynq Global Demo')

    // Verify description text for react-toastify pattern
    await expect(page.locator('text=react-toastify pattern')).toBeVisible()
    await expect(page.locator('text=single-line integration')).toBeVisible()
    await expect(page.locator('text=no context wrapper needed')).toBeVisible()

    // Take screenshot of initial state
    await page.screenshot({
      path: '/mnt/c/git/multisynq/react-together/screenshots/global-demo-initial.png',
      fullPage: true
    })
  })

  test('should show integration explanation with pattern', async ({ page }) => {
    // Verify the integration explanation is present
    await expect(page.locator('text=Integration Pattern')).toBeVisible()
    await expect(page.locator('text=Old Way (Context Wrapper)')).toBeVisible()
    await expect(page.locator('text=New Way (Single Line)')).toBeVisible()

    // Check V2-specific code examples
    await expect(page.locator('text=ActivitySynqGlobal')).toBeVisible()
    await expect(page.locator('text=useActivitySynqGlobal')).toBeVisible()

    // Verify the magic explanation for V2
    await expect(
      page.locator('text=useActivitySynqGlobal() works in any component')
    ).toBeVisible()
    await expect(page.locator('text=react-toastify pattern')).toBeVisible()

    // Take screenshot of integration explanation
    await page.screenshot({
      path: '/mnt/c/git/multisynq/react-together/screenshots/global-integration.png',
      fullPage: true
    })
  })

  test('should show feature tracker components working independently', async ({
    page
  }) => {
    // Wait for feature sections to load
    await page.waitForSelector('text=Product Features', { timeout: 10000 })

    // Check that all feature tracker sections are present
    const featureSections = [
      'Product Features',
      'Analytics Tools',
      'User Dashboard'
    ]

    for (const section of featureSections) {
      await expect(page.locator(`text=${section}`)).toBeVisible()

      // Check that each section has status indicators
      const sectionContainer = page
        .locator(`text=${section}`)
        .locator('..')
        .locator('..')
      await expect(sectionContainer.locator('text=Status:')).toBeVisible()
      await expect(sectionContainer.locator('text=Ready:')).toBeVisible()
      await expect(
        sectionContainer.locator('text=Global activities:')
      ).toBeVisible()
    }

    // Take screenshot showing all feature sections
    await page.screenshot({
      path: '/mnt/c/git/multisynq/react-together/screenshots/global-features.png',
      fullPage: true
    })
  })

  test('should register activities using hooks and global API', async ({
    page
  }) => {
    // Wait for the activity feed to be visible
    await page.waitForSelector('text=Live Activity Feed', { timeout: 10000 })

    // Initially should show no activities
    await expect(page.locator('text=No activities yet')).toBeVisible()

    // Click some feature buttons from different sections
    await page.locator('button:has-text("🔍 Search")').first().click()
    await page.waitForTimeout(500)

    await page.locator('button:has-text("🔽 Filter")').first().click()
    await page.waitForTimeout(500)

    await page.locator('button:has-text("📁 Export")').first().click()
    await page.waitForTimeout(500)

    // Test direct API usage (like toast.success())
    await page.locator('button:has-text("+ Add Activity")').first().click()
    await page.waitForTimeout(500)

    // Verify activities appear in the feed
    await expect(page.locator('text=feature_usage')).toBeVisible()
    await expect(page.locator('text=user_action')).toBeVisible()

    // Take screenshot showing activities
    await page.screenshot({
      path: '/mnt/c/git/multisynq/react-together/screenshots/global-activities.png',
      fullPage: true
    })
  })

  test('should work without any context wrapper', async ({ page }) => {
    // Verify that components can use useActivitySynqGlobal() independently
    const featureTrackers = page.locator('[style*="border: 1px solid #e2e8f0"]')

    // Each feature tracker should work independently
    await expect(featureTrackers).toHaveCount(3, { timeout: 5000 })

    // Test that each tracker has independent counters but shared global state
    const firstTracker = featureTrackers.first()
    const secondTracker = featureTrackers.nth(1)

    // Click button in first tracker
    await firstTracker.locator('button:has-text("🔍 Search")').click()
    await page.waitForTimeout(300)

    // Verify local counter increases in first tracker
    await expect(firstTracker.locator('text=Local clicks: 1')).toBeVisible({
      timeout: 2000
    })

    // Verify global activities count increases in all trackers
    await expect(firstTracker.locator('text=Global activities: 1')).toBeVisible(
      { timeout: 2000 }
    )
    await expect(
      secondTracker.locator('text=Global activities: 1')
    ).toBeVisible({ timeout: 2000 })

    // Take screenshot of independent operation
    await page.screenshot({
      path: '/mnt/c/git/multisynq/react-together/screenshots/global-independent.png',
      fullPage: true
    })
  })

  test('should display user ID and demonstrate global API', async ({
    page
  }) => {
    // Check that user ID is displayed
    await expect(page.locator('text=Your User ID:')).toBeVisible()

    // Verify user ID format (should be demo-user-{random})
    const userIdElement = page.locator('code').filter({ hasText: 'demo-user-' })
    await expect(userIdElement).toBeVisible()

    // Test the "How It Works" explanation for V2
    await expect(page.locator('text=🚀 How It Works')).toBeVisible()
    await expect(page.locator('text=Singleton event emitter')).toBeVisible()
    await expect(page.locator('text=Global session manager')).toBeVisible()
    await expect(page.locator('text=Portal-based rendering')).toBeVisible()
    await expect(page.locator('text=Global API object')).toBeVisible()

    // Take screenshot showing user info and explanation
    await page.screenshot({
      path: '/mnt/c/git/multisynq/react-together/screenshots/global-explanation.png'
    })
  })

  test('should handle multiple rapid activity registrations', async ({
    page
  }) => {
    // Wait for activity feed
    await page.waitForSelector('text=Live Activity Feed', { timeout: 10000 })

    // Register multiple activities quickly using both hooks and direct API
    const activities = [
      { button: '🔍 Search', section: 'Product Features' },
      { button: '🔽 Filter', section: 'Analytics Tools' },
      { button: '📁 Export', section: 'User Dashboard' },
      { button: '+ Add Activity', section: 'Product Features' },
      { button: '+ Add Activity', section: 'Analytics Tools' },
      { button: '+ Add Activity', section: 'User Dashboard' }
    ]

    for (const activity of activities) {
      await page
        .locator(`button:has-text("${activity.button}")`)
        .first()
        .click()
      await page.waitForTimeout(200)
    }

    // Verify multiple activities are shown
    const activityElements = page
      .locator('[style*="border: 1px solid"]')
      .filter({
        has: page.locator('text=feature_usage, text=user_action')
      })

    // Should have multiple activity entries
    await expect(activityElements).toHaveCount(6, { timeout: 5000 })

    // Verify that global state is properly synchronized across all components
    const allTrackers = page.locator('[style*="Global activities:"]')
    for (let i = 0; i < 3; i++) {
      await expect(
        allTrackers.nth(i).locator('text=Global activities: 6')
      ).toBeVisible({ timeout: 3000 })
    }

    // Take screenshot of multiple activities
    await page.screenshot({
      path: '/mnt/c/git/multisynq/react-together/screenshots/global-multiple-activities.png',
      fullPage: true
    })
  })
})

test.describe('ActivitySynq Global Multi-User', () => {
  test('should sync activities between multiple browser tabs with pattern', async ({
    context
  }) => {
    // Create two pages (simulating two users)
    const page1 = await context.newPage()
    const page2 = await context.newPage()

    // Navigate both to the demo
    await page1.goto('http://localhost:3002/activitysynqglobal')
    await page2.goto('http://localhost:3002/activitysynqglobal')

    // Wait for both to load
    await page1.waitForSelector('text=Live Activity Feed', { timeout: 10000 })
    await page2.waitForSelector('text=Live Activity Feed', { timeout: 10000 })

    // Register activity on page1 using hook
    await page1.locator('button:has-text("🔍 Search")').first().click()
    await page1.waitForTimeout(1000)

    // Register activity on page2 using direct API
    await page2.locator('button:has-text("+ Add Activity")').first().click()
    await page2.waitForTimeout(1000)

    // Check if activities appear (cross-user sync)
    // Note: This would require actual Multisynq credentials to work fully

    // Take screenshot of both pages
    await page1.screenshot({
      path: '/mnt/c/git/multisynq/react-together/screenshots/global-user1.png',
      fullPage: true
    })

    await page2.screenshot({
      path: '/mnt/c/git/multisynq/react-together/screenshots/global-user2.png',
      fullPage: true
    })

    await page1.close()
    await page2.close()
  })

  test('should maintain singleton pattern across multiple instances', async ({
    context
  }) => {
    // Create multiple tabs to test singleton behavior
    const page1 = await context.newPage()
    const page2 = await context.newPage()
    const page3 = await context.newPage()

    // Navigate all to demo
    await page1.goto('http://localhost:3002/activitysynqglobal')
    await page2.goto('http://localhost:3002/activitysynqglobal')
    await page3.goto('http://localhost:3002/activitysynqglobal')

    // Wait for all to initialize
    await page1.waitForSelector('text=Feature Tracking Components', {
      timeout: 10000
    })
    await page2.waitForSelector('text=Feature Tracking Components', {
      timeout: 10000
    })
    await page3.waitForSelector('text=Feature Tracking Components', {
      timeout: 10000
    })

    // The singleton pattern should ensure all pages share the same session
    // This would be verified by checking that activities registered on one page
    // appear on all other pages with the same session

    await page1.close()
    await page2.close()
    await page3.close()
  })
})
