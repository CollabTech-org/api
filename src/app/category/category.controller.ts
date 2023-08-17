import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, Query, UsePipes } from '@nestjs/common'
import { ConvertDataDTOPipe } from '../../pipes/convert-data-dto.pipe'
import { CreateCategoryDto, DeleteCategoryDto, FindAllCategoryDto, FindCategoryDto, UpdateCategoryDto } from './category.dto'
import { CategoryPartialEntity } from './category.entity'
import { CreateCategoryUseCase } from './useCases/create-category.useCase'
import { DeleteCategoryUseCase } from './useCases/delete-category.useCase'
import { FindAllCategoryUseCase } from './useCases/find-all-category.useCase'
import { FindCategoryUseCase } from './useCases/find-category.useCase'
import { UpdateCategoryUseCase } from './useCases/update-category.useCase'

@Controller('category')
export class CategoryController {
  constructor(
    private readonly createCategoryUseCase: CreateCategoryUseCase,
    private readonly findCategoryUseCase: FindCategoryUseCase,
    private readonly findAllCategoryUseCase: FindAllCategoryUseCase,
    private readonly updateCategoryUseCase: UpdateCategoryUseCase,
    private readonly deleteCategoryUseCase: DeleteCategoryUseCase,
  ) { }

  @Post()
  @HttpCode(201)
  async create(@Body() data: CreateCategoryDto): Promise<CategoryPartialEntity> {
    const category = await this.createCategoryUseCase.execute(data)
    return category
  }

  @Get(':id')
  @HttpCode(200)
  async find(@Param() data: FindCategoryDto): Promise<CategoryPartialEntity> {
    const category = await this.findCategoryUseCase.execute(data)
    return category
  }

  @Get()
  @HttpCode(200)
  @UsePipes(new ConvertDataDTOPipe(FindAllCategoryDto))
  async findAll(@Query() data: FindAllCategoryDto): Promise<CategoryPartialEntity[]> {
    const categories = await this.findAllCategoryUseCase.execute(data)
    return categories
  }

  @Put()
  @HttpCode(201)
  async update(@Body() data: UpdateCategoryDto): Promise<CategoryPartialEntity> {
    const category = await this.updateCategoryUseCase.execute(data)
    return category
  }

  @Delete(':id')
  @HttpCode(205)
  async delete(@Param() data: DeleteCategoryDto): Promise<void> {
    await this.deleteCategoryUseCase.execute(data)
  }
}
