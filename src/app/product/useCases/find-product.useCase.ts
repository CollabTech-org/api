import { Injectable, NotFoundException } from '@nestjs/common'
import { DatabaseService } from '../../../database/database.service'
import { MyLoggerService } from '../../../logger/logger.service'
import { FindProductDto } from '../product.dto'
import { ProductPartialEntity } from '../product.entity'

@Injectable()
export class FindProductUseCase {
  private readonly myLoggerService = new MyLoggerService(FindProductUseCase.name)

  constructor(
    private readonly databaseService: DatabaseService,
  ) { }

  async execute(data: FindProductDto): Promise<ProductPartialEntity> {
    const { id } = data

    const product = await this.databaseService.product.findUniqueOrThrow({
      where: { id },
    }).catch((stack) => {
      this.myLoggerService.error('Product not found', stack)
      throw new NotFoundException('Product not found')
    })

    this.myLoggerService.log('Product found')

    return product
  }
}
