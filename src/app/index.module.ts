import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { DatabaseModule } from '../database/database.module'
import { MyLoggerModule } from '../logger/logger.module'
import { ProductionModule } from './production/production.module'

@Module({
  imports: [
    ConfigModule.forRoot(),
    MyLoggerModule,
    DatabaseModule,
    ProductionModule,
  ],
})
export class IndexModule {}
