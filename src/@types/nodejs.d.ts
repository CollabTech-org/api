declare namespace NodeJS {
  export interface ProcessEnv {
    PORT: number
    NODE_ENV: 'development' | 'test' | 'production'
    DATABASE_URL: string
    DISCORD_BOT_URL: string
    DISCORD_BOT_ID: string
    DISCORD_BOT_TOKEN: string
  }
}
