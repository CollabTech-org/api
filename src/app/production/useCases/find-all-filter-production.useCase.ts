import { Injectable, InternalServerErrorException } from '@nestjs/common'
import { DatabaseService } from '../../../database/database.service'
import { MyLoggerService } from '../../../logger/logger.service'
import { FindAllProductionDto } from '../production.dto'
import { ProductionPartialEntity } from '../production.entity'

@Injectable()
export class FindAllProductionUseCase {
  private readonly myLoggerService = new MyLoggerService(FindAllProductionUseCase.name)

  constructor(
    private readonly databaseService: DatabaseService,
  ) { }

  async execute(data: FindAllProductionDto): Promise<ProductionPartialEntity[]> {
    const { take = 50, page = 1 } = data

    const productions = await this.databaseService.production.findMany({
      orderBy: { created_at: 'desc' },
      take,
      skip: page * take - take,
    }).catch((stack) => {
      this.myLoggerService.error('Unexpected error while found the products', stack)
      throw new InternalServerErrorException('Unexpected error while found the products')
    })

    this.myLoggerService.log('Products found')

    return productions
  }
}
