import { ReactModel, ViewInfo } from '@multisynq/react'

interface ActivityArgs {
  type: string
  data?: any
  timestamp?: number
}

interface ActivityModelOptions extends Record<string, unknown> {}

export default class ActivityModel extends ReactModel {
  // Model state: the single source of truth for all activity data
  activities: ActivityArgs[]
  maxActivities: number
  connectedViews: Set<string>

  init(options: ActivityModelOptions) {
    super.init({ ...options, trackViews: true })

    // Initialize model state - this is the canonical activity store
    this.activities = []
    this.maxActivities = 100 // Reduced limit to prevent memory issues and improve performance
    this.connectedViews = new Set()

    // Subscribe to activity events from views
    this.subscribe(this.id, 'add_activity', this.handleActivity)
    this.subscribe(this.id, 'clear_activities', this.clearActivities)
  }

  handleViewJoin(viewId: string, _viewInfo: ViewInfo<{ userId?: string }>) {
    // Track connected views for broadcasting
    this.connectedViews.add(viewId)
    
    // Send all historical activities to the new view
    this.activities.forEach(activity => {
      this.publish(viewId, 'activity_received', activity)
    })
  }

  handleViewExit(viewId: string) {
    // Remove from connected views
    this.connectedViews.delete(viewId)
  }

  handleActivity(activityData: ActivityArgs) {
    // Add reflector timestamp (proper Multisynq pattern)
    const activity: ActivityArgs = {
      ...activityData,
      timestamp: this.now() // Use reflector time, not client time
    }

    // Store in model state (synchronized across all users)
    this.activities.push(activity)
    
    // Maintain size limit to prevent unbounded growth
    if (this.activities.length > this.maxActivities) {
      this.activities.shift() // Remove oldest activity
    }
    
    // Broadcast to all views (model-to-view events)
    this.publish(this.id, 'activity_received', activity)
  }

  // Helper method for views to get historical activities
  getHistoricalActivities(): ActivityArgs[] {
    return [...this.activities] // Return copy to prevent mutation
  }

  // Helper method to get activity count
  getActivityCount(): number {
    return this.activities.length
  }

  // Clear all activities (proper Multisynq pattern)
  clearActivities() {
    // Clear the model state (single source of truth)
    this.activities = []
    
    // Broadcast clear event to all views using reflector timestamp
    this.publish(this.id, 'activities_cleared', {
      clearedAt: this.now(),
      clearedBy: 'user_action'
    })
  }
}

ActivityModel.register('ActivityModel')