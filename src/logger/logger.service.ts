import { ConsoleLogger, LoggerService } from '@nestjs/common'
import { SendMessageLogger } from '../interfaces/send-message-logger.interface'
import { apiDiscord } from '../services/discord'

export class MyLoggerService extends ConsoleLogger implements LoggerService {
  private readonly isProduction = process.env.NODE_ENV === 'production'

  private sendMessageLogger({ level, message, stack }: SendMessageLogger) {
    const emoji = { log: '🟢', error: '🔴', warn: '🟡', debug: '🟣', verbose: '🔵' }

    const preContent = `${emoji[level]} [${level.toUpperCase()}] [API]`
    const posContent = stack ? `${message}\n${stack}` : `${message}`

    apiDiscord.post(`/${process.env.DISCORD_BOT_ID}/${process.env.DISCORD_BOT_TOKEN}`, {
      content: `\`\`\`text\n${preContent} ${this.context} | ${posContent}\n\`\`\``,
    }).catch((error) => {
      super.error('Unexpected error while sending the logger to the Discord channel', error, 'MyLoggerService')
    })
  }

  log(message: string) {
    super.log(message, this.context)
    if (this.isProduction) this.sendMessageLogger({ level: 'log', message })
  }

  error(message: string, stack?: unknown) {
    super.error(message, stack, this.context)
    if (this.isProduction) this.sendMessageLogger({ level: 'error', message, stack })
  }

  warn(message: string) {
    super.warn(message, this.context)
    if (this.isProduction) this.sendMessageLogger({ level: 'warn', message })
  }

  debug(message: string) {
    super.debug(message, this.context)
    if (this.isProduction) this.sendMessageLogger({ level: 'debug', message })
  }

  verbose(message: string) {
    super.verbose(message, this.context)
    if (this.isProduction) this.sendMessageLogger({ level: 'verbose', message })
  }
}
