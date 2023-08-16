import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, Query, UsePipes } from '@nestjs/common'
import { ConvertDataDTOPipe } from '../../pipes/convert-data-dto.pipe'
import { CreateProductDto, DeleteProductDto, FindAllProductDto, FindProductDto, UpdateProductDto } from './product.dto'
import { ProductPartialEntity } from './product.entity'
import { CreateProductUseCase } from './useCases/create-product.useCase'
import { DeleteProductUseCase } from './useCases/delete-product.useCase'
import { FindAllProductUseCase } from './useCases/find-all-product.useCase'
import { FindProductUseCase } from './useCases/find-product.useCase'
import { UpdateProductUseCase } from './useCases/update-product.useCase'

@Controller('product')
export class ProductController {
  constructor(
    private readonly createProductUseCase: CreateProductUseCase,
    private readonly findProductUseCase: FindProductUseCase,
    private readonly findAllProductUseCase: FindAllProductUseCase,
    private readonly updateProductUseCase: UpdateProductUseCase,
    private readonly deleteProductUseCase: DeleteProductUseCase,
  ) { }

  @Post()
  @HttpCode(201)
  async create(@Body() data: CreateProductDto): Promise<ProductPartialEntity> {
    const product = await this.createProductUseCase.execute(data)
    return product
  }

  @Get(':id')
  @HttpCode(200)
  async find(@Param() data: FindProductDto): Promise<ProductPartialEntity> {
    const product = await this.findProductUseCase.execute(data)
    return product
  }

  @Get()
  @HttpCode(200)
  @UsePipes(new ConvertDataDTOPipe(FindAllProductDto))
  async findAll(@Query() data: FindAllProductDto): Promise<ProductPartialEntity[]> {
    const products = await this.findAllProductUseCase.execute(data)
    return products
  }

  @Put()
  @HttpCode(201)
  async update(@Body() data: UpdateProductDto): Promise<ProductPartialEntity> {
    const product = await this.updateProductUseCase.execute(data)
    return product
  }

  @Delete(':id')
  @HttpCode(205)
  async delete(@Param() data: DeleteProductDto): Promise<void> {
    await this.deleteProductUseCase.execute(data)
  }
}
