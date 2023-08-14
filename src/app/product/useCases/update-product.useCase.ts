import { Injectable, InternalServerErrorException, NotAcceptableException, NotFoundException } from '@nestjs/common'
import { DatabaseService } from '../../../database/database.service'
import { MyLoggerService } from '../../../logger/logger.service'
import { UpdateProductDto } from '../product.dto'
import { ProductPartialEntity } from '../product.entity'

@Injectable()
export class UpdateProductUseCase {
  private readonly myLoggerService = new MyLoggerService(UpdateProductUseCase.name)

  constructor(
    private readonly databaseService: DatabaseService,
  ) { }

  async execute(data: UpdateProductDto): Promise<ProductPartialEntity> {
    const { id, name, category, description, stock, price, sale_price, tags } = data

    await this.databaseService.product.findUniqueOrThrow({
      where: { id },
    }).catch((stack) => {
      this.myLoggerService.error('Product not found', stack)
      throw new NotFoundException('Product not found')
    })

    await this.databaseService.product.findUnique({
      where: { name },
    }).then((response) => {
      if (response) {
        this.myLoggerService.error('Product already exists with this name')
        throw new NotAcceptableException('Product already exists with this name')
      }
    })

    const productNew = await this.databaseService.product.update({
      where: { id },
      data: { name, category, description, stock, price, sale_price, tags },
      select: { id: true },
    }).catch((stack) => {
      this.myLoggerService.error('Unexpected error while updating the product', stack)
      throw new InternalServerErrorException('Unexpected error while updating the product')
    })

    this.myLoggerService.log('Product updated')

    return productNew
  }
}
