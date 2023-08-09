import { Module } from '@nestjs/common'
import { DatabaseService } from '../../database/database.service'
import { MyLoggerService } from '../../logger/logger.service'
import { ProductionController } from './production.controller'
import { CreateProductionUseCase } from './useCases/create-production.useCase'
import { DeleteProductionUseCase } from './useCases/delete-production.useCase'
import { FindAllProductionUseCase } from './useCases/find-all-filter-production.useCase'
import { FindProductionUseCase } from './useCases/find-production.useCase'
import { UpdateProductionUseCase } from './useCases/update-production.useCase'

@Module({
  controllers: [ProductionController],
  providers: [
    MyLoggerService,
    DatabaseService,
    CreateProductionUseCase,
    FindProductionUseCase,
    FindAllProductionUseCase,
    UpdateProductionUseCase,
    DeleteProductionUseCase,
  ],
})
export class ProductionModule {}
