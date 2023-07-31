import axios from 'axios'

export const apiDiscord = axios.create({
  baseURL: process.env.DISCORD_BOT_URL,
})
