import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { DatabaseModule } from '../../database/database.module'
import { MyLoggerModule } from '../../logger/logger.module'

@Module({
  imports: [ConfigModule.forRoot(), DatabaseModule, MyLoggerModule],
})
export class AppModule {}
