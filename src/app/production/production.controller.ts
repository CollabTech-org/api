import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, Query, UsePipes } from '@nestjs/common'
import { ConvertDataDTOPipe } from '../../pipes/convert-data-dto.pipe'
import { CreateProductionDto, DeleteProductionDto, FindAllProductionDto, FindProductionDto, UpdateProductionDto } from './production.dto'
import { ProductionPartialEntity } from './production.entity'
import { CreateProductionUseCase } from './useCases/create-production.useCase'
import { DeleteProductionUseCase } from './useCases/delete-production.useCase'
import { FindAllProductionUseCase } from './useCases/find-all-filter-production.useCase'
import { FindProductionUseCase } from './useCases/find-production.useCase'
import { UpdateProductionUseCase } from './useCases/update-production.useCase'

@Controller('production')
export class ProductionController {
  constructor(
    private readonly createProductionUseCase: CreateProductionUseCase,
    private readonly findProductionUseCase: FindProductionUseCase,
    private readonly findAllProductionUseCase: FindAllProductionUseCase,
    private readonly updateProductionUseCase: UpdateProductionUseCase,
    private readonly deleteProductionUseCase: DeleteProductionUseCase,
  ) { }

  @Post()
  @HttpCode(201)
  async create(@Body() data: CreateProductionDto): Promise<ProductionPartialEntity> {
    const production = await this.createProductionUseCase.execute(data)
    return production
  }

  @Get(':id')
  @HttpCode(200)
  async find(@Param() data: FindProductionDto): Promise<ProductionPartialEntity> {
    const production = await this.findProductionUseCase.execute(data)
    return production
  }

  @Get()
  @HttpCode(200)
  @UsePipes(new ConvertDataDTOPipe(FindAllProductionDto))
  async findAll(@Query() data: FindAllProductionDto): Promise<ProductionPartialEntity[]> {
    const productions = await this.findAllProductionUseCase.execute(data)
    return productions
  }

  @Put()
  @HttpCode(201)
  async update(@Body() data: UpdateProductionDto): Promise<ProductionPartialEntity> {
    const result = await this.updateProductionUseCase.execute(data)
    return result
  }

  @Delete(':id')
  @HttpCode(205)
  async delete(@Param() data: DeleteProductionDto): Promise<void> {
    await this.deleteProductionUseCase.execute(data)
  }
}
