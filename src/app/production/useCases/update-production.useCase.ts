import { Injectable, InternalServerErrorException, NotAcceptableException, NotFoundException } from '@nestjs/common'
import { DatabaseService } from '../../../database/database.service'
import { MyLoggerService } from '../../../logger/logger.service'
import { UpdateProductionDto } from '../production.dto'
import { ProductionPartialEntity } from '../production.entity'

@Injectable()
export class UpdateProductionUseCase {
  private readonly myLoggerService = new MyLoggerService(UpdateProductionUseCase.name)

  constructor(
    private readonly databaseService: DatabaseService,
  ) { }

  async execute(data: UpdateProductionDto): Promise<ProductionPartialEntity> {
    const { id, name, category, description, stock, price, sale_price, tags } = data

    await this.databaseService.production.findUniqueOrThrow({
      where: { id },
    }).catch((stack) => {
      this.myLoggerService.error('Product not found', stack)
      throw new NotFoundException('Product not found')
    })

    await this.databaseService.production.findUnique({
      where: { name },
    }).then((response) => {
      if (response) {
        this.myLoggerService.error('Product already exists with this name')
        throw new NotAcceptableException('Product already exists with this name')
      }
    })

    const productionNew = await this.databaseService.production.update({
      where: { id },
      data: { name, category, description, stock, price, sale_price, tags },
      select: { id: true },
    }).catch((stack) => {
      this.myLoggerService.error('Unexpected error while updating the product', stack)
      throw new InternalServerErrorException('Unexpected error while updating the product')
    })

    this.myLoggerService.log('Product updated')

    return productionNew
  }
}
