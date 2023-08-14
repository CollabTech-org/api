import { Module } from '@nestjs/common'
import { DatabaseService } from '../../database/database.service'
import { ProductController } from './product.controller'
import { CreateProductUseCase } from './useCases/create-product.useCase'
import { DeleteProductUseCase } from './useCases/delete-product.useCase'
import { FindAllProductUseCase } from './useCases/find-all-filter-product.useCase'
import { FindProductUseCase } from './useCases/find-product.useCase'
import { UpdateProductUseCase } from './useCases/update-product.useCase'

@Module({
  controllers: [ProductController],
  providers: [
    DatabaseService,
    CreateProductUseCase,
    FindProductUseCase,
    FindAllProductUseCase,
    UpdateProductUseCase,
    DeleteProductUseCase,
  ],
})
export class ProductModule { }
