import { ConsoleLogger, LoggerService } from '@nestjs/common'
import { SendMessageLogger } from '../interfaces/send-message-logger.interface'
import { apiDiscord } from '../services/discord'

export class MyLoggerService extends ConsoleLogger implements LoggerService {
  constructor() { super() }

  private sendMessageLogger({ level, emoji, message, stack }: SendMessageLogger) {
    const preContent = `${emoji} [${level}] [API - ${process.env.NODE_ENV}]`
    const posContent = stack ? `${message}\n${stack}` : `${message}`

    apiDiscord.post(`/${process.env.DISCORD_BOT_ID}/${process.env.DISCORD_BOT_TOKEN}`, {
      content: `\`\`\`text\n${preContent} ${this.context} | ${posContent}\n\`\`\``,
    }).catch((error) => console.error('error =>', error))
  }

  log(message: string) {
    super.log(message, this.context)
    this.sendMessageLogger({ level: 'LOG', emoji: '🟢', message })
  }

  error(message: string, stack?: unknown) {
    super.error(message, stack, this.context)
    this.sendMessageLogger({ level: 'ERROR', emoji: '🔴', message, stack })
  }

  warn(message: string) {
    super.warn(message, this.context)
    this.sendMessageLogger({ level: 'WARN', emoji: '🟡', message })
  }

  debug(message: string) {
    super.debug(message, this.context)
    this.sendMessageLogger({ level: 'DEBUG', emoji: '🟣', message })
  }

  verbose(message: string) {
    super.verbose(message, this.context)
    this.sendMessageLogger({ level: 'VERBOSE', emoji: '🔵', message })
  }
}
