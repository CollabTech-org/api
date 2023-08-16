import { Injectable, InternalServerErrorException } from '@nestjs/common'
import { DatabaseService } from '../../../database/database.service'
import { MyLoggerService } from '../../../logger/logger.service'
import { FindAllProductDto } from '../product.dto'
import { ProductPartialEntity } from '../product.entity'

@Injectable()
export class FindAllProductUseCase {
  private readonly myLoggerService = new MyLoggerService(FindAllProductUseCase.name)

  constructor(
    private readonly databaseService: DatabaseService,
  ) { }

  async execute(data: FindAllProductDto): Promise<ProductPartialEntity[]> {
    const { take = 50, page = 1 } = data

    const products = await this.databaseService.product.findMany({
      orderBy: { created_at: 'desc' },
      take,
      skip: page * take - take,
    }).catch((stack) => {
      this.myLoggerService.error('Unexpected error while found the products', stack)
      throw new InternalServerErrorException('Unexpected error while found the products')
    })

    this.myLoggerService.log('Products found')

    return products
  }
}
