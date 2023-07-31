import { ConsoleLogger, LoggerService } from '@nestjs/common'
import { apiDiscord } from '../lib/discord'

interface ILogger {
  logLevel: 'LOG' | 'ERROR' | 'WARN' | 'DEBUG' | 'VERBOSE'
  emoji: '🟢' | '🔴' | '🟡' | '🟣' | '🔵'
}

interface ISendMessage {
  logger: ILogger, subContext: string, message: string, stack?: string,
}

export class MyLoggerService extends ConsoleLogger implements LoggerService {
  private sendMessage(
    { logger: { logLevel, emoji }, subContext, message, stack }: ISendMessage,
  ) {
    const contexts = `${this.context} ${subContext}`
    const exitStack = stack ? `${message}\n${stack}` : `${message}`

    apiDiscord.post(`/${process.env.DISCORD_BOT_ID}/${process.env.DISCORD_BOT_TOKEN}`, {
      content: `\`\`\`text\n${emoji} [${logLevel}] [API] ${contexts} | ${exitStack}\n\`\`\``,
    }).catch((error) => console.error('error =>', error))
  }

  log(subContext: string, message: string) {
    super.log(message, `${this.context} ${subContext}`)

    if (process.env.NODE_ENV === 'production') {
      this.sendMessage({ logger: { logLevel: 'LOG', emoji: '🟢' }, subContext, message })
    }
  }

  error(subContext: string, message: string, stack?: string) {
    super.error(message, stack, `${this.context} ${subContext}`)

    if (process.env.NODE_ENV === 'production') {
      this.sendMessage({ logger: { logLevel: 'ERROR', emoji: '🔴' }, subContext, message, stack })
    }
  }

  warn(subContext: string, message: string) {
    super.warn(message, `${this.context} ${subContext}`)

    if (process.env.NODE_ENV === 'production') {
      this.sendMessage({ logger: { logLevel: 'WARN', emoji: '🟡' }, subContext, message })
    }
  }

  debug(subContext: string, message: string) {
    super.debug(message, `${this.context} ${subContext}`)

    if (process.env.NODE_ENV === 'production') {
      this.sendMessage({ logger: { logLevel: 'DEBUG', emoji: '🟣' }, subContext, message })
    }
  }

  verbose(subContext: string, message: string) {
    super.verbose(message, `${this.context} ${subContext}`)

    if (process.env.NODE_ENV === 'production') {
      this.sendMessage({ logger: { logLevel: 'VERBOSE', emoji: '🔵' }, subContext, message })
    }
  }
}
