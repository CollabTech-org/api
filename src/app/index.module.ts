import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { DatabaseModule } from '../database/database.module'
import { CategoryModule } from './category/category.module'
import { ProductModule } from './product/product.module'

@Module({
  imports: [
    ConfigModule.forRoot(),
    DatabaseModule,
    ProductModule,
    CategoryModule,
  ],
})
export class IndexModule { }
