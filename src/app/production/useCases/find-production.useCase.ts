import { Injectable, NotFoundException } from '@nestjs/common'
import { DatabaseService } from '../../../database/database.service'
import { MyLoggerService } from '../../../logger/logger.service'
import { FindProductionDto } from '../production.dto'
import { ProductionPartialEntity } from '../production.entity'

@Injectable()
export class FindProductionUseCase {
  private readonly myLoggerService = new MyLoggerService(FindProductionUseCase.name)

  constructor(
    private readonly databaseService: DatabaseService,
  ) { }

  async execute(data: FindProductionDto): Promise<ProductionPartialEntity> {
    const { id } = data

    const production = await this.databaseService.production.findUniqueOrThrow({
      where: { id },
    }).catch((stack) => {
      this.myLoggerService.error('Product not found', stack)
      throw new NotFoundException('Product not found')
    })

    this.myLoggerService.log('Product found')

    return production
  }
}
