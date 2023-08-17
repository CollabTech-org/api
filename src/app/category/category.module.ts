import { Module } from '@nestjs/common'
import { DatabaseService } from '../../database/database.service'
import { CategoryController } from './category.controller'
import { CreateCategoryUseCase } from './useCases/create-category.useCase'
import { DeleteCategoryUseCase } from './useCases/delete-category.useCase'
import { FindAllCategoryUseCase } from './useCases/find-all-category.useCase'
import { FindCategoryUseCase } from './useCases/find-category.useCase'
import { UpdateCategoryUseCase } from './useCases/update-category.useCase'

@Module({
  controllers: [CategoryController],
  providers: [
    DatabaseService,
    CreateCategoryUseCase,
    FindCategoryUseCase,
    FindAllCategoryUseCase,
    UpdateCategoryUseCase,
    DeleteCategoryUseCase,
  ],
})
export class CategoryModule { }
