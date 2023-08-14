import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common'
import { DatabaseService } from '../../../database/database.service'
import { MyLoggerService } from '../../../logger/logger.service'
import { DeleteProductDto } from '../product.dto'

@Injectable()
export class DeleteProductUseCase {
  private readonly myLoggerService = new MyLoggerService(DeleteProductUseCase.name)

  constructor(
    private readonly databaseService: DatabaseService,
  ) { }

  async execute(data: DeleteProductDto): Promise<void> {
    const { id } = data

    await this.databaseService.product.findUniqueOrThrow({
      where: { id },
    }).catch((stack) => {
      this.myLoggerService.error('Product not found', stack)
      throw new NotFoundException('Product not found')
    })

    await this.databaseService.product.delete({
      where: { id },
    }).catch((stack) => {
      this.myLoggerService.error('Unexpected error while deleting the product', stack)
      throw new InternalServerErrorException('Unexpected error while deleting the product')
    })

    this.myLoggerService.log('Product deleted')
  }
}
