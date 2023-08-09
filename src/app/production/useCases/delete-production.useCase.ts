import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common'
import { DatabaseService } from '../../../database/database.service'
import { MyLoggerService } from '../../../logger/logger.service'
import { DeleteProductionDto } from '../production.dto'

@Injectable()
export class DeleteProductionUseCase {
  private readonly myLoggerService = new MyLoggerService(DeleteProductionUseCase.name)

  constructor(
    private readonly databaseService: DatabaseService,
  ) { }

  async execute(data: DeleteProductionDto): Promise<void> {
    const { id } = data

    await this.databaseService.production.findUniqueOrThrow({
      where: { id },
    }).catch((stack) => {
      this.myLoggerService.error('Product not found', stack)
      throw new NotFoundException('Product not found')
    })

    await this.databaseService.production.delete({
      where: { id },
    }).catch((stack) => {
      this.myLoggerService.error('Unexpected error while deleting the product', stack)
      throw new InternalServerErrorException('Unexpected error while deleting the product')
    })

    this.myLoggerService.log('Product deleted')
  }
}
