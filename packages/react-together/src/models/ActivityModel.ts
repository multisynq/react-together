import { ReactModel, ViewInfo } from '@multisynq/react'

interface ActivityArgs {
  type: string
  data?: any
  userId?: string
  timestamp: number
}

interface ActivityModelOptions extends Record<string, unknown> {}

export default class ActivityModel extends ReactModel {
  // ActivitySynq state storage
  activities: ActivityArgs[]
  maxActivities: number
  viewIdUserIdMapping: Map<string, string>

  init(options: ActivityModelOptions) {
    super.init({ ...options, trackViews: true })

    // Initialize ActivitySynq state
    this.activities = []
    this.maxActivities = 100 // Configurable limit
    this.viewIdUserIdMapping = new Map()

    this.subscribe(this.id, 'activity', this.handleActivity)
  }

  handleViewJoin(viewId: string, viewInfo: ViewInfo<{ userId?: string }>) {
    // Every viewId has a userId. If userId is not provided, it defaults to viewId
    const userId = viewInfo.viewData?.userId ?? viewId

    // Update viewId -> userId mapping
    this.viewIdUserIdMapping.set(viewId, userId)

    // Send historical activities to new view
    if (this.activities.length > 0) {
      // Send historical activities in small delay to ensure view is ready
      this.future(100).sendHistoricalActivities(viewId)
    }
  }

  sendHistoricalActivities(viewId: string) {
    // Send each historical activity to the specific view
    this.activities.forEach(activity => {
      this.publish(viewId, 'activity_received', activity)
    })
  }

  handleViewExit(viewId: string) {
    // Update viewId -> userId mapping
    this.viewIdUserIdMapping.delete(viewId)
  }

  handleActivity(activity: ActivityArgs) {
    // Store activity in model state for historical access
    this.activities.push(activity)
    
    // Maintain size limit to prevent memory bloat
    if (this.activities.length > this.maxActivities) {
      this.activities.shift() // Remove oldest activity
    }
    
    // Broadcast activity to all views in the session
    this.publish(this.id, 'activity_received', activity)
  }

  // Method to get historical activities for new views
  getHistoricalActivities(): ActivityArgs[] {
    return [...this.activities] // Return copy to prevent mutation
  }
}

ActivityModel.register('ActivityModel')

// Keeping this access function outside of the model class
// so that we can call it from the view side
export function getUserId(model: ActivityModel, viewId: string): string {
  const userId = model.viewIdUserIdMapping.get(viewId)
  if (userId === undefined) {
    console.warn(
      `No userId found for viewId ${viewId}. This is likely a bug. Please report it to the ActivitySynq team.`
    )
    return viewId
  }
  return userId
}