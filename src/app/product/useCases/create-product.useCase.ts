import { Injectable, InternalServerErrorException, NotAcceptableException } from '@nestjs/common'
import { DatabaseService } from '../../../database/database.service'
import { MyLoggerService } from '../../../logger/logger.service'
import { CreateProductDto } from '../product.dto'
import { ProductPartialEntity } from '../product.entity'

@Injectable()
export class CreateProductUseCase {
  private readonly myLoggerService = new MyLoggerService(CreateProductUseCase.name)

  constructor(
    private readonly databaseService: DatabaseService,
  ) { }

  async execute(data: CreateProductDto): Promise<ProductPartialEntity> {
    const { name, category, description, stock, price, sale_price, tags } = data

    await this.databaseService.product.findUnique({
      where: { name },
    }).then((response) => {
      if (response) {
        this.myLoggerService.error('Product already exists with this name')
        throw new NotAcceptableException('Product already exists with this name')
      }
    })

    const product = await this.databaseService.product.create({
      data: { name, category, description, stock, price, sale_price, tags },
      select: { id: true },
    }).catch((stack) => {
      this.myLoggerService.error('Unexpected error while creating the product', stack)
      throw new InternalServerErrorException('Unexpected error while creating the product')
    })

    this.myLoggerService.log('Product created')

    return product
  }
}
