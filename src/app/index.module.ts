import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { DatabaseModule } from '../database/database.module'
import { ProductionModule } from './production/production.module'

@Module({
  imports: [
    ConfigModule.forRoot(),
    DatabaseModule,
    ProductionModule,
  ],
})
export class IndexModule {}
