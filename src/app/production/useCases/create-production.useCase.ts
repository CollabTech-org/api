import { Injectable, InternalServerErrorException, NotAcceptableException } from '@nestjs/common'
import { DatabaseService } from '../../../database/database.service'
import { MyLoggerService } from '../../../logger/logger.service'
import { CreateProductionDto } from '../production.dto'
import { ProductionPartialEntity } from '../production.entity'

@Injectable()
export class CreateProductionUseCase {
  private readonly myLoggerService = new MyLoggerService(CreateProductionUseCase.name)

  constructor(
    private readonly databaseService: DatabaseService,
  ) { }

  async execute(data: CreateProductionDto): Promise<ProductionPartialEntity> {
    const { name, category, description, stock, price, sale_price, tags } = data

    await this.databaseService.production.findUnique({
      where: { name },
    }).then((response) => {
      if (response) {
        this.myLoggerService.error('Product already exists with this name')
        throw new NotAcceptableException('Product already exists with this name')
      }
    })

    const production = await this.databaseService.production.create({
      data: { name, category, description, stock, price, sale_price, tags },
      select: { id: true },
    }).catch((stack) => {
      this.myLoggerService.error('Unexpected error while creating the product', stack)
      throw new InternalServerErrorException('Unexpected error while creating the product')
    })

    this.myLoggerService.log('Product created')

    return production
  }
}
