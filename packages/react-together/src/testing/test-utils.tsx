import { ReactElement, ReactNode } from 'react'
import { ActivitySynqContext } from '../context/ActivitySynqContext'
import type { ConnectionStatus, ActivitySynqConfig, ActivityEvent } from '../context/ActivitySynqContext'

// Generic mock function type (works with Jest, Vitest, etc.)
export type MockFunction = (...args: any[]) => any

export interface MockActivitySynqProviderProps {
  children: ReactNode
  registerActivity?: MockFunction
  clearActivities?: MockFunction
  isReady?: boolean
  status?: ConnectionStatus
  error?: Error | null
  userId?: string
  config?: Partial<ActivitySynqConfig>
  activities?: ActivityEvent[]
}

export const MockActivitySynqProvider = ({
  children,
  registerActivity = () => {},
  clearActivities = () => {},
  isReady = true,
  status = 'ready',
  error = null,
  userId = 'test-user-123',
  config = {},
  activities = []
}: MockActivitySynqProviderProps) => {
  const value = {
    registerActivity,
    clearActivities,
    activities,
    isReady,
    status,
    error,
    userId,
    config: {
      apiKey: 'test-api-key',
      appId: 'test-app',
      sessionName: 'test-session',
      sessionPassword: 'test-password',
      userId,
      ...config
    }
  }

  return (
    <ActivitySynqContext.Provider value={value}>
      {children}
    </ActivitySynqContext.Provider>
  )
}

export interface RenderWithActivitySynqOptions {
  providerProps?: Partial<MockActivitySynqProviderProps>
}

export interface RenderWithActivitySynqResult {
  mockRegisterActivity: MockFunction
}

/**
 * Creates a wrapper component with MockActivitySynqProvider
 * Use this with your preferred testing library's render function
 */
export const createActivitySynqTestWrapper = (
  options: RenderWithActivitySynqOptions = {}
) => {
  const { providerProps = {} } = options
  
  const mockRegisterActivity = providerProps.registerActivity || (() => {})
  
  const Wrapper = ({ children }: { children: ReactNode }) => (
    <MockActivitySynqProvider
      {...providerProps}
      registerActivity={mockRegisterActivity}
    >
      {children}
    </MockActivitySynqProvider>
  )

  return {
    Wrapper,
    mockRegisterActivity,
  }
}

// For testing libraries that support render with wrapper
export const renderWithActivitySynq = (
  ui: ReactElement,
  options: RenderWithActivitySynqOptions = {}
) => {
  const { Wrapper, mockRegisterActivity } = createActivitySynqTestWrapper(options)
  
  // This is a generic implementation - users can adapt for their testing library
  return {
    Wrapper,
    mockRegisterActivity,
    // Component for manual rendering if needed
    TestComponent: () => <Wrapper>{ui}</Wrapper>
  }
}

/**
 * Helper to create test scenarios for different connection states
 */
export const createActivitySynqTestScenarios = () => ({
  ready: {
    isReady: true,
    status: 'ready' as ConnectionStatus,
    error: null,
    activities: [],
  },
  initializing: {
    isReady: false,
    status: 'initializing' as ConnectionStatus,
    error: null,
    activities: [],
  },
  disconnected: {
    isReady: false,
    status: 'disconnected' as ConnectionStatus,
    error: null,
    activities: [{type: 'test', data: {}, timestamp: Date.now()}],
  },
  error: {
    isReady: false,
    status: 'error' as ConnectionStatus,
    error: new Error('Connection failed'),
    activities: [],
  },
  errorWithBuffer: {
    isReady: false,
    status: 'error' as ConnectionStatus,
    error: new Error('Network timeout'),
    activities: Array(5).fill(0).map((_, i) => ({type: 'buffered', data: {index: i}, timestamp: Date.now()})),
  },
})

/**
 * Helper to create a mock function that captures calls for testing
 * Works with any testing framework
 */
export const createActivityTracker = () => {
  const calls: Array<{ type: string; data?: any }> = []
  
  const mockFn = (type: string, data?: any) => {
    calls.push({ type, data })
  }
  
  return {
    mockFn,
    calls,
    getLastCall: () => calls[calls.length - 1],
    getCallCount: () => calls.length,
    getCall: (index: number) => calls[index],
    wasCalledWith: (type: string, data?: any) => 
      calls.some(call => call.type === type && 
        (data === undefined || JSON.stringify(call.data) === JSON.stringify(data))),
    clear: () => calls.splice(0, calls.length)
  }
}

/**
 * Helper to create activity event objects for testing
 */
export const createMockActivityEvent = <T = any>(
  type: string,
  data?: T,
  userId = 'test-user-123'
): ActivityEvent<T> => ({
  type,
  data: data ? { ...data, userId } : { userId } as T & { userId: string },
  timestamp: Date.now(),
})

export default renderWithActivitySynq