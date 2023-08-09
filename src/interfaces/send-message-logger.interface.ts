export interface SendMessageLogger {
  level: 'log' | 'error' | 'warn' | 'debug' | 'verbose'
  message: string
  stack?: unknown
}
