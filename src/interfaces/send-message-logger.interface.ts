export interface SendMessageLogger {
  level: 'LOG' | 'ERROR' | 'WARN' | 'DEBUG' | 'VERBOSE'
  emoji: '🟢' | '🔴' | '🟡' | '🟣' | '🔵'
  message: string
  stack?: unknown
}
