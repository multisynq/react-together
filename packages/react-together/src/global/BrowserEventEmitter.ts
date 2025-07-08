// Browser-compatible EventEmitter implementation
export class BrowserEventEmitter {
  private events: Map<string, Set<(...args: any[]) => void>> = new Map()

  on(event: string, callback: (...args: any[]) => void): void {
    if (!this.events.has(event)) {
      this.events.set(event, new Set())
    }
    this.events.get(event)!.add(callback)
  }

  off(event: string, callback: (...args: any[]) => void): void {
    const callbacks = this.events.get(event)
    if (callbacks) {
      callbacks.delete(callback)
      if (callbacks.size === 0) {
        this.events.delete(event)
      }
    }
  }

  emit(event: string, ...args: any[]): void {
    const callbacks = this.events.get(event)
    if (callbacks) {
      // Create a copy of the set to prevent issues if a listener unsubscribes during emit
      ;[...callbacks].forEach(callback => {
        try {
          callback(...args)
        } catch (error) {
          console.error('EventEmitter callback error:', error)
        }
      })
    }
  }

  removeAllListeners(event?: string): void {
    if (event) {
      this.events.delete(event)
    } else {
      this.events.clear()
    }
  }

  listenerCount(event: string): number {
    return this.events.get(event)?.size || 0
  }

  eventNames(): string[] {
    return Array.from(this.events.keys())
  }
}